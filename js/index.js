import usedCars from './usedCars.js';
const cards = document.getElementById("car-cards");

// create product card template
function createProductCard(car) {
  const cardTemplate = `
        <div class="card-info">
            <h2>${car.year} ${car.make} ${car.model}</h2>
            <p class="p-miles">${car.mileage.toLocaleString()} miles</p>
            <img src="${car.img}" alt="${car.color} ${car.make} ${car.model}" class="car-img"/>
            <p class="p-price">$${car.price.toLocaleString()}</p>
            <p class="p-color">Color: ${car.color}</p>
            <p class="p-gas-miles">Gas Mileage: ${car.gasMileage}</p>
        </div>                
    `;
  return cardTemplate;
}

// generate car product cards
function generateCarCards(filteredCars) {
  cards.innerHTML = ""; // clears previous results
  filteredCars.forEach(car => {
    const card = createProductCard(car);
    cards.innerHTML += card;
  });
}

// initial page load of all cars
generateCarCards(usedCars);

// get user input from price fields
const inputs = [document.getElementById("min-price"), document.getElementById("max-price")];

// ensure that the price input is valid
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const value = input.value;

    // if input exceeds max value, reset to max value (70,000)
    if (value > 70000) {
      input.value = 70000;
    // if input is negative, reset to min value (0)
    } else if (value < 0) {
      input.value = 0;
    }

    // ensures that the input is no longer than 5 digits
    if (value.length > 5) {
      input.value = value.slice(0, 5);
    }
  });
});

// filter functionality
function filterCars() {
  // get values for year, mileage, price/checked checkboxes for make, color
  const minYear = document.getElementById("min-year").value;
  const maxYear = document.getElementById("max-year").value;
  const makeCheckbox = document.querySelectorAll('input[name="car-make"]:checked');
  const mileage = document.getElementById("mileage").value;
  const minPrice = document.getElementById("min-price").value || 0;
  const maxPrice = document.getElementById("max-price").value || 70000;
  const colorCheckbox = document.querySelectorAll('input[name="car-color"]:checked');

  // get string value from checkboxes for make and color
  const selectedMakes = Array.from(makeCheckbox).map((checkbox) => checkbox.value);
  const selectedColors = Array.from(colorCheckbox).map((checkbox) => checkbox.value);

  // filter cars
  const filteredCars = usedCars.filter((car) => {
    const yearFilter =
      (minYear === "Any" || car.year >= minYear) &&
      (maxYear === "Any" || car.year <= maxYear);

    const makeFilter = selectedMakes.length === 0 || selectedMakes.includes(car.make);
    
    const mileageFilter =
      mileage === "Any" ||
      (mileage === "Under 15,000" && car.mileage < 15000) ||
      (mileage === "Under 30,000" && car.mileage < 30000) ||
      (mileage === "Under 45,000" && car.mileage < 45000) ||
      (mileage === "Under 60,000" && car.mileage < 60000) ||
      (mileage === "Under 75,000" && car.mileage < 75000);

    const priceFilter = car.price >= minPrice && car.price <= maxPrice;

    const colorFilter = selectedColors.length === 0 || selectedColors.includes(car.color);

    const result = (yearFilter && makeFilter && colorFilter && priceFilter && mileageFilter);

    return result;
});

  // generate filtered car cards
  generateCarCards(filteredCars);

}  

// event listeners for changes to filters
document.getElementById("min-year").addEventListener("change", filterCars);
document.getElementById("max-year").addEventListener("change", filterCars);
document.getElementById("mileage").addEventListener("change", filterCars);
document.getElementById("min-price").addEventListener("input", filterCars);
document.getElementById("max-price").addEventListener("input", filterCars);

document.querySelectorAll('input[name="car-make"]').forEach((checkbox) => {
  checkbox.addEventListener("change", filterCars);
});
document.querySelectorAll('input[name="car-color"]').forEach((checkbox) => {
  checkbox.addEventListener("change", filterCars);
});