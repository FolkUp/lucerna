/**
 * Enhanced Timeline Functionality — LCRN-129 Phase 1
 * Provides interactive evidence links with accessibility support
 */

class TimelineEnhanced {
    constructor() {
        this.toggles = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Find all evidence toggle buttons
        this.toggles = document.querySelectorAll('.evidence-toggle');

        this.toggles.forEach(toggle => {
            // Click event
            toggle.addEventListener('click', (e) => this.handleToggleClick(e));

            // Keyboard support for accessibility
            toggle.addEventListener('keydown', (e) => this.handleToggleKeydown(e));

            // Focus management
            toggle.addEventListener('focus', (e) => this.handleToggleFocus(e));
        });

        // Setup hover previews for evidence items
        this.setupHoverPreviews();

        // Setup keyboard navigation
        this.setupKeyboardNavigation();

        console.log(`Timeline Enhanced: Initialized ${this.toggles.length} evidence toggles`);
    }

    handleToggleClick(event) {
        event.preventDefault();
        const toggle = event.currentTarget;
        const targetId = toggle.dataset.target;
        const target = document.getElementById(targetId);

        if (!target) {
            console.warn(`Timeline Enhanced: Target element ${targetId} not found`);
            return;
        }

        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        // Toggle visibility with animation
        if (isExpanded) {
            this.closeEvidence(toggle, target);
        } else {
            this.openEvidence(toggle, target);
        }

        // Announce change to screen readers
        this.announceToggle(toggle, !isExpanded);
    }

    handleToggleKeydown(event) {
        // Handle Enter and Space key
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleToggleClick(event);
        }
        // Handle Escape key to close if open
        else if (event.key === 'Escape') {
            const toggle = event.currentTarget;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                event.preventDefault();
                this.handleToggleClick(event);
            }
        }
    }

    handleToggleFocus(event) {
        // Ensure focused element is visible
        const toggle = event.currentTarget;
        toggle.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
        });
    }

    openEvidence(toggle, target) {
        // Update ARIA attributes
        toggle.setAttribute('aria-expanded', 'true');
        target.setAttribute('aria-hidden', 'false');

        // Show with smooth animation
        target.style.display = 'block';
        target.style.opacity = '0';
        target.style.transform = 'translateY(-10px)';

        // Respect user's motion preferences
        const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (shouldAnimate) {
            // Animate in
            requestAnimationFrame(() => {
                target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                target.style.opacity = '1';
                target.style.transform = 'translateY(0)';
            });
        } else {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
        }

        // Update toggle button text/icon if needed
        this.updateToggleState(toggle, true);

        // Focus management: move focus to first interactive element in evidence
        setTimeout(() => {
            const firstFocusable = target.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, shouldAnimate ? 300 : 0);
    }

    closeEvidence(toggle, target) {
        // Update ARIA attributes
        toggle.setAttribute('aria-expanded', 'false');
        target.setAttribute('aria-hidden', 'true');

        // Respect user's motion preferences
        const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (shouldAnimate) {
            // Animate out
            target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            target.style.opacity = '0';
            target.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                target.style.display = 'none';
            }, 300);
        } else {
            target.style.display = 'none';
        }

        // Update toggle button state
        this.updateToggleState(toggle, false);

        // Return focus to toggle button
        toggle.focus();
    }

    updateToggleState(toggle, isExpanded) {
        const icon = toggle.querySelector('.evidence-toggle-icon');
        const text = toggle.querySelector('.evidence-toggle-text');

        if (icon) {
            icon.textContent = isExpanded ? '📂' : '📄';
        }

        if (text) {
            text.textContent = isExpanded ? 'Hide Evidence & Analysis' : 'Evidence & Analysis';
        }

        // Add/remove expanded class for styling
        toggle.classList.toggle('evidence-toggle--expanded', isExpanded);
    }

    setupHoverPreviews() {
        const evidenceItems = document.querySelectorAll('.evidence-item');

        evidenceItems.forEach(item => {
            let previewTimeout;

            item.addEventListener('mouseenter', (e) => {
                // Only on larger screens
                if (window.innerWidth > 768) {
                    previewTimeout = setTimeout(() => {
                        this.showEvidencePreview(item, e);
                    }, 500); // Delay to avoid accidental hovers
                }
            });

            item.addEventListener('mouseleave', () => {
                clearTimeout(previewTimeout);
                this.hideEvidencePreview();
            });

            // Touch devices: tap to show preview
            item.addEventListener('touchstart', (e) => {
                if (window.innerWidth <= 768) {
                    this.showEvidencePreview(item, e);
                    // Hide after 3 seconds on touch
                    setTimeout(() => this.hideEvidencePreview(), 3000);
                }
            });
        });
    }

    showEvidencePreview(item, event) {
        // Create preview tooltip if it doesn't exist
        let preview = document.getElementById('evidence-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.id = 'evidence-preview';
            preview.className = 'evidence-preview';
            preview.setAttribute('role', 'tooltip');
            document.body.appendChild(preview);
        }

        // Get evidence details
        const domain = item.dataset.domain;
        const language = item.dataset.language;
        const text = item.querySelector('.evidence-text')?.textContent;

        // Populate preview
        preview.innerHTML = `
            <div class="evidence-preview-header">
                <span class="evidence-domain">${domain}</span>
                <span class="evidence-language">${language}</span>
            </div>
            <div class="evidence-preview-text">${text}</div>
        `;

        // Position preview
        const rect = item.getBoundingClientRect();
        preview.style.position = 'fixed';
        preview.style.top = `${rect.top - preview.offsetHeight - 10}px`;
        preview.style.left = `${rect.left}px`;
        preview.style.zIndex = '1000';
        preview.style.opacity = '1';
        preview.style.pointerEvents = 'none';

        // Show preview
        preview.classList.add('evidence-preview--visible');
    }

    hideEvidencePreview() {
        const preview = document.getElementById('evidence-preview');
        if (preview) {
            preview.classList.remove('evidence-preview--visible');
            setTimeout(() => {
                preview.style.opacity = '0';
            }, 200);
        }
    }

    setupKeyboardNavigation() {
        // Arrow key navigation within timeline
        document.addEventListener('keydown', (e) => {
            const activeElement = document.activeElement;

            if (activeElement.classList.contains('evidence-toggle')) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();

                    const allToggles = Array.from(this.toggles);
                    const currentIndex = allToggles.indexOf(activeElement);

                    let nextIndex;
                    if (e.key === 'ArrowDown') {
                        nextIndex = (currentIndex + 1) % allToggles.length;
                    } else {
                        nextIndex = currentIndex === 0 ? allToggles.length - 1 : currentIndex - 1;
                    }

                    allToggles[nextIndex].focus();
                }
            }
        });
    }

    announceToggle(toggle, isExpanded) {
        // Create/update live region for screen reader announcements
        let announcer = document.getElementById('timeline-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'timeline-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.position = 'absolute';
            announcer.style.left = '-10000px';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            document.body.appendChild(announcer);
        }

        const message = isExpanded
            ? 'Evidence section expanded. Use Escape key to collapse.'
            : 'Evidence section collapsed.';

        announcer.textContent = message;
    }

    // Public method to programmatically open/close evidence sections
    toggleEvidence(targetId, forceState = null) {
        const target = document.getElementById(targetId);
        const toggle = document.querySelector(`[data-target="${targetId}"]`);

        if (!target || !toggle) {
            console.warn(`Timeline Enhanced: Cannot find toggle/target for ${targetId}`);
            return false;
        }

        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        const shouldExpand = forceState !== null ? forceState : !isExpanded;

        if (shouldExpand && !isExpanded) {
            this.openEvidence(toggle, target);
        } else if (!shouldExpand && isExpanded) {
            this.closeEvidence(toggle, target);
        }

        return shouldExpand;
    }

    // Public method to get current state
    getEvidenceState(targetId) {
        const toggle = document.querySelector(`[data-target="${targetId}"]`);
        return toggle ? toggle.getAttribute('aria-expanded') === 'true' : false;
    }
}

