import { use, useEffect, useState } from "react";
import GameButton from "../../components/gamebutton/GameButton";

const topCharacters = [
  "Naruto Uzumaki",
  "Sasuke Uchiha",
  "Kakashi Hatake",
  "Itachi Uchiha",
  "Jiraiya",
  "Madara Uchiha",
  "Obito Uchiha",
  "Minato Namikaze",
  "Hashirama Senju",
  "Tobirama Senju",
  "Nagato",
  "Hinata Hyūga",
  "Gaara",
  "Rock Lee",
  "Neji Hyūga",
  "Shikamaru Nara",
  "Tsunade",
  "Orochimaru",
  "Hiruzen Sarutobi",
  "Might Guy",
  "Deidara",
  "Kisame Hoshigaki",
  "Sasori",
  "Konan",
  "Kaguya Ōtsutsuki",
  "Sarada Uchiha",
  "Mitsuki",
  "Kankurō",
  "Temari",
  "Shisui Uchiha",
  "Kabuto Yakushi",
  "Chiyo",
  "Zabuza Momochi",
  "Haku",
  "Yamato",
  "Kurenai Yūhi",
  "Anko Mitarashi",
  "Danzō Shimura",
  "Rin Nohara",
  "Kushina Uzumaki",
  "Iruka Umino",
  "Killer B",
  "Mei Terumī",
  "Chōjūrō",
  "Akamaru",
  "Kiba Inuzuka",
  "Sai",
  "Toneri Ōtsutsuki",
];

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
        if (!data || !data.characters) {
          throw new Error("Brak danych o postaciach!");
        }
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
        />
      )}
    </div>
  );
}

export default Main;

function Menu({ onClick }) {
  return (
    <div>
      <h2 className="header">Guess Naruto Characters</h2>
      <GameButton onClick={onClick} text={"Play"} bgColor={"#c6383f"} />
    </div>
  );
}

function Game({ guessArray, setGuessArray, correctCharacterToday }) {
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
      setGuessArray((guesses) => [...guesses, guessedCharacter]);
    setQuery("");
  }

  useEffect(
    function () {
      async function fetchAPI() {
        try {
          if (!query) return;
          const res = await fetch(
            `https://narutodb.xyz/api/character/search?name=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching characters!");
          const data = await res.json();
          console.log(data);
          if (data.Response === "False")
            throw new Error("Character not found!");
          setGuessedCharacter(data);
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
          guess={guess}
          key={crypto.randomUUID()}
          correctCharacterToday={correctCharacterToday}
        />
      ))}
    </div>
  );
}

function GuessRow({ guess, correctCharacterToday }) {
  const dojutsuKekkeiGenkai = [
    "Sharingan",
    "Mangekyō Sharingan",
    "Eternal Mangekyō Sharingan",
    "Rinnegan",
    "Rinne Sharingan",
    "Byakugan",
    "Tenseigan",
    "Jōgan",
  ];

  const affIsCorrect = guess?.personal.affiliation.every((affiliation) =>
    correctCharacterToday.personal.affiliation.includes(affiliation)
  );

  const elementIsCorrect = guess?.natureType.every((type) =>
    correctCharacterToday.natureType.includes(type)
  );

  function determineKekkeiGenkai(character) {
    if (!character?.personal?.kekkeiGenkai?.length) return "None";
    if (
      character?.personal?.kekkeiGenkai.some((jutsu) =>
        dojutsuKekkeiGenkai.includes(jutsu)
      )
    )
      return "Dojutsu";
    return "Nature Transformation";
  }

  function compareKekkeiGenkai(guess, correct) {
    const guessedType = determineKekkeiGenkai(guess);
    const correctType = determineKekkeiGenkai(correct);
    console.log(guessedType);
    console.log(correctType);
    return guessedType === correctType;
  }
  console.log(guess);
  console.log(correctCharacterToday);
  return (
    <div className="guess-rows">
      <div></div>

      <div className="row-header">Gender</div>
      <div className="row-header">Affiliations</div>
      <div className="row-header">Clan</div>
      <div className="row-header">Kekkei genkai</div>
      <div className="row-header">Nature Type</div>
      <div className="row-header">Debute Episode</div>
      <img src={guess?.images[0]} alt="character portrait" className="img" />
      <div
        className={
          !(correctCharacterToday?.personal?.sex === guess?.personal?.sex)
            ? "row-text"
            : "row-text complete"
        }
      >
        {guess?.personal.sex}
      </div>
      <div className={!affIsCorrect ? "row-text" : "row-text complete"}>
        {guess?.personal.affiliation}
      </div>
      <div
        className={
          !(correctCharacterToday?.personal?.clan === guess?.personal?.clan)
            ? "row-text"
            : "row-text complete"
        }
      >
        {guess?.personal.clan}
      </div>
      <div
        className={
          compareKekkeiGenkai(guess, correctCharacterToday)
            ? "row-text complete"
            : "row-text"
        }
      >
        {determineKekkeiGenkai(guess)}
      </div>
      <div className={!elementIsCorrect ? "row-text" : "row-text complete"}>
        {guess?.natureType}
      </div>
      <div
        className={
          !(correctCharacterToday?.debut?.anime === guess?.debut?.anime)
            ? "row-text"
            : "row-text complete"
        }
      >
        {guess?.debut.anime}
      </div>
    </div>
  );
}
