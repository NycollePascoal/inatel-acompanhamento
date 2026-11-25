import { Icon } from "../components/Icon";
import { AVISOS } from "../data/avisos";

const ATALHOS = [
  { nome: "Notas", icone: "bar" },
  { nome: "Frequência", icone: "cal" },
  { nome: "Acompanhamento Acadêmico", icone: "check", destino: "materias" },
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

      <p className="prototipo">
        Protótipo demonstrativo: dados fictícios, sem integração ao sistema do Inatel.
      </p>

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
      {AVISOS.slice(0, 2).map((a) => (
        <div className="aviso" key={a.titulo}>
          <div className={"av" + (a.origem === "Acompanhamento Acadêmico" ? " academico" : "")}>
            {a.codigo}
          </div>
          <div className="c">
            <div className="l">
              <span className="aviso-origem">{a.origem}</span>
              <span className="d">{a.data}</span>
            </div>
            <span className="s">{a.titulo}</span>
            <span className="p">{a.para}</span>
          </div>
        </div>
      ))}
      <button className="lermais" type="button" onClick={() => abrir("avisos")}>
        Ler mais...
      </button>
    </>
  );
}