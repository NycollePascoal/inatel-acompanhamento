import { useState } from "react";
import { MATERIAS, ORDEM, avaliar } from "./data/materias";
import { Icon } from "./components/Icon";
import { Drawer } from "./components/Drawer";
import { Inicio } from "./screens/Inicio";
import { Materias } from "./screens/Materias";
import { Detalhe } from "./screens/Detalhe";
import { Notas } from "./screens/Notas";
import { Faltas } from "./screens/Faltas";
import { Ajuda } from "./screens/Ajuda";
import { Monitoria } from "./screens/Monitoria";
import { Professor } from "./screens/Professor";
import { Generica } from "./screens/Generica";

export default function App() {
  const [tela, setTela] = useState("inicio");
  const [sel, setSel] = useState(null);
  const [menu, setMenu] = useState(false);
  const [geral, setGeral] = useState({ nome: "", icone: "doc" });

  const lista = MATERIAS.map(avaliar).sort(
    (a, b) => ORDEM[a.nivel] - ORDEM[b.nivel]
  );
  const atual = lista.find((m) => m.nome === sel);

  function abrir(destino) {
    setMenu(false);
    setTela(destino);
  }

  function abrirMateria(m) {
    setSel(m.nome);
    setTela("detalhe");
  }

  function abrirGenerica(nome, icone) {
    setGeral({ nome, icone });
    abrir("generica");
  }

  function voltar() {
    if (tela === "monitoria" || tela === "professor") abrir("ajuda");
    else if (tela === "ajuda" || tela === "notas" || tela === "faltas") abrir("detalhe");
    else if (tela === "detalhe") abrir("materias");
    else abrir("inicio");
  }

  function escolher(item) {
    if (item.destino) abrir(item.destino);
    else if (item.nome === "Avisos") abrir("inicio");
    else abrirGenerica(item.nome, item.icone);
  }

  const titulos = {
    inicio: "Início",
    materias: "Minhas matérias",
    detalhe: atual ? atual.nome : "",
    notas: "Notas",
    faltas: "Faltas",
    ajuda: "Ajuda",
    monitoria: "Monitoria",
    professor: "Professor",
    generica: geral.nome,
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

      {tela === "inicio" && <Inicio abrir={abrir} geral={abrirGenerica} />}
      {tela === "materias" && <Materias lista={lista} abrirMateria={abrirMateria} />}
      {tela === "detalhe" && atual && <Detalhe m={atual} abrir={abrir} />}
      {tela === "notas" && atual && <Notas m={atual} />}
      {tela === "faltas" && atual && <Faltas m={atual} />}
      {tela === "ajuda" && atual && <Ajuda m={atual} abrir={abrir} />}
      {tela === "monitoria" && atual && <Monitoria m={atual} abrir={abrir} />}
      {tela === "professor" && atual && <Professor m={atual} />}
      {tela === "generica" && <Generica nome={geral.nome} icone={geral.icone} />}

      <Drawer aberto={menu} fechar={() => setMenu(false)} escolher={escolher} />
    </div>
  );
}