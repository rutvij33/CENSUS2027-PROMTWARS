/**
 * Vernacular Multilingual Engine (22 Scheduled Languages of India)
 */
function googleTranslateElementInit() {
    if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,mr,ta,te,bn,gu,kn,ml,or,pa,ur,as,mai,sat,ks,ne,kok,doi,mni,brx,sa',
            autoDisplay: false
        }, 'google_translate_element');
    }
}

function selectPortalLanguage(langCode, langName) {
    const badge = document.getElementById("current-lang-badge");
    if (badge) {
        badge.innerText = langName;
    }

    // Trigger Google Translate select element if initialized
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    }

    // Advance UI state to dashboard
    const langModal = document.getElementById("lang-modal");
    const mainDashboard = document.getElementById("main-dashboard");
    if (langModal) langModal.classList.add("hidden");
    if (mainDashboard) mainDashboard.classList.remove("hidden");

    // Announce to screen reader for WCAG accessibility
    announceAccessibility(`Language updated to ${langName}`);
}

function announceAccessibility(text) {
    const announcer = document.getElementById("a11y-announcer");
    if (announcer) {
        announcer.innerText = text;
    }
}
