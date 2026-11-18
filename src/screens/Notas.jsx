import { useState } from "react";
import { MEDIA } from "../data/materias";

export function Notas({ m }) {
  const [aba, setAba] = useState(0);
  const c = m.componentes[aba];

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
          <span>peso {Math.round(n.peso * 100)}%</span>
        </div>
      ))}

      <div className="minima">
        <small>Nota mínima necessária</small>
        <strong>{c.minima}</strong>
        <span>
          {c.minima > 100
            ? "Mesmo com 100, não é possível atingir a média " + MEDIA
            : "nas avaliações que faltam (média " + MEDIA + ")"}
        </span>
      </div>
    </>
  );
}