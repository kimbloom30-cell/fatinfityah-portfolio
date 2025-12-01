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
    
    // 💡 CHANGED: Dynamic text for Database Developer role
    const textToType = "SQL Expert | Data Architect | Query Optimizer";
    
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
    // 💡 CHANGED: Project data reverted to Database Developer focus
    const projects = [
        {
            title: "E-Commerce Warehouse DB",
            description: "Designed a normalized relational database schema for a high-volume inventory management system to reduce data redundancy.",
            tech: ["MySQL", "ERD Design", "Normalization"]
        },
        {
            title: "Healthcare Analytics Pipeline",
            description: "Built an ETL pipeline to aggregate patient records from multiple sources into a secure data warehouse for reporting.",
            tech: ["Python", "PostgreSQL", "ETL"]
        },
        {
            title: "Real-Time Log Analyzer",
            description: "A NoSQL solution for ingesting and querying server logs in real-time to detect security anomalies.",
            tech: ["MongoDB", "Node.js", "NoSQL"]
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
    // Using Intersection Observer for smooth and performant highlighting
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
