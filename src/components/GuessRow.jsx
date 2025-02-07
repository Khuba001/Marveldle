export default function GuessRow({ guess, correctCharacterToday }) {
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

  const affIsCorrect =
    Array.isArray(guess?.personal?.affiliation) &&
    Array.isArray(correctCharacterToday?.personal?.affiliation) &&
    guess.personal.affiliation.every((affiliation) =>
      correctCharacterToday.personal.affiliation.includes(affiliation)
    );

  const elementIsCorrect =
    Array.isArray(guess?.natureType) &&
    Array.isArray(correctCharacterToday?.natureType) &&
    guess.natureType.every((type) =>
      correctCharacterToday.natureType.includes(type)
    );

  function determineKekkeiGenkai(character) {
    if (
      !character?.personal?.kekkeiGenkai ||
      !Array.isArray(character.personal.kekkeiGenkai)
    ) {
      return "None";
    }

    if (character.personal.kekkeiGenkai.length === 0) {
      return "None";
    }

    if (
      character.personal.kekkeiGenkai.some((jutsu) =>
        dojutsuKekkeiGenkai.includes(jutsu)
      )
    ) {
      return "Dojutsu";
    }

    return "Nature Transformation";
  }

  function compareKekkeiGenkai(guess, correct) {
    if (!guess || !correct) return false;
    const guessedType = determineKekkeiGenkai(guess);
    const correctType = determineKekkeiGenkai(correct);

    return guessedType === correctType;
  }

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
