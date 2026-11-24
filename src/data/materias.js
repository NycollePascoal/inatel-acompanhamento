// Regra de presença do Inatel: mínimo de 75% (pode faltar até 25% das aulas)
export const FREQ_MIN = 0.75;

// Atalhos para montar as listas de notas
const nt = (n, nota, peso) => ({ n, nota, peso });
const relatorios = (qtd, lancadas) =>
  Array.from({ length: qtd }, (_, i) => nt("Relatório " + (i + 1), lancadas[i] ?? null, 1 / qtd));

// Matérias do semestre 2026/2 (notas e faltas são fictícias)
// nota: null = ainda não lançada. Os pesos de cada componente somam 1.
// Contatos dos professores não constam nas ementas, por isso são genéricos.
const CONTATO = { teams: "Chat do Teams", email: "E-mail institucional",
  atendimento: "A combinar com o professor", local: "—" };

export const MATERIAS = [
  {
    sigla: "M05",
    nome: "Cálculo Aplicado à Séries e Equações Diferenciais",
    curto: "Cálculo Aplicado",
    media: 60,
    professor: { nome: "Prof. Felipe Emanoel Chaves", ...CONTATO },
    monitoria: [
      { monitor: "Leonardo", horarios: [
        { dia: "Quarta-feira", horario: "17:30 às 19:00", local: "I-8" },
        { dia: "Quinta-feira", horario: "17:30 às 19:00", local: "I-9" },
      ] },
    ],
    componentes: [
      { tipo: "Teoria", aulas: 80, faltas: 14, justificadas: 2, notas: [
        nt("Prova 1", 40, 0.35), nt("Prova 2", 45, 0.3), nt("Prova 3", null, 0.35),
      ] },
    ],
  },
  {
    sigla: "F03",
    nome: "Física Aplicada na Eletricidade e Eletromagnetismo",
    curto: "Física Aplicada",
    media: 60,
    professor: { nome: "Prof. Breno Monteiro dos Santos", ...CONTATO },
    monitoria: [
      { monitor: "Anna", horarios: [
        { dia: "Segunda-feira", horario: "17:30 às 19:30", local: "Teams" },
        { dia: "Quinta-feira", horario: "17:30 às 19:30", local: "Teams" },
      ] },
      { monitor: "Beatriz", horarios: [
        { dia: "Segunda-feira", horario: "17:30 às 19:30", local: "Teams" },
        { dia: "Terça-feira", horario: "17:30 às 19:30", local: "Teams" },
      ] },
      { monitor: "Maria Fernanda", horarios: [
        { dia: "Segunda-feira", horario: "17:30 às 19:30", local: "I-24" },
        { dia: "Sexta-feira", horario: "17:30 às 19:30", local: "I-24" },
      ] },
      { monitor: "Maria Rita", horarios: [
        { dia: "Terça-feira", horario: "17:30 às 19:30", local: "Teams" },
        { dia: "Quarta-feira", horario: "17:30 às 19:30", local: "Teams" },
      ] },
    ],
    componentes: [
      { tipo: "Teoria", aulas: 40, faltas: 6, justificadas: 0, notas: [
        nt("Prova 1", 55, 0.425), nt("Seminário (escrito)", 80, 0.075),
        nt("Prova 2", null, 0.425), nt("Seminário (apresentação)", null, 0.075),
      ] },
      { tipo: "Lab", aulas: 20, faltas: 2, justificadas: 0, notas: relatorios(7, [70, 65, 50, 60]) },
    ],
  },
  {
    sigla: "E08",
    nome: "Eletrônica Digital Aplicada a Contadores e Sequenciadores",
    curto: "Eletrônica Digital",
    media: 60,
    professor: { nome: "Prof. Bruno de Oliveira Monteiro", ...CONTATO },
    monitoria: [
      { monitor: "Antonio", horarios: [{ dia: "Segunda-feira", horario: "17:30 às 19:30", local: "III-3" }] },
      { monitor: "Bianca", horarios: [{ dia: "Quarta-feira", horario: "17:30 às 19:30", local: "III-3" }] },
      { monitor: "João", horarios: [{ dia: "Segunda-feira", horario: "17:30 às 19:30", local: "III-4" }] },
      { monitor: "José", horarios: [{ dia: "Quarta-feira", horario: "17:30 às 18:30", local: "III-4" }] },
      { monitor: "Maria", horarios: [{ dia: "Terça-feira", horario: "15:30 às 17:30", local: "III-3" }] },
    ],
    componentes: [
      { tipo: "Teoria", aulas: 40, faltas: 2, justificadas: 0, notas: [
        nt("Prova 1", 72, 0.5), nt("Prova 2", null, 0.5),
      ] },
      { tipo: "Lab", aulas: 20, faltas: 2, justificadas: 0, notas: [
        nt("Teste 1", 45, 0.4), nt("Projeto", null, 0.5), nt("Média dos relatórios", 80, 0.1),
      ] },
    ],
  },
  {
    sigla: "S01",
    nome: "Paradigmas da Programação",
    curto: "Paradigmas",
    media: 60,
    professor: { nome: "Prof. Ruan Patrick de Souza", ...CONTATO },
    monitoria: [
      { monitor: "Felipe", horarios: [{ dia: "Quarta-feira", horario: "17:30 às 19:30", local: "Teams" }] },
      { monitor: "Pedro", horarios: [{ dia: "Sexta-feira", horario: "17:30 às 19:30", local: "Teams" }] },
    ],
    componentes: [
      { tipo: "Teoria", aulas: 40, faltas: 8, justificadas: 0, notas: [
        nt("Prova 1", 70, 0.375), nt("Trabalho teórico", 80, 0.125),
        nt("Prova 2", null, 0.375), nt("Entrega de exercícios", null, 0.125),
      ] },
      { tipo: "Lab", aulas: 40, faltas: 2, justificadas: 0, notas: relatorios(5, [70, 80, 75]) },
    ],
  },
  {
    sigla: "S05",
    nome: "Interação Homem Máquina",
    curto: "IHM",
    media: 60,
    professor: { nome: "Prof. Raphael Cardoso Mota Pereira", ...CONTATO },
    monitoria: [
      { monitor: "Juliano", horarios: [
        { dia: "Segunda-feira", horario: "18:00 às 19:00", local: "Teams" },
        { dia: "Sexta-feira", horario: "18:00 às 19:00", local: "Teams" },
      ] },
    ],
    componentes: [
      { tipo: "Teoria", aulas: 40, faltas: 2, justificadas: 0, notas: [
        nt("Prova 1", 80, 0.35), nt("Exercícios 1", 90, 0.15),
        nt("Prova 2", null, 0.35), nt("Exercícios 2", null, 0.15),
      ] },
      { tipo: "Lab", aulas: 40, faltas: 0, justificadas: 0, notas: [
        nt("Relatórios práticos", 85, 0.5), nt("Projeto final", null, 0.5),
      ] },
    ],
  },
  {
    sigla: "G04",
    nome: "Fundamentos de Gestão de Projetos",
    curto: "Gestão de Projetos",
    media: 50,
    professor: { nome: "Profa. Milena de Oliveira Arantes", ...CONTATO },
    monitoria: [],
    componentes: [
      { tipo: "Teoria", aulas: 20, faltas: 2, justificadas: 0, notas: [
        nt("Dinâmica 1", 70, 0.25), nt("Dinâmica 2", 65, 0.25),
        nt("Dinâmica 3", null, 0.25), nt("Dinâmica 4", null, 0.25),
      ] },
    ],
  },
];

