import logo from "../assets/inatel-logo.png";

export function Splash() {
  return (
    <div className="splash">
      <img className="logo-img" src={logo} alt="Inatel" />
      <span>Acadêmico</span>
    </div>
  );
}