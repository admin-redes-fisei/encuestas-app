import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import EndPage from "./views/EndScreen";
import StartPage from "./views/StartScreen";
import FormularioPublico from "./views/FormularioPublico";
import Reportes from "./views/Reportes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./views/Login";
import Home from "./views/Home";
import Usuarios from "./views/Usuarios";
import Carreras from "./views/Carreras";
import Tablero from "./views/Tablero";
import Formularios from "./views/Formularios";
import SystemNavbar from "./components/Navbar";
import TableroEstudiantes from "./views/TableroEstudiantes";
import Facultades from "./views/Facultades";
import TableroEmpresas from "./views/TableroEmpresas";
import DashboardPersonalizado from "./views/DasboardPersonalizado";
import Secciones from "./views/ForSecciones";
import Preguntas from "./views/ForSecPreguntas";
import TableroAnalytics from "./views/TableroAnalytics";
//import SSD from "./views/Ssd";

function App() {
  //const location = useLocation();
  const path = window.location.pathname;

  const PrivateRouteTableros = ({ children }) => {
    const token = localStorage.getItem("token");
    const userPermisos = localStorage.getItem("userpermisos");

    if (!token && !userPermisos) {
      return <Navigate to="/" />;
    }
    const userIsAuthenticated = JSON.parse(
      localStorage.getItem("userpermisos")
    ).includes("T");

    return userIsAuthenticated ? children : <Navigate to="/" />;
  };
  const PrivateRouteCarreras = ({ children }) => {
    const token = localStorage.getItem("token");
    const userPermisos = localStorage.getItem("userpermisos");

    if (!token && !userPermisos) {
      return <Navigate to="/" />;
    }
    const userIsAuthenticated = JSON.parse(
      localStorage.getItem("userpermisos")
    ).includes("C");

    return userIsAuthenticated ? children : <Navigate to="/" />;
  };
  const PrivateRouteFormularios = ({ children }) => {
    const token = localStorage.getItem("token");
    const userPermisos = localStorage.getItem("userpermisos");

    if (!token && !userPermisos) {
      return <Navigate to="/" />;
    }
    const userIsAuthenticated = JSON.parse(
      localStorage.getItem("userpermisos")
    ).includes("F");

    return userIsAuthenticated ? children : <Navigate to="/" />;
  };
  const PrivateRouteUsuarios = ({ children }) => {
    const token = localStorage.getItem("token");
    const userPermisos = localStorage.getItem("userpermisos");

    if (!token && !userPermisos) {
      return <Navigate to="/" />;
    }
    const userIsAuthenticated =
      JSON.parse(localStorage.getItem("userpermisos")).includes("U") ||
      JSON.parse(localStorage.getItem("userpermisos")).includes("S");

    return userIsAuthenticated ? children : <Navigate to="/" />;
  };
  const PrivateRouteReportes = ({ children }) => {
    const token = localStorage.getItem("token");
    const userPermisos = localStorage.getItem("userpermisos");

    if (!token && !userPermisos) {
      return <Navigate to="/" />;
    }
    const userIsAuthenticated = JSON.parse(
      localStorage.getItem("userpermisos")
    ).includes("R");

    return userIsAuthenticated ? children : <Navigate to="/" />;
  };

  const PrivateRouteFacultades = ({ children }) => {
    const token = localStorage.getItem("token");
    const userPermisos = localStorage.getItem("userpermisos");

    if (!token && !userPermisos) {
      return <Navigate to="/" />;
    }
    const userIsAuthenticated = JSON.parse(
      localStorage.getItem("userpermisos")
    ).includes("S");

    return userIsAuthenticated ? children : <Navigate to="/" />;
  };

  const PrivateRouteFormularioPublico = ({ children }) => {
    const hasData = localStorage.getItem("for_pub_preguntas");
    const storedForAlias = JSON.parse(localStorage.getItem("for_alias"));
    return hasData ? (
      children
    ) : (
      <Navigate to={`/encuestas/${storedForAlias}`} />
    );
  };

  return (
    <div className="App">
      <div
        style={{
          background: "#8A1112",
          position: "fixed",
          height: "50vh",
          width: "100vw",
          zIndex: "-1",
          top: 0,
        }}
      ></div>
      <div
        style={{
          background: "#F8F9FA",
          position: "fixed",
          height: "50vh",
          width: "100vw",
          zIndex: "-1",
          bottom: 0,
        }}
      ></div>
      <Router>
        {path.includes("/encuestas") ? <></> : <SystemNavbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/usuarios"
            element={
              <PrivateRouteUsuarios>
                <Usuarios />
              </PrivateRouteUsuarios>
            }
          />
          <Route
            path="/carreras"
            element={
              <PrivateRouteCarreras>
                <Carreras />
              </PrivateRouteCarreras>
            }
          />
          <Route
            path="/facultades"
            element={
              <PrivateRouteFacultades>
                <Facultades />
              </PrivateRouteFacultades>
            }
          />
          <Route
            path="/tablero"
            element={
              <PrivateRouteTableros>
                <Tablero />
              </PrivateRouteTableros>
            }
          />
          <Route
            path="/tablero/estudiantes"
            element={
              <PrivateRouteTableros>
                <TableroEstudiantes />
              </PrivateRouteTableros>
            }
          />
          <Route
            path="/tablero/empresas"
            element={
              <PrivateRouteTableros>
                <TableroEmpresas />
              </PrivateRouteTableros>
            }
          />
          <Route
            path="/tablero/comportamiento"
            element={
              <PrivateRouteTableros>
                <TableroAnalytics />
              </PrivateRouteTableros>
            }
          />
          <Route
            path="/tablero/personalizado-estudiantes"
            element={<DashboardPersonalizado />}
          />
          <Route
            path="/formularios"
            element={
              <PrivateRouteFormularios>
                <Formularios />
              </PrivateRouteFormularios>
            }
          />
          <Route
            path="/formularios/:forID"
            element={
              <PrivateRouteFormularios>
                <Secciones />
              </PrivateRouteFormularios>
            }
          />
          <Route
            path="/formularios/:forID/:secID"
            element={
              <PrivateRouteFormularios>
                <Preguntas />
              </PrivateRouteFormularios>
            }
          />
          <Route
            path="/reportes"
            element={
              <PrivateRouteReportes>
                <Reportes />
              </PrivateRouteReportes>
            }
          />
          <Route path="/encuestas/:for_alias/endpage" element={<EndPage />} />
          <Route path="/encuestas/:for_alias" element={<StartPage />} />
          <Route
            path="/encuestas/:for_alias/:seccion"
            element={
              <PrivateRouteFormularioPublico>
                <FormularioPublico />
              </PrivateRouteFormularioPublico>
            }
          />
          {/*<Route path="/ssd" element={<SSD />} />*/}
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
