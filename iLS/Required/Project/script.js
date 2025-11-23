//Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 250;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

reveal();


//About Section
const getStartedBtn = document.querySelector('.get-started');

getStartedBtn.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    const offset = 200;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = aboutSection.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

// Scroll to Top
const logoLink = document.querySelector('.nav-logo');

logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    const bg = document.getElementById('bg');
    const scroll = window.scrollY;
    bg.style.transform = `translateY(${-scroll * 0.3}px)`;
});

// Section Fade
const sections = document.querySelectorAll('.about, .history, .order, .order-form');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => observer.observe(section));

//Hidden List
const title = document.getElementById('project-title');
const peopleSection = document.getElementById('people-behind');

title.addEventListener('click', () => {
    peopleSection.classList.toggle('hidden');
});
