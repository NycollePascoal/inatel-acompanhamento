import { useState } from "react";
import { MATERIAS, ORDEM, avaliar } from "./data/materias";
import { Icon } from "./components/Icon";
import { Drawer } from "./components/Drawer";
import { Inicio } from "./screens/Inicio";
import { Materias } from "./screens/Materias";
import { Detalhe } from "./screens/Detalhe";
import { Notas } from "./screens/Notas";

export default function App() {
  const [tela, setTela] = useState("inicio");
  const [sel, setSel] = useState(null);
  const [menu, setMenu] = useState(false);
  const [msg, setMsg] = useState("");

  const lista = MATERIAS.map(avaliar).sort(
    (a, b) => ORDEM[a.nivel] - ORDEM[b.nivel]
  );
  const atual = lista.find((m) => m.nome === sel);

  function aviso(texto) {
    setMsg(texto);
    setTimeout(() => setMsg(""), 2300);
  }

  function abrir(destino) {
    setMenu(false);
    setTela(destino);
  }

  function abrirMateria(m) {
    setSel(m.nome);
    setTela("detalhe");
  }

  function voltar() {
    if (tela === "notas" || tela === "faltas") abrir("detalhe");
    else if (tela === "detalhe") abrir("materias");
    else abrir("inicio");
  }

  function escolher(item) {
    if (item.destino) abrir(item.destino);
    else if (item.nome === "Avisos") abrir("inicio");
    else {
      setMenu(false);
      aviso("Esta tela já existe no app atual");
    }
  }

  const titulos = {
    inicio: "Início",
    materias: "Minhas matérias",
    detalhe: atual ? atual.nome : "",
    notas: "Notas",
  };

  return (
    <div className="app">
      <header className="bar">
        {tela === "inicio" ? (
          <button className="ib" aria-label="Abrir menu" onClick={() => setMenu(true)}>
            <Icon n="menu" />
          </button>
        ) : (
          <button className="ib" aria-label="Voltar" onClick={voltar}>
            <Icon n="back" />
          </button>
        )}
        <span className="t">{titulos[tela]}</span>
        <Icon n="search" />
      </header>

      {tela === "inicio" && <Inicio lista={lista} abrir={abrir} aviso={aviso} />}
      {tela === "materias" && <Materias lista={lista} abrirMateria={abrirMateria} />}
      {tela === "detalhe" && atual && <Detalhe m={atual} abrir={abrir} aviso={aviso} />}
      {tela === "notas" && atual && <Notas m={atual} />}

      <Drawer aberto={menu} fechar={() => setMenu(false)} escolher={escolher} />
      {msg && <div className="sn" role="status">{msg}</div>}
    </div>
  );
}