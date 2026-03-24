if(!n || !p || !k || !ph){
    alert("Please enter all values correctly");
    return;
}
function analyze() {

    let n = +document.getElementById("n").value;
    let p = +document.getElementById("p").value;
    let k = +document.getElementById("k").value;
    let ph = +document.getElementById("ph").value;
    let state = document.getElementById("state").value;

    let result = document.getElementById("result");
    result.innerHTML = "";

    // 🌱 Soil Health Score
    let score = Math.round(((n+p+k)/30)*100);

    result.innerHTML += `<div class="card">
        <h2>🌿 Soil Health Score: ${score}%</h2>
    </div>`;

    // 🤖 AI Fertilizer Suggestion
    let fert = "";
    if(n<5) fert += "Add Urea (Nitrogen)<br>";
    if(p<5) fert += "Add DAP (Phosphorus)<br>";
    if(k<5) fert += "Add Potash<br>";

    result.innerHTML += `<div class="card">
        <h3>🤖 AI Fertilizer Advice</h3>${fert}
    </div>`;

    // 🌾 Crop Recommendation
    crops.forEach(crop => {
        if(
            crop.states.includes(state) &&
            n>=crop.npk[0]-2 &&
            p>=crop.npk[1]-2 &&
            k>=crop.npk[2]-2 &&
            ph>=crop.ph[0] &&
            ph<=crop.ph[1]
        ){
            result.innerHTML += `
            <div class="card">
                <h2>${crop.name}</h2>
                <img src="${crop.image}">
                <p><b>Market Price:</b> ₹${crop.price}</p>
                <p><b>Trend:</b> ${crop.trend}</p>
                <h4>Pest Alert:</h4>
                ${crop.pests.map(p=>p.name+" - "+p.solution).join("<br>")}
            </div>
            `;
        }
    });

    // 🌦 Weather Advice (simple logic)
    if(ph < 6){
        result.innerHTML += `<div class="card">⚠️ Rain can worsen acidity. Add lime.</div>`;
    } else {
        result.innerHTML += `<div class="card">✅ Weather suitable for farming</div>`;
    }
}
