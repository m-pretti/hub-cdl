(function () {
  "use strict";

  const CATEGORIAS = window.HUB_CATEGORIAS || [];
  const LINKS = window.HUB_LINKS || [];
  const TODAS = "todas";

  const elFiltros = document.getElementById("filtros");
  const elConteudo = document.getElementById("conteudo");
  const elBusca = document.getElementById("busca");
  const elAviso = document.getElementById("aviso");

  const ICONE_COPIAR =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
  const ICONE_CHECK =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg>';
  const ICONE_COMPARTILHAR =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>';

  const estado = lerEstadoDaUrl();

  /* ---------- utilidades ---------- */

  function normalizar(texto) {
    return String(texto || "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
  }

  function el(tag, atributos, filhos) {
    const no = document.createElement(tag);
    Object.entries(atributos || {}).forEach(([chave, valor]) => {
      if (valor === undefined || valor === null || valor === false) return;
      if (chave === "texto") no.textContent = valor;
      else if (chave === "html") no.innerHTML = valor;
      else if (chave.startsWith("on")) no.addEventListener(chave.slice(2), valor);
      else no.setAttribute(chave, valor);
    });
    (filhos || []).forEach((filho) => filho && no.append(filho));
    return no;
  }

  function dominio(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  function iniciais(titulo) {
    return titulo
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((palavra) => palavra[0].toUpperCase())
      .join("");
  }

  function nomeDoAno(ano) {
    return `${ano}º ano`;
  }

  function categoriaPorId(id) {
    return CATEGORIAS.find((categoria) => categoria.id === id);
  }

  function urlDoHub(parametros) {
    const base = location.href.split(/[?#]/)[0];
    const busca = new URLSearchParams(parametros).toString();
    return busca ? `${base}?${busca}` : base;
  }

  async function copiar(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      const area = el("textarea", { readonly: "" });
      area.value = texto;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    }
  }

  let temporizadorAviso;
  function avisar(mensagem) {
    elAviso.textContent = mensagem;
    elAviso.classList.add("visivel");
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => elAviso.classList.remove("visivel"), 2200);
  }

  /* ---------- estado e URL ---------- */

  function lerEstadoDaUrl() {
    const parametros = new URLSearchParams(location.search);
    const categoria = parametros.get("categoria");
    return {
      categoria: categoriaPorId(categoria) ? categoria : TODAS,
      busca: parametros.get("q") || "",
    };
  }

  function salvarEstadoNaUrl() {
    const parametros = {};
    if (estado.categoria !== TODAS) parametros.categoria = estado.categoria;
    if (estado.busca) parametros.q = estado.busca;
    history.replaceState(null, "", urlDoHub(parametros));
  }

  function filtrar() {
    const termo = normalizar(estado.busca);
    return LINKS.filter((link) => {
      if (estado.categoria !== TODAS && link.categoria !== estado.categoria) return false;
      if (!termo) return true;
      const categoria = categoriaPorId(link.categoria);
      const alvo = normalizar(
        [
          link.titulo,
          link.descricao,
          dominio(link.url),
          categoria && categoria.nome,
          link.ano && nomeDoAno(link.ano),
          ...(link.tags || []),
        ].join(" ")
      );
      return termo.split(/\s+/).every((palavra) => alvo.includes(palavra));
    });
  }

  /* ---------- componentes ---------- */

  function criarIcone(link) {
    const iniciaisEl = () =>
      el("div", { class: "card__icone card__icone--iniciais", "aria-hidden": "true", texto: iniciais(link.titulo) });

    const imagem = link.foto || link.icone;
    if (!imagem) return iniciaisEl();

    const img = el("img", { src: imagem, alt: "", loading: "lazy", width: "56", height: "56" });
    const classe = link.foto ? "card__icone card__icone--foto" : "card__icone";
    const caixa = el("div", { class: classe, "aria-hidden": "true" }, [img]);
    img.addEventListener("error", () => caixa.replaceWith(iniciaisEl()));
    return caixa;
  }

  function criarCard(link) {
    const categoria = categoriaPorId(link.categoria);

    const botaoCopiar = el("button", {
      type: "button",
      class: "card__copiar",
      "aria-label": `Copiar link de ${link.titulo}`,
      html: `${ICONE_COPIAR}<span>Copiar link</span>`,
    });
    botaoCopiar.addEventListener("click", async () => {
      if (!(await copiar(link.url))) return avisar("Não foi possível copiar o link");
      avisar(`Link de ${link.titulo} copiado`);
      botaoCopiar.classList.add("copiado");
      botaoCopiar.innerHTML = `${ICONE_CHECK}<span>Copiado</span>`;
      setTimeout(() => {
        botaoCopiar.classList.remove("copiado");
        botaoCopiar.innerHTML = `${ICONE_COPIAR}<span>Copiar link</span>`;
      }, 2000);
    });

    return el("article", { class: "card" }, [
      el("div", { class: "card__topo" }, [
        criarIcone(link),
        el("div", {}, [
          el("h3", { class: "card__titulo" }, [
            el("a", { class: "card__link", href: link.url, target: "_blank", rel: "noopener", texto: link.titulo }),
          ]),
          el("span", { class: "card__dominio", texto: dominio(link.url) }),
        ]),
      ]),
      el("p", { class: "card__descricao", texto: link.descricao }),
      el("div", { class: "card__rodape" }, [
        categoria &&
          el("span", {
            class: "card__categoria",
            texto: link.ano ? `${categoria.nome} · ${nomeDoAno(link.ano)}` : categoria.nome,
          }),
        botaoCopiar,
      ]),
    ]);
  }

  /* links com "ano" viram subgrupos (1º ano, 2º ano…); os demais ficam numa grade só */
  function criarGrades(links) {
    if (!links.some((link) => link.ano)) return [el("div", { class: "grade" }, links.map(criarCard))];

    const anos = [...new Set(links.map((link) => link.ano || 0))].sort((a, b) => a - b);
    return anos.map((ano) =>
      el("div", { class: "subgrupo" }, [
        el("h3", { class: "subgrupo__titulo", texto: ano ? nomeDoAno(ano) : "Todos os anos" }),
        el("div", { class: "grade" }, links.filter((link) => (link.ano || 0) === ano).map(criarCard)),
      ])
    );
  }

  function criarSecao({ titulo, descricao, links, classe, categoriaId }) {
    let compartilhar = null;
    if (categoriaId) {
      compartilhar = el("button", {
        type: "button",
        class: "botao-texto",
        html: `${ICONE_COMPARTILHAR}<span>Copiar link da categoria</span>`,
        onclick: async () => {
          const ok = await copiar(urlDoHub({ categoria: categoriaId }));
          avisar(ok ? `Link da categoria ${titulo} copiado` : "Não foi possível copiar o link");
        },
      });
    }

    return el("section", { class: `secao ${classe || ""}`.trim() }, [
      el("div", { class: "secao__cabecalho" }, [
        el("div", {}, [el("h2", { texto: titulo }), descricao && el("p", { texto: descricao })]),
        compartilhar,
      ]),
      ...(categoriaId ? criarGrades(links) : [el("div", { class: "grade" }, links.map(criarCard))]),
    ]);
  }

  function criarVazio() {
    return el("div", { class: "vazio" }, [
      el("h2", { texto: "Nada encontrado" }),
      el("p", { texto: `Nenhum link corresponde a “${estado.busca}”. Tente outra palavra ou veja todas as categorias.` }),
      el("button", {
        type: "button",
        class: "botao-texto",
        texto: "Limpar busca e filtros",
        onclick: () => {
          estado.busca = "";
          estado.categoria = TODAS;
          elBusca.value = "";
          atualizar();
          elBusca.focus();
        },
      }),
    ]);
  }

  /* ---------- renderização ---------- */

  function renderizarFiltros() {
    const opcoes = [{ id: TODAS, nome: "Todos", total: LINKS.length }].concat(
      CATEGORIAS.map((categoria) => ({
        id: categoria.id,
        nome: categoria.nome,
        total: LINKS.filter((link) => link.categoria === categoria.id).length,
      })).filter((opcao) => opcao.total > 0)
    );

    elFiltros.replaceChildren(
      ...opcoes.map((opcao) =>
        el(
          "button",
          {
            type: "button",
            class: "chip",
            "aria-pressed": String(estado.categoria === opcao.id),
            onclick: () => {
              estado.categoria = opcao.id;
              atualizar();
            },
          },
          [el("span", { texto: opcao.nome }), el("span", { class: "chip__total", texto: String(opcao.total) })]
        )
      )
    );
  }

  function renderizarConteudo() {
    const resultado = filtrar();

    if (!resultado.length) {
      elConteudo.replaceChildren(criarVazio());
      return;
    }

    if (estado.busca) {
      const plural = resultado.length === 1 ? "resultado" : "resultados";
      elConteudo.replaceChildren(
        criarSecao({ titulo: `${resultado.length} ${plural} para “${estado.busca}”`, links: resultado })
      );
      return;
    }

    const secoes = [];

    if (estado.categoria === TODAS) {
      const destaques = resultado.filter((link) => link.destaque);
      if (destaques.length) {
        secoes.push(criarSecao({ titulo: "Destaques", links: destaques, classe: "secao__destaque" }));
      }
    }

    CATEGORIAS.forEach((categoria) => {
      const links = resultado.filter((link) => link.categoria === categoria.id);
      if (!links.length) return;
      secoes.push(
        criarSecao({ titulo: categoria.nome, descricao: categoria.descricao, links, categoriaId: categoria.id })
      );
    });

    elConteudo.replaceChildren(...secoes);
  }

  function atualizar() {
    salvarEstadoNaUrl();
    renderizarFiltros();
    renderizarConteudo();
  }

  /* ---------- eventos ---------- */

  elBusca.value = estado.busca;

  elBusca.addEventListener("input", () => {
    estado.busca = elBusca.value.trim();
    atualizar();
  });

  document.addEventListener("keydown", (evento) => {
    const digitando = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (evento.key === "/" && !digitando) {
      evento.preventDefault();
      elBusca.focus();
    } else if (evento.key === "Escape" && document.activeElement === elBusca && elBusca.value) {
      elBusca.value = "";
      estado.busca = "";
      atualizar();
    }
  });

  atualizar();
})();
