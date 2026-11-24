import { Chip } from "../components/Chip";

const FILTROS = [
  ["todas", "Todas"],
  ["RISCO", "Em risco"],
  ["ATENÇÃO", "Atenção"],
  ["OK", "Em dia"],
];

const VAZIO = {
  RISCO: "Nenhuma matéria em risco. Continue assim!",
  "ATENÇÃO": "Nenhuma matéria em atenção por enquanto.",
  OK: "Nenhuma matéria em dia ainda.",
};

export function Materias({ lista, abrirMateria, filtro, setFiltro }) {
  const visiveis = filtro === "todas" ? lista : lista.filter((m) => m.nivel === filtro);
  const contar = (valor) =>
    valor === "todas" ? lista.length : lista.filter((m) => m.nivel === valor).length;

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar matérias">
        {FILTROS.map(([valor, rotulo]) => (
          <button
            key={valor}
            className={"filtro" + (filtro === valor ? " on" : "")}
            aria-pressed={filtro === valor}
            onClick={() => setFiltro(valor)}
          >
            {rotulo} · {contar(valor)}
          </button>
        ))}
      </div>

      <div className="sec" aria-live="polite">
        Mostrando {visiveis.length} de {lista.length} matérias
      </div>

      {visiveis.length === 0 ? (
        <div className="vazio">
          <b>Nada por aqui</b>
          <p>{VAZIO[filtro]}</p>
        </div>
      ) : (
        visiveis.map((m) => (
          <button className="item" key={m.sigla} onClick={() => abrirMateria(m)}>
            <span>
              <b>{m.nome}</b>
              <small>
                {m.sigla} · Faltas {m.faltas} de {m.limite} · nota mínima {m.minima}
              </small>
            </span>
            <Chip nivel={m.nivel} />
          </button>
        ))
      )}
    </>
  );
}