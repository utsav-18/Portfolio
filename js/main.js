
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        // Cursor follower is desktop-only to avoid unnecessary animation work on touch devices.
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursorFollower && !isTouchDevice) {
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
        }

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



        const hamburger = document.getElementById('hamburger');
        const nav_Links = document.getElementById('nav-links');

        if (hamburger && nav_Links) {
            hamburger.addEventListener('click', () => {
                nav_Links.classList.toggle('show');
            });

            nav_Links.querySelectorAll('.nav-link').forEach((link) => {
                link.addEventListener('click', () => {
                    nav_Links.classList.remove('show');
                });
            });
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


        // Contact form submit to Google Sheets (Apps Script Web App URL).
        const form = document.getElementById('contactForm');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const submitBtn = form.querySelector('.submission');
                const textSpan = submitBtn ? submitBtn.querySelector('span') : null;
                if (!submitBtn || !textSpan) return;

                const originalText = textSpan.textContent;
                const sheetUrl = form.dataset.sheetUrl || '';

                if (!sheetUrl) {
                    textSpan.textContent = 'Set Sheet URL';
                    setTimeout(() => {
                        textSpan.textContent = originalText;
                    }, 2000);
                    return;
                }

                textSpan.textContent = 'Sending...';
                submitBtn.disabled = true;

                try {
                    const formData = new FormData(form);
                    formData.append('submittedAt', new Date().toISOString());

                    await fetch(sheetUrl, {
                        method: 'POST',
                        body: formData,
                        mode: 'no-cors'
                    });

                    textSpan.textContent = 'Message Sent! ✓';
                    form.reset();
                    alert('We received your message!');
                } catch (error) {
                    textSpan.textContent = 'Failed. Retry';
                    console.error('Google Sheet submit failed:', error);
                } finally {
                    setTimeout(() => {
                        textSpan.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }
            });
        }

        // Scroll Event Listeners (RAF throttled + passive for smoother mobile scrolling)
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveNav();
                    updateNavbar();
                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });

        // Project Card Hover Effects
        if (cursorFollower && !isTouchDevice) {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    cursorFollower.style.transform = 'scale(2)';
                });

                card.addEventListener('mouseleave', () => {
                    cursorFollower.style.transform = 'scale(1)';
                });
            });
        }

        // Initialize
        updateActiveNav();
        updateNavbar();
        
        // Link Hover Effects
        if (cursorFollower && !isTouchDevice) {
            document.querySelectorAll('a').forEach(link => {
                link.addEventListener('mouseenter', () => {
                    cursorFollower.style.transform = 'scale(1.5)';
                });

                link.addEventListener('mouseleave', () => {
                    cursorFollower.style.transform = 'scale(1)';
                });
            });
        }

        //video effect
        const video = document.getElementById("myVideo");

        if (video) {
            // Ensure it stops at the last frame when finished.
            video.addEventListener("ended", () => {
                video.pause();
                video.currentTime = video.duration;
            });
        }

        // Generate a circular favicon from the existing PNG for reliable cross-browser rendering.
        (function setCircularFavicon() {
            const source = new Image();
            source.src = 'images/favicon.png?v=4';

            source.onload = () => {
                const size = 64;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(source, 0, 0, size, size);

                const circularDataUrl = canvas.toDataURL('image/png');
                document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach((link) => {
                    link.setAttribute('href', circularDataUrl);
                });
            };
        })();