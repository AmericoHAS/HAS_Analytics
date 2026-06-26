// ======================================================
// HOME - HAS Analytics
// Página única do site
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("HAS Analytics carregado com sucesso.");

  aplicarEfeitoHeader();
  atualizarBarraRolagem();
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

  window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  });
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
// Barra de progresso da rolagem da página
// ------------------------------------------------------

function atualizarBarraRolagem() {
  const barra = document.getElementById("scroll-progress-bar");

  if (!barra) {
    console.warn("Barra de progresso não encontrada.");
    return;
  }

  function calcularProgresso() {
    const alturaDocumento = document.documentElement.scrollHeight;
    const alturaJanela = window.innerHeight;
    const posicaoAtual = window.scrollY;

    const alturaRolavel = alturaDocumento - alturaJanela;

    if (alturaRolavel <= 0) {
      barra.style.width = "0%";
      return;
    }

    const progresso = (posicaoAtual / alturaRolavel) * 100;
    barra.style.width = progresso + "%";
  }

  window.addEventListener("scroll", calcularProgresso);
  window.addEventListener("resize", calcularProgresso);

  calcularProgresso();
}