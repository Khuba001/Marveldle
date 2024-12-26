import Main from "./screens/main/Main";
import NavBar from "./global/navbar/NavBar";
function App() {
  return (
    <div className="app">
      <div className="gradient"></div>
      <div className="content">
        {" "}
        <NavBar />
        <Main />
      </div>
    </div>
  );
}

export default App;
