console.log("TECHRASSIC website loaded successfully.");

/* =========================================================
MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

```
menuToggle.addEventListener("click", (event) => {

    event.stopPropagation();

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

});


/* ---------- CLOSE MENU AFTER CLICKING A LINK ---------- */

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* ---------- CLOSE MENU WHEN CLICKING OUTSIDE ---------- */

document.addEventListener("click", (event) => {

    if (!event.target.closest(".navbar")) {

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});
```

}

/* =========================================================
DRAGON PAGE TRANSITION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

```
const transitionDragon = document.createElement("div");

transitionDragon.className = "dragon-transition";

transitionDragon.innerHTML = `
    <img
        src="${getDragonPath()}"
        alt=""
        aria-hidden="true"
    >
`;

document.body.appendChild(transitionDragon);


/* ---------- PAGE ENTER ---------- */

document.body.classList.add("page-enter");

requestAnimationFrame(() => {

    document.body.classList.add("page-enter-active");

});


/* ---------- INTERNAL LINK CLICK ---------- */

document.querySelectorAll("a[href]").forEach(link => {

    link.addEventListener("click", (event) => {

        const href = link.getAttribute("href");

        if (!href) return;

        /* Ignore special links */

        if (
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("https://") ||
            href.startsWith("http://") ||
            href.startsWith("javascript:")
        ) {
            return;
        }


        /* Ignore new-tab links */

        if (
            link.target === "_blank" ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }


        event.preventDefault();

        transitionDragon.classList.add("fly-out");

        document.body.classList.add("page-leaving");


        setTimeout(() => {

            window.location.href = href;

        }, 650);

    });

});
```

});

/* =========================================================
DRAGON IMAGE PATH
========================================================= */

function getDragonPath() {

```
const path = window.location.pathname;

if (
    path.endsWith("/") ||
    path.endsWith("index.html")
) {

    return path.includes("/contact/") ||
           path.includes("/services/") ||
           path.includes("/portfolio/") ||
           path.includes("/blog/")
        ? "../assets/mascot/poses/dragon-flying.png"
        : "assets/mascot/poses/dragon-flying.png";

}

return "../assets/mascot/poses/dragon-flying.png";
```

}
