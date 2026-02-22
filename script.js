// JavaScript to handle animations and interactive elements

// Theme Management System
const themeBtn = document.getElementById('themeBtn');
const htmlElement = document.documentElement;
const themes = ['light', 'dark-theme', 'ocean-theme'];
let currentThemeIndex = 0;

// Load saved theme preference from localStorage
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    if (savedTheme !== 'light') {
        htmlElement.classList.add(savedTheme);
        currentThemeIndex = themes.indexOf(savedTheme);
    }
    updateThemeButton();
}

function updateThemeButton() {
    const themeEmojis = ['☀️', '🌙', '🌊'];
    const themeNames = ['Light', 'Dark', 'Ocean'];
    if (themeBtn) {
        themeBtn.textContent = themeEmojis[currentThemeIndex];
        themeBtn.title = `Current: ${themeNames[currentThemeIndex]} Theme`;
    }
}

// Theme switcher button click event
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        // Remove current theme class if not light
        if (currentThemeIndex > 0) {
            htmlElement.classList.remove(themes[currentThemeIndex]);
        }
        
        // Move to next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        
        // Add new theme class if not light
        if (currentThemeIndex > 0) {
            htmlElement.classList.add(themes[currentThemeIndex]);
        }
        
        // Save preference
        localStorage.setItem('portfolio-theme', themes[currentThemeIndex]);
        updateThemeButton();
    });
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

const handleScroll = () => {
    if (scrollToTopBtn && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
        scrollToTopBtn.style.display = "flex";
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.display = "none";
    }
};

window.addEventListener('scroll', debounce(handleScroll, 100));

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Intersection Observer for Animations
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(callback, observerOptions);

sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});
