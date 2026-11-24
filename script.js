
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    const year = document.getElementById("currentYear");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // COPYRIGHT YEAR

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // STICKY HEADER

    function updateHeader() {
        if (header) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );
        }
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();

    // MOBILE NAVIGATION

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("show");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("show");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // SCROLL REVEAL

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !reduceMotion) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        currentObserver.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }

    // ACTIVE NAVIGATION

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    navigationLinks.forEach(link => {

                        const isActive =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle(
                            "active",
                            isActive
                        );
                    });
                });

            },
            {
                rootMargin: "-35% 0px -58% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // CONTACT FORM VALIDATION

    if (form && formStatus) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("name")
                .value.trim();

            const email =
                document.getElementById("email")
                .value.trim();

            const subject =
                document.getElementById("subject")
                .value;

            const message =
                document.getElementById("message")
                .value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            formStatus.textContent = "";

            if (!name || !email || !subject || !message) {

                formStatus.style.color = "#b91c1c";

                formStatus.textContent =
                    "Please complete all required fields.";

                return;
            }

            if (!emailPattern.test(email)) {

                formStatus.style.color = "#b91c1c";

                formStatus.textContent =
                    "Please enter a valid email address.";

                return;
            }

            formStatus.style.color = "#8a5a08";

            formStatus.textContent =
                "Your details passed browser validation, " +
                "but your enquiry has NOT been sent. " +
                "This demonstration form is not connected " +
                "to an enquiry delivery service. Please use " +
                "our official contact page or email address.";

        });
    }

    // FAQ DETAILS ELEMENTS USE NATIVE BROWSER BEHAVIOUR.
    // SERVICE DETAILS ALSO USE NATIVE BROWSER BEHAVIOUR.

    console.log(
        "Affinity Steps website initialized."
    );

});
