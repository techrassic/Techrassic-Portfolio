console.log("TECHRASSIC website loaded successfully.");

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });


        /* Close menu after selecting a link */

        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            if (!event.target.closest(".navbar")) {

                navLinks.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        });

    }


    /* =========================================
       DRAGON PAGE TRANSITION
    ========================================= */

    const currentPath = window.location.pathname;


    /*
     * Don't create a transition when the page is
     * opened directly or refreshed.
     *
     * The dragon only appears when navigating
     * between pages using internal links.
     */


    function getDragonPath() {

        /*
         * Root homepage
         */

        if (
            currentPath === "/" ||
            currentPath.endsWith("/index.html")
                && !currentPath.includes("/blog/")
                && !currentPath.includes("/contact/")
                && !currentPath.includes("/portfolio/")
                && !currentPath.includes("/services/")
        ) {
            return "assets/mascot/poses/dragon-flying.png";
        }


        /*
         * All pages inside one folder
         */

        return "../assets/mascot/poses/dragon-flying.png";
    }


    function createDragonTransition() {

        /* Prevent duplicates */

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
         * Force browser to register the element
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
                destinationUrl.pathname === currentUrl.pathname &&
                destinationUrl.search === currentUrl.search
            ) {
                return;
            }


            /*
             * Everything looks like a normal internal
             * page navigation.
             */

            event.preventDefault();


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
