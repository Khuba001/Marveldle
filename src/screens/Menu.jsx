import GameButton from "../components/GameButton";

export default function Menu({ onClick }) {
  return (
    <div>
      <h2 className="header">Guess Naruto Characters</h2>
      <GameButton onClick={onClick} text={"Play"} bgColor={"#c6383f"} />
    </div>
  );
}
