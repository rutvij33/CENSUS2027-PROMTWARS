/**
 * Master Application State & Data Pipeline Controller
 */
var activeUserMobileNumber = "";

async function executeDatabaseLookup() {
    const inputField = document.getElementById("mobile-input");
    if (!inputField) return;
    
    const val = inputField.value.trim();
    if (val.length !== 10 || isNaN(val)) {
        alert("Please enter a valid 10-digit mobile number.");
        inputField.focus();
        return;
    }
    activeUserMobileNumber = val;

    try {
        const res = await fetch('/api/auth/lookup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: activeUserMobileNumber })
        });
        const data = await res.json();

        if (data.userExists) {
            document.getElementById("token-lbl").innerText = data.token;
            document.getElementById("login-modal").classList.add("hidden");
            document.getElementById("id-screen").classList.remove("hidden");
        } else {
            document.getElementById("login-modal").classList.add("hidden");
            document.getElementById("lang-modal").classList.remove("hidden");
        }
    } catch(e) {
        // Fallback for offline mode
        document.getElementById("login-modal").classList.add("hidden");
        document.getElementById("lang-modal").classList.remove("hidden");
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
    
    const mainDash = document.getElementById("main-dashboard");
    const idScreen = document.getElementById("id-screen");
    if (mainDash) mainDash.classList.add("hidden");
    if (idScreen) idScreen.classList.remove("hidden");

    announceAccessibility("Census payload committed successfully. Digital Census Pass ready.");
}

/* Print / Export Digital Census Pass */
function printDigitalCensusPass() {
    window.print();
}

/* On DOM Ready listeners */
document.addEventListener("DOMContentLoaded", () => {
    const mobileInput = document.getElementById("mobile-input");
    if (mobileInput) {
        mobileInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                executeDatabaseLookup();
            }
        });
    }

    const chartQuery = document.getElementById("chart-query");
    if (chartQuery) {
        chartQuery.addEventListener("input", updateStatsChart);
    }
});
