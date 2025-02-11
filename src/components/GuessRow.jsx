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
  const natureTypes = [
    "Earth Release",
    "Fire Release",
    "Lightning Release",
    "Water Release",
    "Wind Release",
  ];

  // ----------------------------------------- KEKKEI GENKAI ------------------------------------------ //

  function determineKekkeiGenkai(character) {
    if (!character.personal.kekkeiGenkai) return "None";
    const isKekkeiGenkaiArray = Array.isArray(character.personal.kekkeiGenkai);

    if (
      isKekkeiGenkaiArray &&
      character.personal.kekkeiGenkai.some((kekkeiGenkai) =>
        dojutsuKekkeiGenkai.includes(kekkeiGenkai)
      )
    ) {
      return "Dojutsu";
    }

    if (
      !isKekkeiGenkaiArray &&
      dojutsuKekkeiGenkai.includes(character.personal.kekkeiGenkai)
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
  // ---------------------- AFFILIATION ----------------------//

  const isAffiliationArray = Array.isArray(guess.personal.affiliation);

  const charactersAffs = isAffiliationArray
    ? guess.personal.affiliation.slice(0, 3)
    : guess.personal.affiliation;

  const affIsCorrect = guess.personal.affiliation
    ? Array.isArray(guess?.personal?.affiliation) &&
      Array.isArray(correctCharacterToday?.personal?.affiliation) &&
      guess.personal.affiliation.every((affiliation) =>
        correctCharacterToday.personal.affiliation.includes(affiliation)
      )
    : "None";

  console.log(guess);

  //------------------------- ELEMENT TYPES-----------------------//
  function formatNatureTypes(types) {
    const cleanedNatureTypes =
      types && types.map((type) => type.replace(/\s*\(.*?\)$/, ""));

    return (
      cleanedNatureTypes &&
      cleanedNatureTypes.filter((type) => natureTypes.includes(type))
    );
  }

  const elementIsCorrect =
    Array.isArray(formatNatureTypes(guess.natureType)) &&
    Array.isArray(formatNatureTypes(correctCharacterToday?.natureType)) &&
    formatNatureTypes(correctCharacterToday.natureType).every((type) =>
      formatNatureTypes(guess.natureType).includes(type)
    );
  console.log(elementIsCorrect);

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
      <ul
        className={
          !affIsCorrect
            ? "row-text affiliation"
            : "row-text affiliation complete"
        }
      >
        {isAffiliationArray
          ? charactersAffs.map((aff, i, arr) => (
              <li>
                {/* if last element dont add comma */}
                {!(i === arr.length - 1) ? (
                  <span>{aff},</span>
                ) : (
                  <span>{aff}</span>
                )}
              </li>
            ))
          : guess.personal.affiliation}
        {charactersAffs.length === 1 && <li>charactersAffs[0]</li>}
      </ul>
      <div
        className={
          !(correctCharacterToday?.personal?.clan === guess?.personal?.clan)
            ? "row-text"
            : "row-text complete"
        }
      >
        {guess.personal.clan ? <p>{guess.personal.clan}</p> : <p>None</p>}
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
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
        className={!elementIsCorrect ? "row-text" : "row-text complete"}
      >
        {!guess.natureType ? (
          <span
            style={{
              gridColumn: "2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            X
          </span>
        ) : (
          formatNatureTypes(guess.natureType).map((type) => (
            <img
              key={guess.id}
              className="nature-type-logo"
              src={`imgs/nature types/${type}.png`}
              alt={`${type} icon`}
            />
          ))
        )}
      </div>
      <div
        className={
          !(correctCharacterToday?.debut?.anime === guess?.debut?.anime)
            ? "row-text "
            : "row-text complete"
        }
      >
        {guess?.debut.anime}
      </div>
    </div>
  );
}
