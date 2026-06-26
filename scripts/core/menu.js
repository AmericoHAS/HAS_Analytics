// ======================================================
// MENU MOBILE - HAS Analytics
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  const botaoMenu = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");

  if (!botaoMenu || !menu) {
    return;
  }

  botaoMenu.addEventListener("click", function () {
    menu.classList.toggle("ativo");
    botaoMenu.classList.toggle("ativo");
  });

  // Fecha o menu ao clicar em algum link
  const linksMenu = menu.querySelectorAll("a");

  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("ativo");
      botaoMenu.classList.remove("ativo");
    });
  });
});