import { Icon } from "./Icon";

const item = (nome, icone, extra) => ({ nome, icone, ...extra });
const itemInicio = item("Início", "home", { destino: "inicio" });

const MENU = [
  {
    titulo: "Mensagens Acadêmicas",
    itens: [item("Avisos", "mail")],
  },
  {
    titulo: "Aproveitamento Escolar",
    itens: [
      item("Acompanhamento Acadêmico", "check", { novo: true, destino: "materias" }),
      item("Notas", "bar"),
      item("Frequência", "cal"),
      item("Material Didático", "book"),
      item("Plano de Ensino", "doc"),
      item("Histórico", "school"),
      item("Coeficientes", "clip"),
    ],
  },
  {
    titulo: "Atividades Complementares",
    itens: [
      item("Avaliações", "bar"),
      item("Frequência", "cal"),
      item("Eletivas", "cal"),
      item("Obrigatórias", "check"),
    ],
  },
  {
    titulo: "Calendários e Horários",
    itens: [
      item("Calendário Acadêmico", "cal"),
      item("Eventos Inatel", "cal"),
      item("Provas", "list"),
      item("Reposições", "edit"),
      item("Horários de Aula", "clock"),
      item("Cronograma de Aula", "cal"),
      item("Horários de Monitores", "clock"),
    ],
  },
  {
    titulo: "Financeiro",
    itens: [item("Tesouraria", "money")],
  },
  {
    titulo: "Outras Opções",
    itens: [
      item("Consulta de Pedidos", "check"),
      item("Avaliação Docente", "okc"),
      item("Pesquisa Institucional", "cal"),
      item("Central de Cópias", "upload"),
      item("Requerimentos", "edit"),
      item("Configurações", "gear"),
      item("Sair", "power"),
    ],
  },
];

export function Drawer({ aberto, fechar, escolher }) {
  return (
    <>
      <div className={"ov" + (aberto ? " on" : "")} onClick={fechar} />
      <nav className={"dr" + (aberto ? " on" : "")} aria-label="Menu">
        <div className="dh">
          <div className="f">
            <Icon n="user" s={40} />
          </div>
          <b>Ana Souza</b>
          <span>ana.souza@ges.inatel.br</span>
        </div>

        <div className="ds">Principal</div>
        <button className="di" onClick={() => escolher(itemInicio)}>
          <Icon n="home" />
          <span>Início</span>
        </button>
        <div className="hr" />

        {MENU.map((sec, i) => (
          <div key={sec.titulo}>
            {i > 0 && <div className="hr" />}
            <div className="ds">{sec.titulo}</div>
            {sec.itens.map((it) => (
              <button
                key={sec.titulo + it.nome}
                className={"di" + (it.novo ? " novo" : "")}
                onClick={() => escolher(it)}
              >
                <Icon n={it.icone} />
                <span>{it.nome}</span>
                {it.novo && <i className="pt" />}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </>
  );
}