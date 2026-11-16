import { Icon } from "./Icon";

const MENU = [
  {
    titulo: "Mensagens Acadêmicas",
    itens: [{ nome: "Avisos", icone: "mail" }],
  },
  {
    titulo: "Aproveitamento Escolar",
    itens: [
      { nome: "Notas", icone: "bar" },
      { nome: "Frequência", icone: "cal" },
      { nome: "Acompanhamento Acadêmico", icone: "check", novo: true, destino: "materias" },
      { nome: "Material Didático", icone: "book" },
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

        {MENU.map((sec, i) => (
          <div key={sec.titulo}>
            {i > 0 && <div className="hr" />}
            <div className="ds">{sec.titulo}</div>
            {sec.itens.map((it) => (
              <button
                key={it.nome}
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

        <div className="hr" />
        <div className="ds">Outras opções do app atual…</div>
      </nav>
    </>
  );
}