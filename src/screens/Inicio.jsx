import { Icon } from "../components/Icon";

const ATALHOS = [
  { nome: "Notas", icone: "bar" },
  { nome: "Frequência", icone: "cal" },
  { nome: "Acompanhamento Acadêmico", icone: "check", destino: "materias" },
];

const AVISOS = [
  { titulo: "Pendências comuns do final de semestre", data: "30/06/2026", para: "Prezado(a) Aluno(a)" },
  { titulo: "TRANSFERÊNCIA INTERNA DE CURSO/", data: "17/03/2025", para: "Prezados(as) alunos(as)," },
];

export function Inicio({ abrir, geral }) {
  return (
    <>
      <div className="perfil">
        <div className="foto">
          <Icon n="user" s={44} />
        </div>
        <div className="dados">
          <b>Ana Souza</b>
          <span>Engenharia de Software · GES-123</span>
          <span>ana.souza@ges.inatel.br</span>
        </div>
      </div>

      <div className="sec">Atalhos</div>
      <div className="atalhos">
        {ATALHOS.map((a) => (
          <button
            key={a.nome}
            className={"atalho" + (a.destaque ? " destaque" : "")}
            onClick={() => (a.destino ? abrir(a.destino) : geral(a.nome, a.icone))}
          >
            <Icon n={a.icone} />
            <span>{a.nome}</span>
          </button>
        ))}
      </div>

      <div className="sec topo">Avisos</div>
      {AVISOS.map((a) => (
        <div className="aviso" key={a.titulo}>
          <div className="av">C</div>
          <div className="c">
            <div className="l">
              <span>
                <span className="ex">!</span>CRA
              </span>
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