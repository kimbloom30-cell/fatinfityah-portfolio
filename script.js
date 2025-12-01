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
    
    // 💡 UPDATED: Dynamic text for Website Development, MySQL, and AR Unity
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
    // 💡 UPDATED: Project data reflecting Web Dev, Unity/AR, and MySQL skills
    const projects = [
        {
            title: "DriveX Car Rental System",
            description: "A complete vehicle booking platform allowing users to browse fleet, book dates, and manage payments. Built with a robust web stack and MySQL backend.",
            tech: ["HTML/JS", "MySQL", "PHP"]
        },
        {
            title: "AR Interior Visualizer",
            description: "An Augmented Reality mobile app built with Unity. It allows users to place virtual 3D furniture to visualize fit and style before buying.",
            tech: ["Unity 3D", "C#", "AR Foundation"]
        },
        {
            title: "Portfolio Website Build",
            description: "A modern, responsive portfolio website built from scratch using clean HTML, CSS variables, and dynamic JavaScript.",
            tech: ["HTML5", "CSS3", "JavaScript"]
        }
    ];

    const projectContainer = document.querySelector('.projects-grid');
    
    if (projectContainer) {
        projectContainer.innerHTML = ''; 
        
        projects.forEach(project => {
            const tagsHtml = project.tech.map(tech => `<span class="tech-item">${tech}</span>`).join('');
            
            const cardHtml = `
                <article class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${tagsHtml}
                    </div>
                    <a href="#" class="project-link">View Details &rarr;</a>
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
