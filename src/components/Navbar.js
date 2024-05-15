import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "../assets/logoutIcon";
import CryptoJS from "crypto-js";
import UserIcon from "../assets/userIcon";

function SystemNavbar() {
  const tabs = [
    { id: 1, label: "Tableros", link: "/tablero" },
    { id: 2, label: "Formularios", link: "/formularios" },
    { id: 3, label: "Reportes", link: "/reportes" },
    { id: 4, label: "Carreras", link: "/carreras" },
    { id: 5, label: "Usuarios", link: "/usuarios" },
  ];

  const tabSuper = [
    { id: 6, label: "Facultades", link: "/facultades" },
    { id: 7, label: "Usuarios", link: "/usuarios" },
  ];
  const [permisos, setPermisos] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [hideinfo, setHideinfo] = useState(location.pathname === "/");
  //para encriptado de datos
  const clave = "HatunSoft@2023";

  useEffect(() => {
    const filtrados = tabs.filter((tab) => {
      return JSON.parse(localStorage.getItem("userpermisos"))?.includes(
        tab.label[0]
      );
    });
    if (JSON.parse(localStorage.getItem("userpermisos"))?.includes("S")) {
      setPermisos(tabSuper);
    } else {
      setPermisos(filtrados);
    }
    setUsuario(JSON.parse(localStorage.getItem("userdata")));
    setHideinfo(location.pathname === "/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    localStorage.removeItem("userpermisos");
  };

  // Función para desencriptar
  function desencriptar(cifrado) {
    const bytes = CryptoJS.AES.decrypt(cifrado, clave);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      data-bs-theme="dark"
      style={{ backgroundColor: "#8A1112" }}
    >
      <Container>
        <Navbar.Brand
          href="#home"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "40px",
          }}
        >
          <img
            src="https://sistemaseducaciononline.uta.edu.ec/pluginfile.php/1/theme_adaptable/adaptablemarkettingimages/0/logo_uta.png"
            alt="Logo UTA"
            style={{ width: "50px" }}
          />
          <h6 style={{ color: "white", marginLeft: "15px", marginTop: "5px" }}>
            UNIVERSIDAD TÉCNICA DE AMBATO
          </h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {!hideinfo && (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              variant="underline"
              className="me-auto"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                {permisos?.map((tab) => (
                  <Nav.Link key={tab.id} as={Link} to={tab.link} id={tab.id}>
                    {tab.label}
                  </Nav.Link>
                ))}
              </div>
              <NavDropdown
                title={
                  <>
                    <UserIcon />
                    <span style={{ marginLeft: "5px" }}>
                      {usuario?.usu_nombres && usuario?.usu_apellidos
                        ? `${desencriptar(usuario?.usu_nombres)} ${desencriptar(
                            usuario?.usu_apellidos
                          )}`
                        : ""}
                    </span>
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/" onClick={handleLogout}>
                  Cerrar Sesión
                  <LogoutIcon style={{ marginLeft: "20px" }} />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default SystemNavbar;
