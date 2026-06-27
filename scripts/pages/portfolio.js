// ======================================================
// PORTFOLIO.JS - HAS Analytics
// Renderização automática dos projetos
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  carregarProjetos();
});

function carregarProjetos() {
  const container = document.getElementById("portfolio-container");

  if (!container) {
    return;
  }

  if (!window.PROJETOS || !Array.isArray(window.PROJETOS)) {
    console.error("Lista de projetos não encontrada.");
    return;
  }

  container.innerHTML = "";

  window.PROJETOS.forEach(function (projeto) {
    const card = document.createElement("article");
    card.classList.add("portfolio-card");

    const tecnologiasHTML = projeto.tecnologias
      .map(function (tecnologia) {
        return `<span class="portfolio-tag">${tecnologia}</span>`;
      })
      .join("");

    card.innerHTML = `
      <div>
        <p class="portfolio-categoria">${projeto.categoria}</p>

        <h3>${projeto.titulo}</h3>

        <p class="portfolio-status">${projeto.status}</p>

        <p>
          ${projeto.descricao}
        </p>

        <div class="portfolio-tags">
          ${tecnologiasHTML}
        </div>
      </div>

      <a href="${projeto.link}" class="card-link">
        ${projeto.textoLink}
      </a>
    `;

    container.appendChild(card);
  });
}