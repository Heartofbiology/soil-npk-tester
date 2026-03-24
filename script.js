// Load states and districts
const stateSelect = document.getElementById("state");
const districtSelect = document.getElementById("district");

Object.keys(locations).forEach(state => {
    let option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
});

stateSelect.addEventListener("change", function(){
    let state = this.value;
    districtSelect.innerHTML = "";

    locations[state].forEach(d => {
        let opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        districtSelect.appendChild(opt);
    });
});

// Load first state districts
stateSelect.dispatchEvent(new Event("change"));

function analyze() {

    let n = +document.getElementById("n").value;
    let p = +document.getElementById("p").value;
    let k = +document.getElementById("k").value;
    let ph = +document.getElementById("ph").value;
    let state = stateSelect.value;
    let district = districtSelect.value;

    let result = document.getElementById("result");
    result.innerHTML = "";

    // Validation
    if(!n || !p || !k || !ph){
        alert("Enter all values");
        return;
    }

    // Soil Score
    let score = Math.round(((n+p+k)/30)*100);

    result.innerHTML += `
    <div class="card">
        <h2>🌿 Soil Health: ${score}%</h2>
    </div>
    `;

    let found = false;

    crops.forEach(crop => {

        if(
            crop.states.includes(state) &&
            n >= crop.npk[0]-2 &&
            p >= crop.npk[1]-2 &&
            k >= crop.npk[2]-2 &&
            ph >= crop.ph[0] &&
            ph <= crop.ph[1]
        ){

            found = true;

            let cropPrice = "No Data";

            if(crop.price[state]){
                if(typeof crop.price[state] === "object"){
                    cropPrice = crop.price[state][district] || 
                        "Avg ₹" + Object.values(crop.price[state])[0];
                } else {
                    cropPrice = crop.price[state];
                }
            }

            result.innerHTML += `
            <div class="card">
                <h2>${crop.name}</h2>
                <img src="${crop.image}" onerror="this.src='images/default.jpg'">

                <p>📍 ${state} - ${district}</p>
                <p>💰 Price: ₹${cropPrice}</p>
                <p>🐛 Pests: ${crop.pests.join(", ")}</p>
                <p>🌱 Fertilizer: ${crop.fertilizer}</p>
            </div>
            `;
        }

    });

    if(!found){
        result.innerHTML += `
        <div class="card">
            ❌ No suitable crop found <br>
            👉 Improve soil nutrients
        </div>
        `;
    }
}
