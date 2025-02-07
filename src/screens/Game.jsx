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
  const [guessedCharacter, setGuessedCharacter] = useState(null);
  const [showSuggestions, setShowSugestions] = useState([]);

  const fuse = new Fuse(allCharacters, {
    keys: ["name"],
    threshold: 0.1, // Im mniejsza wartość, tym dokładniejsze wyniki
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

      setGuessedCharacter(data);
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
        {showSuggestions.length > 0 && (
          <ul className="suggestions-container">
            {showSuggestions.map((suggestion) => (
              <li
                onClick={() => handleSuggestionClick(suggestion.name)}
                className="suggestions-row"
                key={suggestion.id}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
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
