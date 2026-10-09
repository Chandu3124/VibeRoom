document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    /* =====================================================
       HERO ELEMENTS
    ===================================================== */

    const hero = document.querySelector(
        ".home2-entertainment-hero"
    );

    const heroBg = document.querySelector(
        ".home2-entertainment-hero-bg"
    );


    if (!hero || !heroBg) {
        return;
    }


    /* =====================================================
       SUBTLE MOUSE PARALLAX
    ===================================================== */

    hero.addEventListener("pointermove", (event) => {

        const rect = hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;


        heroBg.style.transform = `
            scale(1.05)
            translate(${x * -10}px, ${y * -6}px)
        `;
    });


    /* =====================================================
       RESET PARALLAX
    ===================================================== */

    hero.addEventListener("pointerleave", () => {

        heroBg.style.transform =
            "scale(1.03) translate(0, 0)";
    });

});
document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const vibeCards = document.querySelectorAll(
        ".home2-vibe-card"
    );

    if (!vibeCards.length) {
        return;
    }

    vibeCards.forEach((card) => {

        card.addEventListener("pointerenter", () => {

            vibeCards.forEach((item) => {
                item.classList.remove("active");
            });

            card.classList.add("active");

        });

        card.addEventListener("focus", () => {

            vibeCards.forEach((item) => {
                item.classList.remove("active");
            });

            card.classList.add("active");

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const roomOptions = document.querySelectorAll(
        ".home2-room-option"
    );

    const selectedRoomName = document.getElementById(
        "selectedRoomName"
    );

    const selectedRoomCapacity = document.getElementById(
        "selectedRoomCapacity"
    );

    const selectedRoomDescription = document.getElementById(
        "selectedRoomDescription"
    );

    if (
        !roomOptions.length ||
        !selectedRoomName ||
        !selectedRoomCapacity ||
        !selectedRoomDescription
    ) {
        return;
    }

    roomOptions.forEach((option) => {

        option.addEventListener("click", () => {

            roomOptions.forEach((item) => {
                item.classList.remove("active");
            });

            option.classList.add("active");

            const room =
                option.getAttribute("data-room");

            const capacity =
                option.getAttribute("data-capacity");

            const description =
                option.getAttribute("data-description");

            selectedRoomName.textContent =
                room || "Selected Room";

            selectedRoomCapacity.textContent =
                capacity || "—";

            selectedRoomDescription.textContent =
                description ||
                "A private party room designed around your group.";

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const amenityCards = document.querySelectorAll(
        ".home2-amenity-card"
    );

    if (!amenityCards.length) {
        return;
    }

    amenityCards.forEach((card) => {

        card.addEventListener("pointerenter", () => {
            card.classList.add("is-hovered");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("is-hovered");
        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const packageCards = document.querySelectorAll(
        ".home2-package-card"
    );

    if (!packageCards.length) {
        return;
    }

    packageCards.forEach((card) => {

        card.addEventListener("pointerenter", () => {

            packageCards.forEach((item) => {
                item.classList.remove("active");
            });

            card.classList.add("active");
        });

        card.addEventListener("focusin", () => {

            packageCards.forEach((item) => {
                item.classList.remove("active");
            });

            card.classList.add("active");
        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const moments = document.querySelectorAll(
        ".home2-moment"
    );

    if (!moments.length) {
        return;
    }

    moments.forEach((moment) => {

        moment.addEventListener("pointerenter", () => {
            moment.classList.add("is-active");
        });

        moment.addEventListener("pointerleave", () => {
            moment.classList.remove("is-active");
        });

        moment.addEventListener("focusin", () => {
            moment.classList.add("is-active");
        });

        moment.addEventListener("focusout", () => {
            moment.classList.remove("is-active");
        });

    });

});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const locationVisual = document.querySelector(
        ".home2-location-visual"
    );

    const locationImage = locationVisual?.querySelector("img");

    if (!locationVisual || !locationImage) {
        return;
    }

    locationVisual.addEventListener("pointermove", (event) => {
        const rect = locationVisual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        locationImage.style.transform =
            `scale(1.06) translate(${x * 5}px, ${y * 5}px)`;
    });

    locationVisual.addEventListener("pointerleave", () => {
        locationImage.style.transform = "scale(1)";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const steps = document.querySelectorAll(".home2-book-step");

    steps.forEach((step) => {
        step.addEventListener("pointerenter", () => {
            step.classList.add("active");
        });

        step.addEventListener("pointerleave", () => {
            step.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const ctaButtons = document.querySelectorAll(
        ".home2-booking-cta-btn"
    );

    ctaButtons.forEach((button) => {
        button.addEventListener("pointerenter", () => {
            button.classList.add("active");
        });

        button.addEventListener("pointerleave", () => {
            button.classList.remove("active");
        });
    });
});