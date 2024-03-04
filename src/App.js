import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Bachilleres from "./views/Bachilleres";
import Empleabilidad from "./views/Empleabilidad";
import EndPage from "./views/EndScreen";
import StartPage from "./views/StartScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/empleabilidad" element={<Empleabilidad />} />
          <Route path="/demanda-estudiantes" element={<Bachilleres />} />
          <Route path="/endpage" element={<EndPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
