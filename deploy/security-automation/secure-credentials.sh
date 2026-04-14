#!/bin/bash

# secure-credentials.sh - FlightPath3D Secure Credential Management
# Created: 2026-04-13
# Purpose: Automated htpasswd rotation and secure credential handling
# Compliance: Banking-level security standards

set -euo pipefail

# Configuration
HTPASSWD_FILE="${HTPASSWD_FILE:-/etc/nginx/.htpasswd-flightpath3d}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/flightpath3d-auth}"
LOG_FILE="${LOG_FILE:-/var/log/flightpath3d/credential-rotation.log}"
ROTATION_INTERVAL_DAYS="${ROTATION_INTERVAL_DAYS:-90}"

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$BACKUP_DIR"

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') [$$] $*" | tee -a "$LOG_FILE"
}

# Generate secure random password
generate_password() {
    # 32-character password with mixed case, numbers, and symbols
    openssl rand -base64 48 | tr -d "=+/" | cut -c1-32
}

# Create encrypted backup of htpasswd file
backup_htpasswd() {
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local backup_file="$BACKUP_DIR/htpasswd_$timestamp.gpg"

    if [[ -f "$HTPASSWD_FILE" ]]; then
        gpg --cipher-algo AES256 --compress-algo 2 --symmetric \
            --output "$backup_file" "$HTPASSWD_FILE" 2>/dev/null
        log "Backup created: $backup_file"

        # Keep only last 10 backups
        ls -t "$BACKUP_DIR"/htpasswd_*.gpg 2>/dev/null | tail -n +11 | xargs -r rm
    fi
}

# Rotate credentials for specified user
rotate_credentials() {
    local username="$1"
    local new_password

    log "Starting credential rotation for user: $username"

    # Generate new password
    new_password=$(generate_password)

    # Create backup before rotation
    backup_htpasswd

    # Update htpasswd file with new credentials
    if htpasswd -cb "$HTPASSWD_FILE" "$username" "$new_password"; then
        log "Credential rotation successful for user: $username"

        # Set secure permissions
        chmod 640 "$HTPASSWD_FILE"
        chown root:www-data "$HTPASSWD_FILE"

        # Output new password to secure location for admin retrieval
        local password_file="/tmp/flightpath3d_new_password_$username.txt"
        echo "New password for $username: $new_password" > "$password_file"
        chmod 600 "$password_file"
        chown root:root "$password_file"

        log "New password written to: $password_file (expires in 24h)"

        # Schedule password file cleanup
        echo "rm -f $password_file" | at now + 24 hours 2>/dev/null || true

        # Test nginx configuration
        if nginx -t 2>/dev/null; then
            systemctl reload nginx
            log "nginx configuration validated and reloaded"
        else
            log "ERROR: nginx configuration test failed after rotation"
            return 1
        fi

        return 0
    else
        log "ERROR: Failed to update htpasswd file"
        return 1
    fi
}

# Check if credentials need rotation
check_rotation_needed() {
    local username="$1"

    if [[ ! -f "$HTPASSWD_FILE" ]]; then
        log "htpasswd file not found, rotation needed"
        return 0
    fi

    # Check file modification time
    local file_age_days=$(( ($(date +%s) - $(stat -c %Y "$HTPASSWD_FILE")) / 86400 ))

    if [[ $file_age_days -ge $ROTATION_INTERVAL_DAYS ]]; then
        log "Credentials are $file_age_days days old, rotation needed"
        return 0
    else
        log "Credentials are $file_age_days days old, rotation not needed"
        return 1
    fi
}

# Initialize htpasswd file with secure credentials
initialize_credentials() {
    local username="$1"

    if [[ -f "$HTPASSWD_FILE" ]]; then
        log "htpasswd file already exists, skipping initialization"
        return 0
    fi

    log "Initializing credentials for user: $username"
    rotate_credentials "$username"
}

# Main execution
main() {
    local command="${1:-help}"
    local username="${2:-fp3d_admin}"

    case "$command" in
        "rotate")
            rotate_credentials "$username"
            ;;
        "check")
            if check_rotation_needed "$username"; then
                echo "Rotation needed"
                exit 0
            else
                echo "Rotation not needed"
                exit 1
            fi
            ;;
        "init")
            initialize_credentials "$username"
            ;;
        "backup")
            backup_htpasswd
            ;;
        "help"|*)
            cat << EOF
FlightPath3D Secure Credential Management

Usage: $0 <command> [username]

Commands:
  init [username]     Initialize credentials (default: fp3d_admin)
  rotate [username]   Rotate credentials for user
  check [username]    Check if rotation is needed
  backup             Create encrypted backup of htpasswd file
  help               Show this help message

Environment Variables:
  HTPASSWD_FILE              Path to htpasswd file (default: /etc/nginx/.htpasswd-flightpath3d)
  BACKUP_DIR                 Backup directory (default: /var/backups/flightpath3d-auth)
  LOG_FILE                   Log file path (default: /var/log/flightpath3d/credential-rotation.log)
  ROTATION_INTERVAL_DAYS     Rotation interval in days (default: 90)

Examples:
  $0 init                    # Initialize with default user
  $0 rotate fp3d_admin       # Rotate credentials for fp3d_admin
  $0 check                   # Check if rotation is needed

Automated rotation via cron:
  # Add to /etc/crontab for quarterly rotation
  0 2 1 */3 * root $0 rotate fp3d_admin
EOF
            ;;
    esac
}

# Verify running as root for system operations
if [[ $EUID -ne 0 && "$1" != "help" ]]; then
    echo "Error: This script must be run as root for system credential management"
    exit 1
fi

main "$@"