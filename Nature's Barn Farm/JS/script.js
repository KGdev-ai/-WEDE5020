
document.addEventListener("DOMContentLoaded", function () {

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
        heroContent.classList.add("show");
    }

    const revealElements = document.querySelectorAll(
        ".card, .service-card, .gallery-item, .about-text"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    const currentPage = window.location.pathname.split("/").pop()
        || "index.html";

    document.querySelectorAll("nav a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");
            const feedback = document.getElementById("formFeedback");

            if (!name || !email || !message || !feedback) {
                return;
            }

            feedback.textContent = "";
            feedback.className = "form-feedback";

            if (!name.value.trim()) {
                feedback.textContent = "Please enter your full name.";
                feedback.classList.add("error");
                name.focus();
                return;
            }

            if (!email.value.trim() || !email.validity.valid) {
                feedback.textContent = "Please enter a valid email address.";
                feedback.classList.add("error");
                email.focus();
                return;
            }

            if (message.value.trim().length < 10) {
                feedback.textContent =
                    "Your message must contain at least 10 characters.";
                feedback.classList.add("error");
                message.focus();
                return;
            }

            feedback.textContent =
                "Thank you, " + name.value.trim() +
                "! Your enquiry has been validated successfully.";

            feedback.classList.add("success");

            contactForm.reset();
        });
    }

});
