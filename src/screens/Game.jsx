import Fuse from "fuse.js";
import { useState } from "react";
import GuessRow from "../components/GuessRow";
import WinScreen from "../components/WinScreen";

export default function Game({
  guessArray,
  setGuessArray,
  correctCharacterToday,
  allCharacters,
}) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSugestions] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [closeScreen, setCloseScreen] = useState(false);
  const fuse = new Fuse(allCharacters, {
    keys: ["name"],
    threshold: 0.1,
    includeScore: true,
  });

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      // const result = fuse.search(value).map(({ item }) => item);
      const result = fuse.search(value).map(({ item }) => item);
      setShowSugestions(result);
    } else {
      setShowSugestions([]);
    }
  }

  const controller = new AbortController();
  async function handleSubmit() {
    if (query.length < 2) {
      return;
    }

    try {
      const res = await fetch(
        `https://narutodb.xyz/api/character/search?name=${query}`,
        { signal: controller.signal }
      );
      if (!res.ok) throw new Error("Fetching Error");

      const data = await res.json();

      if (data.Response === "False") throw new Error("Character not found");

      setGuessArray((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
    }
    setQuery("");
    setShowSugestions([]);
    return function () {
      controller.abort();
    };
  }
  function handleSuggestionClick(name) {
    setQuery(name);
    setShowSugestions([]);
    if (name === correctCharacterToday.name) setGameWon(true);
  }

  return (
    <div className="game">
      {/* INPUT FIELD AND BUTTON */}
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
        {/*SHOW SUGGESTIONS  */}
        {showSuggestions.length > 0 && (
          <ul className="suggestions-container">
            {showSuggestions.map((suggestion) => (
              <li
                onClick={() => handleSuggestionClick(suggestion.name)}
                className="suggestions-row"
                key={suggestion.id}
              >
                <img
                  className="suggestion-img"
                  src={suggestion.images[0]}
                  alt=""
                />{" "}
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/*GAME ROWS */}
      {guessArray.map((guess) => (
        <GuessRow
          guess={guess}
          key={crypto.randomUUID()}
          correctCharacterToday={correctCharacterToday}
        />
      ))}
      {gameWon && !closeScreen && (
        <WinScreen
          winnerCharacter={correctCharacterToday}
          onClick={setCloseScreen}
        />
      )}{" "}
    </div>
  );
}
