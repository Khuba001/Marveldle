import { useState } from "react";
import GameButton from "../../components/gamebutton/GameButton";

function Main({ gameOn, setGameOn }) {
  function playGame() {
    setGameOn(true);
  }
  return (
    <div className="main">
      {!gameOn ? (
        <div>
          <h2 className="header">Guess Marvel Characters</h2>
          <GameButton onClick={playGame} text={"Heroes"} bgColor={"#c6383f"} />
          <GameButton text={"Villians"} bgColor={"#311141"} />{" "}
        </div>
      ) : (
        <div>da</div>
      )}
    </div>
  );
}

export default Main;
