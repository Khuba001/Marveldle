function WinScreen({ winnerCharacter, onClick }) {
  return (
    <div className="win-container">
      <p>Congratulations</p>
      <p>💥You did it💥 </p>
      <img className="winner-img" src={`${winnerCharacter.images[0]}`} alt="" />
      <p>
        Today's Character was{" "}
        <p style={{ textAlign: "center" }} className="winner-name">
          {winnerCharacter.name}
        </p>
        <span className="winner-close" onClick={() => onClick(true)}>
          X
        </span>
      </p>
    </div>
  );
}

export default WinScreen;
