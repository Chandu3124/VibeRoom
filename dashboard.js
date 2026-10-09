document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const html = document.documentElement;

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const menuLinks = document.querySelectorAll(".menu-link[data-section]");
    const sections = document.querySelectorAll(".content-section");
    const themeToggle = document.getElementById("themeToggle");
    const rtlToggle = document.getElementById("rtlToggle");
    const siteLogo = document.getElementById("siteLogo");
    const profileDropdown = document.getElementById("profileDropdown");
    const profileTrigger = document.getElementById("profileTrigger");
    const logoutBtn = document.getElementById("logoutBtn");
    const profileLogout = document.getElementById("profileLogout");
    const logoutModal = document.getElementById("logoutModal");
    const cancelLogout = document.getElementById("cancelLogout");
    const confirmLogout = document.getElementById("confirmLogout");
    const topTitle = document.getElementById("topTitle");
    const topSubtitle = document.getElementById("topSubtitle");
    const saveProfile = document.getElementById("saveProfile");


    const sectionInfo = {

        dashboard: {
            title: "Welcome back, Chandra Shekar",
            subtitle: "Ready to plan your next party night?"
        },

        bookings: {
            title: "My Bookings",
            subtitle: "Track your VibeRoomz reservations."
        },

        rooms: {
            title: "Explore Rooms",
            subtitle: "Find the perfect room for your next party."
        },

        packages: {
            title: "Packages",
            subtitle: "Choose a package that matches your celebration."
        },

        events: {
            title: "Events",
            subtitle: "Discover upcoming nights and theme events."
        },

        payments: {
            title: "Payments",
            subtitle: "Manage your VibeRoomz payment history."
        },

        profile: {
            title: "Your Profile",
            subtitle: "Manage your customer information."
        }

    };


    /* =====================================================
       STORAGE
    ===================================================== */

    const storage = {

        get(key) {

            try {
                return localStorage.getItem(key);
            }

            catch (error) {
                return null;
            }

        },

        set(key, value) {

            try {
                localStorage.setItem(key, value);
            }

            catch (error) {
                return;
            }

        }

    };


    /* =====================================================
       LOGO
    ===================================================== */

    function updateLogo() {

        if (!siteLogo) {
            return;
        }

        const isDark =
            body.classList.contains("dark-mode");

        const lightLogo =
            siteLogo.dataset.lightLogo || "logo_light.png";

        const darkLogo =
            siteLogo.dataset.darkLogo || "logo_dark.png";

        siteLogo.src =
            isDark ? darkLogo : lightLogo;

    }


    /* =====================================================
       THEME
    ===================================================== */

    function updateThemeIcon() {

        if (!themeToggle) {
            return;
        }

        const icon =
            themeToggle.querySelector("i");

        const isDark =
            body.classList.contains("dark-mode");

        if (icon) {

            icon.className =
                isDark
                    ? "fa-solid fa-sun"
                    : "fa-solid fa-moon";

        }

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "aria-pressed",
            String(isDark)
        );

    }


    function applyTheme(isDark, save = true) {

        body.classList.toggle(
            "dark-mode",
            isDark
        );

        html.dataset.theme =
            isDark ? "dark" : "light";


        if (save) {

            storage.set(
                "theme",
                isDark ? "dark" : "light"
            );

        }


        updateThemeIcon();
        updateLogo();


        window.dispatchEvent(
            new CustomEvent(
                "viberoomz-theme-change",
                {
                    detail: {
                        theme:
                            isDark
                                ? "dark"
                                : "light"
                    }
                }
            )
        );

    }


    themeToggle?.addEventListener(
        "click",
        () => {

            const isDark =
                body.classList.contains("dark-mode");

            applyTheme(!isDark);

        }
    );


    /* =====================================================
       RTL
    ===================================================== */

    function updateRTLButton() {

        if (!rtlToggle) {
            return;
        }

        const isRTL =
            html.getAttribute("dir") === "rtl";


        rtlToggle.setAttribute(
            "aria-label",
            isRTL
                ? "Switch to left-to-right layout"
                : "Switch to right-to-left layout"
        );


        rtlToggle.setAttribute(
            "title",
            isRTL
                ? "Switch to left-to-right layout"
                : "Switch to right-to-left layout"
        );


        rtlToggle.setAttribute(
            "aria-pressed",
            String(isRTL)
        );

    }


    function applyRTL(isRTL, save = true) {

        /*
            TRUE  = RTL
            FALSE = LTR
        */

        const direction =
            isRTL ? "rtl" : "ltr";


        /* Apply direction */
        html.setAttribute(
            "dir",
            direction
        );


        /* Also update body direction */
        body.setAttribute(
            "dir",
            direction
        );


        /* Save direction */
        if (save) {

            storage.set(
                "direction",
                direction
            );

        }


        /* Update button */
        updateRTLButton();


        /* Close mobile sidebar */
        if (window.innerWidth <= 1000) {

            sidebar?.classList.remove("open");

            mobileOverlay?.classList.remove("show");

            mobileOverlay?.setAttribute(
                "aria-hidden",
                "true"
            );

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );


            if (menuToggle) {

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        }


        /* Notify RTL change */
        window.dispatchEvent(
            new CustomEvent(
                "viberoomz-direction-change",
                {
                    detail: {
                        direction: direction
                    }
                }
            )
        );

    }


    /* =====================================================
       RTL BUTTON
       LTR → RTL
       RTL → LTR
    ===================================================== */

    rtlToggle?.addEventListener(
        "click",
        () => {

            const currentDirection =
                html.getAttribute("dir") || "ltr";


            const isCurrentlyRTL =
                currentDirection === "rtl";


            /*
                If current = RTL
                    → change to LTR

                If current = LTR
                    → change to RTL
            */

            applyRTL(
                !isCurrentlyRTL,
                true
            );

        }
    );


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    function openSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.add("open");

        mobileOverlay?.classList.add("show");

        mobileOverlay?.setAttribute(
            "aria-hidden",
            "false"
        );

        menuToggle?.setAttribute(
            "aria-expanded",
            "true"
        );


        if (menuToggle) {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );

        }

    }


    function closeSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("open");

        mobileOverlay?.classList.remove("show");

        mobileOverlay?.setAttribute(
            "aria-hidden",
            "true"
        );

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );


        if (menuToggle) {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    }


    menuToggle?.addEventListener(
        "click",
        () => {

            sidebar?.classList.contains("open")
                ? closeSidebar()
                : openSidebar();

        }
    );


    mobileOverlay?.addEventListener(
        "click",
        closeSidebar
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 1000) {
                closeSidebar();
            }

        }
    );


    /* =====================================================
       PROFILE DROPDOWN
    ===================================================== */

    profileTrigger?.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            const isOpen =
                profileDropdown.classList.toggle(
                    "open"
                );

            profileTrigger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    document.addEventListener(
        "click",
        (event) => {

            if (
                profileDropdown &&
                !profileDropdown.contains(event.target)
            ) {

                profileDropdown.classList.remove(
                    "open"
                );

                profileTrigger?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       SECTION NAVIGATION
    ===================================================== */

    function showSection(sectionId) {

        const targetSection =
            document.getElementById(sectionId);

        if (!targetSection) {
            return;
        }


        menuLinks.forEach(
            (link) => {

                link.classList.toggle(
                    "active",
                    link.dataset.section === sectionId
                );

            }
        );


        sections.forEach(
            (section) => {

                section.classList.remove(
                    "active-section"
                );

            }
        );


        targetSection.classList.add(
            "active-section"
        );


        if (sectionInfo[sectionId]) {

            if (topTitle) {

                topTitle.textContent =
                    sectionInfo[sectionId].title;

            }


            if (topSubtitle) {

                topSubtitle.textContent =
                    sectionInfo[sectionId].subtitle;

            }

        }


        profileDropdown?.classList.remove(
            "open"
        );

        profileTrigger?.setAttribute(
            "aria-expanded",
            "false"
        );


        if (window.innerWidth <= 1000) {
            closeSidebar();
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    menuLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    showSection(
                        link.dataset.section
                    );

                }
            );

        }
    );


    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "[data-target]"
                );

            if (!button) {
                return;
            }


            const target =
                button.dataset.target;


            if (target) {
                showSection(target);
            }

        }
    );


    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        showSection(
                            button.dataset.profileSection
                        );

                    }
                );

            }
        );


    /* =====================================================
       LOGOUT
    ===================================================== */

    function openLogoutModal() {

        if (!logoutModal) {
            return;
        }

        logoutModal.style.display =
            "flex";

        body.classList.add(
            "modal-open"
        );

        profileDropdown?.classList.remove(
            "open"
        );

        profileTrigger?.setAttribute(
            "aria-expanded",
            "false"
        );

        confirmLogout?.focus();

    }


    function closeLogoutModal() {

        if (logoutModal) {

            logoutModal.style.display =
                "none";

        }

        body.classList.remove(
            "modal-open"
        );

        logoutBtn?.focus();

    }


    logoutBtn?.addEventListener(
        "click",
        openLogoutModal
    );


    profileLogout?.addEventListener(
        "click",
        openLogoutModal
    );


    cancelLogout?.addEventListener(
        "click",
        closeLogoutModal
    );


    confirmLogout?.addEventListener(
        "click",
        () => {

            closeLogoutModal();

            alert(
                "You have been logged out from VibeRoomz."
            );

        }
    );


    logoutModal?.addEventListener(
        "click",
        (event) => {

            if (
                event.target === logoutModal
            ) {

                closeLogoutModal();

            }

        }
    );


    /* =====================================================
       PROFILE SAVE
    ===================================================== */

    saveProfile?.addEventListener(
        "click",
        () => {

            const originalText =
                saveProfile.textContent;

            saveProfile.textContent =
                "Saved Successfully";

            saveProfile.disabled =
                true;


            window.setTimeout(
                () => {

                    saveProfile.textContent =
                        originalText;

                    saveProfile.disabled =
                        false;

                },
                1800
            );

        }
    );


    /* =====================================================
       BOOKING DETAILS
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    ".small-btn"
                );

            if (!button) {
                return;
            }

            alert(
                "Booking details are available in your reservation."
            );

        }
    );


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            closeSidebar();


            if (
                logoutModal &&
                logoutModal.style.display === "flex"
            ) {

                closeLogoutModal();

            }


            profileDropdown?.classList.remove(
                "open"
            );

            profileTrigger?.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );


    /* =====================================================
       STORAGE SYNC
    ===================================================== */

    window.addEventListener(
        "storage",
        (event) => {

            if (event.key === "theme") {

                applyTheme(
                    event.newValue === "dark",
                    false
                );

            }


            if (event.key === "direction") {

                applyRTL(
                    event.newValue === "rtl",
                    false
                );

            }

        }
    );


    /* =====================================================
       THEME EVENT
    ===================================================== */

    window.addEventListener(
        "viberoomz-theme-change",
        (event) => {

            const theme =
                event.detail?.theme || "light";


            body.classList.toggle(
                "dark-mode",
                theme === "dark"
            );


            html.dataset.theme =
                theme;


            updateThemeIcon();
            updateLogo();

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    const savedTheme =
        storage.get("theme") ||
        (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light"
        );


    const savedDirection =
        storage.get("direction") ||
        html.getAttribute("dir") ||
        "ltr";


    /* Apply saved theme */
    applyTheme(
        savedTheme === "dark",
        false
    );


    /* Apply saved RTL/LTR */
    applyRTL(
        savedDirection === "rtl",
        false
    );


    updateLogo();
    updateThemeIcon();
    updateRTLButton();

});