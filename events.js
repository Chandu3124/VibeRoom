document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const eventCards = document.querySelectorAll(".event-card");

    eventCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("active");
        });

        card.addEventListener("focusin", () => {
            card.classList.add("active");
        });

        card.addEventListener("focusout", () => {
            card.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const eventRows = document.querySelectorAll(
        ".events-calendar-table tbody tr"
    );

    eventRows.forEach((row) => {
        row.addEventListener("mouseenter", () => {
            row.classList.add("active");
        });

        row.addEventListener("mouseleave", () => {
            row.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".group-event-card");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("active");
        });

        card.addEventListener("focusin", () => {
            card.classList.add("active");
        });

        card.addEventListener("focusout", () => {
            card.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const steps = document.querySelectorAll(".host-event-step");

    steps.forEach((step) => {
        step.addEventListener("mouseenter", () => {
            step.classList.add("active");
        });

        step.addEventListener("mouseleave", () => {
            step.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const galleryCards = document.querySelectorAll(".event-gallery-card");

    galleryCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("is-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const enquireButton = document.querySelector(".events-cta-btn");

    if (!enquireButton) {
        return;
    }

    enquireButton.addEventListener("mouseenter", () => {
        enquireButton.classList.add("is-active");
    });

    enquireButton.addEventListener("mouseleave", () => {
        enquireButton.classList.remove("is-active");
    });
});