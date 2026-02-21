let obdDatabase = {};
let databaseLoaded = false;

// Load database
fetch("obd_codes.json")
.then(res => res.json())
.then(data => {
    obdDatabase = data;
    databaseLoaded = true;
    console.log("OBD database loaded:", Object.keys(data).length);
});


// OPEN SCANNER
function openScanner(){
document.getElementById("panel").innerHTML = `
<h2>OBD Diagnostic Scanner</h2>

<input id="obdSearch" placeholder="Enter or search code (P0301)" oninput="searchCodes()">
<div id="suggestions"></div>

<br>
<button onclick="scanCode()">Diagnose</button>

<br><br>
<p>Example Codes:</p>
<button onclick="selectCode('P0300')">P0300</button>
<button onclick="selectCode('P0420')">P0420</button>
<button onclick="selectCode('P0171')">P0171</button>
`;
}


// SEARCH SYSTEM
function searchCodes(){

let input = document.getElementById("obdSearch").value.toUpperCase();
let box = document.getElementById("suggestions");

box.innerHTML = "";

if(input.length < 2) return;

let count = 0;

for(let code in obdDatabase){
    if(code.startsWith(input)){
        let div = document.createElement("div");
        div.className = "suggestion";
        div.innerText = code;
        div.onclick = () => selectCode(code);
        box.appendChild(div);

        count++;
        if(count > 15) break;
    }
}

}


// SELECT CODE
function selectCode(code){
document.getElementById("obdSearch").value = code;
document.getElementById("suggestions").innerHTML = "";
}


// SCAN CODE
function scanCode(){

if(!databaseLoaded){
document.getElementById("panel").innerHTML = `
<h2>Loading diagnostic database...</h2>
`;
return;
}

let code = document.getElementById("obdSearch").value
.toUpperCase()
.replace(/[^A-Z0-9]/g, "");

if(code.length === 4){
code = code[0] + "0" + code.slice(1);
}

let car = document.getElementById("carModel").value || "Vehicle";
let data = obdDatabase[code];

if(!data){
document.getElementById("panel").innerHTML = `
<h2>Code Not Found</h2>
<p>Make sure the code is correct.</p>

Example valid codes:
<br>P0300
<br>P0171
<br>P0420
`;
return;
}


// CATEGORY
let category = "Unknown";
let severity = "Moderate";

if(code.startsWith("P")){
category = "Powertrain (Engine / Transmission)";
severity = "Important";
}
else if(code.startsWith("B")){
category = "Body Systems";
severity = "Minor";
}
else if(code.startsWith("C")){
category = "Chassis";
severity = "Moderate";
}
else if(code.startsWith("U")){
category = "Network Communication";
severity = "Diagnostic Required";
}


document.getElementById("panel").innerHTML = `
<h2>Diagnosis Result</h2>

<p><strong>Vehicle:</strong> ${car}</p>
<p><strong>Code:</strong> ${code}</p>
<p><strong>Category:</strong> ${category}</p>
<p><strong>Severity:</strong> ${severity}</p>

<h3>Problem</h3>
<p>${data.problem}</p>

<h3>Recommended Fix</h3>
<p>${data.solution}</p>

<h3>Repair Steps</h3>
<ol>
<li>Confirm code using OBD scanner</li>
<li>Inspect wiring and connectors</li>
<li>Test sensors and components</li>
<li>Replace faulty part if needed</li>
<li>Clear the code</li>
<li>Test drive the vehicle</li>
</ol>

<button onclick="openScanner()">Scan Another Code</button>
`;
}


// OIL SYSTEM
function checkOil(){
document.getElementById("panel").innerHTML = `
<h2>Oil System Diagnostic</h2>

<ul>
<li>Low oil level</li>
<li>Dirty oil</li>
<li>Oil leak</li>
<li>Oil pressure issue</li>
</ul>

<ol>
<li>Check dipstick level</li>
<li>Add correct engine oil</li>
<li>Inspect oil filter</li>
<li>Check for leaks</li>
<li>Change oil regularly</li>
</ol>
`;
}


// TIRE SYSTEM
function checkTires(){
document.getElementById("panel").innerHTML = `
<h2>Tire System Check</h2>

<ul>
<li>Low tire pressure</li>
<li>Uneven wear</li>
<li>Alignment issue</li>
<li>Old tires</li>
</ul>

<ol>
<li>Check PSI</li>
<li>Inflate tires</li>
<li>Rotate tires</li>
<li>Balance wheels</li>
<li>Replace damaged tire</li>
</ol>
`;
}


// BATTERY SYSTEM
function checkBattery(){
document.getElementById("panel").innerHTML = `
<h2>Battery System</h2>

<ul>
<li>Low voltage</li>
<li>Old battery</li>
<li>Loose terminals</li>
<li>Alternator issue</li>
</ul>

<ol>
<li>Check voltage</li>
<li>Clean terminals</li>
<li>Charge battery</li>
<li>Replace if weak</li>
<li>Check alternator output</li>
</ol>
`;
}


// FULL INSPECTION
function vehicleInspection(){
document.getElementById("panel").innerHTML = `
<h2>Full Vehicle Inspection</h2>

<ul>
<li>Engine</li>
<li>Transmission</li>
<li>Cooling system</li>
<li>Brakes</li>
<li>Suspension</li>
<li>Electrical system</li>
</ul>

<p>Start with OBD scan for accurate diagnosis.</p>

<button onclick="openScanner()">Start Scan</button>
`;
}