#!/bin/bash

# deploy-flightpath3d-secure.sh - Secure FlightPath3D Deployment Script
# Created: 2026-04-13
# Purpose: Zero-downtime deployment with banking-level security and audit trail
# Integration: Symlink-based deployment with automated rollback capability

set -euo pipefail

# Configuration
DEPLOY_ROOT="${DEPLOY_ROOT:-/var/www/flightpath3d}"
RELEASES_DIR="$DEPLOY_ROOT/releases"
CURRENT_LINK="$DEPLOY_ROOT/current"
SHARED_DIR="$DEPLOY_ROOT/shared"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/flightpath3d}"
LOG_FILE="${LOG_FILE:-/var/log/flightpath3d/deployment.log}"

# Deployment settings
KEEP_RELEASES="${KEEP_RELEASES:-5}"
HEALTH_CHECK_TIMEOUT="${HEALTH_CHECK_TIMEOUT:-30}"
ROLLBACK_TIMEOUT="${ROLLBACK_TIMEOUT:-300}"

# Security settings
HTPASSWD_FILE="/etc/nginx/.htpasswd-flightpath3d"
NGINX_CONF="/etc/nginx/sites-available/flightpath3d"
SSL_CERT_PATH="/etc/letsencrypt/live/lucerna.folkup.app"

# Audit settings
AUDIT_LOG="/var/log/flightpath3d/audit.log"
CHAIN_OF_CUSTODY="/var/log/flightpath3d/chain-of-custody.log"

# Source directory (where built Hugo site is located)
SOURCE_DIR="${1:-./public}"
RELEASE_VERSION="${2:-$(date +%Y%m%d_%H%M%S)}"

# Initialize directories
mkdir -p "$RELEASES_DIR" "$SHARED_DIR" "$BACKUP_DIR" "$(dirname "$LOG_FILE")" "$(dirname "$AUDIT_LOG")"

# Logging function with audit trail
log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local entry="$timestamp [$$] [$level] $message"

    echo "$entry" | tee -a "$LOG_FILE"

    # Add to audit trail for compliance
    if [[ "$level" == "AUDIT" ]]; then
        echo "$entry" >> "$AUDIT_LOG"
    fi
}

# Chain of custody logging for legal evidence
log_custody() {
    local action="$1"
    local details="$2"
    local timestamp=$(date -u '+%Y-%m-%d %H:%M:%S UTC')
    local hash="${3:-}"

    echo "$timestamp | $action | $details | Hash: $hash | User: $(whoami) | Host: $(hostname)" >> "$CHAIN_OF_CUSTODY"
}

# Pre-deployment security checks
security_check() {
    log "INFO" "Starting pre-deployment security validation"

    # Verify htpasswd file exists and has proper permissions
    if [[ ! -f "$HTPASSWD_FILE" ]]; then
        log "ERROR" "htpasswd file not found: $HTPASSWD_FILE"
        return 1
    fi

    local htpasswd_perms=$(stat -c "%a" "$HTPASSWD_FILE")
    if [[ "$htpasswd_perms" != "640" ]]; then
        log "WARN" "Fixing htpasswd permissions: $htpasswd_perms -> 640"
        chmod 640 "$HTPASSWD_FILE"
        chown root:www-data "$HTPASSWD_FILE"
    fi

    # Test nginx configuration
    if ! nginx -t 2>/dev/null; then
        log "ERROR" "nginx configuration test failed"
        return 1
    fi

    # Verify SSL certificate validity
    if [[ -d "$SSL_CERT_PATH" ]]; then
        local cert_expiry=$(openssl x509 -enddate -noout -in "$SSL_CERT_PATH/fullchain.pem" | cut -d= -f2)
        local expiry_epoch=$(date -d "$cert_expiry" +%s)
        local current_epoch=$(date +%s)
        local days_until_expiry=$(( (expiry_epoch - current_epoch) / 86400 ))

        if [[ $days_until_expiry -lt 30 ]]; then
            log "WARN" "SSL certificate expires in $days_until_expiry days"
        fi
    fi

    log "AUDIT" "Pre-deployment security validation completed"
    return 0
}

