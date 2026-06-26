// ======================================================
// PÁGINA INICIAL - HAS Analytics
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("HAS Analytics - Página inicial carregada.");

  aplicarEfeitoHeader();
  destacarPrimeiraSecao();
});

// ------------------------------------------------------
// Efeito no cabeçalho ao rolar a página
// ------------------------------------------------------

function aplicarEfeitoHeader() {
  const header = document.querySelector(".header");

  if (!header) {
    return;
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  });
}

// ------------------------------------------------------
// Pequena animação inicial no conteúdo da página
// ------------------------------------------------------

function destacarPrimeiraSecao() {
  const heroContent = document.querySelector(".hero-content");
  const heroCard = document.querySelector(".hero-card");

  if (heroContent) {
    heroContent.classList.add("aparecer");
  }

  if (heroCard) {
    heroCard.classList.add("aparecer");
  }
}