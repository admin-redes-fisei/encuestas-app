import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Pagination,
  Table,
} from "react-bootstrap";
import { listarFormularios } from "../services/FormulariosAppService";
import OpenFIcon from "../assets/openFIcon";
import DownloadIcon from "../assets/downloadIcon";
import StudentIcon from "../assets/studentIcon";
import BussinesIcon from "../assets/bussinesIcon";
import EllipsisIcon from "../assets/ellipsisIcon";
import { useNavigate } from "react-router-dom";

const Formularios = () => {
  const encabezados = [
    {
      id: 1,
      nombre: "",
      style: {
        width: "5%",
        color: "#000",
      },
    },
    {
      id: 2,
      nombre: "Facultad",
      style: {
        width: "35%",
        color: "#000",
      },
    },
    {
      id: 5,
      nombre: "Encuesta",
      style: {
        width: "35%",
        color: "#000",
      },
    },
    {
      id: 6,
      nombre: "Acciones",
      style: {
        width: "25%",
        color: "#000",
        flex: 3,
      },
    },
  ];

  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  //data
  const [myData, setMyyData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  //Para el buscador
  const [searchValue, setSearchValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchedData?.length / itemsPerPage);
  //para navegar
  const navigate = useNavigate();

  //para el buscador
  useEffect(() => {
    setCurrentPage(1);
    setSearchedData(
      otherData?.filter(
        (item) =>
          item.fac_nombre?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.for_nombre?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [otherData, searchValue]);

  //para listar
  useEffect(() => {
    //const token = JSON.parse(localStorage.getItem("token"));
    listarFormularios().then((datos) => {
      if (datos?.error) {
        setOtherData([]);
        setMyyData([]);
      } else {
        setOtherData(
          datos.filter(
            (item) =>
              item.for_facultad_pertenece !==
              usuario_actual.usu_facultad_pertenece
          )
        );
        setMyyData(
          datos.filter(
            (item) =>
              item.for_facultad_pertenece ===
              usuario_actual.usu_facultad_pertenece
          )
        );
      }
    });
  }, [usuario_actual.usu_facultad_pertenece]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
      }}
    >
      <h3
        style={{
          color: "#fff",
          textAlign: "left",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <b>Mis Formularios</b>
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        {myData?.map((item) => (
          <Card
            style={{
              width: "49%",
              paddingTop: "0px",
              paddingBottom: "40px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Card.Body>
              <DropdownButton
                as={ButtonGroup}
                variant="outline-light"
                title={
                  <>
                    <EllipsisIcon fill={"#000"} height={20} width={20} />
                  </>
                }
                style={{ float: "right" }}
              >
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => navigate(`/formularios/${item.for_id}`)}
                >
                  Editar
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">Compartir</Dropdown.Item>
              </DropdownButton>
              <Button variant="outline-light"></Button>
              <br />
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  paddingLeft: "15%",
                }}
              >
                {item.for_tipo === "empresas" ? (
                  <BussinesIcon
                    fill={"#000"}
                    height={70}
                    width={70}
                    style={{ marginBottom: "25px", marginTop: "20px" }}
                  />
                ) : (
                  <StudentIcon
                    fill={"#000"}
                    height={70}
                    width={70}
                    style={{ marginBottom: "25px", marginTop: "20px" }}
                  />
                )}
              </div>
              <h5
                style={{
                  color: "#000",
                  textAlign: "center",
                }}
              >
                <b>{item.for_nombre}</b>
              </h5>
            </Card.Body>
          </Card>
        ))}
      </div>
      <h3
        style={{
          color: "#000",
          textAlign: "left",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <b>Otros Formularios</b>
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5px",
        }}
      >
        <InputGroup className="mb-2" style={{ width: "50%" }}>
          <Form.Control
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Buscar"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
      </div>
      <div
        style={{
          marginTop: "10px",
          marginBottom: "5px",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "45px",
          paddingRight: "45px",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              {encabezados?.map((columna) => (
                <th key={columna.id} style={columna.style}>
                  {columna.nombre}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div
        style={{
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          paddingTop: "10px",
          paddingLeft: "45px",
          paddingRight: "45px",
          marginBottom: "30px",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {searchedData?.length > 0 ? (
          <Table
            hover
            style={{
              width: "100%",
              borderRadius: "20px",
              marginTop: "5px",
            }}
          >
            <tbody>
              {currentItems?.map((item, index) => (
                <tr key={item.for_id} style={{ marginTop: "50px" }}>
                  <td
                    style={{
                      width: "5%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {index + 1 + 5 * (currentPage - 1)}
                  </td>
                  <td
                    style={{
                      width: "35%",
                      color: "#333F49",
                      paddingTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    {item.fac_nombre}
                  </td>
                  <td
                    style={{
                      width: "35%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {item.for_nombre}
                  </td>
                  <td
                    style={{
                      width: "25%",
                      color: "333F49",
                      flex: 3,
                    }}
                  >
                    <Button variant="outline-light" title="Abrir">
                      <OpenFIcon />
                    </Button>
                    <Button variant="outline-light" title="Descargar">
                      <DownloadIcon color={"#000"} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>No hay datos registrados</div>
        )}
        <div style={{ alignSelf: "center", marginTop: "10px" }}>
          <Pagination>
            {[...Array(totalPages)]?.map((_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Formularios;
