document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const body = document.body;

    const loginCard =
        document.getElementById("loginCard");

    const signupCard =
        document.getElementById("signupCard");

    const showSignup =
        document.getElementById("showSignup");

    const showLogin =
        document.getElementById("showLogin");

    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");

    const loginMessage =
        document.getElementById("loginMessage");

    const signupMessage =
        document.getElementById("signupMessage");

    const themeToggle =
        document.getElementById("authThemeToggle");

    const rtlToggle =
        document.getElementById("authRtlToggle");


    const THEME_KEY = "theme";
    const DIRECTION_KEY = "direction";


    function getStorage(key, fallback = null) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (error) {
            return fallback;
        }
    }


    function setStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            return;
        }
    }


    function refreshIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }


    function updateLogos(isDark) {
        document
            .querySelectorAll(
                "[data-light-logo][data-dark-logo]"
            )
            .forEach((logo) => {
                logo.src = isDark
                    ? logo.dataset.darkLogo
                    : logo.dataset.lightLogo;
            });
    }


    function applyTheme(theme, broadcast = false) {
        const isDark = theme === "dark";

        html.dataset.theme =
            isDark ? "dark" : "light";

        body.classList.toggle(
            "dark-mode",
            isDark
        );

        updateLogos(isDark);

        if (themeToggle) {
            themeToggle.innerHTML = `
                <i data-lucide="${isDark ? "sun" : "moon"}"></i>
            `;

            themeToggle.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                String(isDark)
            );
        }

        refreshIcons();

        if (broadcast) {
            window.dispatchEvent(
                new CustomEvent(
                    "viberoomz-theme-change",
                    {
                        detail: {
                            theme: isDark
                                ? "dark"
                                : "light"
                        }
                    }
                )
            );
        }
    }


    function applyDirection(
        direction,
        broadcast = false
    ) {
        const isRTL =
            direction === "rtl";

        html.dir =
            isRTL ? "rtl" : "ltr";

        if (rtlToggle) {
            rtlToggle.innerHTML = `
                <i data-lucide="arrow-left-right"></i>
            `;

            rtlToggle.setAttribute(
                "aria-label",
                isRTL
                    ? "Switch to left-to-right layout"
                    : "Switch to right-to-left layout"
            );

            rtlToggle.setAttribute(
                "aria-pressed",
                String(isRTL)
            );
        }

        refreshIcons();

        if (broadcast) {
            window.dispatchEvent(
                new CustomEvent(
                    "viberoomz-direction-change",
                    {
                        detail: {
                            direction: isRTL
                                ? "rtl"
                                : "ltr"
                        }
                    }
                )
            );
        }
    }


    function clearMessages() {
        [
            loginMessage,
            signupMessage
        ].forEach((message) => {
            if (!message) {
                return;
            }

            message.textContent = "";
            message.classList.remove("success");
        });
    }


    function showMessage(
        element,
        message,
        type = "error"
    ) {
        if (!element) {
            return;
        }

        element.textContent = message;

        element.classList.toggle(
            "success",
            type === "success"
        );
    }


    function openSignup() {
        loginCard.hidden = true;
        signupCard.hidden = false;

        clearMessages();
        refreshIcons();

        document
            .getElementById("signupName")
            ?.focus();
    }


    function openLogin() {
        signupCard.hidden = true;
        loginCard.hidden = false;

        clearMessages();
        refreshIcons();

        document
            .getElementById("loginEmail")
            ?.focus();
    }


    function setupPasswordToggle(
        buttonId,
        inputId
    ) {
        const button =
            document.getElementById(buttonId);

        const input =
            document.getElementById(inputId);

        if (!button || !input) {
            return;
        }

        button.addEventListener(
            "click",
            () => {
                const shouldShow =
                    input.type === "password";

                input.type =
                    shouldShow
                        ? "text"
                        : "password";

                button.setAttribute(
                    "aria-label",
                    shouldShow
                        ? "Hide password"
                        : "Show password"
                );

                button.setAttribute(
                    "aria-pressed",
                    String(shouldShow)
                );

                button.innerHTML = `
                    <i data-lucide="${shouldShow ? "eye-off" : "eye"}"></i>
                `;

                refreshIcons();
                input.focus();
            }
        );
    }


    setupPasswordToggle(
        "loginPasswordToggle",
        "loginPassword"
    );

    setupPasswordToggle(
        "signupPasswordToggle",
        "signupPassword"
    );

    setupPasswordToggle(
        "signupConfirmPasswordToggle",
        "signupConfirmPassword"
    );


    showSignup?.addEventListener(
        "click",
        openSignup
    );

    showLogin?.addEventListener(
        "click",
        openLogin
    );


    themeToggle?.addEventListener(
        "click",
        () => {
            const currentTheme =
                html.dataset.theme === "dark"
                    ? "dark"
                    : "light";

            const nextTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            setStorage(
                THEME_KEY,
                nextTheme
            );

            applyTheme(
                nextTheme,
                true
            );
        }
    );


    rtlToggle?.addEventListener(
        "click",
        () => {
            const currentDirection =
                html.dir === "rtl"
                    ? "rtl"
                    : "ltr";

            const nextDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";

            setStorage(
                DIRECTION_KEY,
                nextDirection
            );

            applyDirection(
                nextDirection,
                true
            );
        }
    );


    loginForm?.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            const email =
                document
                    .getElementById("loginEmail")
                    ?.value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    ?.value
                    .trim();

            if (!email || !password) {
                showMessage(
                    loginMessage,
                    "Please enter your email and password."
                );

                return;
            }

            if (!loginForm.checkValidity()) {
                showMessage(
                    loginMessage,
                    "Please enter a valid email address."
                );

                return;
            }

            showMessage(
                loginMessage,
                "Login successful!",
                "success"
            );
        }
    );


    signupForm?.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            const name =
                document
                    .getElementById("signupName")
                    ?.value
                    .trim();

            const email =
                document
                    .getElementById("signupEmail")
                    ?.value
                    .trim();

            const phone =
                document
                    .getElementById("signupPhone")
                    ?.value
                    .trim();

            const city =
                document
                    .getElementById("signupCity")
                    ?.value
                    .trim();

            const password =
                document
                    .getElementById("signupPassword")
                    ?.value;

            const confirmPassword =
                document
                    .getElementById("signupConfirmPassword")
                    ?.value;

            const termsAccepted =
                document
                    .getElementById("signupTerms")
                    ?.checked;


            if (
                !name ||
                !email ||
                !phone ||
                !city ||
                !password ||
                !confirmPassword
            ) {
                showMessage(
                    signupMessage,
                    "Please complete all required fields."
                );

                return;
            }


            if (!signupForm.checkValidity()) {
                showMessage(
                    signupMessage,
                    "Please enter valid account details."
                );

                return;
            }


            if (password.length < 6) {
                showMessage(
                    signupMessage,
                    "Password must contain at least 6 characters."
                );

                return;
            }


            if (password !== confirmPassword) {
                showMessage(
                    signupMessage,
                    "Passwords do not match."
                );

                return;
            }


            if (!termsAccepted) {
                showMessage(
                    signupMessage,
                    "Please accept the Terms & Conditions."
                );

                return;
            }


            showMessage(
                signupMessage,
                "Account created successfully!",
                "success"
            );

            window.setTimeout(
                openLogin,
                800
            );
        }
    );


    document
        .querySelector(".forgot-link")
        ?.addEventListener(
            "click",
            (event) => {
                event.preventDefault();

                showMessage(
                    loginMessage,
                    "Password reset instructions will be sent to your email."
                );
            }
        );


    document
        .querySelectorAll(".social-button")
        .forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    const activeMessage =
                        loginCard.hidden
                            ? signupMessage
                            : loginMessage;

                    const provider =
                        button.textContent.trim();

                    showMessage(
                        activeMessage,
                        `Continue with ${provider} authentication.`
                    );
                }
            );
        });


    window.addEventListener(
        "storage",
        (event) => {
            if (event.key === THEME_KEY) {
                applyTheme(
                    event.newValue || "light"
                );
            }

            if (event.key === DIRECTION_KEY) {
                applyDirection(
                    event.newValue || "ltr"
                );
            }
        }
    );


    window.addEventListener(
        "viberoomz-theme-change",
        (event) => {
            const theme =
                event.detail?.theme || "light";

            applyTheme(theme);
        }
    );


    window.addEventListener(
        "viberoomz-direction-change",
        (event) => {
            const direction =
                event.detail?.direction || "ltr";

            applyDirection(direction);
        }
    );


    const savedTheme =
        getStorage(THEME_KEY) ||
        (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light"
        );

    const savedDirection =
        getStorage(
            DIRECTION_KEY
        ) || "ltr";


    applyTheme(savedTheme);
    applyDirection(savedDirection);
    openLogin();
    refreshIcons();
});