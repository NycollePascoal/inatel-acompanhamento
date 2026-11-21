// Regra de presença do Inatel: mínimo de 75% (pode faltar até 25% das aulas)
export const FREQ_MIN = 0.75;

// Atalhos para montar as listas de notas
const nt = (n, nota, peso) => ({ n, nota, peso });
const relatorios = (qtd, lancadas) =>
  Array.from({ length: qtd }, (_, i) => nt("Relatório " + (i + 1), lancadas[i] ?? null, 1 / qtd));

// Matérias do semestre 2026/2 (notas, faltas, professores e monitores são fictícios)
// nota: null = ainda não lançada. Os pesos de cada componente somam 1.
export const MATERIAS = [
  {
    sigla: "M05",
    nome: "Cálculo Aplicado à Séries e Equações Diferenciais",
    curto: "Cálculo Aplicado",
    media: 60,
    professor: { nome: "Prof. Carlos Lima", teams: "carlos.lima", email: "carlos.lima@inatel.br",
      atendimento: "Terça, 10h às 12h", local: "Sala C-205" },
    monitoria: { dia: "Segunda e quarta", horario: "14h às 16h", sala: "Sala B-102", monitor: "João Pereira" },
    componentes: [
      { tipo: "Teoria", aulas: 80, faltas: 14, justificadas: 1, notas: [
        nt("Prova 1", 40, 0.35), nt("Prova 2", 45, 0.3), nt("Prova 3", null, 0.35),
      ] },
    ],
  },
  {
    sigla: "F03",
    nome: "Física Aplicada na Eletricidade e Eletromagnetismo",
    curto: "Física Aplicada",
    media: 60,
    professor: { nome: "Profa. Marina Alves", teams: "marina.alves", email: "marina.alves@inatel.br",
      atendimento: "Quinta, 16h às 18h", local: "Sala D-310" },
    monitoria: { dia: "Terça e quinta", horario: "18h às 20h", sala: "Lab. de Física", monitor: "Beatriz Souza" },
    componentes: [
      { tipo: "Teoria", aulas: 40, faltas: 6, justificadas: 0, notas: [
        nt("Prova 1", 55, 0.425), nt("Seminário (escrito)", 80, 0.075),
        nt("Prova 2", null, 0.425), nt("Seminário (apresentação)", null, 0.075),
      ] },
      { tipo: "Lab", aulas: 20, faltas: 3, justificadas: 1, notas: relatorios(7, [70, 65, 50, 60]) },
    ],
  },
  {
    sigla: "E08",
    nome: "Eletrônica Digital Aplicada a Contadores e Sequenciadores",
    curto: "Eletrônica Digital",
    media: 60,
    professor: { nome: "Prof. Rafael Costa", teams: "rafael.costa", email: "rafael.costa@inatel.br",
      atendimento: "Sexta, 14h às 16h", local: "Sala A-101" },
    monitoria: { dia: "Quarta", horario: "16h às 18h", sala: "Lab. de Eletrônica", monitor: "Lucas Martins" },
    componentes: [
      { tipo: "Teoria", aulas: 40, faltas: 2, justificadas: 0, notas: [
        nt("Prova 1", 72, 0.5), nt("Prova 2", null, 0.5),
      ] },
      { tipo: "Lab", aulas: 20, faltas: 1, justificadas: 0, notas: [
        nt("Teste 1", 45, 0.4), nt("Projeto", null, 0.5), nt("Média dos relatórios", 80, 0.1),
      ] },
    ],
  },
  {
    sigla: "S01",
    nome: "Paradigmas da Programação",
    curto: "Paradigmas",
    media: 60,
    professor: { nome: "Prof. Bruno Teixeira", teams: "bruno.teixeira", email: "bruno.teixeira@inatel.br",
      atendimento: "Segunda, 16h às 18h", local: "Sala A-204" },
    monitoria: { dia: "Quinta", horario: "14h às 16h", sala: "Lab. de Computação", monitor: "Camila Rocha" },
    componentes: [
      { tipo: "Teoria", aulas: 40, faltas: 9, justificadas: 0, notas: [
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
    professor: { nome: "Prof. André Ribeiro", teams: "andre.ribeiro", email: "andre.ribeiro@inatel.br",
      atendimento: "Quarta, 10h às 12h", local: "Sala A-110" },
    monitoria: null,
    componentes: [
      { tipo: "Teoria", aulas: 40, faltas: 1, justificadas: 0, notas: [
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
    professor: { nome: "Profa. Helena Duarte", teams: "helena.duarte", email: "helena.duarte@inatel.br",
      atendimento: "Sexta, 10h às 11h", local: "Sala B-301" },
    monitoria: null,
    componentes: [
      { tipo: "Teoria", aulas: 20, faltas: 1, justificadas: 0, notas: [
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