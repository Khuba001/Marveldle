function GameButton({ text, bgColor }) {
  return (
    <div className="button-container">
      <button className="game-button" style={{ backgroundColor: bgColor }}>
        {text}
      </button>
    </div>
  );
}

export default GameButton;
