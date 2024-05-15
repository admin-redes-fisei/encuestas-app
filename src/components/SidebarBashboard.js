import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import StudentIcon from "../assets/studentIcon";
import BussinesIcon from "../assets/bussinesIcon";
import UsersIcon from "../assets/UsersIcon";

function AdminSideBar() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      <Navbar
        key={false}
        expand={false}
        data-bs-theme="dark"
        style={{ backgroundColor: "#8A1112" }}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="start"
            style={{
              width: "150px",
              height: "80vh",
              borderRadius: "20px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              marginTop:"10vh"
            }}
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav.Link
                as={Link}
                to={"/tablero/estudiantes"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "75px",
                  background:
                    path === "/tablero/estudiantes" ? "#8A1112" : "white",
                  color: path === "/tablero/estudiantes" ? "white" : "#C3C3C3",
                  borderRadius: "15px",
                  marginTop: "10px",
                  textDecoration: "none",
                }}
              >
                <StudentIcon
                  fill={path === "/tablero/estudiantes" ? "#fff" : "#C3C3C3"}
                  height={25}
                  width={25}
                  style={{ marginBottom: "5px" }}
                />
                Estudiantes
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/tablero/empresas"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "75px",
                  background:
                    path === "/tablero/empresas" ? "#8A1112" : "white",
                  color: path === "/tablero/empresas" ? "white" : "#C3C3C3",
                  borderRadius: "15px",
                  marginTop: "10px",
                  textDecoration: "none",
                }}
              >
                <BussinesIcon
                  fill={path === "/tablero/empresas" ? "#fff" : "#C3C3C3"}
                  height={25}
                  width={25}
                  style={{ marginBottom: "5px" }}
                />
                Empresas
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/tablero/comportamiento"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "75px",
                  background:
                    path === "/tablero/comportamiento" ? "#8A1112" : "white",
                  color:
                    path === "/tablero/comportamiento" ? "white" : "#C3C3C3",
                  borderRadius: "15px",
                  marginTop: "10px",
                  textDecoration: "none",
                }}
              >
                <UsersIcon
                  fill={path === "/tablero/comportamiento" ? "#fff" : "#C3C3C3"}
                  height={25}
                  width={25}
                  style={{ marginBottom: "5px" }}
                />
                Comportamiento
              </Nav.Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminSideBar;

/*
<Navbar
        key={false}
        expand={false}
        style={{
          position: "relative",
          float: "left",
          flexDirection: "column",
          width: "147px",
          height: "80vh",
          backgroundColor: "#fff",
          marginLeft: "2vw",
          marginRight: "2vw",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to={"/tablero/estudiantes"}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
              height: "75px",
              background: path === "/tablero/estudiantes" ? "#8A1112" : "white",
              color: path === "/tablero/estudiantes" ? "white" : "#C3C3C3",
              borderRadius: "15px",
              marginTop: "10px",
              textDecoration: "none",
            }}
          >
            <StudentIcon
              fill={path === "/tablero/estudiantes" ? "#fff" : "#C3C3C3"}
              height={25}
              width={25}
              style={{ marginBottom: "5px" }}
            />
            Estudiantes
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={"/tablero/empresas"}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
              height: "75px",
              background: path === "/tablero/empresas" ? "#8A1112" : "white",
              color: path === "/tablero/empresas" ? "white" : "#C3C3C3",
              borderRadius: "15px",
              marginTop: "10px",
              textDecoration: "none",
            }}
          >
            <BussinesIcon
              fill={path === "/tablero/empresas" ? "#fff" : "#C3C3C3"}
              height={25}
              width={25}
              style={{ marginBottom: "5px" }}
            />
            Empresas
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={"/tablero/comportamiento"}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
              height: "75px",
              background:
                path === "/tablero/comportamiento" ? "#8A1112" : "white",
              color: path === "/tablero/comportamiento" ? "white" : "#C3C3C3",
              borderRadius: "15px",
              marginTop: "10px",
              textDecoration: "none",
            }}
          >
            <UsersIcon
              fill={path === "/tablero/comportamiento" ? "#fff" : "#C3C3C3"}
              height={25}
              width={25}
              style={{ marginBottom: "5px" }}
            />
            Comportamiento
          </Nav.Link>
        </Nav>
      </Navbar>
*/
