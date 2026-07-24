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

  // --- Pop-up « site en construction » : uniquement à la toute première visite ---
  var popupChantier = document.getElementById("popup-chantier");
  if (popupChantier) {
    var CLE_POPUP_CHANTIER = "padacor:popup-chantier-vu";
    var dejaVu = true;
    try {
      dejaVu = window.localStorage.getItem(CLE_POPUP_CHANTIER) === "1";
    } catch (e) {
      dejaVu = true; // stockage indisponible (navigation privée…) : on n'insiste pas
    }

    if (!dejaVu) {
      popupChantier.hidden = false;
      document.body.classList.add("popup-chantier-ouverte");
    }

    var fermerPopupChantier = function () {
      popupChantier.hidden = true;
      document.body.classList.remove("popup-chantier-ouverte");
      try {
        window.localStorage.setItem(CLE_POPUP_CHANTIER, "1");
      } catch (e) {
        // stockage indisponible : la pop-up pourra réapparaître, tant pis
      }
    };

    popupChantier.querySelectorAll("[data-popup-fermer]").forEach(function (bouton) {
      bouton.addEventListener("click", fermerPopupChantier);
    });
    document.addEventListener("keydown", function (evenement) {
      if (evenement.key === "Escape" && !popupChantier.hidden) {
        fermerPopupChantier();
      }
    });
  }

  // --- Pop-up « détails d'un événement » : ouverte au clic sur une carte de l'agenda ---
  var cartesEvenement = document.querySelectorAll("[data-popup-evenement-declencheur]");
  if (cartesEvenement.length) {
    var ouvrirPopupEvenement = function (popup) {
      popup.hidden = false;
      document.body.classList.add("popup-evenement-ouverte");
    };
    var fermerPopupEvenement = function (popup) {
      popup.hidden = true;
      document.body.classList.remove("popup-evenement-ouverte");
    };

    cartesEvenement.forEach(function (carte) {
      var popup = document.getElementById(carte.getAttribute("data-popup-evenement-declencheur"));
      if (!popup) return;

      // Un clic n'importe où sur la carte ouvre la pop-up, sauf sur le
      // bouton/lien de billetterie qui garde son propre comportement.
      carte.addEventListener("click", function (evenement) {
        if (evenement.target.closest(".evenement__action")) return;
        ouvrirPopupEvenement(popup);
      });

      popup.querySelectorAll("[data-popup-fermer]").forEach(function (bouton) {
        bouton.addEventListener("click", function () {
          fermerPopupEvenement(popup);
        });
      });
    });

    document.addEventListener("keydown", function (evenement) {
      if (evenement.key !== "Escape") return;
      document.querySelectorAll(".popup-evenement").forEach(function (popup) {
        if (!popup.hidden) fermerPopupEvenement(popup);
      });
    });
  }
})();
