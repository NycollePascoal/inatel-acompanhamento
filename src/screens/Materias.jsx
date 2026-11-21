import { Chip } from "../components/Chip";

export function Materias({ lista, abrirMateria }) {
  return (
    <>
      <div className="sec">Em risco aparecem primeiro</div>
      {lista.map((m) => (
        <button className="item" key={m.sigla} onClick={() => abrirMateria(m)}>
          <span>
            <b>{m.nome}</b>
            <small>
              {m.sigla} · Faltas {m.faltas} de {m.limite} · nota mínima {m.minima}
            </small>
          </span>
          <Chip nivel={m.nivel} />
        </button>
      ))}
    </>
  );
}