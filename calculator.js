const kWhGrid = 0.23314;
const kWhSolar = 0.0481;
const kWhWind = 0.0120;

const kmTruck = 0.000269;
const kmAirplane = 0.000253;

function calculateEmissions() {
    const energySource = document.getElementById('energy-source').value;
    const kwh = document.getElementById('kwh').value;

    const transportationType = document.getElementById('transportation-type').value;
    const distance = document.getElementById('distance').value;

    let emissionEnergy;
    switch (energySource) {
        case 'grid':
            emissionEnergy = kWhGrid * kwh;
            break;
        case 'solar':
            emissionEnergy = kWhSolar * kwh;
            break;
        case 'wind':
            emissionEnergy = kWhWind * kwh;
            break;
        default:
            emissionEnergy = 0;
    }

    let emissionTransportation;
    switch (transportationType) {
        case 'truck':
            emissionTransportation = kmTruck * distance;
            break;
        case 'airplane':
            emissionTransportation = kmAirplane * distance;
            break;
        default:
            emissionTransportation = 0;
    }

    document.getElementById('result-energy-daily').textContent = `Daily emission from energy usage: ${emissionEnergy.toFixed(2)} kg`;
    document.getElementById('result-energy-weekly').textContent = `Weekly emission from energy usage: ${(emissionEnergy * 7).toFixed(2)} kg`;
    document.getElementById('result-energy-monthly').textContent = `Monthly emission from energy usage: ${(emissionEnergy * 30).toFixed(2)} kg`;
    document.getElementById('result-energy-yearly').textContent = `Yearly emission from energy usage: ${(emissionEnergy * 365).toFixed(2)} kg`;

    document.getElementById('result-transportation').textContent = `Emission from transportation: ${emissionTransportation.toFixed(2)} kg`;

    document.getElementById('download').style.display = 'block';
}

function generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(20, 20, 'Carbon Usage Report');

    doc.setFontSize(14);

    const energySource = document.getElementById('energy-source').value;
    doc.text(20, 30, `Energy Source: ${energySource}`);
    
    const kwh = document.getElementById('kwh').value;
    doc.text(20, 40, `Energy Usage (Daily kWh): ${kwh}`);

    const transportationType = document.getElementById('transportation-type').value;
    doc.text(20, 50, `Transportation Type: ${transportationType}`);

    const distance = document.getElementById('distance').value;
    doc.text(20, 60, `Distance (km): ${distance}`);

    doc.text(20, 70, document.getElementById('result-energy-daily').textContent);
    doc.text(20, 80, document.getElementById('result-energy-weekly').textContent);
    doc.text(20, 90, document.getElementById('result-energy-monthly').textContent);
    doc.text(20, 100, document.getElementById('result-energy-yearly').textContent);
    doc.text(20, 110, document.getElementById('result-transportation').textContent);

    doc.save('carbon_usage_report.pdf');
}

document.getElementById('calculate').addEventListener('click', calculateEmissions);
document.getElementById('download').addEventListener('click', generatePDF);
