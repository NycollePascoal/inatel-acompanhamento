import { Icon } from "../components/Icon";
import { Chip } from "../components/Chip";

const ATALHOS = [
  ["Notas", "bar"],
  ["Frequência", "cal"],
  ["Material", "book"],
];

const AVISOS = [
  { titulo: "Pendências comuns do final de semestre", data: "30/06/2026", para: "Prezado(a) Aluno(a)" },
  { titulo: "TRANSFERÊNCIA INTERNA DE CURSO/", data: "17/03/2025", para: "Prezados(as) alunos(as)," },
];

export function Inicio({ lista }) {
  const risco = lista.filter((m) => m.nivel !== "OK");
  const titulo =
    risco.length === 0
      ? "Tudo certo por aqui"
      : risco.length + (risco.length === 1 ? " matéria em risco" : " matérias em risco");

  return (
    <>
      <div className="perfil">
        <div className="foto">AS</div>
        <div>
          <b>Ana Souza</b>
          <span>Engenharia de Software · GES</span>
        </div>
      </div>

      <button className="card">
        <small>Seu semestre</small>
        <strong>{titulo}</strong>
        {risco.map((m) => (
          <div className="lin" key={m.nome}>
            <span>{m.nome}</span>
            <Chip nivel={m.nivel} />
          </div>
        ))}
        <em>Ver acompanhamento ›</em>
      </button>

      <div className="sec">Atalhos</div>
      <div className="atalhos">
        {ATALHOS.map(([nome, icone]) => (
          <button key={nome}>
            <Icon n={icone} />
            {nome}
          </button>
        ))}
      </div>

      <div className="sec">Avisos recentes</div>
      {AVISOS.map((a) => (
        <div className="aviso" key={a.titulo}>
          <div className="av">C</div>
          <div className="c">
            <div className="l">
              <span><span className="ex">!</span>CRA</span>
              <span className="d">{a.data}</span>
            </div>
            <span className="s">{a.titulo}</span>
            <span className="p">{a.para}</span>
          </div>
        </div>
      ))}
    </>
  );
}