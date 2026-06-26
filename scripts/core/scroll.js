// ======================================================
// ROLAGEM SUAVE ENTRE SEÇÕES - HAS Analytics
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  const linksInternos = document.querySelectorAll('a[href^="#"]');

  linksInternos.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const destino = document.querySelector(this.getAttribute("href"));

      if (destino) {
        event.preventDefault();

        destino.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});