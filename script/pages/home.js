// ======================================================
// HOME - HAS Analytics
// Página única do site
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("HAS Analytics carregado com sucesso.");

  aplicarEfeitoHeader();
  ativarLogoVideo();
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
// Envio do formulário pelo WhatsApp
// ------------------------------------------------------

function validarFormularioOrcamento() {
  const formulario = document.getElementById("form-orcamento");

  if (!formulario) {
    console.error("Formulário de orçamento não encontrado.");
    return;
  }

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const whatsapp = document.getElementById("whatsapp");
    const tipoServico = document.getElementById("tipo-servico");
    const prazo = document.getElementById("prazo");
    const area = document.getElementById("area");
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
      if (!campo || !campo.value.trim()) {
        if (campo) {
          campo.classList.add("campo-erro");
        }

        formularioValido = false;
      } else {
        campo.classList.remove("campo-erro");
      }
    });

    if (!formularioValido) {
      alert("Por favor, preencha nome, e-mail, WhatsApp, tipo de serviço e descrição da demanda.");
      return;
    }

    // Seu número no formato: 55 + DDD + número
    // Sem espaço, sem traço e sem parênteses
    const numeroHaward = "5544999554888";

    const tipoServicoTexto = tipoServico.options[tipoServico.selectedIndex].text;

    const mensagem = `
Olá, Haward! Gostaria de solicitar um orçamento pela HAS Analytics.

Nome: ${nome.value.trim()}
E-mail: ${email.value.trim()}
WhatsApp: ${whatsapp.value.trim()}

Tipo de serviço: ${tipoServicoTexto}
Prazo desejado: ${prazo.value.trim() || "Não informado"}
Área da pesquisa: ${area.value.trim() || "Não informada"}

Descrição da demanda:
${descricao.value.trim()}
    `;

    const mensagemCodificada = encodeURIComponent(mensagem);

    const linkWhatsApp = `https://wa.me/${numeroHaward}?text=${mensagemCodificada}`;

    console.log("Abrindo WhatsApp:", linkWhatsApp);

    window.location.href = linkWhatsApp;
  });
}

// ------------------------------------------------------
// Gira a foto do Hero como moeda ao clicar
// ------------------------------------------------------

function ativarFotoHero() {
  const fotoInterna = document.getElementById("hero-photo-inner");

  if (!fotoInterna) {
    return;
  }

  fotoInterna.addEventListener("click", function () {
    fotoInterna.classList.remove("girando");

    // Reinicia a animação mesmo em cliques repetidos
    void fotoInterna.offsetWidth;

    fotoInterna.classList.add("girando");

    setTimeout(function () {
      fotoInterna.classList.remove("girando");
    }, 1700);
  });
}

// ------------------------------------------------------
// Reproduz o vídeo da logo ao passar o mouse
// ------------------------------------------------------

function ativarLogoVideo() {
  const areaLogo = document.getElementById("logo-video-area");
  const videoLogo = document.getElementById("logo-video");

  if (!areaLogo || !videoLogo) {
    console.warn("Logo animada não encontrada no HTML.");
    return;
  }

  function iniciarVideo() {
    areaLogo.classList.add("video-ativo");

    videoLogo.pause();
    videoLogo.currentTime = 0;

    const playPromise = videoLogo.play();

    if (playPromise !== undefined) {
      playPromise.catch(function (erro) {
        console.warn("O navegador bloqueou ou não conseguiu iniciar o vídeo da logo:", erro);
      });
    }
  }

  function pararVideo() {
    videoLogo.pause();
    videoLogo.currentTime = 0;

    areaLogo.classList.remove("video-ativo");
  }

  areaLogo.addEventListener("mouseenter", iniciarVideo);
  areaLogo.addEventListener("mouseleave", pararVideo);

  areaLogo.addEventListener("click", function (event) {
    iniciarVideo();

    setTimeout(function () {
      pararVideo();
    }, 1800);
  });

  videoLogo.addEventListener("ended", function () {
    pararVideo();
  });
}