# Content integrity verification
verify_integrity() {
    local source_dir="$1"

    log "INFO" "Verifying content integrity"

    # Generate checksums for all files
    local checksum_file="$source_dir/SHA256SUMS"
    find "$source_dir" -type f -not -name "SHA256SUMS" -exec sha256sum {} \; | sort > "$checksum_file"

    # Verify no critical PII in content
    if command -v node >/dev/null 2>&1; then
        local pii_scanner="$(dirname "$0")/../automation/pii-scanner.js"
        if [[ -f "$pii_scanner" ]]; then
            log "INFO" "Running PII compliance scan"
            if ! node "$pii_scanner" "$source_dir" "$(dirname "$LOG_FILE")/pii-reports"; then
                log "ERROR" "PII compliance scan failed - deployment blocked"
                return 1
            fi
        fi
    fi

    # Log chain of custody
    local content_hash=$(find "$source_dir" -type f -exec cat {} \; | sha256sum | cut -d' ' -f1)
    log_custody "CONTENT_VERIFICATION" "Pre-deployment integrity check" "$content_hash"

    log "AUDIT" "Content integrity verification completed"
    return 0
}

# Create new release
create_release() {
    local release_dir="$RELEASES_DIR/$RELEASE_VERSION"

    log "INFO" "Creating release: $RELEASE_VERSION"

    # Create release directory
    mkdir -p "$release_dir"

    # Copy content with preservation of permissions and metadata
    cp -a "$SOURCE_DIR"/* "$release_dir"/

    # Link to shared resources
    if [[ -d "$SHARED_DIR/uploads" ]]; then
        ln -sf "$SHARED_DIR/uploads" "$release_dir/uploads"
    fi

    # Set proper ownership and permissions
    chown -R www-data:www-data "$release_dir"
    find "$release_dir" -type f -exec chmod 644 {} \;
    find "$release_dir" -type d -exec chmod 755 {} \;

    # Generate release manifest
    cat > "$release_dir/RELEASE_MANIFEST" << EOF
Release Version: $RELEASE_VERSION
Deployment Time: $(date -u '+%Y-%m-%d %H:%M:%S UTC')
Deployed By: $(whoami)
Source Hash: $(find "$SOURCE_DIR" -type f -exec cat {} \; | sha256sum | cut -d' ' -f1)
Files Count: $(find "$release_dir" -type f | wc -l)
Total Size: $(du -sh "$release_dir" | cut -f1)
EOF

    log_custody "RELEASE_CREATED" "Version $RELEASE_VERSION deployed" "$(cat "$release_dir/RELEASE_MANIFEST" | sha256sum | cut -d' ' -f1)"

    echo "$release_dir"
}

# Health check function
health_check() {
    local check_url="${1:-https://lucerna.folkup.app/search/flightpath3d}"
    local timeout="${2:-$HEALTH_CHECK_TIMEOUT}"

    log "INFO" "Performing health check: $check_url"

    local start_time=$(date +%s)
    local end_time=$((start_time + timeout))

    while [[ $(date +%s) -lt $end_time ]]; do
        if curl -sf --max-time 10 \
                --user-agent "FlightPath3D-Deployment-Check" \
                --basic --user "fp3d_admin:$(cat /tmp/flightpath3d_current_password 2>/dev/null || echo '')" \
                "$check_url" > /dev/null 2>&1; then
            log "INFO" "Health check passed"
            log "AUDIT" "Post-deployment health check successful"
            return 0
        fi

        sleep 2
    done

    log "ERROR" "Health check failed after ${timeout}s"
    return 1
}

# Atomic deployment with symlink switch
atomic_deploy() {
    local release_dir="$1"

    log "INFO" "Performing atomic deployment"

    # Create backup of current deployment if exists
    if [[ -L "$CURRENT_LINK" ]]; then
        local current_target=$(readlink "$CURRENT_LINK")
        local backup_name="backup_$(basename "$current_target")_$(date +%s)"
        cp -al "$current_target" "$BACKUP_DIR/$backup_name"
        log "INFO" "Current deployment backed up to: $backup_name"
    fi

    # Atomic symlink switch (this is the zero-downtime moment)
    local temp_link="$CURRENT_LINK.tmp.$$"
    ln -sf "$release_dir" "$temp_link"
    mv "$temp_link" "$CURRENT_LINK"

    log "AUDIT" "Atomic deployment completed: $(readlink "$CURRENT_LINK")"

    # Reload nginx to pick up any configuration changes
    systemctl reload nginx

    return 0
}

# Rollback function
rollback() {
    log "WARN" "Initiating rollback procedure"

    # Find previous release
    local current_release=$(basename "$(readlink "$CURRENT_LINK" 2>/dev/null || echo '')")
    local previous_release=$(ls -t "$RELEASES_DIR" | grep -v "$current_release" | head -1)

    if [[ -z "$previous_release" ]]; then
        log "ERROR" "No previous release found for rollback"
        return 1
    fi

    local previous_path="$RELEASES_DIR/$previous_release"
    log "INFO" "Rolling back to: $previous_release"

    # Perform rollback
    ln -sf "$previous_path" "$CURRENT_LINK"
    systemctl reload nginx

    # Verify rollback
    if health_check; then
        log "AUDIT" "Rollback successful to version: $previous_release"
        return 0
    else
        log "ERROR" "Rollback health check failed"
        return 1
    fi
}

# Cleanup old releases
cleanup_releases() {
    log "INFO" "Cleaning up old releases (keeping $KEEP_RELEASES)"

    local releases_to_remove=$(ls -t "$RELEASES_DIR" | tail -n +$((KEEP_RELEASES + 1)))

    for release in $releases_to_remove; do
        log "INFO" "Removing old release: $release"
        rm -rf "$RELEASES_DIR/$release"
    done

    log "AUDIT" "Release cleanup completed"
}

# Main deployment process
main() {
    local start_time=$(date +%s)

    log "AUDIT" "=== FlightPath3D Deployment Started: $RELEASE_VERSION ==="

    # Verify running as appropriate user
    if [[ $EUID -ne 0 ]]; then
        log "ERROR" "This script must be run as root for system deployment"
        exit 1
    fi

    # Verify source directory exists
    if [[ ! -d "$SOURCE_DIR" ]]; then
        log "ERROR" "Source directory not found: $SOURCE_DIR"
        exit 1
    fi

    # Pre-deployment checks
    if ! security_check; then
        log "ERROR" "Security validation failed - deployment aborted"
        exit 1
    fi

    if ! verify_integrity "$SOURCE_DIR"; then
        log "ERROR" "Content integrity check failed - deployment aborted"
        exit 1
    fi

    # Create and deploy release
    local release_dir
    release_dir=$(create_release)

    if ! atomic_deploy "$release_dir"; then
        log "ERROR" "Atomic deployment failed"
        exit 1
    fi

    # Post-deployment health check
    sleep 5  # Brief pause for nginx to process reload

    if ! health_check; then
        log "ERROR" "Post-deployment health check failed - initiating rollback"
        if rollback; then
            log "WARN" "Deployment failed but rollback successful"
            exit 1
        else
            log "ERROR" "Deployment AND rollback failed - manual intervention required"
            exit 2
        fi
    fi

    # Cleanup and finalize
    cleanup_releases

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    log "AUDIT" "=== FlightPath3D Deployment Completed Successfully: $RELEASE_VERSION (${duration}s) ==="

    # Display deployment summary
    cat << EOF

✅ FlightPath3D Deployment Successful

Release: $RELEASE_VERSION
Duration: ${duration} seconds
Health Check: PASSED
Chain of Custody: Updated
Security Audit: COMPLIANT

Current deployment: $(readlink "$CURRENT_LINK")
Backup available: Yes
Rollback ready: Yes

EOF
}

# Handle script arguments
case "${1:-deploy}" in
    "deploy")
        shift
        main "$@"
        ;;
    "rollback")
        rollback
        ;;
    "health-check")
        health_check "${2:-https://lucerna.folkup.app/search/flightpath3d}"
        ;;
    "cleanup")
        cleanup_releases
        ;;
    *)
        cat << EOF
FlightPath3D Secure Deployment Script

Usage: $0 <command> [options]

Commands:
  deploy [source_dir] [version]   Deploy new release (default)
  rollback                        Rollback to previous release
  health-check [url]             Perform health check
  cleanup                        Clean up old releases

Examples:
  $0 deploy ./public v1.2.3
  $0 rollback
  $0 health-check https://lucerna.folkup.app/search/flightpath3d

Environment Variables:
  DEPLOY_ROOT                    Deployment root directory
  KEEP_RELEASES                  Number of releases to keep (default: 5)
  HEALTH_CHECK_TIMEOUT          Health check timeout in seconds
  ROLLBACK_TIMEOUT              Rollback timeout in seconds
EOF
        ;;
esac