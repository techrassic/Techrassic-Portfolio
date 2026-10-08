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
     * Every menu action goes through this function.
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
         * This prevents the menu from accidentally
         * starting open.
         */
        setMenuOpen(false);


        /*
         * HAMBURGER TOGGLE
         *
         * First tap  -> open
         * Second tap -> close
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
       DRAGON PAGE TRANSITION
    ========================================= */

    const currentPath = window.location.pathname;


    /*
     * Get the correct dragon image path.
     */
    function getDragonPath() {

        /*
         * Root homepage
         */
        if (
            currentPath === "/" ||
            (
                currentPath.endsWith("/index.html") &&
                !currentPath.includes("/blog/") &&
                !currentPath.includes("/contact/") &&
                !currentPath.includes("/portfolio/") &&
                !currentPath.includes("/services/")
            )
        ) {
            return "assets/mascot/poses/dragon-flying.png";
        }


        /*
         * Pages inside folders
         */
        return "../assets/mascot/poses/dragon-flying.png";
    }


    function createDragonTransition() {

        /*
         * Prevent duplicates.
         */
        if (document.querySelector(".dragon-transition")) {
            return;
        }


        const dragon = document.createElement("div");

        dragon.className = "dragon-transition";


        const dragonImage = document.createElement("img");

        dragonImage.src = getDragonPath();

        dragonImage.alt = "";

        dragonImage.setAttribute("aria-hidden", "true");


        dragon.appendChild(dragonImage);

        document.body.appendChild(dragon);


        /*
         * Force the browser to register the element
         * before starting the animation.
         */
        requestAnimationFrame(() => {

            dragon.classList.add("dragon-transition-active");

        });

    }


    /*
     * Handle internal page navigation.
     */
    document.querySelectorAll("a[href]").forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");


            /* Ignore empty links */
            if (!href) {
                return;
            }


            /* Ignore # links */
            if (
                href === "#" ||
                href.startsWith("#")
            ) {
                return;
            }


            /* Ignore external links */
            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("//")
            ) {
                return;
            }


            /* Ignore email and phone links */
            if (
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {
                return;
            }


            /* Ignore links opening in new tabs */
            if (link.target === "_blank") {
                return;
            }


            /*
             * Ignore modified clicks.
             *
             * This allows Ctrl/Cmd + click,
             * Shift + click and middle-click
             * to behave normally.
             */
            if (
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey ||
                event.button !== 0
            ) {
                return;
            }


            /*
             * Don't animate same-page navigation.
             */
            const currentUrl = new URL(
                window.location.href
            );

            const destinationUrl = new URL(
                href,
                window.location.href
            );


            if (
                destinationUrl.origin === currentUrl.origin &&
                destinationUrl.pathname === currentUrl.pathname &&
                destinationUrl.search === currentUrl.search
            ) {
                return;
            }


            /*
             * Everything looks like a normal
             * internal page navigation.
             */
            event.preventDefault();


            /*
             * Close the mobile menu immediately
             * before starting the dragon transition.
             */
            if (isMenuOpen) {
                setMenuOpen(false);
            }


            createDragonTransition();


            /*
             * Give the dragon time to fly across
             * before changing pages.
             */
            setTimeout(() => {

                window.location.href =
                    destinationUrl.href;

            }, 650);

        });

    });

});
