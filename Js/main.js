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

// FADE-IN
document.addEventListener("DOMContentLoaded", () => {

  // 1. Configuration de l'Intersection Observer
  const observerOptions = {
    root: null,         // Inspecte par rapport au viewport global
    rootMargin: "0px",
    threshold: 0.12     // Déclenche l'action quand 12% de l'élément est visible
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si l'élément n'est pas encore entré dans la zone visible, on l'ignore
      if (!entry.isIntersecting) return;

      const targetElement = entry.target; 

      // Cas 1 : Traitement du Fading de section
      if (targetElement.classList.contains("js-fade-in")) {
        targetElement.classList.add("is-visible");
        observer.unobserve(targetElement); // L'animation ne se fait qu'une fois
      }

      // Cas 2 : Traitement de l'incrémentation des compteurs
      if (targetElement.classList.contains("js-counter")) {
        animateNumbers(targetElement);
        observer.unobserve(targetElement); // Évite de relancer le calcul au scroll inverse
      }
    });
  }, observerOptions);

  // 2. Moteur de calcul fluide pour l'incrémentation (requestAnimationFrame)
  function animateNumbers(counter) {
    const finalValue = parseInt(counter.getAttribute("data-target"), 10);
    const animationDuration = 2000; // Durée totale de l'animation : 2 secondes
    const startTimestamp = performance.now();

    function step(currentTimestamp) {
      const elapsed = currentTimestamp - startTimestamp;

      // Calcule le ratio d'avancement bloqué à 100% (1) maximum
      const progress = Math.min(elapsed / animationDuration, 1);

      // Formule d'Ease-Out cubique pour ralentir en douceur à la fin
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);

      // Calcul du nombre actuel à afficher
      const currentValue = Math.floor(easeOutQuad * finalValue);

      // Injection de la valeur (avec un "+" si votre design initial l'exigeait)
      if (finalValue === 2500 || finalValue === 800 || finalValue === 12000 || finalValue === 50000) {
        counter.textContent = `+${currentValue}`;
      } else {
        counter.textContent = currentValue;
      }

      // Si le temps imparti n'est pas écoulé, on demande la prochaine frame d'animation
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Sécurité pour afficher exactement la valeur finale ciblée
        counter.textContent = (finalValue === 2500 || finalValue === 800 || finalValue === 12000 || finalValue === 50000)
          ? `+${finalValue}`
          : finalValue;
      }
    }

    requestAnimationFrame(step);
  }

  // 3. Initialisation et observation automatique des cibles
  const elementsToWatch = document.querySelectorAll(".js-fade-in, .js-counter");
  elementsToWatch.forEach(element => animationObserver.observe(element));
});


document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Gestion des classes de boutons active/inactive (Bootstrap)
      filterButtons.forEach(btn => {
        btn.classList.remove('active', 'btn-primary');
        btn.classList.add('btn-outline-primary');
      });
      button.classList.remove('btn-outline-primary');
      button.classList.add('active', 'btn-primary');

      // 2. Récupération de la catégorie
      const filterValue = button.getAttribute('data-filter');

      // 3. Filtrage avec animation
      filterItems.forEach(item => {
        const itemCategory = item.getAttribute('data-cat');

        if (filterValue === 'all' || filterValue === itemCategory) {
          item.classList.remove('is-hidden');
          // Petit timeout pour l'effet de fade-in Bootstrap
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          item.classList.add('is-hidden');
        }
      });
    });
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successAlert = document.getElementById('successAlert');

  // Configuration des règles de validation
  const fields = {
    firstName: {
      el: document.getElementById('firstName'),
      errorEl: document.getElementById('firstNameError'),
      validate: val => val.trim() !== ""
    },
    lastName: {
      el: document.getElementById('lastName'),
      errorEl: document.getElementById('lastNameError'),
      validate: val => val.trim() !== ""
    },
    email: {
      el: document.getElementById('email'),
      errorEl: document.getElementById('emailError'),
      validate: val => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val.trim());
      }
    },
    subject: {
      el: document.getElementById('subject'),
      errorEl: document.getElementById('subjectError'),
      validate: val => val !== null && val !== ""
    },
    message: {
      el: document.getElementById('message'),
      errorEl: document.getElementById('messageError'),
      validate: val => val.trim().length >= 20
    }
  };

  // Fonction de validation d'un champ unique
  function validateField(field) {
    const isValid = field.validate(field.el.value);

    if (isValid) {
      field.el.classList.remove('is-invalid');
      field.el.classList.add('is-valid');
      if (field.errorEl) field.errorEl.style.display = 'none';
    } else {
      field.el.classList.remove('is-valid');
      field.el.classList.add('is-invalid');
      if (field.errorEl) field.errorEl.style.display = 'block';
    }
    return isValid;
  }

  // Événements "input" et "change" pour une validation en temps réel
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    const eventType = field.el.tagName === 'SELECT' ? 'change' : 'input';

    field.el.addEventListener(eventType, () => {
      validateField(field);
    });
  });

  // Gestion de la soumission du formulaire
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    let isFormValid = true;

    // Valider tous les champs d'un coup
    Object.keys(fields).forEach(key => {
      const isValid = validateField(fields[key]);
      if (!isValid) {
        isFormValid = false;
      }
    });

    // Si tout est valide
    if (isFormValid) {
      // Afficher le message de succès Bootstrap
      successAlert.classList.remove('d-none');
      successAlert.classList.add('d-flex');

      // Réinitialiser le formulaire et les styles visuels
      form.reset();
      Object.keys(fields).forEach(key => {
        fields[key].el.classList.remove('is-valid');
      });

      // Faire défiler doucement vers le message de succès
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Optionnel : Cacher l'alerte automatiquement après 5 secondes
      setTimeout(() => {
        successAlert.classList.remove('d-flex');
        successAlert.classList.add('d-none');
      }, 5000);
    }
  });
});