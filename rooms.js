document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const form = document.getElementById("roomsFinderForm");
    const message = document.getElementById("roomsFinderMessage");

    if (!form || !message) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const guests = formData.get("guests");
        const date = formData.get("date");
        const time = formData.get("time");
        const location = formData.get("location");
        const roomType = formData.get("roomType");
        const features = formData.get("features");

        const hasSelection =
            guests ||
            date ||
            time ||
            location ||
            roomType ||
            features;

        if (!hasSelection) {
            message.textContent =
                "Select at least one preference to find matching rooms.";
            message.classList.add("show");
            return;
        }

        const params = new URLSearchParams();

        if (guests) params.set("guests", guests);
        if (date) params.set("date", date);
        if (time) params.set("time", time);
        if (location) params.set("location", location);
        if (roomType) params.set("roomType", roomType);
        if (features) params.set("features", features);

        window.location.href = `rooms.html?${params.toString()}`;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const ambienceCards = document.querySelectorAll(
        ".rooms-ambience-card"
    );

    ambienceCards.forEach((card) => {
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

    const options = document.querySelectorAll(
        ".rooms-choice-option"
    );

    const image = document.getElementById(
        "roomsChoiceImage"
    );

    const scenario = document.getElementById(
        "roomsChoiceScenario"
    );

    const title = document.getElementById(
        "roomsChoiceTitle"
    );

    const description = document.getElementById(
        "roomsChoiceDescription"
    );

    if (
        !options.length ||
        !image ||
        !scenario ||
        !title ||
        !description
    ) {
        return;
    }

    options.forEach((option) => {
        option.addEventListener("click", () => {

            options.forEach((item) => {
                item.classList.remove("active");
            });

            option.classList.add("active");

            const newImage = option.dataset.image;
            const newTitle = option.dataset.title;
            const newScenario = option.dataset.scenario;
            const newDescription = option.dataset.description;
            const newAlt = option.dataset.alt;

            image.style.opacity = "0";

            setTimeout(() => {
                image.src = newImage;
                image.alt = newAlt;

                scenario.textContent =
                    newScenario.toUpperCase();

                title.textContent = newTitle;
                description.textContent = newDescription;

                image.style.opacity = "1";
            }, 180);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const ctaButtons = document.querySelectorAll(".rooms-cta-btn");

    ctaButtons.forEach((button) => {
        button.addEventListener("pointerenter", () => {
            button.classList.add("active");
        });

        button.addEventListener("pointerleave", () => {
            button.classList.remove("active");
        });
    });
});