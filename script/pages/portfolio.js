// ======================================================
// PORTFOLIO.JS - HAS Analytics
// Cards automáticos com filtro por categoria
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  const filtro = document.getElementById("portfolio-filtro-select");

  if (filtro) {
    filtro.value = "todos";
  }

  carregarProjetos("todos");
  ativarFiltroPortfolio();
});

function carregarProjetos(grupoSelecionado = "todos") {
  const container = document.getElementById("portfolio-container");

  if (!container) {
    console.error("Container #portfolio-container não encontrado.");
    return;
  }

  if (!window.PROJETOS || !Array.isArray(window.PROJETOS)) {
    console.error("Lista window.PROJETOS não encontrada.");
    container.innerHTML = `
      <p class="portfolio-vazio">
        Nenhum trabalho encontrado. Verifique se o arquivo projetos.js foi carregado antes do portfolio.js.
      </p>
    `;
    return;
  }

  container.innerHTML = "";

  const projetosFiltrados = window.PROJETOS.filter(function (projeto) {
    if (grupoSelecionado === "todos") {
      return true;
    }

    return projeto.grupo === grupoSelecionado;
  });

  if (projetosFiltrados.length === 0) {
    container.innerHTML = `
      <p class="portfolio-vazio">
        Nenhum trabalho cadastrado nesta categoria.
      </p>
    `;
    return;
  }

  projetosFiltrados.forEach(function (projeto) {
  const card = document.createElement("article");
  card.classList.add("portfolio-card-flip");

  const tecnologiasHTML = projeto.tecnologias
    .map(function (tecnologia) {
      return `<span class="portfolio-tag">${tecnologia}</span>`;
    })
    .join("");

  const seloImagemHTML = projeto.seloImagem
    ? `
      <div class="portfolio-badge-book">
        <img 
          src="${projeto.seloImagem}" 
          alt="Capa relacionada ao projeto ${projeto.titulo}" 
          class="portfolio-badge-book-image"
        >
      </div>
    `
    : "";

  card.innerHTML = `
    <div class="portfolio-card-inner">

      <div class="portfolio-card-face portfolio-card-front">

        <div class="portfolio-image-box">
          ${seloImagemHTML}

          <img 
            src="${projeto.imagem}" 
            alt="Imagem do projeto ${projeto.titulo}" 
            class="portfolio-image"
          >
        </div>

        <div class="portfolio-front-content">
          <p class="portfolio-categoria">${projeto.categoria}</p>

          <h3>${projeto.titulo}</h3>

          <div class="portfolio-meta">
            <span>${projeto.data}</span>
            <span>${projeto.tipo}</span>
          </div>

          <p>${projeto.descricao}</p>

          <button class="portfolio-flip-btn" type="button">
            Ver detalhes
          </button>
        </div>

      </div>

      <div class="portfolio-card-face portfolio-card-back">

        <div class="portfolio-back-content">
          <p class="portfolio-status">${projeto.status}</p>

          <h3>${projeto.titulo}</h3>

          <p>${projeto.detalhes}</p>

          <div class="portfolio-tags">
            ${tecnologiasHTML}
          </div>

          <div class="portfolio-actions">
            <a 
              href="${projeto.link}" 
              class="card-link" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              ${projeto.textoLink}
            </a>

            <button class="portfolio-flip-btn voltar" type="button">
              Voltar
            </button>
          </div>
        </div>

      </div>

    </div>
  `;

  const botoesVirar = card.querySelectorAll(".portfolio-flip-btn");

  botoesVirar.forEach(function (botao) {
    botao.addEventListener("click", function () {
      card.classList.toggle("virado");
    });
  });

  container.appendChild(card);
});
}

function ativarFiltroPortfolio() {
  const filtro = document.getElementById("portfolio-filtro-select");

  if (!filtro) {
    return;
  }

  filtro.addEventListener("change", function () {
    carregarProjetos(filtro.value);
  });
}