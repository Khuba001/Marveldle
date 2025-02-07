import { useEffect, useState } from "react";
import Menu from "./Menu";
import Game from "./Game";
import { topCharacters } from "../data/charData";

function Main({ gameOn, setGameOn }) {
  // this state is responsible for guesses with each guess it increases by 1 and adds another row
  const [guessArray, setGuessArray] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [correctCharacterToday, setCorrectCharacterToday] = useState(null);

  useEffect(function () {
    async function fetchCharacters() {
      try {
        const res = await fetch(
          "https://narutodb.xyz/api/character?page=1&limit=1431"
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching the data");
        const data = await res.json();
        if (!data.Response === "False") throw new Error("Characters not found");

        const fillteredCharacters = data.characters.filter((character) =>
          topCharacters.includes(character.name)
        );
        setAllCharacters(fillteredCharacters);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCharacters();
  }, []);
  useEffect(() => {
    if (allCharacters.length > 0) {
      setCorrectCharacterToday(
        allCharacters[Math.floor(Math.random() * allCharacters.length)]
      );
    }
  }, [allCharacters]);
  function playGame() {
    setGameOn(true);
  }
  return (
    <div className="main">
      {!gameOn ? (
        <Menu onClick={playGame} />
      ) : (
        <Game
          guessArray={guessArray}
          correctCharacterToday={correctCharacterToday}
          setGuessArray={setGuessArray}
          allCharacters={allCharacters}
        />
      )}
    </div>
  );
}

export default Main;
