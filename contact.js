document.addEventListener("DOMContentLoaded", () => {
    const heroButtons = document.querySelectorAll(".contact-hero-btn");

    heroButtons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            button.classList.add("is-active");
        });

        button.addEventListener("mouseleave", () => {
            button.classList.remove("is-active");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const contactCards = document.querySelectorAll(".contact-option-card");

    contactCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("is-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-active");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const form = document.getElementById("bookingEnquiryForm");

    if (!form) {
        return;
    }

    const dateInput = document.getElementById("enquiryDate");
    const messageInput = document.getElementById("enquiryMessage");
    const messageCounter = document.getElementById("messageCounter");
    const successBox = document.getElementById("bookingFormSuccess");
    const submitButton = form.querySelector(".booking-submit-btn");

    /* Minimum booking date */

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }


    /* Message counter */

    function updateMessageCounter() {

        if (!messageInput || !messageCounter) {
            return;
        }

        const length = messageInput.value.length;

        messageCounter.textContent =
            `${length} / 500`;

        if (length >= 450) {
            messageCounter.style.color =
                "var(--warning-color)";
        } else {
            messageCounter.style.color = "";
        }
    }


    /* Clear validation */

    function clearFieldState(field) {

        const wrapper =
            field.closest(".booking-field");

        if (!wrapper) {
            return;
        }

        wrapper.classList.remove("has-error");
        wrapper.classList.remove("has-success");

        const error =
            wrapper.querySelector(".booking-error");

        if (error) {
            error.textContent = "";
        }
    }


    /* Show error */

    function showFieldError(field, message) {

        const wrapper =
            field.closest(".booking-field");

        if (!wrapper) {
            return false;
        }

        wrapper.classList.remove("has-success");
        wrapper.classList.add("has-error");

        const error =
            wrapper.querySelector(".booking-error");

        if (error) {
            error.textContent = message;
        }

        return false;
    }


    /* Show success */

    function showFieldSuccess(field) {

        const wrapper =
            field.closest(".booking-field");

        if (!wrapper) {
            return;
        }

        wrapper.classList.remove("has-error");
        wrapper.classList.add("has-success");

        const error =
            wrapper.querySelector(".booking-error");

        if (error) {
            error.textContent = "";
        }
    }


    /* Field validation */

    function validateField(field) {

        if (!field) {
            return true;
        }

        clearFieldState(field);

        const value =
            field.value.trim();

        if (field.required && !value) {

            return showFieldError(
                field,
                "This field is required."
            );
        }


        /* Email */

        if (
            field.type === "email" &&
            value
        ) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {

                return showFieldError(
                    field,
                    "Enter a valid email address."
                );
            }
        }


        /* Phone */

        if (
            field.type === "tel" &&
            value
        ) {

            const phonePattern =
                /^[0-9+\-\s()]{7,20}$/;

            if (!phonePattern.test(value)) {

                return showFieldError(
                    field,
                    "Enter a valid phone number."
                );
            }
        }


        /* Date */

        if (
            field === dateInput &&
            value
        ) {

            const selectedDate =
                new Date(`${value}T00:00:00`);

            const currentDate =
                new Date();

            currentDate.setHours(
                0,
                0,
                0,
                0
            );

            if (selectedDate < currentDate) {

                return showFieldError(
                    field,
                    "Please choose a future date."
                );
            }
        }


        showFieldSuccess(field);

        return true;
    }


    /* Fields */

    const fields = form.querySelectorAll(
        "input[required], " +
        "select[required], " +
        "textarea[required]"
    );


    fields.forEach((field) => {

        field.addEventListener(
            "blur",
            () => {
                validateField(field);
            }
        );

        field.addEventListener(
            "change",
            () => {
                validateField(field);
            }
        );

        field.addEventListener(
            "input",
            () => {

                const wrapper =
                    field.closest(".booking-field");

                if (
                    wrapper &&
                    wrapper.classList.contains(
                        "has-error"
                    )
                ) {
                    validateField(field);
                }
            }
        );
    });


    /* Message counter */

    if (messageInput) {

        messageInput.addEventListener(
            "input",
            updateMessageCounter
        );

        updateMessageCounter();
    }


    /* Submit */

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            let formIsValid = true;

            fields.forEach((field) => {

                const valid =
                    validateField(field);

                if (!valid) {
                    formIsValid = false;
                }
            });


            if (!formIsValid) {

                const firstError =
                    form.querySelector(
                        ".booking-field.has-error " +
                        "input, " +
                        ".booking-field.has-error " +
                        "select, " +
                        ".booking-field.has-error " +
                        "textarea"
                    );

                if (firstError) {
                    firstError.focus();
                }

                return;
            }


            /* Sending state */

            if (submitButton) {

                submitButton.disabled = true;

                const buttonText =
                    submitButton.querySelector("span");

                if (buttonText) {
                    buttonText.textContent =
                        "Sending...";
                }
            }


            /* Demo success state */

            setTimeout(() => {

                if (successBox) {
                    successBox.classList.add("show");
                }

                form.reset();

                fields.forEach((field) => {
                    clearFieldState(field);
                });

                updateMessageCounter();


                if (submitButton) {

                    submitButton.disabled = false;

                    const buttonText =
                        submitButton.querySelector("span");

                    if (buttonText) {
                        buttonText.textContent =
                            "Send Enquiry";
                    }
                }


                if (
                    typeof lucide !== "undefined"
                ) {
                    lucide.createIcons();
                }

            }, 700);

        }
    );

});
document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const locationCards =
        document.querySelectorAll(".location-card");

    locationCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("location-card-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("location-card-active");
        });

        card.addEventListener("focusin", () => {
            card.classList.add("location-card-active");
        });

        card.addEventListener("focusout", () => {
            card.classList.remove("location-card-active");
        });

    });

});
document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const faqItems = document.querySelectorAll(
        ".contact-info-faq-item"
    );

    faqItems.forEach((item) => {

        const trigger = item.querySelector(
            ".contact-info-faq-trigger"
        );

        const toggle = item.querySelector(
            ".contact-info-faq-toggle"
        );

        if (!trigger || !toggle) {
            return;
        }

        trigger.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("active");

            faqItems.forEach((otherItem) => {

                otherItem.classList.remove("active");

                const otherTrigger =
                    otherItem.querySelector(
                        ".contact-info-faq-trigger"
                    );

                const otherToggle =
                    otherItem.querySelector(
                        ".contact-info-faq-toggle"
                    );

                if (otherTrigger) {
                    otherTrigger.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                if (otherToggle) {
                    otherToggle.innerHTML =
                        '<i data-lucide="plus"></i>';
                }

            });

            if (!isOpen) {

                item.classList.add("active");

                trigger.setAttribute(
                    "aria-expanded",
                    "true"
                );

                toggle.innerHTML =
                    '<i data-lucide="minus"></i>';
            }

            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const ctaButton = document.querySelector(
        ".contact-final-cta-btn-primary"
    );

    if (!ctaButton) {
        return;
    }

    ctaButton.addEventListener("mouseenter", () => {
        ctaButton.classList.add("is-hovered");
    });

    ctaButton.addEventListener("mouseleave", () => {
        ctaButton.classList.remove("is-hovered");
    });

});