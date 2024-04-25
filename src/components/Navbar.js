import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "../assets/logoutIcon";

function SystemNavbar() {
  const tabs = [
    { id: 1, label: "Tableros", link: "/tablero" },
    { id: 2, label: "Formularios", link: "/formularios" },
    { id: 3, label: "Reportes", link: "/reportes" },
    { id: 4, label: "Carreras", link: "/carreras" },
    { id: 5, label: "Usuarios", link: "/usuarios" },
  ];
  const [permisos, setPermisos] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const hideinfo = location.pathname === "/";


  useEffect(() => {
    const filtrados = tabs.filter((tab) => {
      return JSON.parse(localStorage.getItem("userpermisos"))?.includes(
        tab.label[0]
      );
    });
    setPermisos(filtrados);
    setUsuario(
      JSON.parse(localStorage.getItem("userdata"))
        ? JSON.parse(localStorage.getItem("userdata"))
        : []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    localStorage.removeItem("userpermisos");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      style={{ marginBottom: "20px" }}
    >
      <Container>
        <Navbar.Brand
          href="#home"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://sistemaseducaciononline.uta.edu.ec/pluginfile.php/1/theme_adaptable/adaptablemarkettingimages/0/logo_uta.png"
            alt="Logo UTA"
            style={{ width: "50px" }}
          />
          <h6 style={{ color: "black", marginLeft: "15px", marginTop: "5px" }}>
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
                marginLeft: "10%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                {permisos?.map((tab) => (
                  <Nav.Link
                    as={Link}
                    to={tab.link}
                    id={tab.id}
                  >
                    {tab.label}
                  </Nav.Link>
                ))}
              </div>
              <NavDropdown
                className="justify-content-end"
                title={
                  usuario
                    ? `${usuario.usu_nombres} ${usuario.usu_apellidos}`
                    : ""
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
