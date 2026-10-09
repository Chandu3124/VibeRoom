document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    /* =====================================================
       HERO
    ===================================================== */

    const hero = document.querySelector(".party-hero");

    if (!hero) {
        return;
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = hero.querySelector(".party-header");

    const updateHeader = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {

            header.style.background =
                "rgba(5, 7, 17, .72)";

            header.style.backdropFilter =
                "blur(12px)";

            header.style.webkitBackdropFilter =
                "blur(12px)";

        } else {

            header.style.background =
                "transparent";

            header.style.backdropFilter =
                "none";

            header.style.webkitBackdropFilter =
                "none";
        }
    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const motionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const updateMotion = () => {

        if (motionQuery.matches) {

            hero.style.setProperty(
                "--hero-transition",
                "none"
            );

        } else {

            hero.style.setProperty(
                "--hero-transition",
                ""
            );

        }
    };


    updateMotion();


    if (
        typeof motionQuery.addEventListener ===
        "function"
    ) {

        motionQuery.addEventListener(
            "change",
            updateMotion
        );

    }

});

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("quickRoomSearchForm");
    const result = document.getElementById("quickSearchResult");

    if (!form) {
        return;
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const date = document.getElementById("quickSearchDate").value;
        const time = document.getElementById("quickSearchTime").value;
        const guests = document.getElementById("quickSearchGuests").value;
        const capacity =
            document.getElementById("quickSearchCapacity").value;

        if (!date || !time || !guests || !capacity) {
            result.textContent =
                "Please select all booking details.";
            return;
        }

        result.textContent =
            "Checking available rooms...";

        const params = new URLSearchParams({
            date,
            time,
            guests,
            capacity
        });

        setTimeout(() => {

            window.location.href =
                `rooms.html?${params.toString()}`;

        }, 500);

    });

});

document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const options = document.querySelectorAll(".food-option");
    const selectedAddon = document.getElementById("selectedAddon");

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    if (!options.length || !selectedAddon) {
        return;
    }

    options.forEach((option) => {
        option.addEventListener("click", () => {
            options.forEach((item) => {
                item.classList.remove("active");
            });

            option.classList.add("active");

            const addon = option.getAttribute("data-addon");

            if (addon) {
                selectedAddon.textContent = addon;
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const eventItems = document.querySelectorAll(".event-item");

    const featuredImage = document.getElementById("eventFeaturedImage");
    const featuredBadge = document.getElementById("eventFeaturedBadge");
    const featuredType = document.getElementById("eventFeaturedType");
    const featuredDate = document.getElementById("eventFeaturedDate");
    const featuredTitle = document.getElementById("eventFeaturedTitle");
    const featuredDescription = document.getElementById("eventFeaturedDescription");

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    if (
        !eventItems.length ||
        !featuredImage ||
        !featuredBadge ||
        !featuredType ||
        !featuredDate ||
        !featuredTitle ||
        !featuredDescription
    ) {
        return;
    }

    const eventData = {
        karaoke: {
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=90",
            alt: "Karaoke night event with colorful party lighting",
            badge: "THIS WEEK",
            type: "LIVE KARAOKE",
            date: "FRIDAY · 8 PM",
            title: "Karaoke Night",
            description:
                "Grab the mic, choose your favourite songs and turn the room into your own private stage."
        },

        dj: {
            image: "https://images.openai.com/static-rsc-4/rhdnAJwtL6lSpsR6MCkRcjwIn9ipac25lWkiJ-iFa7hGNDxcxbtki1sS6qwVmNzeF7nV9NCwfqTZw4Jku70tBlLWD6fWmMVAmrxgoVBOgfBTkQLJyYuV_ABtbCC9cbz1uJ8E8wPII-dmzIOEEcL3mhdWdw8WlFiDXEmrup24RM0Yhl69d2Dr0ON2fNYC6r-v?purpose=fullsize",
            alt: "DJ performing at a party",
            badge: "FRIDAY NIGHT",
            type: "DJ NIGHT",
            date: "FRIDAY · 9 PM",
            title: "DJ Night",
            description:
                "Turn up the energy with powerful beats, dynamic lights and a private party atmosphere."
        },

        theme: {
            image: "https://images.openai.com/static-rsc-4/viMi0H9XMylOm9SC3RMBOQG1SvHsrByckP21tXkjmuxv6JWMVNYC7TuFdShcBRYKici3RYHQtcvtjD3dpGyLwa9wJMTvqlDdeSevGKKNqRSs-dgioxW3phW3wseJaQjoQ-S8GrlOwkDHrWiGVXfO7qT8l5YHCibWt0NFxGtA4P-MyrHgYuaZOCgNpoAvHea5?purpose=fullsize",
            alt: "Colorful themed party celebration",
            badge: "COMING SOON",
            type: "THEMED PARTY",
            date: "SATURDAY · 7 PM",
            title: "Theme Party",
            description:
                "Pick your look, bring your crew and step into a themed night packed with music and celebration."
        },

        weekend: {
            image: "https://images.openai.com/static-rsc-4/5eSf3TgV27s4Z7YUcIDK5pVtaB6kCPxY-OzypMUPLKYoNPssxq7iFmfuMIfI0kj3aNXJ717eXgrCaCuMte5oeK2KNYYdkpIgu8XheVi8QJqVZvT7lI5fu-nRk6mThqDrdpyhxhozIGAg_23c-gtnrdGagrYdPWHGuuc2qYO5B1Etwz0-Nsm85CRmvewWvWTR?purpose=fullsize",
            alt: "Friends enjoying a private party",
            badge: "EVERY WEEKEND",
            type: "WEEKEND PARTY",
            date: "SATURDAY · 8 PM",
            title: "Weekend Party",
            description:
                "Make your weekend count with private rooms, great music, delicious food and nonstop party vibes."
        },

        special: {
            image: "https://images.openai.com/static-rsc-4/FsdjZkPf4AemaBTbZTD5pxsArPfy_oW1Lkt2H1wbM0RtDxAhUSaMKaYE950LsUse7w-fq60WfkWpC4KYE8_CgSQCbO77oRSf3hv9_ydKU2Xz6GV4pe-JKTW3VSh9wG-SGb8ZUe8ViQopAv7vtMFbsm75Xc5ZpBbD2Ttkqi7tDqKCeQTJTA9MXCqQcNXoZVgn?purpose=fullsize",
            alt: "Special celebration event",
            badge: "SPECIAL EVENTS",
            type: "PRIVATE CELEBRATION",
            date: "SELECT DATES",
            title: "Special Events",
            description:
                "From birthdays to private celebrations, create a custom experience designed around your special occasion."
        }
    };

    eventItems.forEach((item) => {
        item.addEventListener("click", () => {
            const eventKey = item.dataset.event;
            const data = eventData[eventKey];

            if (!data) {
                return;
            }

            eventItems.forEach((eventItem) => {
                eventItem.classList.remove("active");
            });

            item.classList.add("active");

            featuredImage.style.opacity = "0";

            setTimeout(() => {
                featuredImage.src = data.image;
                featuredImage.alt = data.alt;
                featuredBadge.textContent = data.badge;
                featuredType.textContent = data.type;
                featuredDate.textContent = data.date;
                featuredTitle.textContent = data.title;
                featuredDescription.textContent = data.description;

                featuredImage.style.opacity = "1";

                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }
            }, 180);
        });
    });
});