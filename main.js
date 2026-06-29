// ============================
// MENÚ HAMBURGUESA
// ============================

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });
}

// ============================
// LIGHTBOX MENÚS
// ============================

const menus = [
    "menus/1.png",
    "menus/2.png",
    "menus/3.png"
];

let currentIndex = 0;

const menuCard = document.getElementById("menuCard");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const imageNumber = document.getElementById("imageNumber");
const totalImages = document.getElementById("totalImages");

if (totalImages) {
    totalImages.textContent = menus.length;
}

function updateImage() {
    if (!lightboxImg || !imageNumber) return;

    lightboxImg.src = menus[currentIndex];
    imageNumber.textContent = currentIndex + 1;
}

function cerrarLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";

    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
}

function showNext() {
    currentIndex = (currentIndex + 1) % menus.length;
    updateImage();
}

function showPrev() {
    currentIndex =
        (currentIndex - 1 + menus.length) % menus.length;

    updateImage();
}

if (menuCard && lightbox) {

    menuCard.addEventListener("click", () => {

        currentIndex = 0;
        updateImage();

        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            lightbox.classList.add("show");
        }, 10);

    });

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {
            cerrarLightbox();
        }

    });

    let startX = 0;

    lightbox.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", (e) => {

        const endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) {
            showNext();
        }
        else if (endX - startX > 50) {
            showPrev();
        }

    });
}

const closeButton = document.querySelector(".close");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

if (closeButton) {
    closeButton.onclick = cerrarLightbox;
}

if (nextButton) {
    nextButton.onclick = showNext;
}

if (prevButton) {
    prevButton.onclick = showPrev;
}

document.addEventListener("keydown", (e) => {

    if (!lightbox || lightbox.style.display !== "flex") {
        return;
    }

    if (e.key === "ArrowRight") showNext();

    if (e.key === "ArrowLeft") showPrev();

    if (e.key === "Escape") cerrarLightbox();

});

// ============================
// COOKIES
// ============================

function aceptarCookies() {

    localStorage.setItem(
        "cookiesAceptadas",
        "true"
    );

    const banner =
        document.getElementById("cookie-banner");

    if (banner) {
        banner.style.display = "none";
    }
}

function rechazarCookies() {

    localStorage.setItem(
        "cookiesRechazadas",
        "true"
    );

    const banner =
        document.getElementById("cookie-banner");

    if (banner) {
        banner.style.display = "none";
    }
}

// Hacer funciones globales
window.aceptarCookies = aceptarCookies;
window.rechazarCookies = rechazarCookies;

// ============================
// INICIALIZACIÓN
// ============================

document.addEventListener("DOMContentLoaded", () => {

    const banner =
        document.getElementById("cookie-banner");

    if (
        banner &&
        (
            localStorage.getItem("cookiesAceptadas") ||
            localStorage.getItem("cookiesRechazadas")
        )
    ) {
        banner.style.display = "none";
    }

});
