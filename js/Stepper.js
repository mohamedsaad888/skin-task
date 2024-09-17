let currentStep = 1;
const totalSteps = 8;

function showStep(step) {
    document.querySelectorAll('.question').forEach((q, index) => {
        q.style.display = index === step - 1 ? 'block' : 'none';
    });
    document.querySelectorAll('.step').forEach((s, index) => {
        s.classList.toggle('active', index === step - 1);
    });
}

function changeStep(n) {
    const newStep = currentStep + n;
    if (newStep > 0 && newStep <= totalSteps) {
        currentStep = newStep;
        showStep(currentStep);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showStep(currentStep);
});
function toggleSelection(button) {
    button.classList.toggle('selected');
}
document.querySelector('.loading').style.display = 'flex';

// Simulate 5-second processing delay
setTimeout(() => {
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.weather-info').style.display = 'flex';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}, 5000);

function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Fetch weather data from Open-Meteo API
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weather = data.current_weather;
            document.getElementById('temperature').innerText = weather.temperature;
            document.getElementById('wind').innerText = weather.windspeed;
            document.getElementById('weather').innerText = getWeatherDescription(weather.weathercode);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherDescription(weatherCode) {
    const weatherDescriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Freezing fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Light rain",
        63: "Moderate rain",
        65: "Heavy rain",
        80: "Rain showers",
        95: "Thunderstorm"
        // Add more descriptions based on the weather code from Open
    };
    return weatherDescriptions[weatherCode] || "Unknown";
}
document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll('.option');
    const nextBtn = document.getElementById('nextBtn');

    // Disable the "Next" button initially
    nextBtn.disabled = true;

    options.forEach(option => {
        option.addEventListener('click', function () {
            // Clear selection from other options
            options.forEach(opt => opt.classList.remove('selected'));

            // Mark this option as selected
            this.classList.add('selected');

            // Enable the "Next" button
            nextBtn.disabled = false;
        });
    });

    // Change step function
    function changeStep(step) {
        // Logic to change the step only if an option is selected
        const currentStep = document.querySelector('.step.active');
        const selectedOption = document.querySelector('.option.selected');

        if (selectedOption) {
            // Proceed to the next step
            currentStep.classList.remove('active');
            const nextStep = document.getElementById(`step-${parseInt(currentStep.id.split('-')[1]) + step}`);
            nextStep.classList.add('active');
        } else {
            alert('Please choose an option before proceeding.');
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll('.step');
    const questions = document.querySelectorAll('.question');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentStepIndex = 0;

    // Disable the "Next" button initially
    nextBtn.disabled = true;

    // Handle option selection for each question, excluding question 7
    questions.forEach((question, index) => {
        if (index !== 6) { // Exclude question 7 (0-based index)
            const options = question.querySelectorAll('.option');

            options.forEach(option => {
                option.addEventListener('click', function () {
                    // Clear selection from other options
                    options.forEach(opt => opt.classList.remove('selected'));

                    // Mark this option as selected
                    this.classList.add('selected');

                    // Enable the "Next" button
                    nextBtn.disabled = false;
                });
            });
        }
    });

    // Change step function
    function changeStep(step) {
        const currentQuestion = questions[currentStepIndex];
        const selectedOption = currentQuestion.querySelector('.option.selected');

        if (step > 0 && !selectedOption && currentStepIndex !== 6) { // Allow skipping validation for step 7
            alert('Please choose an option before proceeding.');
            return;
        }

        // Hide current question
        currentQuestion.style.display = 'none';
        steps[currentStepIndex].classList.remove('active');

        // Update current step index
        currentStepIndex += step;

        // Show next question
        const nextQuestion = questions[currentStepIndex];
        nextQuestion.style.display = 'block';
        steps[currentStepIndex].classList.add('active');

        // Disable next button initially for the new question, except for question 7
        if (currentStepIndex !== 6) {
            nextBtn.disabled = !nextQuestion.querySelector('.option.selected');
        } else {
            nextBtn.disabled = false; // Enable the "Next" button for question 7 (information step)
        }

        // Disable "Previous" button if on the first question
        prevBtn.disabled = currentStepIndex === 0;
    }

    nextBtn.addEventListener('click', function() {
        changeStep(1);
    });

    prevBtn.addEventListener('click', function() {
        changeStep(-1);
    });

    // Initialize the first question
    questions[currentStepIndex].style.display = 'block';
    steps[currentStepIndex].classList.add('active');
    prevBtn.disabled = true; // Disable "Previous" button for the first question
});
function changeStep(step) {
    const currentQuestion = questions[currentStepIndex];
    const selectedOption = currentQuestion.querySelector('.option.selected');

    // Prevent going past the eighth question
    if (currentStepIndex === 7 && step > 0) {
        return; // Cancel "Next" button functionality after the eighth question
    }

    if (step > 0 && !selectedOption && currentStepIndex !== 6) {
        alert('Please choose an option before proceeding.');
        return;
    }

    // Hide current question
    currentQuestion.style.display = 'none';
    steps[currentStepIndex].classList.remove('active');

    // Update current step index
    currentStepIndex += step;

    // Show next question
    const nextQuestion = questions[currentStepIndex];
    nextQuestion.style.display = 'block';
    steps[currentStepIndex].classList.add('active');

    // Disable "Next" button initially for the new question, except for question 7
    if (currentStepIndex !== 6) {
        nextBtn.disabled = !nextQuestion.querySelector('.option.selected');
    } else {
        nextBtn.disabled = false; // Enable the "Next" button for question 7 (information step)
    }

    // Hide navigation buttons when reaching the form
    if (currentStepIndex === 7) { // After the eighth question, hide "Next" button
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'inline-block';
        prevBtn.style.display = 'inline-block';
    }

    // Disable "Previous" button if on the first question
    prevBtn.disabled = currentStepIndex === 0;
}
document.getElementById('simpleForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Logic for form validation or data handling can go here

    // Redirect to result.html
    window.location.href = 'result.html';
});
