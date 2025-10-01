
        // Cursor Follower
        const cursorFollower = document.querySelector('.cursor-follower');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorFollower.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';
        });

        function animateCursor() {
            const diffX = mouseX - cursorX;
            const diffY = mouseY - cursorY;
            
            cursorX += diffX * 0.1;
            cursorY += diffY * 0.1;
            
            cursorFollower.style.left = cursorX + 'px';
            cursorFollower.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Smooth Scrolling Navigation
        document.querySelectorAll('.nav-link, .hero-btn, .scroll-btn').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();

                let targetId = el.getAttribute('href') 
                            ? el.getAttribute('href').substring(1) 
                            : el.getAttribute('data-target');

                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navigation Active State
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Navbar Background on Scroll
        const navbar = document.getElementById('navbar');
        function updateNavbar() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill progress bars
                    if (entry.target.classList.contains('skill-item')) {
                        const progressBar = entry.target.querySelector('.progress-bar');
                        const width = progressBar.getAttribute('data-width');
                        setTimeout(() => {
                            progressBar.style.width = width + '%';
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section-title, .profile-image, .about-text, .skill-item, .project-card').forEach(el => {
            observer.observe(el);
        });

        const form = document.querySelector('form');

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // <-- stop the page from reloading

            const submitBtn = e.target.querySelector('.submission');
            const textSpan = submitBtn.querySelector('span'); // target inner span
            const originalText = textSpan.textContent;

            textSpan.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                textSpan.textContent = 'Message Sent! ✓';
                setTimeout(() => {
                    textSpan.textContent = originalText;
                    submitBtn.disabled = false;
                    e.target.reset();
                }, 2000);
            }, 1500);
        });

        // Scroll Event Listeners
        window.addEventListener('scroll', () => {
            updateActiveNav();
            updateNavbar();
        });

        // Project Card Hover Effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'scale(2)';
            });
            
            card.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'scale(1)';
            });
        });

        // Initialize
        updateActiveNav();
        updateNavbar();
        
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'scale(2)';
            });
            
            card.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'scale(1)';
            });
        });

        // Link Hover Effects
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'scale(1.5)';
            });
            
            link.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'scale(1)';
            });
        });

        