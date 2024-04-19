import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import EndPage from "./views/EndScreen";
import StartPage from "./views/StartScreen";
import FormularioPublico from "./views/FormularioPublico";
import Reportes from "./views/Reportes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./views/Login";
import Home from "./views/Home";
//import SSD from "./views/Ssd";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/encuestas/endpage" element={<EndPage />} />
          <Route path="/encuestas/:for_alias" element={<StartPage />} />
          <Route
            path="/encuestas/:for_alias/:seccion"
            element={<FormularioPublico />}
          />
          <Route path="/reportes" element={<Reportes />} />
          {/*<Route path="/ssd" element={<SSD />} />*/}
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
