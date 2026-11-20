import { Icon } from "../components/Icon";

export function Generica({ nome, icone }) {
  return (
    <div className="gen">
      <div className="ico">
        <Icon n={icone} s={36} />
      </div>
      <b>{nome}</b>
      <p>Esta tela já existe no app atual e fica fora do escopo deste protótipo.</p>
      <div className="sk" style={{ width: "100%" }} />
      <div className="sk" style={{ width: "85%" }} />
      <div className="sk" style={{ width: "92%" }} />
    </div>
  );
}