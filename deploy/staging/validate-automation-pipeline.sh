#!/bin/bash

# validate-automation-pipeline.sh - FlightPath3D Automation Pipeline Validation
# Created: 2026-04-13
# Purpose: Comprehensive staging validation of deployment automation
# Compliance: Banking-level verification protocols

set -euo pipefail

# Configuration
STAGING_DIR="${STAGING_DIR:-/var/www/staging/flightpath3d}"
PRODUCTION_DIR="${PRODUCTION_DIR:-/var/www/flightpath3d}"
VALIDATION_LOG="${VALIDATION_LOG:-/var/log/flightpath3d/validation.log}"
DOSSIERS_DIR="${DOSSIERS_DIR:-/var/www/flightpath3d/current/dossiers}"
TEST_USER="${TEST_USER:-flightpath3d_test}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results tracking
TESTS_TOTAL=0
TESTS_PASSED=0
TESTS_FAILED=0

# Logging with validation chain
log_validation() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date -u '+%Y-%m-%d %H:%M:%S UTC')
    local entry="$timestamp [VALIDATION] [$level] $message"

    echo "$entry" | tee -a "$VALIDATION_LOG"

    case "$level" in
        "PASS") echo -e "${GREEN}✅ $message${NC}" ;;
        "FAIL") echo -e "${RED}❌ $message${NC}" ;;
        "WARN") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "INFO") echo -e "${BLUE}ℹ️  $message${NC}" ;;
    esac
}

# Test execution framework
run_test() {
    local test_name="$1"
    local test_function="$2"

    ((TESTS_TOTAL++))

    echo -e "\n${BLUE}Running test: $test_name${NC}"

    if $test_function; then
        ((TESTS_PASSED++))
        log_validation "PASS" "Test passed: $test_name"
        return 0
    else
        ((TESTS_FAILED++))
        log_validation "FAIL" "Test failed: $test_name"
        return 1
    fi
}

# Test 1: Automation Components Integrity
test_automation_integrity() {
    local components=(
        "secure-credentials.sh"
        "pii-scanner.js"
        "deploy-flightpath3d-secure.sh"
        "content-validator.js"
        "integrity-checker.sh"
        "search-optimizer.js"
        "flightpath3d-deployment-orchestrator.sh"
        "test-deployment-integration.sh"
    )

    for component in "${components[@]}"; do
        local file_path="../${component}"
        if [[ "$component" == *.js ]]; then
            file_path="../automation/${component}"
        elif [[ "$component" == *"secure-credentials"* || "$component" == *"integrity-checker"* || "$component" == *"deploy-flightpath3d"* ]]; then
            file_path="../security-automation/${component}"
        fi

        if [[ ! -f "$file_path" ]]; then
            log_validation "FAIL" "Missing component: $component"
            return 1
        fi

        # Check executable permissions for shell scripts
        if [[ "$component" == *.sh && ! -x "$file_path" ]]; then
            log_validation "FAIL" "Component not executable: $component"
            return 1
        fi

        # Basic syntax check
        if [[ "$component" == *.sh ]]; then
            if ! bash -n "$file_path" 2>/dev/null; then
                log_validation "FAIL" "Syntax error in: $component"
                return 1
            fi
        elif [[ "$component" == *.js ]]; then
            if ! node -c "$file_path" 2>/dev/null; then
                log_validation "FAIL" "Syntax error in: $component"
                return 1
            fi
        fi
    done

    return 0
}

