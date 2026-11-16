import { MATERIAS, ORDEM, avaliar } from "./data/materias";
import { Chip } from "./components/Chip";
import { Icon } from "./components/Icon";

export default function App() {
  const lista = MATERIAS.map(avaliar).sort(
    (a, b) => ORDEM[a.nivel] - ORDEM[b.nivel]
  );

  return (
    <div className="app">
      <header className="bar">
        <Icon n="menu" />
        <span className="t">Minhas matérias</span>
        <Icon n="search" />
      </header>
      <div className="sec">Em risco aparecem primeiro</div>
      {lista.map((m) => (
        <div className="item" key={m.nome}>
          <span>
            <b>{m.nome}</b>
            <small>
              Faltas {m.faltas} de {m.limite} · nota mínima {m.minima}
            </small>
          </span>
          <Chip nivel={m.nivel} />
        </div>
      ))}
    </div>
  );
}