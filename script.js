document.addEventListener('DOMContentLoaded', () => {
    
    // --- MODAL LOGIC (Kept for completeness if you add new modal projects later) ---
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modalTitle');
    const modalImageGallery = document.getElementById('modalImageGallery');
    const modalDescription = document.getElementById('modalDescription');

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
    
    function openProjectModal(projectTitle, imagesArray, description) {
        modalTitle.textContent = projectTitle;
        modalDescription.textContent = description;
        
        modalImageGallery.innerHTML = '';
        imagesArray.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${projectTitle} Screenshot ${index + 1}`;
            modalImageGallery.appendChild(img);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    }

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.openProjectModal = openProjectModal; 

    // --- Feature 1: Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });


    // --- Feature 2: Dynamic Typing Effect ---
    const textElement = document.querySelector('.typing-text');
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
            // FINALIZED: Canva Link used.
            title: "ZOOMRENTALCAR DATABASE",
            description: "The ZoomCarRental database stores information about customers, vehicles, bookings, and payments. It helps the system manage rentals, track available cars, record customer bookings, and display updates on the admin dashboard.",
            tech: ["SQL", "PHP", "Python"],
            link: "https://www.canva.com/design/DAG6d7IL3sI/v9V6h143c8dMwE4PCEbcTg/edit?utm_content=DAG6d7IL3sI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
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
            
            let imageHtml = '';
            
            // Image preview logic
            if (project.link && project.image) { 
                imageHtml = `<div class="project-image-container">
                    <img src="${project.image}" alt="Image for ${project.title}" class="project-img">
                </div>`;
            }

            // Link logic
            let projectLinkHtml = '';
            if (project.link) {
                // Standard external link
                projectLinkHtml = `<a href="${project.link}" class="project-link" target="_blank">View Project &rarr;</a>`;
            } else if (project.images && !project.link) {
                // Modal trigger logic (for projects that use the popup)
                const imagesString = JSON.stringify(project.images).replace(/"/g, "'"); 
                const titleString = JSON.stringify(project.title);
                const descriptionString = JSON.stringify(project.description);
                
                projectLinkHtml = `
                    <a href="#" class="project-link modal-trigger" 
                        onclick="event.preventDefault(); openProjectModal(${titleString}, ${imagesString}, ${descriptionString})">
                        View Project &rarr;
                    </a>
                `;
            }

            const cardHtml = `
                <article class="project-card">
                    ${imageHtml}
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${tagsHtml}
                    </div>
                    ${projectLinkHtml}
                </article>
            `;
            projectContainer.innerHTML += cardHtml;
        });
    }

    // --- Feature 5: Form Submission logic REMOVED ---
    
    // --- Feature 4: Active Link Highlighting ---
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
});
