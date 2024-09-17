

const skinType = localStorage.getItem('skinType');
const acneExperience = localStorage.getItem('acneExperience');
const resultsText = document.getElementById('results-text');

// Fake responses based on the answers
if (skinType === 'oily' && acneExperience === 'yes') {
    resultsText.innerHTML = "You have oily skin and experience acne. We recommend using salicylic acid products and oil-free moisturizers.";
} else if (skinType === 'dry' && acneExperience === 'no') {
    resultsText.innerHTML = "You have dry skin. We recommend using a rich moisturizer with hyaluronic acid and gentle exfoliants.";
} else {
    resultsText.innerHTML = "You have a balanced skin type. A gentle cleanser and moisturizer are recommended for daily use.";
}

// Chart.js setup
const ctx = document.getElementById('skinChart').getContext('2d');
const skinChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [{
            label: 'Skin Improvement (%)',
            data: [20, 40, 50, 60, 80],
            borderColor: 'rgba(141, 110, 99, 1)',
            backgroundColor: 'rgba(141, 110, 99, 0.2)',
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// JavaScript for Testimonial Slider
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".testimonial-slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    document.querySelector(".next-slide").addEventListener("click", function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    document.querySelector(".prev-slide").addEventListener("click", function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    // Real-time rating system
    const stars = document.querySelectorAll(".rating-stars .star");
    const feedback = document.getElementById("rating-feedback");

    stars.forEach(star => {
        star.addEventListener("click", function() {
            const rating = this.getAttribute("data-value");
            feedback.textContent = `You rated us ${rating}/5 stars!`;
            stars.forEach(s => s.classList.remove("selected"));
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add("selected");
            }
        });
    });

    document.getElementById("submit-rating").addEventListener("click", function() {
        alert("Thank you for your feedback!");
    });
});

 // JavaScript for progressive sentence display
 document.addEventListener("DOMContentLoaded", function() {
    const sentences = [
        document.getElementById('sentence1'),
        document.getElementById('sentence2'),
        document.getElementById('sentence3'),
        document.getElementById('sentence4'),
        document.getElementById('sentence5')
    ];

    // Show each sentence with a 2-second delay
    for (let i = 0; i < sentences.length; i++) {
        setTimeout(() => {
            sentences[i].style.opacity = 1;
        }, i * 2000); // 2 seconds delay for each sentence
    }

    // Hide the loading screen and show the main content after 10 seconds
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 10000); // 10 seconds in total
});
