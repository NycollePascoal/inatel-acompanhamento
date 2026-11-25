import { AVISOS } from "../data/avisos";

export function Avisos() {
  return (
    <div>
      {AVISOS.map((aviso) => (
        <article className="aviso" key={aviso.titulo}>
          <div className={"av" + (aviso.origem === "Acompanhamento Acadêmico" ? " academico" : "")}>
            {aviso.codigo}
          </div>
          <div className="c">
            <div className="l">
              <span className="aviso-origem">{aviso.origem}</span>
              <span className="d">{aviso.data}</span>
            </div>
            <span className="s">{aviso.titulo}</span>
            <span className="p">{aviso.para}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
