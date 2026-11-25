import { useEffect, useState } from "react";
import { MATERIAS, ORDEM, avaliar } from "./data/materias";
import { Icon } from "./components/Icon";
import { Drawer } from "./components/Drawer";
import { Splash } from "./screens/Splash";
import { Perfis } from "./screens/Perfis";
import { Login } from "./screens/Login";
import { Inicio } from "./screens/Inicio";
import { Materias } from "./screens/Materias";
import { Detalhe } from "./screens/Detalhe";
import { Notas } from "./screens/Notas";
import { Faltas } from "./screens/Faltas";
import { Ajuda } from "./screens/Ajuda";
import { Monitoria } from "./screens/Monitoria";
import { Professor } from "./screens/Professor";
import { Generica } from "./screens/Generica";
import { Avisos } from "./screens/Avisos";

export default function App() {
  const [tela, setTela] = useState("splash");
  const [sel, setSel] = useState(null);
  const [menu, setMenu] = useState(false);
  const [geral, setGeral] = useState({ nome: "", icone: "doc" });
  const [filtro, setFiltro] = useState("todas");
  const [tema, setTema] = useState(() => {
    const salvo = localStorage.getItem("tema");
    if (salvo === "claro" || salvo === "escuro") return salvo;
    return "claro";
  });

  const lista = MATERIAS.map(avaliar).sort(
    (a, b) => ORDEM[a.nivel] - ORDEM[b.nivel]
  );
  const atual = lista.find((m) => m.sigla === sel);
  const logado = !["splash", "perfis", "login"].includes(tela);
  const telasComMenu = ["inicio", "materias", "avisos", "generica"].includes(tela);

  useEffect(() => {
    window.history.replaceState(
      {
        inatelNavigation: true,
        tela: "splash",
        sel: null,
        geral: { nome: "", icone: "doc" },
      },
      "",
      window.location.href
    );

    function restaurarTela(evento) {
      const estado = evento.state;
      if (!estado?.inatelNavigation) return;

      setMenu(false);
      setTela(estado.tela);
      setSel(estado.sel ?? null);
      if (estado.geral) setGeral(estado.geral);
    }

    window.addEventListener("popstate", restaurarTela);
    return () => window.removeEventListener("popstate", restaurarTela);
  }, []);

  // A abertura some sozinha depois de um instante
  useEffect(() => {
    if (tela !== "splash") return;
    const t = setTimeout(() => {
      window.history.replaceState(
        { ...window.history.state, tela: "perfis", sel: null },
        "",
        window.location.href
      );
      setTela("perfis");
    }, 1800);
    return () => clearTimeout(t);
  }, [tela]);

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    localStorage.setItem("tema", tema);
  }, [tema]);

  function alternarTema() {
    setTema((atual) => (atual === "escuro" ? "claro" : "escuro"));
  }

  function navegar(destino, materia = sel, geralAtual = geral, substituir = false) {
    const estado = { inatelNavigation: true, tela: destino, sel: materia, geral: geralAtual };
    const metodo = substituir ? "replaceState" : "pushState";
    window.history[metodo](estado, "", window.location.href);
    setMenu(false);
    setSel(materia);
    setGeral(geralAtual);
    setTela(destino);
  }

  function abrir(destino) {
    navegar(destino);
  }

  function abrirMateria(m) {
    navegar("detalhe", m.sigla);
  }

  function abrirGenerica(nome, icone) {
    navegar("generica", sel, { nome, icone });
  }

  function voltar() {
    if (window.history.state?.inatelNavigation) {
      window.history.back();
      return;
    }

    const anterior = tela === "login" ? "perfis"
      : tela === "monitoria" || tela === "professor" ? "ajuda"
        : tela === "ajuda" || tela === "notas" || tela === "faltas" ? "detalhe"
          : tela === "detalhe" ? "materias" : "inicio";
    navegar(anterior, sel, geral, true);
  }

  function escolher(item) {
    if (item.destino) abrir(item.destino);
    else if (item.nome === "Avisos") abrir("avisos");
    else if (item.nome === "Sair") {
      navegar("perfis", null, geral, true);
    } else abrirGenerica(item.nome, item.icone);
  }

  const titulos = {
    perfis: "Acadêmico",
    login: "Acadêmico",
    inicio: "Início",
    materias: "Minhas matérias",
    detalhe: atual ? atual.curto : "",
    notas: "Notas",
    faltas: "Faltas",
    ajuda: "Ajuda",
    monitoria: "Monitoria",
    professor: "Professor",
    avisos: "Avisos",
    generica: geral.nome,
  };

  return (
    <div className={"app" + (tela === "notas" ? " tela-notas" : "")}>
      {tela !== "splash" && (
        <header className="bar">
          {telasComMenu ? (
            <button className="ib" aria-label="Abrir menu" onClick={() => setMenu(true)}>
              <Icon n="menu" />
            </button>
          ) : (
            tela !== "perfis" && (
              <button className="ib" aria-label="Voltar" onClick={voltar}>
                <Icon n="back" />
              </button>
            )
          )}
          <span className="t">
            {titulos[tela]}
            {atual && ["notas", "faltas"].includes(tela) ? ` · ${atual.curto}` : ""}
          </span>
          {tela !== "splash" && (
            <button
              className="ib tema"
              aria-label={tema === "escuro" ? "Usar tema claro" : "Usar tema escuro"}
              title={tema === "escuro" ? "Tema claro" : "Tema escuro"}
              onClick={alternarTema}
            >
              <Icon n={tema === "escuro" ? "sun" : "moon"} />
            </button>
          )}
        </header>
      )}

      {tela === "splash" && <Splash />}
      {tela === "perfis" && <Perfis entrar={() => abrir("inicio")} outro={() => abrir("login")} />}
      {tela === "login" && <Login entrar={() => abrir("inicio")} />}
      {tela === "inicio" && <Inicio abrir={abrir} geral={abrirGenerica} />}
      {tela === "materias" && (
        <Materias lista={lista} abrirMateria={abrirMateria} filtro={filtro} setFiltro={setFiltro} />
      )}
      {tela === "detalhe" && atual && <Detalhe m={atual} abrir={abrir} />}
      {tela === "notas" && atual && <Notas m={atual} />}
      {tela === "faltas" && atual && <Faltas m={atual} />}
      {tela === "ajuda" && atual && <Ajuda m={atual} abrir={abrir} />}
      {tela === "monitoria" && atual && <Monitoria m={atual} abrir={abrir} />}
      {tela === "professor" && atual && <Professor m={atual} />}
      {tela === "avisos" && <Avisos />}
      {tela === "generica" && <Generica nome={geral.nome} icone={geral.icone} />}

      {logado && <Drawer aberto={menu} fechar={() => setMenu(false)} escolher={escolher} />}
    </div>
  );
}