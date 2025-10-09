// Loading Screen - Fixed
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

        // Simple Custom Cursor
        const cursor = document.querySelector('.cursor');
        
        if (cursor) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            // Cursor hover effects - just scale up
            const hoverElements = document.querySelectorAll('a, button, .nav-dot, .tool-item, .project-card, .skill-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });
        }

        // Initialize EmailJS (replace with your actual key)
        // emailjs.init('YOUR_PUBLIC_KEY');

        // Contact Form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');

            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
                
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };

                // Simulate sending (remove this and uncomment EmailJS code when ready)
                setTimeout(() => {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = '✓ Message sent successfully! (Demo mode - Set up EmailJS to actually send emails)';
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
                    
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }, 1500);

                /* Uncomment this when you set up EmailJS
                try {
                    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
                    
                    formMessage.className = 'form-message success';
                    formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                } catch (error) {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = '✗ Something went wrong. Please try again or email me directly.';
                }
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
                */
            });
        }

        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        // Initialize Particles.js
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00d9ff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
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
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });

        // Side Navigation
        const navDots = document.querySelectorAll('.nav-dot');
        
        navDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Update active nav on scroll
        function updateActiveNav() {
            const sections = ['home', 'skills', 'tools', 'projects', 'contact'];
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

        // Smooth scroll for buttons
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
