document.addEventListener('DOMContentLoaded', () => {
    
    // --- Feature 1: Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });


    // --- Feature 2: Dynamic Typing Effect for Hero Section ---
    const textElement = document.querySelector('.typing-text');
    
    // Dynamic text
    const textToType = "Develop a Website | MySQL | AR Unity";
    
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100); 
        }
    }
    
    setTimeout(typeWriter, 500);


    // --- Feature 3: Dynamic Project Rendering ---
    const projects = [
        {
            // UPDATED: ZOOMRENTALCAR DATABASE Project using an 'images' array
            title: "ZOOMRENTALCAR DATABASE",
            description: "The ZoomCarRental database stores information about customers, vehicles, bookings, and payments. It helps the system manage rentals, track available cars, record customer bookings, and display updates on the admin dashboard.",
            tech: ["SQL", "PHP", "Python"],
            link: "#", 
            // ⬅️ UPDATED: Use your three image filenames here
            images: ["zoomcar-1.jpg", "zoomcar-2.jpg", "zoomcar-3.jpg"] 
        },
        {
            title: "Sarawak Metro ART Full Prototype",
            description: "Mobile Application prototype that features ticket booking and station finders including accessibility options.",
            tech: ["UI/UX Design", "Figma"],
            link: "https://www.figma.com/proto/pT548jIWSKEbDBG3X7pLra/hci?page-id=0%3A1&node-id=671-789&p=f&viewport=188%2C1231%2C0.21&t=6Zc40a2ZXocaBvev-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=671%3A789"
        }, 
        {
            title: "Portfolio UX/UI Redesign Using Figma",
            description: "Conceptualized and designed a new user experience for a client's website, delivering high-fidelity prototypes and design specs.",
            tech: ["Figma", "UI/UX Design", "Wireframing"],
            link: "https://www.figma.com/proto/XA1tRlvTVWtAy9kTYeB5Zo/ui-ux?node-id=0-1&t=rqrfhIW8XCs0rvbD-1"
        }
    ];

    const projectContainer = document.querySelector('.projects-grid');
    
    if (projectContainer) {
        projectContainer.innerHTML = ''; 
        
        projects.forEach(project => {
            const tagsHtml = project.tech.map(tech => `<span class="tech-item">${tech}</span>`).join('');
            
            // ⬅️ UPDATED: Logic to handle multiple images
            let imageHtml = '';
            if (project.images && project.images.length > 0) {
                // Generate HTML for each image
                const imageTags = project.images.map((imgSrc, index) => `
                    <img src="${imgSrc}" alt="${project.title} screenshot ${index + 1}" class="project-img">
                `).join('');
                
                // Wrap all images in a container and add the 'multiple-images' class for styling
                imageHtml = `<div class="project-image-container multiple-images">
                    ${imageTags}
                </div>`;
            } else if (project.image) {
                 // Fallback/standard logic for a single 'image' property if it exists
                 imageHtml = `<div class="project-image-container">
                    <img src="${project.image}" alt="Image for ${project.title}" class="project-img">
                </div>`;
            }

            const cardHtml = `
                <article class="project-card">
                    ${imageHtml}
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${tagsHtml}
                    </div>
                    <a href="${project.link}" class="project-link" target="_blank">View Project &rarr;</a>
                </article>
            `;
            projectContainer.innerHTML += cardHtml;
        });
    }


    // --- Feature 4: Active Link Highlighting (Intersection Observer) ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (entry.isIntersecting) {
                navItems.forEach(a => a.classList.remove('link-active')); 
                if (activeLink) {
                    activeLink.classList.add('link-active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- Feature 5: Form Submission (Front-end only) ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const name = document.getElementById('name').value;
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been "sent" (This is a demo).`);
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.opacity = '1';
            }, 1500);
        });
    }
});
