import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Bachilleres from "./views/Bachilleres";
import Empleabilidad from "./views/Empleabilidad";
import EndPage from "./views/EndScreen";
import StartPage from "./views/StartScreen";
import FormularioPublico from "./views/FormularioPublico";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/encuestas/:for_alias" element={<StartPage />} />
          <Route path="/encuestas/empleabilida" element={<Empleabilidad />} />
          <Route
            path="/encuestas/demanda-estudiante"
            element={<Bachilleres />}
          />
          <Route path="/encuestas/endpage" element={<EndPage />} />
          <Route
            path="/encuestas/:for_alias/:seccion"
            element={<FormularioPublico />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
