// ======================================================
// MENU DE NAVEGAÇÃO - HAS Analytics
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  const botaoMenu = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");
  const linksMenu = document.querySelectorAll(".nav-menu a");

  if (!botaoMenu || !menu) {
    return;
  }

  // Abre e fecha o menu mobile
  botaoMenu.addEventListener("click", function () {
    botaoMenu.classList.toggle("ativo");
    menu.classList.toggle("ativo");
  });

  // Fecha o menu ao clicar em um link
  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      botaoMenu.classList.remove("ativo");
      menu.classList.remove("ativo");
    });
  });

  // Fecha o menu ao apertar ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      botaoMenu.classList.remove("ativo");
      menu.classList.remove("ativo");
    }
  });
});