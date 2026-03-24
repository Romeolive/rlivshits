const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const navLinks = document.querySelectorAll(".menu a");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (burger && menu) {
    burger.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (menu.classList.contains("open")) {
            menu.classList.remove("open");
        }
    });
});

function updateActiveMenu() {
    let currentSection = "";

    sections.forEach((section) => {
        const top = section.offsetTop - 140;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        link.classList.toggle("active", href === `#${currentSection}`);
    });
}

window.addEventListener("scroll", updateActiveMenu);
window.addEventListener("load", updateActiveMenu);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 7;
        const rotateX = ((centerY - y) / centerY) * 7;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");
    });
});

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name");

        formNote.textContent =
            `Спасибо${name ? ", " + name : ""}! Сейчас это демонстрационная форма. Позже сюда можно подключить настоящую отправку сообщений.`;

        contactForm.reset();
    });
}