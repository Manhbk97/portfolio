/* ─── NAVBAR SCROLL EFFECT ─────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Scrolled style
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Active nav link
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
});

/* ─── SMOOTH SCROLL ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 65, behavior: 'smooth' });
        // Close mobile nav
        document.querySelector('.nav-links').classList.remove('open');
    });
});

/* ─── MOBILE NAV TOGGLE ─────────────────────── */
document.getElementById('navToggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
});

/* ─── ANIMATED COUNTERS ─────────────────────── */
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 1200;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { el.textContent = target; clearInterval(timer); }
            else el.textContent = Math.floor(current);
        }, 16);
    });
}

/* ─── INTERSECTION OBSERVER ─────────────────── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger counters when stats row becomes visible
            if (entry.target.classList.contains('stats-row')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.proj-card, .news-item, .exp-card, .contact-card, .tl-item, .pubs-section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Observe stats-row separately for counter trigger
const statsRow = document.querySelector('.stats-row');
if (statsRow) observer.observe(statsRow);

/* ─── PROJECT FILTER ─────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.proj-card').forEach(card => {
            const tags = card.dataset.tags || '';
            if (filter === 'all' || tags.includes(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});