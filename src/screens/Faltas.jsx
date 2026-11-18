import { useState } from "react";

const plural = (n) => (n === 1 ? "falta" : "faltas");

export function Faltas({ m }) {
  const [aba, setAba] = useState(0);
  const c = m.componentes[aba];
  const pct = Math.min(100, Math.round(c.pct * 100));
  const cor = c.nivel === "RISCO" ? "r" : c.nivel === "ATENÇÃO" ? "a" : "v";
  const nomeAba = (x) => (x.tipo === "Teoria" ? "Aula" : x.tipo);

  let situacao;
  if (c.restam > 0) situacao = `Restam ${c.restam} ${plural(c.restam)}`;
  else if (c.restam === 0) situacao = "Limite de faltas atingido";
  else situacao = `Limite ultrapassado em ${-c.restam} ${plural(-c.restam)}`;

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
              {nomeAba(x)}
            </button>
          ))}
        </div>
      )}

      <div className="sec">Frequência</div>
      <div className="faltas">
        <p>
          Faltas: <b>{c.faltas}</b> de {c.limite} permitidas
        </p>
        <div
          className="barra"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <i className={cor} style={{ width: pct + "%" }} />
        </div>
        <small>{pct}% do limite usado</small>
      </div>

      <div className={"restam " + cor}>{situacao}</div>

      <div className="just">
        <span>Faltas justificadas</span>
        <span>{c.justificadas}</span>
      </div>
    </>
  );
}