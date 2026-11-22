export function Monitoria({ m, abrir }) {
  if (m.monitoria.length === 0) {
    return (
      <div className="vazio">
        <b>Sem monitoria cadastrada</b>
        <p>Esta matéria não tem monitoria neste semestre. Que tal falar com o professor?</p>
        <button className="ajuda" onClick={() => abrir("professor")}>
          Falar com o professor
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="sec">Monitores de {m.curto}</div>
      {m.monitoria.map((mon) => (
        <div className="info" key={mon.monitor}>
          <h2>{mon.monitor}</h2>
          {mon.horarios.map((h) => (
            <div className="par" key={h.dia}>
              <span>{h.dia}</span>
              <b>{h.horario} · {h.local}</b>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}