// Regras de aprovação do Inatel
export const MEDIA = 60;
export const FREQ_MIN = 0.75;

// Dados de exemplo (fictícios)
export const MATERIAS = [
  { nome: "Cálculo II", aulas: 48, faltas: 10,
    notas: [{ n: "P1", nota: 40, peso: 0.3 }] },
  { nome: "Física II", aulas: 48, faltas: 7,
    notas: [{ n: "P1", nota: 50, peso: 0.3 }, { n: "P2", nota: 55, peso: 0.3 }] },
  { nome: "Programação", aulas: 48, faltas: 2,
    notas: [{ n: "P1", nota: 80, peso: 0.5 }] },
];

export const ORDEM = { "RISCO": 0, "ATENÇÃO": 1, "OK": 2 };

export function avaliar(m) {
  const limite = Math.floor(m.aulas * (1 - FREQ_MIN));
  const pct = m.faltas / limite;
  const parcial = m.notas.reduce((soma, x) => soma + x.nota * x.peso, 0);
  const lancado = m.notas.reduce((soma, x) => soma + x.peso, 0);
  const minima = Math.max(0, Math.ceil((MEDIA - parcial) / (1 - lancado)));

  let nivel = "OK";
  if (pct >= 0.8 || minima > 80) nivel = "RISCO";
  else if (pct >= 0.6 || minima > 65) nivel = "ATENÇÃO";

  // Por que a matéria está nesse nível?
  const motivos = [];
  const detalhes = [];
  if (pct >= 0.6) {
    motivos.push("FALTA");
    detalhes.push(`Você usou ${Math.round(pct * 100)}% das faltas permitidas (${m.faltas} de ${limite}).`);
  }
  if (minima > 65) {
    motivos.push("NOTA");
    detalhes.push(`Para passar, você precisa de ${minima} nas próximas avaliações.`);
  }
  if (motivos.length === 0) {
    detalhes.push("Nenhum risco por enquanto. Continue assim!");
  }
  const titulo = motivos.length
    ? `${nivel} POR ${motivos.join(" E ")}`
    : "SITUAÇÃO REGULAR";

  return { ...m, limite, pct, minima, nivel, restam: limite - m.faltas, titulo, detalhes };
}