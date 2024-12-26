import Main from "./screens/main/Main";
import NavBar from "./global/navbar/NavBar";
import { useState } from "react";

function App() {
  const [gameOn, setGameOn] = useState(false);

  return (
    <div className="app">
      <div className="gradient"></div>
      <div className="content">
        {" "}
        <NavBar gameOn={gameOn} setGameOn={setGameOn} />
        <Main gameOn={gameOn} setGameOn={setGameOn} />
      </div>
    </div>
  );
}

export default App;
