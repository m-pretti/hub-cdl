/* ============================================================
   Conteúdo do Hub CDL

   Para adicionar um link, copie um bloco de LINKS, preencha os
   campos e salve. Não é preciso mexer em mais nenhum arquivo.

   Campos de cada link:
     id         identificador único, sem espaços (ex.: "leetcode")
     titulo     nome exibido no card
     descricao  uma ou duas frases sobre para que serve
     url        endereço completo, com https://
     categoria  id de uma das CATEGORIAS abaixo
     icone      (opcional) caminho da imagem em icons/; sem ícone,
                o card mostra as iniciais do título
     tags       (opcional) palavras extras que ajudam na busca
     destaque   (opcional) true para aparecer em "Destaques"

   Campos extras para a categoria "especialistas":
     ano        ano do curso que o especialista atende (1 a 4);
                a seção é dividida por ano automaticamente
     foto       caminho da foto em icons/especialistas/; aparece
                redonda no lugar do ícone
   ============================================================ */

window.HUB_CATEGORIAS = [
  {
    id: "vida-academica",
    nome: "Vida acadêmica",
    descricao: "Cursos, grade curricular e materiais do Inteli.",
  },
  {
    id: "autoconhecimento",
    nome: "Autoconhecimento",
    descricao: "Testes e reflexões sobre perfil, interesses e personalidade.",
  },
  {
    id: "carreira",
    nome: "Carreira e vagas",
    descricao: "Empresas, vagas, salários e preparação para o mercado.",
  },
  {
    id: "especialistas",
    nome: "Especialistas de carreira",
    descricao: "Agende um atendimento com o especialista de carreira do seu ano.",
  },
  {
    id: "pratica-tecnica",
    nome: "Prática técnica",
    descricao: "Exercícios para treinar programação e entrevistas técnicas.",
  },
];

window.HUB_LINKS = [
  {
    id: "grade-curricular",
    titulo: "Grade curricular Inteli",
    descricao: "Organograma interativo da grade curricular dos cursos do Inteli.",
    url: "https://m-pretti.github.io/organograma-inteli/",
    categoria: "vida-academica",
    icone: "icons/grade-curricular.svg",
    tags: ["organograma", "disciplinas", "módulos", "cursos"],
    destaque: true,
  },
  {
    id: "quiz-vocacional",
    titulo: "Quiz Vocacional Inteli",
    descricao: "Responda perguntas sobre seus interesses e descubra qual curso do Inteli combina mais com você.",
    url: "https://andrematui-inteli.github.io/quizz-vocacional-inteli/v4/",
    categoria: "autoconhecimento",
    icone: "icons/quiz-vocacional.svg",
    tags: ["vocação", "cursos", "teste", "perfil"],
    destaque: true,
  },
  {
    id: "16personalities",
    titulo: "16Personalities",
    descricao: "Teste de personalidade gratuito que descreve seus traços, pontos fortes e estilo de trabalho.",
    url: "https://www.16personalities.com/br/teste-de-personalidade",
    categoria: "autoconhecimento",
    icone: "icons/16personalities.png",
    tags: ["personalidade", "mbti", "teste", "perfil"],
  },
  {
    id: "glassdoor",
    titulo: "Glassdoor Vagas",
    descricao: "Busque vagas e veja avaliações, salários e relatos de entrevistas de empresas.",
    url: "https://www.glassdoor.com.br/Job/index.htm",
    categoria: "carreira",
    icone: "icons/glassdoor.png",
    tags: ["vagas", "estágio", "empresas", "salários", "entrevistas"],
  },
  {
    id: "luana-moretti",
    titulo: "Luana Moretti",
    descricao: "Agende um horário com a especialista de carreira que acompanha os alunos do 3º ano.",
    url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3oqheDDXVTn2p5Ng0uB0Q8Wp2UJt3cqFRvqfwbGWlucIe6gWDdX1mpgarPZ88My4o2Mlnvwk9x",
    categoria: "especialistas",
    ano: 3,
    foto: "icons/especialistas/luana-moretti.jpg",
    tags: ["agendamento", "atendimento", "mentoria", "especialista", "carreira"],
  },
  {
    id: "leetcode",
    titulo: "LeetCode",
    descricao: "Problemas de programação para praticar algoritmos e se preparar para entrevistas técnicas.",
    url: "https://leetcode.com/",
    categoria: "pratica-tecnica",
    icone: "icons/leetcode.png",
    tags: ["algoritmos", "programação", "entrevistas", "código"],
  },
];
