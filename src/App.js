import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import EndPage from "./views/EndScreen";
import StartPage from "./views/StartScreen";
import FormularioPublico from "./views/FormularioPublico";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/encuestas/endpage" element={<EndPage />} />
          <Route path="/encuestas/:for_alias" element={<StartPage />} />
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
