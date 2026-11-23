import { useState } from "react";

export function Perfis({ entrar, outro }) {
  const [entrando, setEntrando] = useState(false);

  function escolher() {
    setEntrando(true);
    setTimeout(entrar, 700);
  }

  return (
    <div className="perfis">
      <div className="logo azul">Inatel</div>
      <h1>Perfis Salvos</h1>
      <button className="perfil-salvo" onClick={escolher} disabled={entrando}>
        <b>Ana Souza</b>
        <span>{entrando ? "Entrando…" : "GES-123"}</span>
      </button>
      <button className="primario" onClick={outro} disabled={entrando}>
        Outro Usuário
      </button>
    </div>
  );
}