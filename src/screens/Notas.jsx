import { useEffect, useRef, useState } from "react";

// 0.425 vira "42,5%" e 0.35 vira "35%"
const pc = (p) => String(Math.round(p * 1000) / 10).replace(".", ",") + "%";

export function Notas({ m }) {
  const [aba, setAba] = useState(0);
  const [simulacaoAberta, setSimulacaoAberta] = useState(false);
  const [notasSimuladas, setNotasSimuladas] = useState({});
  const [ajudaMinimaAberta, setAjudaMinimaAberta] = useState(false);
  const simuladorRef = useRef(null);
  const c = m.componentes[aba];
  const pendentes = c.notas.filter((nota) => nota.nota === null);
  const chaveNota = (nota) => `${c.tipo}:${nota.n}`;
  const textoAjudaMinima = c.minima > 100
    ? `Mesmo com 100 em todas as avaliações restantes, a média da matéria não chega a ${m.media}.`
    : pendentes.length > 1
      ? "Média ponderada das pendentes, não a nota de cada uma."
      : null;
  const simulacaoCompleta = pendentes.length > 1 && pendentes.every((nota) => {
    const valor = notasSimuladas[chaveNota(nota)];
    const notaSimulada = Number(valor);
    return valor !== undefined && valor.trim() !== "" &&
      Number.isFinite(notaSimulada) && notaSimulada >= 0 && notaSimulada <= 100;
  });
  const mediaSimulada = simulacaoCompleta
    ? c.notas.reduce((soma, nota) => {
      const notaAtual = nota.nota ?? Number(notasSimuladas[chaveNota(nota)]);
      return soma + notaAtual * nota.peso;
    }, 0)
    : null;
  const formatarNota = (nota) =>
    String(Math.round(nota * 10) / 10).replace(".", ",");

  useEffect(() => {
    if (simulacaoAberta) {
      simuladorRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [simulacaoAberta, ajudaMinimaAberta]);

  return (
    <>
      {m.componentes.length > 1 && (
        <div className="abas">
          {m.componentes.map((x, i) => (
            <button
              key={x.tipo}
              className={"aba" + (i === aba ? " on" : "")}
              onClick={() => {
                setAba(i);
                setAjudaMinimaAberta(false);
              }}
            >
              {x.tipo}
            </button>
          ))}
        </div>
      )}

      <div className="sec">Avaliações</div>
      {c.notas.map((n) => (
        <div className="nota" key={n.n}>
          <span>{n.n}</span>
          <span>{n.nota ?? "—"}</span>
          <span>peso {pc(n.peso)}</span>
        </div>
      ))}

      <div className="minima">
        <div className="minima-titulo">
          <small>Nota mínima necessária</small>
          {textoAjudaMinima && (
            <button
              className="minima-ajuda-toggle"
              type="button"
              aria-label="Sobre a nota mínima"
              aria-expanded={ajudaMinimaAberta}
              aria-controls="ajuda-nota-minima"
              onClick={() => setAjudaMinimaAberta((aberta) => !aberta)}
            >
              ?
            </button>
          )}
        </div>
        <strong>{c.minima}</strong>
        <span>Média da matéria: {m.media}</span>
        {textoAjudaMinima && (
          <p
            className="minima-ajuda"
            id="ajuda-nota-minima"
            hidden={!ajudaMinimaAberta}
          >
            {textoAjudaMinima}
          </p>
        )}
      </div>

      {pendentes.length > 1 && (
        <>
          <button
            className="sim-toggle"
            type="button"
            aria-expanded={simulacaoAberta}
            aria-controls="simulador-notas"
            onClick={() => setSimulacaoAberta((aberta) => !aberta)}
          >
            {simulacaoAberta ? "Fechar simulação" : "Simular notas"}
          </button>

          <section
            className="simulador"
            id="simulador-notas"
            ref={simuladorRef}
            aria-labelledby="simulador-titulo"
            hidden={!simulacaoAberta}
          >
            <h2 id="simulador-titulo">Notas para simular</h2>
            <p className="simulador-explicacao">
              Considera notas já lançadas e os pesos.
            </p>
            {pendentes.map((nota) => (
              <label className="simulador-linha" key={nota.n}>
                <span>
                  {nota.n}
                  <small>peso {pc(nota.peso)}</small>
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  aria-label={`Nota simulada para ${nota.n}`}
                  value={notasSimuladas[chaveNota(nota)] ?? ""}
                  onChange={(evento) =>
                    setNotasSimuladas((atuais) => ({
                      ...atuais,
                      [chaveNota(nota)]: evento.target.value,
                    }))
                  }
                />
              </label>
            ))}
            <div className="simulador-resultado" aria-live="polite">
              <span>Média projetada</span>
              <strong>{mediaSimulada === null ? "—" : formatarNota(mediaSimulada)}</strong>
            </div>
            <p className="simulador-aviso">Simulação temporária; não altera suas notas.</p>
          </section>
        </>
      )}
    </>
  );
}