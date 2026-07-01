// ======================================================
// HOME - HAS Analytics
// Página única do site
// ======================================================
const URL_PLANILHA_ORCAMENTOS = "https://script.google.com/macros/s/AKfycbwFuSSuV7JF14AnB3Tgx6MWolZ6fiElef3UPWL92F-T0VVTbn2jxsLBS1t7XfkhPLQKvw/exec";

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

  formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const whatsapp = document.getElementById("whatsapp");
    const tipoServico = document.getElementById("tipo-servico");
    const prazo = document.getElementById("prazo");
    const area = document.getElementById("area");
    const descricao = document.getElementById("descricao");

    const bancoDados = document.getElementById("banco-dados");
    const urgencia = document.getElementById("urgencia");
    const responsabilidade = document.getElementById("responsabilidade");
    const modeloEntrega = document.getElementById("modelo-entrega");

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

    const dadosSolicitacao = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      whatsapp: whatsapp.value.trim(),

      tipoServico: tipoServico.options[tipoServico.selectedIndex].text,
      prazoDesejado: prazo.value.trim() || "Não informado",
      areaPesquisa: area.value.trim() || "Não informada",

      bancoDados: bancoDados && bancoDados.value
        ? bancoDados.options[bancoDados.selectedIndex].text
        : "Não informado",

      urgencia: urgencia && urgencia.value
        ? urgencia.options[urgencia.selectedIndex].text
        : "Não informada",

      responsabilidade: responsabilidade && responsabilidade.value
        ? responsabilidade.options[responsabilidade.selectedIndex].text
        : "Não informada",

      modeloEntrega: modeloEntrega && modeloEntrega.value
        ? modeloEntrega.options[modeloEntrega.selectedIndex].text
        : "Não informado",

      descricao: descricao.value.trim()
    };

    const numeroHaward = "5544999554888";

    const mensagem = `
Olá, Haward! Gostaria de solicitar um orçamento pela HAS Analytics.

Nome: ${dadosSolicitacao.nome}
E-mail: ${dadosSolicitacao.email}
WhatsApp: ${dadosSolicitacao.whatsapp}

Tipo de serviço: ${dadosSolicitacao.tipoServico}
Prazo desejado: ${dadosSolicitacao.prazoDesejado}
Área da pesquisa: ${dadosSolicitacao.areaPesquisa}

Informações para estimativa:
Situação do banco de dados: ${dadosSolicitacao.bancoDados}
Urgência da demanda: ${dadosSolicitacao.urgencia}
Finalidade do trabalho: ${dadosSolicitacao.responsabilidade}
Modelo de entrega esperado: ${dadosSolicitacao.modeloEntrega}

Descrição da demanda:
${dadosSolicitacao.descricao}
`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${numeroHaward}?text=${mensagemCodificada}`;

       try {
      await salvarSolicitacaoNaPlanilha(dadosSolicitacao);
      console.log("Solicitação enviada para a planilha.");
    } catch (erro) {
      console.warn("Não foi possível salvar na planilha, mas o WhatsApp será aberto:", erro);
    }

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

// ------------------------------------------------------
// Envia solicitação para a planilha de orçamentos
// ------------------------------------------------------

async function salvarSolicitacaoNaPlanilha(dados) {
  if (!URL_PLANILHA_ORCAMENTOS || URL_PLANILHA_ORCAMENTOS.includes("COLE_AQUI")) {
    console.warn("URL da planilha de orçamentos não configurada.");
    return;
  }

  const corpo = new URLSearchParams(dados);

  await fetch(URL_PLANILHA_ORCAMENTOS, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: corpo
  });
}