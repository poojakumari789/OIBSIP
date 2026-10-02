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

document.addEventListener("DOMContentLoaded", () => {
    const skillsPage = document.querySelector(".skills-page");

    // Only run on the Skills page
    if (!skillsPage || !window.gsap || !window.ScrollTrigger) {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const animatedElements = document.querySelectorAll(
        ".skills-eyebrow, .skills-title, .skills-description, " +
        ".skills-meta, .skill-card, .tools-container, .skills-bottom-inner"
    );

    // Respect accessibility settings
    if (reduceMotion) {
        animatedElements.forEach((element) => {
            element.style.visibility = "visible";
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Add this class only after GSAP is available
    skillsPage.classList.add("gsap-ready");

    // HERO ANIMATION
    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    heroTimeline
        .fromTo(
            ".skills-eyebrow",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6 }
        )
        .fromTo(
            ".skills-title",
            { y: 50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.85 },
            "-=0.25"
        )
        .fromTo(
            ".skills-description",
            { y: 25, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.65 },
            "-=0.45"
        )
        .fromTo(
            ".skills-meta",
            { y: 15, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5 },
            "-=0.3"
        );

    // SKILL CARDS: STAGGERED SCROLL REVEAL
    gsap.fromTo(
        ".skill-card",
        {
            y: 45,
            autoAlpha: 0
        },
        {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            stagger: {
                each: 0.12,
                from: "start"
            },
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".skills-grid",
                start: "top 82%",
                once: true
            }
        }
    );

    // TOOLS SECTION
    gsap.fromTo(
        ".tools-container",
        {
            y: 35,
            autoAlpha: 0
        },
        {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".tools-section",
                start: "top 85%",
                once: true
            }
        }
    );

    // BOTTOM CTA
    gsap.fromTo(
        ".skills-bottom-inner",
        {
            y: 30,
            autoAlpha: 0
        },
        {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".skills-bottom",
                start: "top 85%",
                once: true
            }
        }
    );
});