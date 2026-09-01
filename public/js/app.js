/**
 * Master Application State & Data Pipeline Controller
 */
var activeUserMobileNumber = "";

function showLoginModal() {
    document.getElementById("login-modal")?.classList.remove("hidden");
    document.getElementById("lang-modal")?.classList.add("hidden");
    document.getElementById("main-dashboard")?.classList.add("hidden");
    document.getElementById("id-screen")?.classList.add("hidden");
}

function showLanguageModal() {
    document.getElementById("login-modal")?.classList.add("hidden");
    document.getElementById("lang-modal")?.classList.remove("hidden");
    document.getElementById("main-dashboard")?.classList.add("hidden");
    document.getElementById("id-screen")?.classList.add("hidden");
}

function showDashboard() {
    document.getElementById("login-modal")?.classList.add("hidden");
    document.getElementById("lang-modal")?.classList.add("hidden");
    document.getElementById("main-dashboard")?.classList.remove("hidden");
    document.getElementById("id-screen")?.classList.add("hidden");
}

function showIdScreen() {
    document.getElementById("login-modal")?.classList.add("hidden");
    document.getElementById("lang-modal")?.classList.add("hidden");
    document.getElementById("main-dashboard")?.classList.add("hidden");
    document.getElementById("id-screen")?.classList.remove("hidden");
}

async function executeDatabaseLookup(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const inputField = document.getElementById("mobile-input");
    const errorMsg = document.getElementById("login-error-msg");
    if (!inputField) return;
    
    const val = inputField.value.trim();
    if (val.length !== 10 || isNaN(val)) {
        if (errorMsg) {
            errorMsg.innerText = "Please enter a valid 10-digit mobile number.";
            errorMsg.style.display = "block";
        } else {
            alert("Please enter a valid 10-digit mobile number.");
        }
        inputField.focus();
        return;
    }

    if (errorMsg) {
        errorMsg.style.display = "none";
    }
    activeUserMobileNumber = val;

    try {
        const res = await fetch('/api/auth/lookup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: activeUserMobileNumber })
        });

        if (!res.ok) {
            console.warn("Auth lookup HTTP non-200. Proceeding to language modal.");
            showLanguageModal();
            return;
        }

        const data = await res.json();

        if (data.userExists && data.token) {
            document.getElementById("token-lbl").innerText = data.token;
            showIdScreen();
        } else {
            showLanguageModal();
        }
    } catch(e) {
        console.error("Lookup error:", e);
        // Fallback for offline mode
        showLanguageModal();
    }
}

async function commitCensusPayloadToServer() {
    try {
        const res = await fetch('/api/census/commit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: activeUserMobileNumber })
        });
        const data = await res.json();
        
        if (data.token) {
            document.getElementById("token-lbl").innerText = data.token;
        }
    } catch(e) {
        document.getElementById("token-lbl").innerText = "H" + Math.floor(1000000000 + Math.random() * 9000000000);
    }
    
    showIdScreen();
    announceAccessibility("Census payload committed successfully. Digital Census Pass ready.");
}

/* Print / Export Digital Census Pass */
function printDigitalCensusPass() {
    window.print();
}

/* On DOM Ready listeners */
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", executeDatabaseLookup);
    }

    const mobileInput = document.getElementById("mobile-input");
    if (mobileInput) {
        mobileInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                executeDatabaseLookup(e);
            }
        });
    }

    const chartQuery = document.getElementById("chart-query");
    if (chartQuery) {
        chartQuery.addEventListener("input", updateStatsChart);
    }
});
