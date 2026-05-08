// ── Theme Management ──────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('ran-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('ran-theme', next);
});

// ── Hamburger Menu ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
});

navMobile?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
    });
});

// ── Navbar Scroll Effect ──────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
}, { passive: true });

// ── Reveal on Scroll ──────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal-up, .reveal-right');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ── Active Nav Link ───────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--text)';
                    }
                });
            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// ── Smooth Scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Cursor Dot (desktop only) ─────────────────────────────
if (window.matchMedia('(hover: hover)').matches) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease, opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(dot);

    document.addEventListener('mousemove', e => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });

    document.querySelectorAll('a, button, .chip, .stat-pill').forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(4)';
            dot.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
            dot.style.opacity = '1';
        });
    });
}

// ── Hero Animations on Load ───────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#hero .reveal-up, #hero .reveal-right').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 50);
    });
});
