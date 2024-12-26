import GameButton from "../../components/gamebutton/GameButton";

function Main() {
  return (
    <div className="main">
      <h2 className="header">Guess Marvel Characters</h2>
      <GameButton text={"Heroes"} bgColor={"#c6383f"} />
      <GameButton text={"Villians"} bgColor={"#311141"} />
    </div>
  );
}

export default Main;
