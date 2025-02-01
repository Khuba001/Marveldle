import { useEffect, useState } from "react";
import md5 from "md5";
import GameButton from "../../components/gamebutton/GameButton";

function Main({ gameOn, setGameOn }) {
  // this state is responsible for guesses with each guess it increases by 1 and adds another row
  const [guessArray, setGuessArray] = useState(["batmna", "sierla"]);
  function playGame() {
    setGameOn(true);
  }
  return (
    <div className="main">
      {!gameOn ? (
        <Menu onClick={playGame} />
      ) : (
        <Game guessArray={guessArray} setGuessArray={setGuessArray} />
      )}
    </div>
  );
}

export default Main;

function Menu({ onClick }) {
  return (
    <div>
      <h2 className="header">Guess Marvel Characters</h2>
      <GameButton onClick={onClick} text={"Heroes"} bgColor={"#c6383f"} />
      <GameButton text={"Villians"} bgColor={"#311141"} />{" "}
    </div>
  );
}

function Game({ guessArray, setGuessArray }) {
  const [query, setQuery] = useState("");
  const [guessedCharacter, setGuessedCharacter] = useState(null);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit() {
    if (query.length < 3) {
      return;
    }
    if (!guessArray.includes(`${query}`))
      setGuessArray((guesses) => [...guesses, query]);
    setQuery("");
    console.log(guessArray); // nie dodaje się
  }

  const ts = Date.now().toString();
  const hash = md5(
    ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY
  );

  useEffect(
    function () {
      async function fetchAPI() {
        try {
          const res = await fetch(
            `https://gateway.marvel.com/v1/public/characters?ts=${ts}&nameStartsWith=${query}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching characters!");
          const { data } = await res.json();
          if (data.Response === "False")
            throw new Error("Character not found!");
          if (!data.results.length) throw new Error("Character not found!");

          // console.log(data);
          setGuessedCharacter(data.results[0]);
        } catch (error) {
          console.error(error);
        }
      }

      fetchAPI();
    },
    [query]
  );

  return (
    <div className="game">
      <div className="guess-player-container">
        <input
          value={query}
          onChange={handleChange}
          className="input-guess"
          type="text"
        />
        <button onClick={handleSubmit} type="submit" className="btn-guess">
          Guess
        </button>
      </div>
      {guessArray.map((guess) => (
        <GuessRow
          guessArray={guessArray}
          guess={guess}
          guessedCharacter={guessedCharacter}
          key={crypto.randomUUID()}
        />
      ))}
    </div>
  );
}

function GuessRow({ guessArray, guessedCharacter }) {
  // the guess prop will be compared to the answear
  return (
    <div className="guess-rows">
      <div></div>
      <div className="row-header">Gender</div>
      <div className="row-header">Type</div>
      <div className="row-header">Specie(s)</div>
      <div className="row-header">Power Type(s)</div>
      <div className="row-header">Origin</div>
      <div className="row-header">Apparition year</div>
      <img
        src={`${guessedCharacter?.thumbnail?.path}.${guessedCharacter?.thumbnail?.extension}`}
        alt="character portrait"
        className="img"
      />
      <div className="row-text">Male</div>
      <div className="row-text">Superhero</div>
      <div className="row-text">Cyborg</div>
      <div className="row-text">Strength</div>
      <div className="row-text">Korbin</div>
      <div className="row-text">1983</div>
    </div>
  );
}
