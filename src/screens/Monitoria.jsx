export function Monitoria({ m, abrir }) {
  const mon = m.monitoria;

  if (!mon) {
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
    <div className="info">
      <h2>{m.curto}</h2>
      <div className="par"><span>Dia da semana</span><b>{mon.dia}</b></div>
      <div className="par"><span>Horário</span><b>{mon.horario}</b></div>
      <div className="par"><span>Sala</span><b>{mon.sala}</b></div>
      <div className="par"><span>Monitor</span><b>{mon.monitor}</b></div>
    </div>
  );
}