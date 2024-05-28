import { Nav, Navbar } from "react-bootstrap";
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
        expand="lg"
        data-bs-theme="dark"
        variant="pills"
        style={{
          backgroundColor: "#8A1112",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Nav.Link
          as={Link}
          to={"/tablero/estudiantes"}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "150px",
            marginLeft: "auto",
            marginRight: "auto",
            height: "75px",
            background: path === "/tablero/estudiantes" ? "white" : "#8A1112",
            color: path === "/tablero/estudiantes" ? "#212529" : "white",
            borderRadius: "15px",
            textDecoration: "none",
          }}
        >
          <StudentIcon
            fill={path === "/tablero/estudiantes" ? "#212529" : "white"}
            height={25}
            width={25}
            style={{ marginBottom: "5px" }}
          />
          <b>Estudiantes</b>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to={"/tablero/empresas"}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "150px",
            marginLeft: "auto",
            marginRight: "auto",
            height: "75px",
            background: path === "/tablero/empresas" ? "white" : "#8A1112",
            color: path === "/tablero/empresas" ? "#212529" : "white",
            borderRadius: "15px",
            textDecoration: "none",
          }}
        >
          <BussinesIcon
            fill={path === "/tablero/empresas" ? "#212529" : "white"}
            height={25}
            width={25}
            style={{ marginBottom: "5px" }}
          />
          <b>Empresas</b>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to={"/tablero/comportamiento"}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "150px",
            marginLeft: "auto",
            marginRight: "auto",
            height: "75px",
            background:
              path === "/tablero/comportamiento" ? "white" : "#8A1112",
            color: path === "/tablero/comportamiento" ? "#212529" : "white",
            borderRadius: "15px",
            textDecoration: "none",
          }}
        >
          <UsersIcon
            fill={path === "/tablero/comportamiento" ? "#212529" : "white"}
            height={25}
            width={25}
            style={{ marginBottom: "5px" }}
          />
          <b>Comportamiento</b>
        </Nav.Link>
      </Navbar>
    </>
  );
}

export default AdminSideBar;
