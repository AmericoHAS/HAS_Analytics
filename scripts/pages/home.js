// ======================================================
// HOME - HAS Analytics
// Página única do site
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("HAS Analytics carregado com sucesso.");

  aplicarEfeitoHeader();
  ativarFotoHero();
  validarFormularioOrcamento();
});

// ------------------------------------------------------
// Efeito visual no cabeçalho ao rolar a página
// ------------------------------------------------------

function aplicarEfeitoHeader() {
  const header = document.querySelector(".header");

  if (!header) {
    return;
  }

  function atualizarHeader() {
    if (window.scrollY > 40) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  }

  window.addEventListener("scroll", atualizarHeader);
  atualizarHeader();
}

// ------------------------------------------------------
// Validação inicial do formulário de orçamento
// Ainda não envia para Google Sheets
// ------------------------------------------------------

function validarFormularioOrcamento() {
  const formulario = document.getElementById("form-orcamento");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const whatsapp = document.getElementById("whatsapp");
    const tipoServico = document.getElementById("tipo-servico");
    const descricao = document.getElementById("descricao");

    const camposObrigatorios = [
      nome,
      email,
      whatsapp,
      tipoServico,
      descricao
    ];

    let formularioValido = true;

    camposObrigatorios.forEach(function (campo) {
      if (!campo.value.trim()) {
        campo.classList.add("campo-erro");
        formularioValido = false;
      } else {
        campo.classList.remove("campo-erro");
      }
    });

    if (!formularioValido) {
      alert("Por favor, preencha nome, e-mail, WhatsApp, tipo de serviço e descrição da demanda.");
      return;
    }

    const dadosFormulario = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      whatsapp: whatsapp.value.trim(),
      tipoServico: tipoServico.value,
      prazo: document.getElementById("prazo").value.trim(),
      area: document.getElementById("area").value.trim(),
      descricao: descricao.value.trim(),
      dataEnvio: new Date().toLocaleString("pt-BR")
    };

    console.log("Dados do formulário:", dadosFormulario);

    alert("Solicitação preparada com sucesso. Em breve vamos integrar este formulário ao Google Sheets.");

    formulario.reset();
  });
}

// ------------------------------------------------------
// Reproduz a animação da logo ao passar o mouse
// ------------------------------------------------------

function ativarLogoAnimada() {
  const areaLogo = document.getElementById("logo-animada");
  const videoLogo = document.getElementById("logo-video");

  if (!areaLogo || !videoLogo) {
    return;
  }

  areaLogo.addEventListener("mouseenter", function () {
    areaLogo.classList.add("rodando");

    videoLogo.pause();
    videoLogo.currentTime = 0;

    videoLogo.play().catch(function () {
      console.log("O navegador bloqueou a reprodução automática da logo.");
    });
  });

  areaLogo.addEventListener("mouseleave", function () {
    videoLogo.pause();
    videoLogo.currentTime = 0;

    areaLogo.classList.remove("rodando");
  });

  videoLogo.addEventListener("ended", function () {
    areaLogo.classList.remove("rodando");
    videoLogo.currentTime = 0;
  });
}

// ------------------------------------------------------
// Gira a foto do Hero ao clicar
// ------------------------------------------------------

function ativarFotoHero() {
  const botaoFoto = document.getElementById("hero-photo-button");

  if (!botaoFoto) {
    return;
  }

  botaoFoto.addEventListener("click", function () {
    botaoFoto.classList.remove("girando");

    // Reinicia a animação mesmo em cliques repetidos
    void botaoFoto.offsetWidth;

    botaoFoto.classList.add("girando");

    setTimeout(function () {
      botaoFoto.classList.remove("girando");
    }, 600);
  });
}