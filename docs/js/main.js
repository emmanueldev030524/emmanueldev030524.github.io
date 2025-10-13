
        document.addEventListener('DOMContentLoaded', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 800);
        });

        const cursor = document.querySelector('.cursor');
        const cursorRing = document.querySelector('.cursor-ring');
        
        if (cursor && cursorRing) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                cursorRing.style.left = e.clientX + 'px';
                cursorRing.style.top = e.clientY + 'px';
            });
        
            setTimeout(() => {
                const hoverElements = document.querySelectorAll('a, button, .nav-dot, .tool-item, .project-card, .skill-card, .btn, .social-link, .contact-method');
                
                hoverElements.forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        cursor.classList.add('cursor-hover');
                        cursorRing.classList.add('cursor-hover');
                    });
                    el.addEventListener('mouseleave', () => {
                        cursor.classList.remove('cursor-hover');
                        cursorRing.classList.remove('cursor-hover');
                    });
                });
            }, 100);
        }

        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00d9ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00d9ff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });

        const navDots = document.querySelectorAll('.nav-dot');
        
        navDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                
                // Immediately update active state on click
                navDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
                
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        function updateActiveNav() {
            const sections = ['home', 'about', 'skills', 'tools', 'projects', 'contact'];
            let current = 'home';
            
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        current = sectionId;
                    }
                }
            });

            navDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === current) {
                    dot.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
