document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initSkillBars();
    initContactForm();
    initScrollAnimations();
    initCounters();
    initCertificateModal();
});

/* ================= THEME TOGGLE ================= */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (!icon) return;

    icon.classList.toggle('fa-moon', theme === 'dark');
    icon.classList.toggle('fa-sun', theme !== 'dark');
}

/* ================= MOBILE MENU ================= */
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.querySelector('i').classList.toggle('fa-bars');
        toggle.querySelector('i').classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('i').classList.add('fa-bars');
            toggle.querySelector('i').classList.remove('fa-times');
        });
    });
}

/* ================= SKILL BARS ================= */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    if (!bars.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.progress + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

/* ================= CONTACT FORM ================= */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();
        const msgBox = document.getElementById('formMessage');

        if (!name || !email || !subject || !message) {
            msgBox.textContent = 'Please fill in all fields.';
            msgBox.className = 'form-message error';
            return;
        }

        const mailto = `mailto:udaysai533@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        window.location.href = mailto;

        msgBox.textContent = 'Opening email client...';
        msgBox.className = 'form-message success';

        setTimeout(() => {
            form.reset();
            msgBox.textContent = '';
        }, 3000);
    });
}

/* ================= SCROLL ANIMATIONS ================= */
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.stat-card, .highlight-card, .skill-card, .project-card, .cert-card, .summary-card'
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
}

/* ================= COUNTERS ================= */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    counters.forEach(counter => {
        let current = 0;
        const target = +counter.dataset.count;
        const step = Math.ceil(target / 40);

        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(interval);
            } else {
                counter.textContent = current;
            }
        }, 40);
    });
}

/* ================= CERTIFICATE MODAL ================= */
function initCertificateModal() {
    const images = document.querySelectorAll('.cert-image img');
    if (!images.length) return;

    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `<span class="close">&times;</span><img />`;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.close');

    images.forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('show');
            modalImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('show');
    });
}

/* ================= HEADER SHADOW ================= */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;

    header.style.boxShadow =
        window.scrollY > 60 ? '0 6px 16px rgba(0,0,0,0.12)' : 'none';
});

/* ================= SMOOTH ANCHORS ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ================= GAIA TABS ================= */

document.addEventListener("DOMContentLoaded", () => {
    const gaiaTabs = document.querySelectorAll(".gaia-tab");
    const gaiaSections = document.querySelectorAll(".gaia-section");

    if (gaiaTabs.length === 0 || gaiaSections.length === 0) return;

    gaiaTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-tab");

            // Remove active state from all tabs
            gaiaTabs.forEach(t => t.classList.remove("active"));

            // Hide all sections
            gaiaSections.forEach(section => section.classList.remove("active"));

            // Activate clicked tab
            tab.classList.add("active");

            // Show target section
            const activeSection = document.getElementById(target);
            if (activeSection) {
                activeSection.classList.add("active");
            }
        });
    });
});

/* ================= AI SCROLL AWARENESS ================= */

const aiSections = document.querySelectorAll('.gaia-section .content-section');

window.addEventListener('scroll', () => {
    aiSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) / window.innerHeight;

        if (offset > 0 && offset < 1) {
            section.style.transform =
                `translateY(${20 - offset * 20}px) scale(${0.98 + offset * 0.02})`;
        }
    });
});
