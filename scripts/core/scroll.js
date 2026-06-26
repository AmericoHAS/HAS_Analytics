// ======================================================
// ROLAGEM SUAVE E MENU ATIVO - HAS Analytics
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  ativarRolagemSuave();
  destacarSecaoAtual();
});

// ------------------------------------------------------
// Rolagem suave ao clicar nos links internos
// ------------------------------------------------------

function ativarRolagemSuave() {
  const linksInternos = document.querySelectorAll('a[href^="#"]');

  linksInternos.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const idDestino = link.getAttribute("href");

      if (idDestino === "#") {
        return;
      }

      const secaoDestino = document.querySelector(idDestino);

      if (secaoDestino) {
        event.preventDefault();

        secaoDestino.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// ------------------------------------------------------
// Destaca no menu a seção que está visível
// ------------------------------------------------------

function destacarSecaoAtual() {
  const secoes = document.querySelectorAll("section[id]");
  const linksMenu = document.querySelectorAll(".nav-menu a");

  if (!secoes.length || !linksMenu.length) {
    return;
  }

  window.addEventListener("scroll", function () {
    let idAtual = "";

    secoes.forEach(function (secao) {
      const topoSecao = secao.offsetTop - 140;
      const alturaSecao = secao.offsetHeight;

      if (window.scrollY >= topoSecao && window.scrollY < topoSecao + alturaSecao) {
        idAtual = secao.getAttribute("id");
      }
    });

    linksMenu.forEach(function (link) {
      link.classList.remove("link-ativo");

      if (link.getAttribute("href") === "#" + idAtual) {
        link.classList.add("link-ativo");
      }
    });
  });
}