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


// ======================================================
// SKILLS.JS - HAS Analytics
// Animação das barras de competências
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  ativarSkillsAnimadas();
});

function ativarSkillsAnimadas() {
  const secaoSkills = document.getElementById("skills");
  const barras = document.querySelectorAll(".skill-fill");

  if (!secaoSkills || !barras.length) {
    console.warn("Seção Skills ou barras não encontradas.");
    return;
  }

  // Garante que todas começam zeradas
  barras.forEach(function (barra) {
    barra.style.width = "0%";
  });

  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          barras.forEach(function (barra) {
            const porcentagem = barra.getAttribute("data-percent");

            if (porcentagem) {
              barra.style.width = porcentagem + "%";
            }
          });

          // Para animar apenas uma vez
          observador.unobserve(secaoSkills);
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  observador.observe(secaoSkills);
}