export function Professor({ m }) {
  const p = m.professor;

  return (
    <div className="info">
      <h2>{p.nome}</h2>
      <div className="par"><span>Teams</span><b>{p.teams}</b></div>
      <div className="par"><span>E-mail</span><b>{p.email}</b></div>
      <div className="par"><span>Atendimento</span><b>{p.atendimento}</b></div>
      <div className="par"><span>Local</span><b>{p.local}</b></div>
    </div>
  );
}