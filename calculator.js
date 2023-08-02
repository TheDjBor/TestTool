const kWhGrid = 0.23314;
const kWhSolar = 0.0481;
const kWhWind = 0.0120;
const kWhGas = 0.2045; // Example value for Gas
const kWhHeatPump = 0.0567; // Example value for Heat Pump

const kmTruck = 0.000269;
const kmAirplane = 0.000253;
const kmVan = 0.000350; // Example value for Van
const kmCar = 0.000180; // Example value for Car

// Emission factors for commuting
const kmPetrolCar = 2.7 / 15; // kg CO2 per km
const kmDieselCar = 2.3 / 15; // kg CO2 per km
const kmElectricCar = 0.0; // kg CO2 per km for electric cars

function calculateEmissions() {
    // Getting selected energy sources (multiple selections possible)
    const energySources = document.querySelectorAll('input[name="energy-source"]:checked');
    const kwh = document.getElementById('kwh').value;

    let emissionEnergy = 0;
    energySources.forEach(source => {
        switch (source.value) {
            case 'grid': emissionEnergy += kWhGrid * kwh; break;
            case 'solar': emissionEnergy += kWhSolar * kwh; break;
            case 'wind': emissionEnergy += kWhWind * kwh; break;
            case 'gas': emissionEnergy += kWhGas * kwh; break;
            case 'heatpump': emissionEnergy += kWhHeatPump * kwh; break;
        }
    });

    // Getting selected transportation types and fuel (multiple selections possible)
    const transportationTypes = document.querySelectorAll('input[name="transportation-type"]:checked');
    const fuelType = document.getElementById('fuel-type').value;
    const distance = document.getElementById('distance').value;

    let emissionTransportation = 0;
    transportationTypes.forEach(type => {
        let emissionFactor;
        switch (type.value) {
            case 'truck': emissionFactor = kmTruck; break;
            case 'airplane': emissionFactor = kmAirplane; break;
            case 'van': emissionFactor = kmVan; break;
            case 'car': emissionFactor = kmCar; break;
        }
        // Apply fuel type adjustments (e.g., electric might reduce the emission)
        if (fuelType === 'electric') {
            emissionFactor *= 0.5; // Example reduction for electric fuel
        }
        emissionTransportation += emissionFactor * distance;
    });

    // Commuting calculations
    const days = document.getElementById('days').value;
    const commuteDistance = document.getElementById('commute-distance').value;
    const petrolCars = document.getElementById('petrol-cars').value;
    const dieselCars = document.getElementById('diesel-cars').value;
    const electricCars = document.getElementById('electric-cars').value;

    const totalCars = parseInt(petrolCars) + parseInt(dieselCars) + parseInt(electricCars);
    let totalCommuteDistance = days * totalCars * commuteDistance;
    let emissionCommute = (petrolCars * kmPetrolCar + dieselCars * kmDieselCar + electricCars * kmElectricCar) * totalCommuteDistance;

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

    // get current date and time
    let currentDate = new Date();
    let dateStr = currentDate.toLocaleDateString();
    let timeStr = currentDate.toLocaleTimeString();

    // display date and time
    doc.setFontSize(12);
    doc.text(140, 20, `Date: ${dateStr} Time: ${timeStr}`);
  
    doc.setFontSize(20);
    doc.text(20, 30, 'Carbon Usage Report');

    // add emission factors
    doc.setFontSize(12);
    doc.text(20, 40, `Emission Factors:`);
    doc.text(20, 50, `Grid energy (kg CO2 per kWh): ${kWhGrid}`);
    doc.text(20, 60, `Solar energy (kg CO2 per kWh): ${kWhSolar}`);
    doc.text(20, 70, `Wind energy (kg CO2 per kWh): ${kWhWind}`);
    doc.text(20, 80, `Gas energy (kg CO2 per kWh): ${kWhGas}`);
    doc.text(20, 90, `Heat Pump energy (kg CO2 per kWh): ${kWhHeatPump}`);
    doc.text(20, 100, `Truck transport (kg CO2 per km): ${kmTruck}`);
    doc.text(20, 110, `Airplane transport (kg CO2 per km): ${kmAirplane}`);
    doc.text(20, 120, `Van transport (kg CO2 per km): ${kmVan}`);
    doc.text(20, 130, `Car transport (kg CO2 per km): ${kmCar}`);
    doc.text(20, 140, `Petrol Car commute (kg CO2 per km): ${kmPetrolCar}`);
    doc.text(20, 150, `Diesel Car commute (kg CO2 per km): ${kmDieselCar}`);
    doc.text(20, 160, `Electric Car commute (kg CO2 per km): ${kmElectricCar}`);

    // display results
    doc.text(20, 170, `Daily emission from energy usage: ${document.getElementById('result-energy-daily').textContent}`);
    doc.text(20, 180, `Weekly emission from energy usage: ${document.getElementById('result-energy-weekly').textContent}`);
    doc.text(20, 190, `Monthly emission from energy usage: ${document.getElementById('result-energy-monthly').textContent}`);
    doc.text(20, 200, `Yearly emission from energy usage: ${document.getElementById('result-energy-yearly').textContent}`);
    doc.text(20, 210, `Emission from product transportation: ${document.getElementById('result-transportation').textContent}`);
    doc.text(20, 220, `Emission from commuting: ${document.getElementById('result-commute').textContent}`);

    // output PDF
    doc.save('carbon-usage-report.pdf');
}

document.getElementById('calculate').addEventListener('click', calculateEmissions);
document.getElementById('download').addEventListener('click', generatePDF);

