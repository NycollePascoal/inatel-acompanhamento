import { Icon } from "../components/Icon";

export function Ajuda({ m, abrir }) {
  return (
    <>
      <div className="sec">Como podemos ajudar em {m.nome}?</div>
      <button className="opcao" onClick={() => abrir("monitoria")}>
        <Icon n="book" s={32} />
        <span>
          <b>Monitoria</b>
          <small>Tire dúvidas com o monitor da matéria</small>
        </span>
      </button>
      <button className="opcao" onClick={() => abrir("professor")}>
        <Icon n="user" s={32} />
        <span>
          <b>Professor</b>
          <small>Contato e horário de atendimento</small>
        </span>
      </button>
    </>
  );
}