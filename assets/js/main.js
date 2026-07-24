// =========================================================
//  Interactions — La Compagnie Padacor
//  Léger, sans dépendance. Chargé en defer.
// =========================================================
(function () {
  "use strict";

  // --- En-tête : ombre/fond au défilement ---
  var entete = document.querySelector(".site-entete");
  if (entete) {
    var majDefile = function () {
      entete.classList.toggle("est-defile", window.scrollY > 8);
    };
    majDefile();
    window.addEventListener("scroll", majDefile, { passive: true });
  }

  // --- Menu mobile ---
  var bascule = document.querySelector(".menu-bascule");
  var nav = document.querySelector(".nav");
  if (bascule && nav) {
    bascule.addEventListener("click", function () {
      var ouvert = nav.classList.toggle("est-ouverte");
      bascule.setAttribute("aria-expanded", ouvert ? "true" : "false");
      bascule.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    });

    // Referme le menu après un clic sur un lien
    nav.querySelectorAll(".nav__lien").forEach(function (lien) {
      lien.addEventListener("click", function () {
        nav.classList.remove("est-ouverte");
        bascule.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
