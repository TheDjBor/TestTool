function calculateEmissions() {
    var emissionFactor;
    var energySource = document.getElementById("energy-source").value;

    if (energySource === "grid") {
        // Carbon emission factor for UK grid electricity is 0.233 kg CO2 per kWh (as of 2021)
        emissionFactor = 0.233;
    } else if (energySource === "solar") {
        // Carbon emission factor for solar power is 0.048 kg CO2 per kWh (as an example)
        emissionFactor = 0.048;
    } else if (energySource === "wind") {
        // Carbon emission factor for wind power is 0.012 kg CO2 per kWh (as an example)
        emissionFactor = 0.012;
    }

    var dailyKwh = document.getElementById("kwh").value;
    var dailyResult = dailyKwh * emissionFactor;
    var weeklyResult = (dailyResult * 7) / 1000; // converting to metric tonnes
    var monthlyResult = (dailyResult * 30) / 1000; // converting to metric tonnes
    var yearlyResult = (dailyResult * 365) / 1000; // converting to metric tonnes

    document.getElementById("result-daily").innerHTML = "Estimated daily CO2 emissions: " + dailyResult.toFixed(2) + " kg";
    document.getElementById("result-weekly").innerHTML = "Estimated weekly CO2 emissions: " + weeklyResult.toFixed(2) + " metric tonnes";
    document.getElementById("result-monthly").innerHTML = "Estimated monthly CO2 emissions: " + monthlyResult.toFixed(2) + " metric tonnes";
    document.getElementById("result-yearly").innerHTML = "Estimated yearly CO2 emissions: " + yearlyResult.toFixed(2) + " metric tonnes";
}
