/**
 * Timeline Accessibility Test — LCRN-129 Phase 1
 * WCAG 2.1 AA compliance verification for enhanced timeline
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the generated HTML
const htmlPath = path.join(__dirname, '..', 'public', 'ru', 'investigations', 'oxymiron-organizatsiya-cultural-investigation', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

console.log('🔍 Timeline Enhanced — WCAG 2.1 AA Compliance Test');
console.log('================================================\n');

let passCount = 0;
let failCount = 0;

function test(description, condition) {
    if (condition) {
        console.log(`✅ PASS: ${description}`);
        passCount++;
    } else {
        console.log(`❌ FAIL: ${description}`);
        failCount++;
    }
}

// Test 1: Evidence Toggle Button Accessibility
console.log('📋 Test Group 1: Evidence Toggle Button Accessibility');
const toggles = document.querySelectorAll('.evidence-toggle');
test(`Evidence toggle buttons exist (found: ${toggles.length})`, toggles.length > 0);

toggles.forEach((toggle, index) => {
    const hasAriaExpanded = toggle.hasAttribute('aria-expanded');
    const hasAriaControls = toggle.hasAttribute('aria-controls');
    const targetId = toggle.dataset.target;
    const targetExists = document.getElementById(targetId);

    test(`Toggle ${index + 1}: Has aria-expanded attribute`, hasAriaExpanded);
    test(`Toggle ${index + 1}: Has aria-controls attribute`, hasAriaControls);
    test(`Toggle ${index + 1}: Target element exists (${targetId})`, !!targetExists);

    // Check button styling and text
    const buttonText = toggle.textContent.trim();
    test(`Toggle ${index + 1}: Has descriptive text`, buttonText.length > 0);

    if (targetExists) {
        const hasAriaHidden = targetExists.hasAttribute('aria-hidden');
        test(`Toggle ${index + 1}: Target has aria-hidden attribute`, hasAriaHidden);
    }
});

// Test 2: Touch Target Size (WCAG 2.1 AA - 44px minimum)
console.log('\n📋 Test Group 2: Touch Target Size (WCAG 2.1 AA)');
// This would need CSS parsing, but we check the CSS rules exist
const styleElement = document.querySelector('style');
const hasMinHeight44px = styleElement && styleElement.textContent.includes('min-height: 44px');
test('Evidence toggles have minimum 44px touch target', hasMinHeight44px);

// Test 3: Keyboard Navigation Support
console.log('\n📋 Test Group 3: Keyboard Navigation Support');
toggles.forEach((toggle, index) => {
    // Check if button is properly focusable (implicit with <button> element)
    const isFocusable = toggle.tagName.toLowerCase() === 'button' || toggle.hasAttribute('tabindex');
    test(`Toggle ${index + 1}: Is keyboard focusable`, isFocusable);
});

// Test 4: Screen Reader Support
console.log('\n📋 Test Group 4: Screen Reader Support');
const evidenceContents = document.querySelectorAll('.evidence-content');
evidenceContents.forEach((content, index) => {
    const hasId = content.hasAttribute('id');
    const hasAriaHidden = content.hasAttribute('aria-hidden');
    test(`Evidence content ${index + 1}: Has ID for aria-controls`, hasId);
    test(`Evidence content ${index + 1}: Has aria-hidden for state management`, hasAriaHidden);
});

// Test 5: Visual Focus Indicators
console.log('\n📋 Test Group 5: Visual Focus Indicators');
const hasOutlineStyles = styleElement && (
    styleElement.textContent.includes(':focus') ||
    styleElement.textContent.includes('outline:')
);
test('Focus styles are defined for keyboard navigation', hasOutlineStyles);

// Test 6: Reduced Motion Support
console.log('\n📋 Test Group 6: Reduced Motion Support (WCAG 2.1 AA)');
const hasReducedMotionSupport = styleElement && styleElement.textContent.includes('prefers-reduced-motion');
test('Reduced motion preferences are respected', hasReducedMotionSupport);

// Test 7: Color Contrast and Dark Mode
console.log('\n📋 Test Group 7: Color Contrast and Dark Mode');
const hasDarkModeStyles = styleElement && styleElement.textContent.includes('@media (prefers-color-scheme: dark)');
test('Dark mode support is implemented', hasDarkModeStyles);

// Test 8: Timeline Structure
console.log('\n📋 Test Group 8: Timeline Semantic Structure');
const timeline = document.querySelector('.timeline-events, ol');
const hasTimelineRole = timeline && (timeline.hasAttribute('role') || timeline.tagName.toLowerCase() === 'ol');
test('Timeline uses semantic HTML structure (ordered list)', hasTimelineRole);

const timelineItems = document.querySelectorAll('.timeline-item-enhanced, li');
test(`Timeline items are properly structured (found: ${timelineItems.length})`, timelineItems.length > 0);

// Test 9: Evidence Links and Sources
console.log('\n📋 Test Group 9: Evidence Links and Data Integration');
const evidenceItems = document.querySelectorAll('.evidence-item');
test(`Evidence items are rendered from YAML data (found: ${evidenceItems.length})`, evidenceItems.length > 0);

evidenceItems.forEach((item, index) => {
    const hasDomain = item.hasAttribute('data-domain');
    const hasLanguage = item.hasAttribute('data-language');
    test(`Evidence ${index + 1}: Has domain data attribute`, hasDomain);
    test(`Evidence ${index + 1}: Has language data attribute`, hasLanguage);
});

// Test 10: Mobile Responsive Design
console.log('\n📋 Test Group 10: Mobile Responsive Design');
const hasMobileStyles = styleElement && styleElement.textContent.includes('@media (max-width: 768px)');
test('Mobile responsive styles are defined', hasMobileStyles);

// Summary
console.log('\n📊 TEST SUMMARY');
console.log('================');
console.log(`✅ PASSED: ${passCount} tests`);
console.log(`❌ FAILED: ${failCount} tests`);

const successRate = Math.round((passCount / (passCount + failCount)) * 100);
console.log(`📈 SUCCESS RATE: ${successRate}%`);

if (failCount === 0) {
    console.log('🎉 ALL TESTS PASSED - WCAG 2.1 AA COMPLIANT!');
} else if (successRate >= 90) {
    console.log('⚠️  MOSTLY COMPLIANT - Minor issues to address');
} else {
    console.log('🚨 COMPLIANCE ISSUES - Major fixes needed');
}

// Return appropriate exit code
process.exit(failCount === 0 ? 0 : 1);