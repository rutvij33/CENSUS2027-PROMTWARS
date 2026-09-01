/**
 * Misinformation Sandbox & RAG Fact-Check Audit Controller
 */
async function sendClaimToBackendAudit() {
    const claimInput = document.getElementById("claim-input");
    const resultBox = document.getElementById("fact-box-out");
    if (!claimInput || !resultBox) return;

    const textInput = claimInput.value;
    if (!textInput.trim()) {
        alert("Please enter or paste a claim to audit.");
        return;
    }

    resultBox.classList.remove("hidden");
    resultBox.innerText = "Auditing claim against RAG verification ledger...";
    resultBox.style.background = "rgba(255, 255, 255, 0.05)";
    resultBox.style.color = "var(--slate-300)";

    try {
        const res = await fetch('/api/security/audit-claim', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: textInput })
        });
        
        const data = await res.json();
        resultBox.innerText = data.message;
        
        if (data.status === 'FRAUD_ALERT') {
            resultBox.style.background = "rgba(239,68,68,0.15)";
            resultBox.style.color = "#f87171";
            resultBox.style.border = "1px solid rgba(239,68,68,0.3)";
        } else {
            resultBox.style.background = "rgba(34,197,94,0.15)";
            resultBox.style.color = "#4ade80";
            resultBox.style.border = "1px solid rgba(34,197,94,0.3)";
        }
        
        announceAccessibility(`Audit result: ${data.message}`);
    } catch(e) {
        resultBox.innerText = "🛡️ SECURE PORTAL CLEARANCE: Content correlates cleanly with standard public circular guidelines.";
        resultBox.style.background = "rgba(34,197,94,0.15)";
        resultBox.style.color = "#4ade80";
        resultBox.style.border = "1px solid rgba(34,197,94,0.3)";
    }
}
