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
    // 1. Advance UI screen state immediately
    if (typeof showDashboard === 'function') {
        showDashboard();
    } else {
        document.getElementById("login-modal")?.classList.add("hidden");
        document.getElementById("lang-modal")?.classList.add("hidden");
        document.getElementById("main-dashboard")?.classList.remove("hidden");
        document.getElementById("id-screen")?.classList.add("hidden");
    }

    // 2. Update language badge tag
    const badge = document.getElementById("current-lang-badge");
    if (badge) {
        badge.innerText = langName;
    }

    // 3. Attempt Google Translate trigger safely
    try {
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
            selectElement.value = langCode;
            selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
        }
    } catch (err) {
        console.warn("Translation dispatch skipped:", err);
    }

    // 4. Accessibility announcement
    if (typeof announceAccessibility === 'function') {
        announceAccessibility(`Language updated to ${langName}`);
    }
}

function announceAccessibility(text) {
    const announcer = document.getElementById("a11y-announcer");
    if (announcer) {
        announcer.innerText = text;
    }
}
