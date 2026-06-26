// ======================================================
// ROLAGEM SUAVE E INDICAÇÃO DA SEÇÃO ATUAL
// HAS Analytics
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

      if (!idDestino || idDestino === "#") {
        return;
      }

      const secaoDestino = document.querySelector(idDestino);

      if (!secaoDestino) {
        return;
      }

      event.preventDefault();

      const alturaHeader = document.querySelector(".header")?.offsetHeight || 0;
      const posicaoSecao = secaoDestino.offsetTop - alturaHeader + 2;

      window.scrollTo({
        top: posicaoSecao,
        behavior: "smooth"
      });
    });
  });
}

// ------------------------------------------------------
// Destaca no menu a seção visível na tela
// ------------------------------------------------------

function destacarSecaoAtual() {
  const secoes = document.querySelectorAll("section[id]");
  const linksMenu = document.querySelectorAll(".nav-menu a");

  if (!secoes.length || !linksMenu.length) {
    return;
  }

  function atualizarMenuAtivo() {
    const alturaHeader = document.querySelector(".header")?.offsetHeight || 0;
    const posicaoAtual = window.scrollY + alturaHeader + 120;

    let idAtual = "inicio";

    secoes.forEach(function (secao) {
      const topo = secao.offsetTop;
      const altura = secao.offsetHeight;

      if (posicaoAtual >= topo && posicaoAtual < topo + altura) {
        idAtual = secao.getAttribute("id");
      }
    });

    linksMenu.forEach(function (link) {
      link.classList.remove("link-ativo");

      const href = link.getAttribute("href");

      if (href === "#" + idAtual) {
        link.classList.add("link-ativo");
      }
    });
  }

  window.addEventListener("scroll", atualizarMenuAtivo);
  window.addEventListener("resize", atualizarMenuAtivo);

  atualizarMenuAtivo();
}