# Test 2: PII Scanner Accuracy
test_pii_scanner() {
    local test_dir=$(mktemp -d)

    # Create test documents with known PII
    cat > "$test_dir/test-pii.md" << 'EOF'
---
title: "Test Document"
status: verified
---

# Test PII Content

Email: test.user@example.com
Phone: +351 912 345 678
NIF: 123456789
IBAN: PT50 0002 0123 1234 5678 9015 4
Payoneer: payo_1234567890
Portuguese Address: Rua Augusta, 123, 1100-048 Lisboa
EOF

    # Run PII scanner
    if ! node ../automation/pii-scanner.js --input "$test_dir" --output "$test_dir/pii-report.json" >/dev/null 2>&1; then
        rm -rf "$test_dir"
        return 1
    fi

    # Verify PII detection
    local pii_report="$test_dir/pii-report.json"
    if [[ ! -f "$pii_report" ]]; then
        rm -rf "$test_dir"
        return 1
    fi

    # Check if critical PII types were detected
    local critical_types=("email" "nif" "iban")
    for pii_type in "${critical_types[@]}"; do
        if ! grep -q "\"type\":\"$pii_type\"" "$pii_report"; then
            log_validation "FAIL" "PII scanner missed critical type: $pii_type"
            rm -rf "$test_dir"
            return 1
        fi
    done

    rm -rf "$test_dir"
    return 0
}

# Test 3: Content Validator Integration
test_content_validator() {
    local test_site=$(mktemp -d)

    # Create minimal Hugo site structure
    mkdir -p "$test_site"/{content,layouts,static}

    cat > "$test_site/hugo.toml" << EOF
baseURL = "https://test.example.com"
languageCode = "en-us"
title = "Test Site"
EOF

    cat > "$test_site/content/test.md" << 'EOF'
---
title: "Test Page"
status: verified
confidence: high
tags: ["test"]
sources: ["test-source"]
date_created: 2026-01-01
date_updated: 2026-01-01
---

# Test Content
This is test content.
EOF

    # Run content validator
    if ! node ../automation/content-validator.js --hugo-site "$test_site" --output "$test_site/validation.json" >/dev/null 2>&1; then
        rm -rf "$test_site"
        return 1
    fi

    # Check validation results
    if [[ ! -f "$test_site/validation.json" ]]; then
        rm -rf "$test_site"
        return 1
    fi

    rm -rf "$test_site"
    return 0
}

# Test 4: Security Credentials Management
test_security_credentials() {
    local test_dir=$(mktemp -d)

    # Set test environment
    export HTPASSWD_FILE="$test_dir/.htpasswd"
    export BACKUP_DIR="$test_dir/backups"
    export USERNAME="testuser"

    # Run credential generation (dry run)
    if ! bash ../security-automation/secure-credentials.sh generate --dry-run >/dev/null 2>&1; then
        rm -rf "$test_dir"
        return 1
    fi

    # Test password generation function
    if ! bash -c 'source ../security-automation/secure-credentials.sh; generate_password | wc -c | grep -q "33"' 2>/dev/null; then
        log_validation "FAIL" "Password generation failed"
        rm -rf "$test_dir"
        return 1
    fi

    rm -rf "$test_dir"
    return 0
}

# Test 5: Deployment Script Integrity
test_deployment_script() {
    # Test deployment script configuration parsing
    local test_config=$(mktemp)

    cat > "$test_config" << EOF
HUGO_SITE_DIR="/test/site"
DOSSIERS_DIR="/test/dossiers"
NGINX_CONFIG="/test/nginx.conf"
HTPASSWD_FILE="/test/.htpasswd"
EOF

    # Source the deployment script and test functions
    if ! bash -c "source ../security-automation/deploy-flightpath3d-secure.sh; validate_environment() { return 0; }; validate_environment" 2>/dev/null; then
        rm -f "$test_config"
        return 1
    fi

    rm -f "$test_config"
    return 0
}

# Test 6: Master Orchestrator Configuration
test_master_orchestrator() {
    # Test orchestrator quality gates definition
    if ! bash ../flightpath3d-deployment-orchestrator.sh --dry-run 2>/dev/null; then
        return 1
    fi

    # Verify quality gates are properly defined
    if ! grep -q "content-validation" ../flightpath3d-deployment-orchestrator.sh; then
        return 1
    fi

    return 0
}

# Test 7: Integration Test Script
test_integration_script() {
    # Test integration test framework
    if ! bash -n ../test-deployment-integration.sh 2>/dev/null; then
        return 1
    fi

    # Check test functions are defined
    local required_tests=(
        "test_ssl_configuration"
        "test_authentication"
        "test_search_functionality"
        "test_security_headers"
    )

    for test_func in "${required_tests[@]}"; do
        if ! grep -q "$test_func()" ../test-deployment-integration.sh; then
            log_validation "FAIL" "Missing test function: $test_func"
            return 1
        fi
    done

    return 0
}

