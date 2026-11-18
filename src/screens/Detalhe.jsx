export function Detalhe({ m, abrir, aviso }) {
  const cor = m.nivel === "RISCO" ? "r" : m.nivel === "ATENÇÃO" ? "a" : "v";

  return (
    <>
      <div className={"banner " + cor}>
        <b>{m.titulo}</b>
        {m.detalhes.map((d) => (
          <p key={d}>{d}</p>
        ))}
      </div>

      <button className="linha" onClick={() => abrir("notas")}>
        <span>Notas</span>
        <span>›</span>
      </button>
      <button className="linha" onClick={() => abrir("faltas")}>
        <span>Faltas</span>
        <span>›</span>
      </button>

      <button className="ajuda" onClick={() => aviso("Tela de Ajuda: em breve")}>
        Preciso de ajuda nessa matéria
      </button>
    </>
  );
}