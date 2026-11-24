import { useState } from "react";

// 0.425 vira "42,5%" e 0.35 vira "35%"
const pc = (p) => String(Math.round(p * 1000) / 10).replace(".", ",") + "%";

export function Notas({ m }) {
  const [aba, setAba] = useState(0);
  const c = m.componentes[aba];
  const pendentes = c.notas.filter((nota) => nota.nota === null).length;

  return (
    <>
      {m.componentes.length > 1 && (
        <div className="abas">
          {m.componentes.map((x, i) => (
            <button
              key={x.tipo}
              className={"aba" + (i === aba ? " on" : "")}
              onClick={() => setAba(i)}
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
        <small>Nota mínima necessária</small>
        <strong>{c.minima}</strong>
        <span>Média da matéria: {m.media}</span>
      </div>

      {c.minima > 100 ? (
        <p className="minima-ajuda">
          Mesmo com 100 em todas as avaliações restantes, a média da matéria não chega a {m.media}.
        </p>
      ) : pendentes > 1 ? (
        <p className="minima-ajuda">
          Média ponderada das pendentes, não a nota de cada uma.
        </p>
      ) : null}
    </>
  );
}