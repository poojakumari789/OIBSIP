// =========================
// Smooth scrolling
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// =========================
// Active navigation link
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});


// =========================
// Project link message
// =========================

const projectLinks = document.querySelectorAll(".project-link");

projectLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        if (this.getAttribute("href") === "#") {
            event.preventDefault();

            alert("Project link will be added soon.");
        }

    });

});


// =========================
// Contact button
// =========================

const contactButton = document.querySelector(
    '.contact a[href^="mailto:"]'
);

if (contactButton) {

    contactButton.addEventListener("click", () => {
        console.log("Opening email...");
    });

}


// =========================
// Simple reveal animation
// =========================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill, .project-card, .contact-content"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});