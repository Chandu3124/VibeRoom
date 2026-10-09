document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".packages-hero");

    if (!hero) {
        return;
    }

    const buttons = hero.querySelectorAll(".packages-hero-btn");

    buttons.forEach((button) => {
        button.addEventListener("pointerenter", () => {
            button.classList.add("active");
        });

        button.addEventListener("pointerleave", () => {
            button.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const cards = document.querySelectorAll(
        ".package-overview-card"
    );

    cards.forEach((card) => {
        card.addEventListener("pointerenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("active");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const packageCards = document.querySelectorAll(
        ".popular-package-card"
    );

    packageCards.forEach((card) => {
        card.addEventListener("pointerenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(
        ".birthday-package-card"
    );

    cards.forEach((card) => {
        card.addEventListener("pointerenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(
        ".group-corporate-package-card"
    );

    cards.forEach((card) => {
        card.addEventListener("pointerenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const addonCards = document.querySelectorAll(
        ".package-addon-card"
    );

    addonCards.forEach((card) => {
        card.addEventListener("pointerenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const tableRows = document.querySelectorAll(
        ".package-comparison-table tbody tr"
    );

    tableRows.forEach((row) => {
        row.addEventListener("pointerenter", () => {
            row.classList.add("active");
        });

        row.addEventListener("pointerleave", () => {
            row.classList.remove("active");
        });
    });
});