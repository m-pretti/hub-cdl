# Hub CDL

Hub de ferramentas, sites e links importantes do **Centro de Desenvolvimento e Liderança (CDL) do Inteli**.
A equipe do CDL envia um único link aos alunos, e todos os links ficam reunidos aqui, organizados por categoria e com busca.

## Funcionalidades

- Cards com ícone, título, descrição curta e domínio de cada link
- Filtro por categoria e busca por nome, descrição, categoria ou tags (sem diferenciar acentos)
- Seção de **Destaques** na página inicial
- Botão **Copiar link** em cada card, para quem só quer pegar o link e colar
- **Copiar link da categoria**, que gera um endereço como `?categoria=carreira` e abre o hub já filtrado
- Atalhos: `/` foca a busca e `Esc` limpa

## Estrutura

```
index.html        página
css/styles.css    tokens de cor/tipografia e estilos
js/app.js         renderização, busca e filtros
data/links.js     conteúdo: categorias e links (o único arquivo que precisa mudar no dia a dia)
icons/            ícones dos links e favicon
```

Não tem build nem dependências: é HTML, CSS e JS puros.

## Como adicionar um link

1. Se quiser um ícone, salve a imagem em `icons/` (SVG ou PNG quadrado, de 128px ou mais).
2. Em `data/links.js`, copie um bloco de `HUB_LINKS` e preencha os campos:

```js
{
  id: "linkedin",
  titulo: "LinkedIn",
  descricao: "Rede profissional para montar seu perfil e acompanhar vagas.",
  url: "https://www.linkedin.com/",
  categoria: "carreira",          // id de uma das HUB_CATEGORIAS
  icone: "icons/linkedin.png",    // opcional; sem ícone, o card mostra as iniciais
  tags: ["networking", "vagas"],  // opcional; ajuda na busca
  destaque: true,                 // opcional; aparece em "Destaques"
},
```

Para criar uma categoria nova, adicione um item em `HUB_CATEGORIAS`. A ordem desse array é a ordem dos filtros e das seções. Categorias sem links não aparecem.

## Rodar localmente

Abra o `index.html` no navegador. Como o conteúdo é carregado por `<script>`, o arquivo funciona mesmo sem servidor.

## Publicar

No GitHub, vá em **Settings → Pages**, escolha *Deploy from a branch*, selecione a branch `main` e a pasta `/ (root)`, e salve.
O hub fica disponível em `https://<usuario>.github.io/hub-cdl/`.
