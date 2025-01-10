import { useEffect, useState } from "react";
import md5 from "md5";
import GameButton from "../../components/gamebutton/GameButton";

function Main({ gameOn, setGameOn }) {
  // this state is responsible for guesses with each guess it increases by 1 and adds another row
  const [guess, setGuess] = useState(["batmna", "sierla"]);
  function playGame() {
    setGameOn(true);
  }
  return (
    <div className="main">
      {!gameOn ? (
        <Menu onClick={playGame} />
      ) : (
        <Game guess={guess} setGuess={setGuess} />
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

function Game({ guess, setGuess }) {
  const [answear, setAnswear] = useState("");
  function handleChange(e) {
    setAnswear(e.target.value);
  }

  function handleSubmit() {
    setGuess((guess) => [...guess, answear]);
    setAnswear("");
  }

  const ts = Date.now().toString();
  console.log(ts);
  const hash = md5(
    ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY
  );

  useEffect(function () {
    async function fetchAPI() {
      const res = await fetch(
        ` https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`
      );
      const { data } = await res.json();
      console.log(data);
    }
    fetchAPI();
  }, []);

  return (
    <div className="game">
      <div className="guess-player-container">
        <input
          value={answear}
          onChange={handleChange}
          className="input-guess"
          type="text"
        />
        <button onClick={handleSubmit} type="submit" className="btn-guess">
          Guess
        </button>
      </div>
      {guess.map((guess) => (
        <GuessRow guess={guess} key={crypto.randomUUID()} />
      ))}
    </div>
  );
}

function GuessRow({ guess }) {
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
        src="public\imgs\logo.png"
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
