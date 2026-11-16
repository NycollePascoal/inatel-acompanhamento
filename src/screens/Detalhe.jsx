export function Detalhe({ m, aviso }) {
  const cor = m.nivel === "RISCO" ? "r" : m.nivel === "ATENÇÃO" ? "a" : "v";

  return (
    <>
      <div className={"banner " + cor}>
        <b>{m.titulo}</b>
        {m.detalhes.map((d) => (
          <p key={d}>{d}</p>
        ))}
      </div>

      <button className="linha" onClick={() => aviso("Tela de Notas: próximo passo")}>
        <span>Notas</span>
        <span>›</span>
      </button>
      <button className="linha" onClick={() => aviso("Tela de Faltas: próximo passo")}>
        <span>Faltas</span>
        <span>›</span>
      </button>

      <button className="ajuda" onClick={() => aviso("Tela de Ajuda: em breve")}>
        Preciso de ajuda nessa matéria
      </button>
    </>
  );
}