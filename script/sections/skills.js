// ======================================================
// SKILLS.JS - HAS Analytics
// Animação das barras de competências
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  ativarSkillsAnimadas();
});

// ------------------------------------------------------
// Anima as barras de Skills ao chegar na seção
// ------------------------------------------------------

function ativarSkillsAnimadas() {
  const secaoSkills = document.getElementById("skills");
  const barras = document.querySelectorAll(".skill-fill");

  if (!secaoSkills || !barras.length) {
    return;
  }

  barras.forEach(function (barra) {
    const porcentagem = barra.getAttribute("data-percent");

    if (porcentagem) {
      barra.style.setProperty("--skill-width", porcentagem + "%");
    }
  });

  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          secaoSkills.classList.add("skills-ativa");
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  observador.observe(secaoSkills);
}