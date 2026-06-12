// --- GESTION DU THÈME (Dark Mode) ---
const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    modeToggle = document.querySelector(".dark-light");


// 1. Vérifier le thème sauvegardé au chargement
const sauvedMode = localStorage.getItem("mode")
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark"),
        nav.classList.toggle("dark")

    // Sauvegarde du choix dans le localStorage
    if (!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
    }
    else {
        localStorage.setItem("mode", "dark-mode");
    }
});




// Sélection de la navbar
const navbar = document.querySelector('.navbar');

// Écoute de l'événement scroll sur la fenêtre
window.addEventListener('scroll', () => {
    // Si le scroll dépasse 50px, on ajoute la classe, sinon on l'enlève
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});


const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;

    if (scrollValue > 50) {
        navbar.classList.add('navbar-scrolled');
    }
    else {
        navbar.classList.remove('navbar-scrolled');
    }
});
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
});

// 1. Vérifier le thème sauvegardé au chargement