// CSS for evidence preview tooltip
const previewStyles = document.createElement('style');
previewStyles.textContent = `
.evidence-preview {
    position: fixed;
    background: var(--bg-primary, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 8px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    padding: 1rem;
    max-width: 300px;
    font-size: 0.9rem;
    line-height: 1.4;
    opacity: 0;
    transform: translateY(5px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 1000;
    pointer-events: none;
}

.evidence-preview--visible {
    opacity: 1;
    transform: translateY(0);
}

.evidence-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-light, #f1f5f9);
}

.evidence-domain {
    font-weight: 600;
    color: var(--primary-color, #60a5fa);
    text-transform: capitalize;
}

.evidence-language {
    font-size: 0.8em;
    opacity: 0.7;
    font-style: italic;
}

.evidence-preview-text {
    color: var(--text-secondary, #6b7280);
}

.evidence-toggle--expanded {
    background-color: var(--primary-color-light, rgba(96, 165, 250, 0.1));
    border-width: 2px;
}

/* Dark mode support for preview */
@media (prefers-color-scheme: dark) {
    .evidence-preview {
        background: var(--bg-primary-dark, #1f2937);
        border-color: var(--border-color-dark, #374151);
        color: var(--text-primary-dark, #f9fafb);
    }

    .evidence-domain {
        color: var(--primary-light, #93c5fd);
    }

    .evidence-preview-text {
        color: var(--text-secondary-dark, #9ca3af);
    }
}

/* Mobile: hide preview on small screens */
@media (max-width: 768px) {
    .evidence-preview {
        display: none;
    }
}
`;

document.head.appendChild(previewStyles);

// Initialize when script loads
const timelineEnhanced = new TimelineEnhanced();

// Export for external use
window.TimelineEnhanced = timelineEnhanced;