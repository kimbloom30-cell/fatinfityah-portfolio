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
            title: "Database Performance Audit Tool",
            description: "A Python-based utility for analyzing SQL query performance and suggesting index optimizations across large relational datasets.",
            tech: ["Python", "SQL", "Query Optimization"],
            link: "#" // Placeholder link
        },
        {
            title: "High-Performance Data Processor (C++)",
            description: "Built a fast, low-level data processing utility using C++ to handle complex financial data structures efficiently.",
            tech: ["C++", "Data Structures", "Algorithm Design"],
            link: "#" // Placeholder link
        },
        {
            title: "Portfolio UX/UI Redesign",
            description: "Conceptualized and designed a new user experience for a client's website, delivering high-fidelity prototypes and design specs.",
            tech: ["Figma", "UI/UX Design", "Wireframing"],
            // 💡 UPDATED: Added the Figma prototype link here
            link: "https://www.figma.com/proto/XA1tRlvTVWtAy9kTYeB5Zo/ui-ux?node-id=0-1&t=rqrfhIW8XCs0rvbD-1"
        }
    ];

    const projectContainer = document.querySelector('.projects-grid');
    
    if (projectContainer) {
        projectContainer.innerHTML = ''; 
        
        projects.forEach(project => {
            const tagsHtml = project.tech.map(tech => `<span class="tech-item">${tech}</span>`).join('');
            
            // Note the use of project.link for the anchor tag
            const cardHtml = `
                <article class="project-card">
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
