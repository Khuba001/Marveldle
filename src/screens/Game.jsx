import Fuse from "fuse.js";
import { useState } from "react";
import GuessRow from "../components/GuessRow";

export default function Game({
  guessArray,
  setGuessArray,
  correctCharacterToday,
  allCharacters,
}) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSugestions] = useState([]);

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

  async function handleSubmit() {
    if (query.length < 2) {
      return;
    }

    try {
      const res = await fetch(
        `https://narutodb.xyz/api/character/search?name=${query}`
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
  }
  function handleSuggestionClick(name) {
    setQuery(name);
    setShowSugestions([]);
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
    </div>
  );
}
