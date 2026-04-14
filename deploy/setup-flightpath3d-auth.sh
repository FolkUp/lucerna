#!/bin/bash
# FlightPath3D Authentication Setup Script
# LCRN-060 Phase 3: Basic HTTP Auth configuration for secure document access

set -euo pipefail

# Configuration
HTPASSWD_FILE="/etc/nginx/.htpasswd"
LOG_DIR="/var/log/nginx"
NGINX_CONF_DIR="/etc/nginx/conf.d"
BACKUP_DIR="/etc/nginx/backups/$(date +%Y%m%d_%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "This script must be run as root (sudo)"
        exit 1
    fi
}

check_dependencies() {
    print_status "Checking dependencies..."

    if ! command -v nginx &> /dev/null; then
        print_error "nginx is not installed"
        exit 1
    fi

    if ! command -v htpasswd &> /dev/null; then
        print_error "htpasswd is not installed (apache2-utils package required)"
        exit 1
    fi

    print_success "Dependencies check passed"
}

backup_config() {
    print_status "Creating configuration backup..."

    mkdir -p "$BACKUP_DIR"

    # Backup existing nginx configuration
    if [ -f "$NGINX_CONF_DIR/default.conf" ]; then
        cp "$NGINX_CONF_DIR/default.conf" "$BACKUP_DIR/default.conf.backup"
    fi

    # Backup existing htpasswd if it exists
    if [ -f "$HTPASSWD_FILE" ]; then
        cp "$HTPASSWD_FILE" "$BACKUP_DIR/htpasswd.backup"
    fi

    print_success "Configuration backed up to $BACKUP_DIR"
}

create_auth_users() {
    print_status "Setting up Basic HTTP Auth users..."

    # Create htpasswd file directory if it doesn't exist
    mkdir -p "$(dirname "$HTPASSWD_FILE")"

    # Create or update htpasswd file
    echo "Creating FlightPath3D authentication users:"
    echo "1. Primary user (case manager)"
    echo "2. Legal counsel user"
    echo "3. Audit user (optional)"
    echo

    # Primary user
    read -p "Enter username for primary user (case manager): " primary_user
    if [ -n "$primary_user" ]; then
        htpasswd -c "$HTPASSWD_FILE" "$primary_user"
        print_success "Primary user '$primary_user' created"
    fi

    # Legal counsel user
    echo
    read -p "Enter username for legal counsel (or skip): " legal_user
    if [ -n "$legal_user" ]; then
        htpasswd "$HTPASSWD_FILE" "$legal_user"
        print_success "Legal counsel user '$legal_user' created"
    fi

    # Audit user
    echo
    read -p "Enter username for audit access (or skip): " audit_user
    if [ -n "$audit_user" ]; then
        htpasswd "$HTPASSWD_FILE" "$audit_user"
        print_success "Audit user '$audit_user' created"
    fi

    # Set secure permissions
    chmod 640 "$HTPASSWD_FILE"
    chown root:nginx "$HTPASSWD_FILE"

    print_success "Authentication file configured with secure permissions"
}

setup_logging() {
    print_status "Setting up audit logging..."

    # Create log directory if it doesn't exist
    mkdir -p "$LOG_DIR"

    # Create specific log files for FlightPath3D
    touch "$LOG_DIR/flightpath3d-access.log"
    touch "$LOG_DIR/flightpath3d-error.log"
    touch "$LOG_DIR/flightpath3d-data-access.log"
    touch "$LOG_DIR/flightpath3d-static-access.log"

    # Set permissions
    chmod 640 "$LOG_DIR"/flightpath3d-*.log
    chown nginx:nginx "$LOG_DIR"/flightpath3d-*.log

    print_success "Audit logging configured"
}

configure_nginx() {
    print_status "Configuring nginx for FlightPath3D authentication..."

    # Copy FlightPath3D auth configuration
    if [ -f "flightpath3d-auth.conf" ]; then
        cp flightpath3d-auth.conf "$NGINX_CONF_DIR/flightpath3d-auth.conf"
        print_success "FlightPath3D auth configuration installed"
    else
        print_error "flightpath3d-auth.conf not found in current directory"
        exit 1
    fi

    # Test nginx configuration
    print_status "Testing nginx configuration..."
    if nginx -t; then
        print_success "Nginx configuration test passed"
    else
        print_error "Nginx configuration test failed"
        print_error "Rolling back changes..."
        rm -f "$NGINX_CONF_DIR/flightpath3d-auth.conf"
        exit 1
    fi
}

setup_ssl_security() {
    print_status "Setting up SSL/TLS security enhancements..."

    # Create SSL configuration snippet
    cat > "$NGINX_CONF_DIR/ssl-security.conf" << 'EOF'
# SSL Security Configuration for FlightPath3D
# Banking-level TLS security settings

# SSL protocols and ciphers
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;

# SSL session settings
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_session_tickets off;

# OCSP stapling
ssl_stapling on;
ssl_stapling_verify on;

# Security headers (applied globally)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Content-Type-Options nosniff always;
add_header X-Frame-Options DENY always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy strict-origin-when-cross-origin always;
EOF

    print_success "SSL security configuration created"
}

reload_nginx() {
    print_status "Reloading nginx configuration..."

    if systemctl reload nginx; then
        print_success "Nginx configuration reloaded successfully"
    else
        print_error "Failed to reload nginx"
        print_error "Check nginx logs: journalctl -u nginx"
        exit 1
    fi
}

display_summary() {
    print_success "FlightPath3D Authentication Setup Complete!"
    echo
    echo "Configuration Summary:"
    echo "- Authentication file: $HTPASSWD_FILE"
    echo "- Nginx config: $NGINX_CONF_DIR/flightpath3d-auth.conf"
    echo "- SSL security: $NGINX_CONF_DIR/ssl-security.conf"
    echo "- Audit logs: $LOG_DIR/flightpath3d-*.log"
    echo "- Backup: $BACKUP_DIR"
    echo
    echo "Next Steps:"
    echo "1. Include flightpath3d-auth.conf in your main nginx server block"
    echo "2. Ensure SSL certificate is properly configured"
    echo "3. Test access to https://lucerna.folkup.app/search/flightpath3d"
    echo "4. Set up log rotation for audit logs"
    echo "5. Document credentials in secure password manager"
    echo
    print_warning "IMPORTANT: Store authentication credentials securely!"
    print_warning "Enable fail2ban for additional brute-force protection"
}

main() {
    print_status "Starting FlightPath3D Authentication Setup..."
    echo

    check_root
    check_dependencies
    backup_config
    create_auth_users
    setup_logging
    configure_nginx
    setup_ssl_security
    reload_nginx
    display_summary
}

# Execute main function
main "$@"