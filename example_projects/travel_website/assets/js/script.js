document.addEventListener('DOMContentLoaded', () => {

    // --- DESTINATION DATA ---
    // This serves as our "database" for the itinerary generator
    const destinationData = {
        "Maldives": {
            budget: {
                budget: ["Snorkeling in Nilandhe Atoll", "Beach picnic", "Local island food tour"],
                mid: ["Sunset cruise", "Scuba diving", "Water villa dinner"],
                luxury: ["Private island dining", "Seaplane tour", "Luxury spa day"]
            },
            activities: ["Beach relaxation", "Island hopping", "Marine life spotting"]
        },
        "Venice": {
            budget: {
                budget: ["Walking tour of San Marco", "Cicchetti food crawl", "Public Vaporetto ride"],
                mid: ["Gondola ride", "Murano glass workshop", "Dinner by the canal"],
                luxury: ["Private water taxi", "Palazzo tour", "Fine dining at Michelin star restaurant"]
            },
            activities: ["Canal exploration", "Art museums", "Historic architecture"]
        },
        "Kyoto": {
            budget: {
                budget: ["Fushimi Inari Shrine walk", "Nishiki Market food tour", "Public bus tour"],
                mid: ["Tea ceremony", "Bamboo forest stroll", "Temple visits"],
                luxury: ["Ryokan stay", "Private Zen garden tour", "Kaiseki dining"]
            },
            activities: ["Temple visiting", "Traditional crafts", "Nature walks"]
        },
        "Switzerland": {
            budget: {
                budget: ["Hiking in Lauterbrunnen", "Local cheese tasting", "Public train tour"],
                mid: ["Mount Pilatus cogwheel railway", "Chocolate factory tour", "Lake Brienz cruise"],
                luxury: ["Glacier Express scenic train", "Skiing in St. Moritz", "Private Alpine chalet dinner"]
            },
            activities: ["Mountain scenery", "Chocolate tasting", "Alpine hiking"]
        },
        "Paris": {
            budget: {
                budget: ["Eiffel Tower view from Champ de Mars", "Louvre exterior stroll", "Boulangerie tour"],
                mid: ["Seine River cruise", "Montmartre walking tour", "Cafe dining"],
                luxury: ["Private Louvre tour", "Fashion shopping on Champs-Élysées", "Fine dining near Arc de Triomphe"]
            },
            activities: ["Art & Museums", "Café culture", "Historical landmarks"]
        },
        "Tokyo": {
            budget: {
                budget: ["Shibuya Crossing walk", "Senso-ji Temple visit", "Street food tour in Harajuku"],
                mid: ["TeamLab Borderless", "Sushi making class", "Shinjuku Golden Gai tour"],
                luxury: ["Private sushi master dinner", "Luxury Ginza shopping", "Helicopter city tour"]
            },
            activities: ["City lights", "Culinary exploration", "Tradition & Tech"]
        }
    };

    // --- DOM ELEMENTS ---
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('itinerary-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const plannerForm = document.getElementById('planner-form');
    const modalSetup = document.getElementById('modal-setup');
    const modalResult = document.getElementById('modal-result');
    const modalTitle = document.getElementById('modal-title');
    const resultTitle = document.getElementById('result-title');
    const itineraryContent = document.getElementById('itinerary-content');
    const resetPlannerBtn = document.getElementById('reset-planner');

    let currentDestination = "";

    // --- NAVIGATION LOGIC ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // --- REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- MODAL & ITINERARY LOGIC ---

    // 1. Open Modal when card clicked
    cards.forEach(card => {
        card.addEventListener('click', () => {
            currentDestination = card.getAttribute('data-location');
            openModal(currentDestination);
        });
    });

    function openModal(location) {
        modalTitle.innerText = `Plan Your Trip to ${location}`;
        modal.classList.add('active');
        // Reset view to setup
        modalSetup.classList.remove('hidden');
        modalResult.classList.add('hidden');
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal if clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 2. Handle Form Submission
    plannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const days = parseInt(document.getElementById('days').value);
        const budget = document.getElementById('budget').value;
        
        generateItinerary(currentDestination, days, budget);
    });

    // 3. The Core Logic: Itinerary Generation
    function generateItinerary(location, days, budget) {
        const data = destinationData[location];
        if (!data) return;

        const activities = data.budget[budget];
        
        let html = `<p><strong>Budget Style:</strong> ${budget.toUpperCase()}</p><br>`;
        
        // We distribute activities over the number of days
        // For simplicity, we'll cycle through the activities list
        for (let i = 1; i <= days; i++) {
            html += `<div class="itinerary-day">`;
            html += `<h4>Day ${i}</h4>`;
            html += `<ul>`;
            
            // Pick an activity based on the day index
            // This ensures we don't repeat the same thing every single day if days > activities.length
            const activityIndex = (i - 1) % activities.length;
            html += `<li>${activities[activityIndex]}</li>`;
            
            // Add a generic activity from the general list to fill up days
            const genericIndex = i % data.activities.length;
            html += `<li>Explore ${data.activities[genericIndex]}</li>`;
            
            html += `</ul>`;
            html += `</div>`;
        }

        itineraryContent.innerHTML = html;
        resultTitle.innerText = `Your ${days}-Day ${location} Adventure`;
        
        // Switch views
        modalSetup.classList.add('hidden');
        modalResult.classList.remove('hidden');
    }

    // 4. Reset Planner
    resetPlannerBtn.addEventListener('click', () => {
        modalSetup.classList.remove('hidden');
        modalResult.classList.add('hidden');
        plannerForm.reset();
    });

    // Contact Form Demo
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent (this is a demo).');
            contactForm.reset();
        });
    }
});
