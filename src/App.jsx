import { Chip } from "./components/Chip";

export default function App() {
  return (
    <div className="app">
      <header className="bar">
        <span>Início</span>
      </header>
      <div style={{ padding: 16, display: "flex", gap: 8 }}>
        <Chip nivel="RISCO" />
        <Chip nivel="ATENÇÃO" />
        <Chip nivel="OK" />
      </div>
    </div>
  );
}