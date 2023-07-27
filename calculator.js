const kWhGrid = 0.23314;
const kWhSolar = 0.0481;
const kWhWind = 0.0120;

const kmTruck = 0.000269;
const kmAirplane = 0.000253;

// Emission factors for commuting
const kmDieselCar = 2.7 / 15; // kg CO2 per km
const kmPetrolCar = 2.3 / 15; // kg CO2 per km
const kmCar = (kmDieselCar + kmPetrolCar) / 2; // average

function calculateEmissions() {
    const energySource = document.getElementById('energy-source').value;
    const kwh = document.getElementById('kwh').value;

    const transportationType = document.getElementById('transportation-type').value;
    const distance = document.getElementById('distance').value;

    // New calculations for commuting
    const days = document.getElementById('days').value;
    const employees = document.getElementById('employees').value;
    const commuteDistance = document.getElementById('commute-distance').value;

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

    let totalCommuteDistance = days * employees * commuteDistance;
    let emissionCommute = totalCommuteDistance * kmCar;

    document.getElementById('result-energy-daily').textContent = `Daily emission from energy usage: ${emissionEnergy.toFixed(2)} kg`;
    document.getElementById('result-energy-weekly').textContent = `Weekly emission from energy usage: ${(emissionEnergy * 7).toFixed(2)} kg`;
    document.getElementById('result-energy-monthly').textContent = `Monthly emission from energy usage: ${(emissionEnergy * 30).toFixed(2)} kg`;
    document.getElementById('result-energy-yearly').textContent = `Yearly emission from energy usage: ${(emissionEnergy * 365).toFixed(2)} kg`;

    document.getElementById('result-transportation').textContent = `Emission from product transportation: ${emissionTransportation.toFixed(2)} kg`;

    // Result for commuting
    document.getElementById('result-commute').textContent = `Emission from commuting: ${emissionCommute.toFixed(2)} kg`;

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

    const days = document.getElementById('days').value;
    const employees = document.getElementById('employees').value;
    const commuteDistance = document.getElementById('commute-distance').value;
    doc.text(20, 70, `Days travelled to work: ${days}`);
    doc.text(20, 80, `Number of employees: ${employees}`);
    doc.text(20, 90, `Commute distance per day (km): ${commuteDistance}`);

    doc.text(20, 100, document.getElementById('result-energy-daily').textContent);
    doc.text(20, 110, document.getElementById('result-energy-weekly').textContent);
    doc.text(20, 120, document.getElementById('result-energy-monthly').textContent);
    doc.text(20, 130, document.getElementById('result-energy-yearly').textContent);
    doc.text(20, 140, document.getElementById('result-transportation').textContent);

    // Result for commuting
    doc.text(20, 150, document.getElementById('result-commute').textContent);

    doc.save('carbon_usage_report.pdf');
}

document.getElementById('calculate').addEventListener('click', calculateEmissions);
document.getElementById('download').addEventListener('click', generatePDF);

