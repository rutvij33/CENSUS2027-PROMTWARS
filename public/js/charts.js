/**
 * Dynamic Parameter Demographics Visualizer
 */
function updateStatsChart() {
    const queryInput = document.getElementById("chart-query");
    if (!queryInput) return;

    const query = queryInput.value.toLowerCase().trim();
    const barRural = document.getElementById("bar-rural");
    const barUrban = document.getElementById("bar-urban");
    const barTribal = document.getElementById("bar-tribal");

    if (!barRural || !barUrban || !barTribal) return;

    if (query.includes("literacy")) {
        barRural.style.height = "68%";
        barRural.innerHTML = "Rural<br>68%";
        barUrban.style.height = "88%";
        barUrban.innerHTML = "Urban<br>88%";
        barTribal.style.height = "52%";
        barTribal.innerHTML = "Tribal<br>52%";
    } else if (query.includes("gender") || query.includes("sex")) {
        barRural.style.height = "94%";
        barRural.innerHTML = "Rural<br>940";
        barUrban.style.height = "96%";
        barUrban.innerHTML = "Urban<br>960";
        barTribal.style.height = "98%";
        barTribal.innerHTML = "Tribal<br>980";
    } else if (query.includes("digital") || query.includes("internet")) {
        barRural.style.height = "45%";
        barRural.innerHTML = "Rural<br>45%";
        barUrban.style.height = "84%";
        barUrban.innerHTML = "Urban<br>84%";
        barTribal.style.height = "30%";
        barTribal.innerHTML = "Tribal<br>30%";
    } else {
        barRural.style.height = "40%";
        barRural.innerHTML = "Rural<br>40%";
        barUrban.style.height = "75%";
        barUrban.innerHTML = "Urban<br>75%";
        barTribal.style.height = "25%";
        barTribal.innerHTML = "Tribal<br>25%";
    }

    announceAccessibility(`Demographic chart graphics updated for query ${query || 'default'}`);
}
