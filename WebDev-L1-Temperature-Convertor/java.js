const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const errorMessage = document.getElementById("error");
const results = document.getElementById("results");
const clearBtn = document.getElementById("clearBtn");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

function formatTemperature(value, unit) {
    return `${Number(value.toFixed(4))} ${unit}`;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    errorMessage.textContent = "";
    results.hidden = true;

    const rawValue = temperatureInput.value.trim();
    const temperature = Number(rawValue);
    const unit = unitSelect.value;

    if (rawValue === "" || !Number.isFinite(temperature)) {
        errorMessage.textContent =
            "Please enter a valid numeric temperature.";
        return;
    }

    let celsius;

    if (unit === "C") {
        celsius = temperature;
    } else if (unit === "F") {
        celsius = (temperature - 32) * 5 / 9;
    } else {
        celsius = temperature - 273.15;
    }

    // Allow a tiny floating-point tolerance at absolute zero.
    if (celsius < -273.150000001) {
        errorMessage.textContent =
            "Temperature cannot be below absolute zero (-273.15 °C).";
        return;
    }

    // Normalize tiny floating-point errors around absolute zero.
    if (Math.abs(celsius + 273.15) < 0.000000001) {
        celsius = -273.15;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    celsiusResult.textContent = formatTemperature(celsius, "°C");
    fahrenheitResult.textContent = formatTemperature(fahrenheit, "°F");
    kelvinResult.textContent = formatTemperature(kelvin, "K");

    results.hidden = false;
});

clearBtn.addEventListener("click", function () {
    form.reset();
    errorMessage.textContent = "";
    results.hidden = true;
    temperatureInput.focus();
});