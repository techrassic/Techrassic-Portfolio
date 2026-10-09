console.log("TECHRASSIC website loaded successfully.");

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    /*
     * Single source of truth for the mobile menu.
     */
    let isMenuOpen = false;


    /*
     * Open / close the menu.
     */
    function setMenuOpen(open) {

        isMenuOpen = open;

        if (!menuToggle || !navLinks) {
            return;
        }

        navLinks.classList.toggle("active", isMenuOpen);

        menuToggle.classList.toggle("active", isMenuOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isMenuOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isMenuOpen ? "Close menu" : "Open menu"
        );
    }


    if (menuToggle && navLinks) {

        /*
         * Initial state.
         */
        setMenuOpen(false);


        /*
         * HAMBURGER TOGGLE
         */
        menuToggle.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();

            setMenuOpen(!isMenuOpen);

        });


        /*
         * CLOSE AFTER CLICKING A NAVIGATION LINK
         */
        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                setMenuOpen(false);

            });

        });


        /*
         * CLOSE WHEN CLICKING OUTSIDE THE NAVBAR
         */
        document.addEventListener("click", (event) => {

            if (!isMenuOpen) {
                return;
            }

            if (!event.target.closest(".navbar")) {

                setMenuOpen(false);

            }

        });


        /*
         * CLOSE WITH ESCAPE KEY
         */
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape" && isMenuOpen) {

                setMenuOpen(false);

                menuToggle.focus();

            }

        });

    }


    /* =========================================
       MASCOT INTERACTION
    ========================================= */

    const pageMascot = document.querySelector(".page-mascot");


    if (pageMascot) {

        /*
         * Give the mascot a small attention reaction
         * after the visitor has been on the page for a while.
         */
        const mascotAttentionDelay = 7000;

        setTimeout(() => {

            pageMascot.classList.add("mascot-attention");

            setTimeout(() => {

                pageMascot.classList.remove("mascot-attention");

            }, 800);

        }, mascotAttentionDelay);


        /*
         * Give the mascot another small reaction
         * when the visitor moves the mouse over it.
         */
        pageMascot.addEventListener("mouseenter", () => {

            pageMascot.classList.remove("mascot-attention");

        });

    }


   