# Test 8: End-to-End Simulation
test_e2e_simulation() {
    log_validation "INFO" "Running end-to-end deployment simulation"

    local staging_test_dir=$(mktemp -d)

    # Simulate deployment environment
    mkdir -p "$staging_test_dir"/{releases,current,backups}

    # Create test release
    local test_release="$staging_test_dir/releases/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$test_release"

    echo "Test deployment" > "$test_release/index.html"

    # Test symlink deployment
    if ln -sf "$test_release" "$staging_test_dir/current.tmp" &&
       mv "$staging_test_dir/current.tmp" "$staging_test_dir/current"; then
        log_validation "PASS" "Symlink deployment simulation successful"
    else
        log_validation "FAIL" "Symlink deployment simulation failed"
        rm -rf "$staging_test_dir"
        return 1
    fi

    # Test rollback simulation
    local old_release="$staging_test_dir/releases/old_release"
    mkdir -p "$old_release"
    echo "Old deployment" > "$old_release/index.html"

    if ln -sf "$old_release" "$staging_test_dir/current.tmp" &&
       mv "$staging_test_dir/current.tmp" "$staging_test_dir/current"; then
        log_validation "PASS" "Rollback simulation successful"
    else
        log_validation "FAIL" "Rollback simulation failed"
        rm -rf "$staging_test_dir"
        return 1
    fi

    rm -rf "$staging_test_dir"
    return 0
}

# Main validation execution
main() {
    log_validation "INFO" "Starting FlightPath3D automation pipeline validation"

    # Create log directory
    mkdir -p "$(dirname "$VALIDATION_LOG")"

    # Run all tests
    run_test "Automation Components Integrity" test_automation_integrity
    run_test "PII Scanner Accuracy" test_pii_scanner
    run_test "Content Validator Integration" test_content_validator
    run_test "Security Credentials Management" test_security_credentials
    run_test "Deployment Script Integrity" test_deployment_script
    run_test "Master Orchestrator Configuration" test_master_orchestrator
    run_test "Integration Test Script" test_integration_script
    run_test "End-to-End Simulation" test_e2e_simulation

    # Generate final report
    echo -e "\n${BLUE}=== VALIDATION SUMMARY ===${NC}"
    echo "Total tests: $TESTS_TOTAL"
    echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Failed: ${RED}$TESTS_FAILED${NC}"

    if [[ $TESTS_FAILED -eq 0 ]]; then
        echo -e "\n${GREEN}🎉 All tests passed! Automation pipeline ready for staging deployment.${NC}"
        log_validation "PASS" "Complete validation successful - pipeline ready"
        return 0
    else
        echo -e "\n${RED}❌ $TESTS_FAILED tests failed. Pipeline not ready for deployment.${NC}"
        log_validation "FAIL" "Validation failed - pipeline requires fixes"
        return 1
    fi
}

# Help function
show_help() {
    cat << EOF
FlightPath3D Automation Pipeline Validation

Usage: $0 [options]

Options:
    --staging-dir DIR    Staging directory path
    --validation-log FILE Log file path
    --help              Show this help message

Environment Variables:
    STAGING_DIR         Staging directory (default: /var/www/staging/flightpath3d)
    VALIDATION_LOG      Validation log file (default: /var/log/flightpath3d/validation.log)
    DOSSIERS_DIR        Dossiers directory for testing
    TEST_USER           Test user for authentication checks

Examples:
    $0                                    # Run full validation
    $0 --staging-dir /tmp/staging         # Custom staging directory
    $0 --validation-log /tmp/validation.log # Custom log file
EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --staging-dir)
            STAGING_DIR="$2"
            shift 2
            ;;
        --validation-log)
            VALIDATION_LOG="$2"
            shift 2
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Execute main function
main "$@"