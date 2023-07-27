window.onload = function() {
    document.getElementById('calculate').addEventListener('click', calculateEmissions);

    document.getElementById('download').addEventListener('click', function () {
        var doc = new jsPDF();
        var content = document.getElementById('container').textContent;
        doc.text(content, 10, 10);
        doc.save('carbon_usage_report.pdf');
    });
};

function calculateEmissions() {
    const energySource = document.getElementById('energy-source').value;
    const kwh = document.getElementById('kwh').value;
    const transportationType = document.getElementById('transportation-type').value;
    const distance = document.getElementById('distance').value;

    let carbonFactor;
    switch (energySource) {
        case 'grid':
            carbonFactor = 0.233;
            break;
        case 'solar':
            carbonFactor = 0.048;
            break;
        case 'wind':
            carbonFactor = 0.012;
            break;
    }

    const dailyEmissions = kwh * carbonFactor;
    document.getElementById('result-energy-daily').textContent = 'Daily emissions: ' + dailyEmissions.toFixed(2) + ' kg CO2';

    const weeklyEmissions = dailyEmissions * 7;
    document.getElementById('result-energy-weekly').textContent = 'Weekly emissions: ' + (weeklyEmissions / 1000).toFixed(2) + ' tonnes CO2';

    const monthlyEmissions = dailyEmissions * 30;
    document.getElementById('result-energy-monthly').textContent = 'Monthly emissions: ' + (monthlyEmissions / 1000).toFixed(2) + ' tonnes CO2';

    const yearlyEmissions = dailyEmissions * 365;
    document.getElementById('result-energy-yearly').textContent = 'Yearly emissions: ' + (yearlyEmissions / 1000).toFixed(2) + ' tonnes CO2';

    let transportationEmissions;
    switch (transportationType) {
        case 'truck':
            transportationEmissions = distance * 0.73;
            break;
        case 'airplane':
            transportationEmissions = distance * 0.5;
            break;
    }

    document.getElementById('result-transportation').textContent = 'Transportation emissions: ' + transportationEmissions.toFixed(2) + ' kg CO2';
}
