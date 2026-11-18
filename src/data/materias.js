// Regras de aprovação do Inatel
export const MEDIA = 60;        // nota mínima para aprovar (0 a 100)
export const FREQ_MIN = 0.75;   // presença mínima de 75%

// Dados de exemplo (fictícios). nota: null = ainda não lançada
export const MATERIAS = [
  {
    nome: "Cálculo II",
    componentes: [
      { tipo: "Teoria", aulas: 48, faltas: 10, notas: [
        { n: "Prova 1", nota: 40, peso: 0.3 },
        { n: "Prova 2", nota: null, peso: 0.4 },
        { n: "Trabalho", nota: null, peso: 0.3 },
      ] },
    ],
  },
  {
    nome: "Física II",
    componentes: [
      { tipo: "Teoria", aulas: 48, faltas: 7, notas: [
        { n: "Prova 1", nota: 50, peso: 0.3 },
        { n: "Prova 2", nota: 55, peso: 0.3 },
        { n: "Trabalho", nota: null, peso: 0.4 },
      ] },
      { tipo: "Lab", aulas: 16, faltas: 3, notas: [
        { n: "Relatório 1", nota: 70, peso: 0.5 },
        { n: "Relatório 2", nota: null, peso: 0.5 },
      ] },
    ],
  },
  {
    nome: "Programação",
    componentes: [
      { tipo: "Teoria", aulas: 48, faltas: 2, notas: [
        { n: "Prova 1", nota: 80, peso: 0.5 },
        { n: "Prova 2", nota: null, peso: 0.5 },
      ] },
    ],
  },
];

export const ORDEM = { "RISCO": 0, "ATENÇÃO": 1, "OK": 2 };

// Calcula a situação de UM componente (teoria ou lab)
function avaliarComp(c) {
  const limite = Math.floor(c.aulas * (1 - FREQ_MIN));
  const pct = c.faltas / limite;

  const lancadas = c.notas.filter((x) => x.nota !== null);
  const parcial = lancadas.reduce((soma, x) => soma + x.nota * x.peso, 0);
  const pesoLancado = lancadas.reduce((soma, x) => soma + x.peso, 0);
  const resto = 1 - pesoLancado;
  const minima = resto <= 0 ? 0 : Math.max(0, Math.ceil((MEDIA - parcial) / resto));

  let nivel = "OK";
  if (pct >= 0.8 || minima > 80) nivel = "RISCO";
  else if (pct >= 0.6 || minima > 65) nivel = "ATENÇÃO";

  return { ...c, limite, pct, minima, nivel, restam: limite - c.faltas };
}

// Calcula a situação da MATÉRIA, juntando os componentes
export function avaliar(m) {
  const comps = m.componentes.map(avaliarComp);
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