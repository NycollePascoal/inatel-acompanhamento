export function Chip({ nivel }) {
  let cor = "v";
  if (nivel === "RISCO") cor = "r";
  if (nivel === "ATENÇÃO") cor = "a";

  return (
    <span className={"chip " + cor}>
      <i />
      {nivel}
    </span>
  );
}