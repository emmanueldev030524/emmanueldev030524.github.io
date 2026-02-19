
document.addEventListener('DOMContentLoaded', function() {
    // ── Loading Screen ──────────────────────────────────────────
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.getElementById('loadingText');
    const loadingName = document.createElement('div');
    loadingName.classList.add('loading-name');
    if (loadingText && loadingText.parentNode) {
        loadingText.parentNode.appendChild(loadingName);
    }

    const nameStr = 'EMMANUEL GALLARDO';
    let ni = 0;
    const nameInterval = setInterval(() => {
        if (ni < nameStr.length) {
            loadingName.textContent += nameStr[ni];
            ni++;
        } else {
            clearInterval(nameInterval);
        }
    }, 60);

    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1400);
});

// ── Custom Cursor ───────────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

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

// ── AOS Init ────────────────────────────────────────────────────
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ── Particles.js ────────────────────────────────────────────────
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

// ── Side Nav Dots ───────────────────────────────────────────────
const navDots = document.querySelectorAll('.nav-dot');

navDots.forEach(dot => {
    dot.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        navDots.forEach(d => d.classList.remove('active'));
        this.classList.add('active');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function updateActiveNav() {
    const sections = ['home', 'about', 'skills', 'tools', 'projects', 'testimonials', 'contact'];
    let current = 'home';

    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 60;

    if (atBottom) {
        current = 'contact';
    } else {
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 200) {
                    current = sectionId;
                }
            }
        });
    }

    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current) {
            dot.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ── Scroll Progress Bar ─────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
});

// ── Typewriter Effect ───────────────────────────────────────────
const typewriterEl = document.getElementById('typewriter');

if (typewriterEl) {
    const phrases = [
        'Automation Specialist',
        'CRM Integration Expert',
        'Frontend Developer',
        'Workflow Automation Pro'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 45;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 400;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => { isDeleting = true; type(); }, pauseAfterType);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, pauseAfterDelete);
            return;
        }

        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    // Start after loading screen
    setTimeout(type, 1600);
}

// ── Mobile Nav ──────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

if (hamburger && mobileMenuOverlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenuOverlay.classList.toggle('open');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ── Back to Top ─────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Stats Counter ───────────────────────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 16);
    });
}

const statsSection = document.getElementById('stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

// ── Copy Email ───────────────────────────────────────────────────
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-show'));
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function copyEmail(e) {
    e.stopPropagation();
    navigator.clipboard.writeText('emmanueljumelgallardo@gmail.com')
        .then(() => showToast('📋 Email copied!'))
        .catch(() => showToast('Could not copy — please copy manually'));
}