export const ORDEM = { "RISCO": 0, "ATENÇÃO": 1, "OK": 2 };

// Calcula a situação de UM componente (teoria ou lab)
function avaliarComp(c, media) {
  const limite = Math.floor(c.aulas * (1 - FREQ_MIN));
  const pct = c.faltas / limite;

  const lancadas = c.notas.filter((x) => x.nota !== null);
  const parcial = lancadas.reduce((soma, x) => soma + x.nota * x.peso, 0);
  const pesoLancado = lancadas.reduce((soma, x) => soma + x.peso, 0);
  const resto = 1 - pesoLancado;
  const minima = resto < 0.0001 ? 0 : Math.max(0, Math.ceil((media - parcial) / resto - 1e-9));

  let nivel = "OK";
  if (pct >= 0.8 || minima > 80) nivel = "RISCO";
  else if (pct >= 0.6 || minima > 65) nivel = "ATENÇÃO";

  return { ...c, limite, pct, minima, nivel, restam: limite - c.faltas };
}

// Calcula a situação da MATÉRIA, juntando os componentes
export function avaliar(m) {
  const comps = m.componentes.map((c) => avaliarComp(c, m.media));
  const comLab = comps.length > 1;
  const nivel = comps.map((c) => c.nivel).sort((a, b) => ORDEM[a] - ORDEM[b])[0];

  const motivos = [];
  const detalhes = [];
  comps.forEach((c) => {
    const nome = comLab ? c.tipo + ": " : "";
    if (c.pct >= 0.6) {
      if (!motivos.includes("FALTA")) motivos.push("FALTA");
      detalhes.push(`${nome}Você usou ${Math.round(c.pct * 100)}% das faltas permitidas (${c.faltas} de ${c.limite}).`);
    }
    if (c.minima > 65) {
      if (!motivos.includes("NOTA")) motivos.push("NOTA");
      detalhes.push(`${nome}Para passar, você precisa de ${c.minima} nas próximas avaliações.`);
    }
  });
  if (detalhes.length === 0) detalhes.push("Nenhum risco por enquanto. Continue assim!");

  const titulo = motivos.length ? `${nivel} POR ${motivos.join(" E ")}` : "SITUAÇÃO REGULAR";
  const faltas = comps.reduce((s, c) => s + c.faltas, 0);
  const limite = comps.reduce((s, c) => s + c.limite, 0);
  const minima = Math.max(...comps.map((c) => c.minima));

  return { ...m, componentes: comps, nivel, titulo, detalhes, faltas, limite, minima, restam: limite - faltas };
}