import { MATERIAS, ORDEM, avaliar } from "./data/materias";
import { Icon } from "./components/Icon";
import { Inicio } from "./screens/Inicio";

export default function App() {
  const lista = MATERIAS.map(avaliar).sort(
    (a, b) => ORDEM[a.nivel] - ORDEM[b.nivel]
  );

  return (
    <div className="app">
      <header className="bar">
        <Icon n="menu" />
        <span className="t">Início</span>
        <Icon n="search" />
      </header>
      <Inicio lista={lista} />
    </div>
  );
}