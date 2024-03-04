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
          <Route path="/encuestas" element={<StartPage />} />
          <Route path="/encuestas/empleabilidad" element={<Empleabilidad />} />
          <Route
            path="/encuestas/demanda-estudiantes"
            element={<Bachilleres />}
          />
          <Route path="/encuestas/endpage" element={<EndPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
