document.addEventListener("DOMContentLoaded", () => {

    applySavedPreferences();

    createLucideIcons();

    initializeNavbar();

    initializeBackToTop();

});


/* =========================================================
   LUCIDE
========================================================= */

function createLucideIcons() {

    if (window.lucide) {

        window.lucide.createIcons();

    }

}


function setLucideIcon(element, iconName) {

    if (!element) {
        return;
    }

    element.innerHTML =
        `<i data-lucide="${iconName}"></i>`;

    createLucideIcons();

}


/* =========================================================
   STORAGE
========================================================= */

function getStorageItem(key) {

    try {

        return localStorage.getItem(key);

    } catch (error) {

        return null;

    }

}


function setStorageItem(key, value) {

    try {

        localStorage.setItem(key, value);

    } catch (error) {

        return;

    }

}


/* =========================================================
   SAVED PREFERENCES
========================================================= */

function applySavedPreferences() {

    const savedTheme =
        getStorageItem("theme");

    const savedDirection =
        getStorageItem("direction");


    /* Theme */

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

    }


    /* RTL */

    if (savedDirection === "rtl") {

        document.documentElement.setAttribute(
            "dir",
            "rtl"
        );

    } else {

        document.documentElement.setAttribute(
            "dir",
            "ltr"
        );

    }


    updateThemeLogos();

}


/* =========================================================
   THEME LOGOS
========================================================= */

function updateThemeLogos() {

    const headerLogo =
        document.getElementById("headerLogo");

    const footerLogo =
        document.getElementById("footerLogo");


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    const lightLogo =
        "logo_light.png";

    const darkLogo =
        "logo_dark.png";


    const currentLogo =
        isDark
            ? darkLogo
            : lightLogo;


    if (headerLogo) {

        headerLogo.src = currentLogo;

    }


    if (footerLogo) {

        footerLogo.src = currentLogo;

    }

}


/* =========================================================
   NAVBAR
========================================================= */

function initializeNavbar() {

    setupDarkMode();

    setupRTL();

    setupMobileMenu();

    setupMobileDropdowns();

    setActiveNavLink();

}


/* =========================================================
   DARK MODE
========================================================= */

function setupDarkMode() {

    const darkToggle =
        document.getElementById("darkToggle");


    if (!darkToggle) {

        return;

    }


    updateToggleIcons();


    darkToggle.addEventListener(
        "click",
        () => {

            const isDark =
                document.body.classList.toggle(
                    "dark-mode"
                );


            setStorageItem(
                "theme",
                isDark
                    ? "dark"
                    : "light"
            );


            updateToggleIcons();

            updateThemeLogos();

        }
    );

}


function updateToggleIcons() {

    const darkToggle =
        document.getElementById("darkToggle");


    if (!darkToggle) {

        return;

    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    setLucideIcon(
        darkToggle,
        isDark
            ? "sun"
            : "moon"
    );

}


/* =========================================================
   RTL
   JS ONLY CHANGES DIR ATTRIBUTE
========================================================= */

function setupRTL() {

    const rtlToggle =
        document.getElementById("rtlToggle");


    if (!rtlToggle) {

        return;

    }


    rtlToggle.addEventListener(
        "click",
        () => {

            const currentDirection =
                document.documentElement
                    .getAttribute("dir") || "ltr";


            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";


            document.documentElement
                .setAttribute(
                    "dir",
                    newDirection
                );


            setStorageItem(
                "direction",
                newDirection
            );

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    const navbar =
        document.getElementById(
            "mainNavbar"
        );


    if (!menuToggle || !navbar) {

        return;

    }


    menuToggle.addEventListener(
        "pointerup",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            toggleMobileMenu();

        }
    );


    /* Outside click */

    document.addEventListener(
        "pointerup",
        (event) => {

            if (window.innerWidth > 950) {

                return;

            }


            const clickedInsideNavbar =
                navbar.contains(event.target);


            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNavbar &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /* Resize */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 950) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   TOGGLE MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    const navbar =
        document.getElementById(
            "mainNavbar"
        );


    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    if (!navbar || !menuToggle) {

        return;

    }


    const isOpen =
        navbar.classList.toggle(
            "open"
        );


    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );


    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close menu"
            : "Open menu"
    );


    setLucideIcon(
        menuToggle,
        isOpen
            ? "x"
            : "menu"
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu() {

    const navbar =
        document.getElementById(
            "mainNavbar"
        );


    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    if (!navbar || !menuToggle) {

        return;

    }


    navbar.classList.remove(
        "open"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open menu"
    );


    setLucideIcon(
        menuToggle,
        "menu"
    );

}


/* =========================================================
   MOBILE DROPDOWN
========================================================= */

function setupMobileDropdowns() {

    const dropdowns =
        document.querySelectorAll(
            ".dropdown"
        );


    dropdowns.forEach(
        (dropdown) => {

            const trigger =
                dropdown.querySelector(
                    ".dropdown-trigger"
                );


            if (!trigger) {

                return;

            }


            trigger.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();


                    const isOpen =
                        dropdown.classList.contains(
                            "open"
                        );


                    closeAllDropdowns(
                        dropdown
                    );


                    if (!isOpen) {

                        dropdown.classList.add(
                            "open"
                        );


                        trigger.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    } else {

                        dropdown.classList.remove(
                            "open"
                        );


                        trigger.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );

        }
    );


    /* Close dropdown when clicking outside */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !event.target.closest(
                    ".dropdown"
                )
            ) {

                closeAllDropdowns();

            }

        }
    );

}


