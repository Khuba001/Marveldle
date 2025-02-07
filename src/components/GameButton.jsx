function GameButton({ text, bgColor, onClick }) {
  return (
    <div className="button-container">
      <button
        onClick={onClick}
        className="game-button"
        style={{ backgroundColor: bgColor }}
      >
        {text}
      </button>
    </div>
  );
}

export default GameButton;
