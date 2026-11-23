import { useState } from "react";

const CURSOS = ["Engenharia de Software"];

export function Login({ entrar }) {
  const [curso, setCurso] = useState(CURSOS[0]);
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);

  function autenticar(e) {
    e.preventDefault();

    const novos = {};
    if (!matricula.trim()) novos.matricula = "Informe a matrícula";
    else if (!/^\d+$/.test(matricula.trim())) novos.matricula = "Use apenas números";
    if (!senha) novos.senha = "Informe a senha";
    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      if (matricula.trim() === "123" && senha === "123456") {
        entrar();
      } else {
        setErros({ geral: "Matrícula ou senha incorretas. Tente novamente." });
        setSenha("");
      }
    }, 900);
  }

  return (
    <form className="login" onSubmit={autenticar} noValidate>
      <p className="chamada">Entre com suas credenciais.</p>

      {erros.geral && (
        <div className="alerta" role="alert">
          {erros.geral}
        </div>
      )}

      <select
        className="campo"
        aria-label="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      >
        {CURSOS.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input
        className={"campo" + (erros.matricula ? " inv" : "")}
        inputMode="numeric"
        placeholder="Matrícula"
        aria-label="Matrícula"
        aria-invalid={!!erros.matricula}
        value={matricula}
        onChange={(e) => {
          setMatricula(e.target.value);
          setErros({ ...erros, matricula: undefined, geral: undefined });
        }}
      />
      {erros.matricula && <span className="erro">{erros.matricula}</span>}

      <input
        className={"campo" + (erros.senha ? " inv" : "")}
        type="password"
        placeholder="Senha"
        aria-label="Senha"
        aria-invalid={!!erros.senha}
        value={senha}
        onChange={(e) => {
          setSenha(e.target.value);
          setErros({ ...erros, senha: undefined, geral: undefined });
        }}
      />
      {erros.senha && <span className="erro">{erros.senha}</span>}

      <button className="primario" type="submit" disabled={carregando}>
        {carregando ? "Autenticando…" : "Autenticar"}
      </button>

      <p className="demo">
        Protótipo com dados de exemplo de Engenharia de Software.
        <br />
        Para testar: matrícula 123 e senha 123456.
      </p>
    </form>
  );
}