/* =========================================================
   CLOSE ALL DROPDOWNS
========================================================= */

function closeAllDropdowns(
    exceptDropdown = null
) {

    const dropdowns =
        document.querySelectorAll(
            ".dropdown"
        );


    dropdowns.forEach(
        (dropdown) => {

            if (
                dropdown === exceptDropdown
            ) {

                return;

            }


            dropdown.classList.remove(
                "open"
            );


            const trigger =
                dropdown.querySelector(
                    ".dropdown-trigger"
                );


            if (trigger) {

                trigger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================================
   ACTIVE NAV
   DEPLOYMENT SAFE VERSION
========================================================= */

function setActiveNavLink() {

    /*
        Get current deployed URL path.
        Example:
        /index.html
        /rooms.html
        /packages/classic.html
        /viberoomz/rooms.html
    */

    let currentPath =
        window.location.pathname || "/";


    /*
        Convert Windows-style slash if necessary
    */

    currentPath =
        currentPath.replace(/\\/g, "/");


    /*
        Remove duplicate slashes
    */

    currentPath =
        currentPath.replace(/\/+/g, "/");


    /*
        Remove trailing slash
        but keep root "/"
    */

    if (
        currentPath.length > 1 &&
        currentPath.endsWith("/")
    ) {

        currentPath =
            currentPath.slice(0, -1);

    }


    /*
        Current page name
    */

    let currentPage =
        currentPath
            .split("/")
            .filter(Boolean)
            .pop() || "index.html";


    currentPage =
        currentPage.toLowerCase();


    /*
        Deployment root:
        https://example.com/
        should behave as index.html
    */

    if (
        currentPage === "" ||
        currentPage === "/"
    ) {

        currentPage = "index.html";

    }


    /*
        If URL does not contain a file name,
        treat it as index.html.

        Example:
        /viberoomz/
        -> index.html
    */

    if (
        currentPath === "/" ||
        currentPath.endsWith("/")
    ) {

        currentPage = "index.html";

    }


    /*
        Remove old active states
    */

    document
        .querySelectorAll(
            ".nav-links li.active"
        )
        .forEach(
            (item) => {

                item.classList.remove(
                    "active"
                );

            }
        );


    /*
        =====================================================
        NORMAL NAVIGATION LINKS
        =====================================================
    */

    const normalLinks =
        document.querySelectorAll(
            ".nav-links > li > a:not(.dropdown-trigger)"
        );


    normalLinks.forEach(
        (link) => {

            const href =
                link.getAttribute("href");


            if (
                !href ||
                href === "#" ||
                href.startsWith("javascript:")
            ) {

                return;

            }


            const linkPage =
                normalizePageName(href);


            /*
                index.html should match:
                /
                /index.html
            */

            const isIndexPage =
                currentPage === "index.html" &&
                linkPage === "index.html";


            const isSamePage =
                linkPage === currentPage;


            if (
                isSamePage ||
                isIndexPage
            ) {

                link.parentElement.classList.add(
                    "active"
                );

            }

        }
    );


    /*
        =====================================================
        DROPDOWN LINKS
        =====================================================
    */

    const dropdown =
        document.querySelector(
            ".nav-links > li.dropdown"
        );


    const dropdownLinks =
        document.querySelectorAll(
            ".dropdown-menu a"
        );


    let dropdownMatched =
        false;


    dropdownLinks.forEach(
        (link) => {

            const href =
                link.getAttribute("href");


            if (
                !href ||
                href === "#" ||
                href.startsWith("javascript:")
            ) {

                return;

            }


            const linkPage =
                normalizePageName(href);


            const isSamePage =
                linkPage === currentPage;


            if (isSamePage) {

                /*
                    Active child link
                */

                link.parentElement.classList.add(
                    "active"
                );


                dropdownMatched =
                    true;

            }

        }
    );


    /*
        Parent dropdown becomes active
        when one of its child pages is active.
    */

    if (
        dropdown &&
        dropdownMatched
    ) {

        dropdown.classList.add(
            "active"
        );

    }

}


/* =========================================================
   NORMALIZE PAGE NAME
   DEPLOYMENT SAFE
========================================================= */

function normalizePageName(href) {

    if (!href) {

        return "";

    }


    let cleanHref =
        href.trim();


    /*
        Remove query string
        and hash
    */

    cleanHref =
        cleanHref
            .split("?")[0]
            .split("#")[0];


    /*
        Convert slash
    */

    cleanHref =
        cleanHref.replace(
            /\\/g,
            "/"
        );


    /*
        Remove duplicate slashes
    */

    cleanHref =
        cleanHref.replace(
            /\/+/g,
            "/"
        );


    /*
        Remove trailing slash
    */

    if (
        cleanHref.length > 1 &&
        cleanHref.endsWith("/")
    ) {

        cleanHref =
            cleanHref.slice(
                0,
                -1
            );

    }


    /*
        Empty href / root
        = index.html
    */

    if (
        cleanHref === "" ||
        cleanHref === "/"
    ) {

        return "index.html";

    }


    /*
        Get final path part
    */

    let page =
        cleanHref
            .split("/")
            .filter(Boolean)
            .pop() || "index.html";


    /*
        Convert to lowercase
    */

    page =
        page.toLowerCase();


    /*
        URL ending with "/" means index.html
    */

    if (
        cleanHref.endsWith("/")
    ) {

        page = "index.html";

    }


    return page;

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (!backToTop) {

        return;

    }


    backToTop.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}