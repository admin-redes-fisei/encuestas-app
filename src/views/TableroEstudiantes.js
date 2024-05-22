import { useEffect, useState } from "react";
import AutoDasboard from "../components/AutoDasboard";
import AdminSideBar from "../components/SidebarBashboard";
import {
  obtenerConteoDatos,
  obtenerConteoDatosFiltrados,
} from "../services/TablerosService";
import {
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  Col,
  DropdownButton,
  Form,
  ListGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import ReloadIcon from "../assets/reloadIcon";
import { obtenerFormularioFacultad } from "../services/FormulariosAppService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocumentDashboard from "../components/DocumentoDashboard";
import DownloadIcon from "../assets/downloadIcon";
import HtmlEmbedder from "../components/HtmlEmbedder";
import LeftIcon from "../assets/leftIcon";
import RightIcon from "../assets/rightIcon";
import { enviarReglas } from "../services/PythonService";
import { toast } from "react-toastify";
import ApexRadialChart from "../components/ApexRadialChart";

const TableroEstudiantes = () => {
  const dataTipos = [
    { id: 1, nombre: "Tablero Automático" },
    { id: 2, nombre: "Tablero Personalizado" },
  ];
  const [data, setData] = useState([]);
  const [idFormulario, setIdFormulario] = useState(0);
  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  const [filter, setFilter] = useState(null);
  const [antecedentes, setAntecedentes] = useState([]);
  const [consecuentes, setConsecuentes] = useState([]);
  //para el modal
  const [showModal, setShowModal] = useState(false);
  //para carga
  const [isLoading, setIsLoading] = useState(true);
  const [isResultadosLoading, setIsResultadosLoading] = useState(false);
  //para data
  const [formData, setFormData] = useState({
    tab_tipo: 1,
  });
  //para resultados de regla
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    obtenerFormularioFacultad(
      parseInt(usuario_actual.usu_facultad_pertenece),
      "estudiantes"
    ).then((response) => {
      setIdFormulario(parseInt(response?.for_id));
      if (filter) {
        obtenerConteoDatosFiltrados({
          id: parseInt(response?.for_id),
          valores_filtro: filter,
        }).then((response) => {
          if (parseInt(response) !== 0) {
            setData(response);
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(true);
        obtenerConteoDatos(parseInt(response?.for_id)).then((response) => {
          if (parseInt(response) !== 0) {
            setData(response);
            setIsLoading(false);
          }
        });
      }
    });
  }, [filter, usuario_actual.usu_facultad_pertenece]);

  const handlefilterClick = (name) => {
    if (filter) {
      setFilter((prevFilter) => [...prevFilter, name]);
    } else {
      setFilter([]);
      setFilter((prevFilter) => [...prevFilter, name]);
    }
  };

  const handleChangeTipoTablero = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      tab_tipo: value,
    }));
  };

  const handleShowModal = () => {
    setAntecedentes(filter);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleMoveToConsecuentes = (item) => {
    setAntecedentes((prev) => prev.filter((i) => i !== item));
    setConsecuentes((prev) => [...prev, item]);
  };

  const handleMoveToAntecedentes = (item) => {
    setConsecuentes((prev) => prev.filter((i) => i !== item));
    setAntecedentes((prev) => [...prev, item]);
  };

  const handleEnviarClick = (reglas) => {
    setIsResultadosLoading(true);
    try {
      enviarReglas(reglas).then((data) => {
        if (data.error) {
          toast.warning("No se ha encontrado la regla en los registros", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        setResultados(data);
        setIsResultadosLoading(false);
        handleCloseModal();
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "85vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AdminSideBar />
          <h3
            style={{
              color: "#fff",
              textAlign: "left",
            }}
          >
            <b>Tablero de Demanda Estudiantil</b>
          </h3>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
          <Form.Select
            aria-label="Tipo de usuario"
            name="tab_tipo"
            value={formData.tab_tipo}
            onChange={handleChangeTipoTablero}
          >
            {dataTipos.map((tipo, index) => (
              <option key={index} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "85vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ width: "100px" }}></div>
        {filter?.length > 1 ? (
          <Button
            variant="dark"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={handleShowModal}
          >
            <b>Analizar Datos Filtrados</b>
          </Button>
        ) : (
          <div style={{ width: "100px" }}></div>
        )}
        <DropdownButton
          as={ButtonGroup}
          disabled={parseInt(formData.tab_tipo) === 2}
          align={{ lg: "end" }}
          variant="light"
          style={{
            height: "40px",
          }}
          title={
            <>
              <DownloadIcon color="#333F49" />
              Exportar
            </>
          }
        >
          <PDFDownloadLink
            document={
              <MyDocumentDashboard
                data={data}
                total={data?.total_encuestados}
                facultad={usuario_actual.fac_nombre}
                filtros={filter}
              />
            }
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "16px",
            }}
            fileName={`reporteTablero_${data?.nombre_encuesta}.pdf`}
          >
            Exportar PDF
          </PDFDownloadLink>
          <br />
        </DropdownButton>
      </div>
      {resultados && (
        <div
          style={{
            width: "90vw",
            marginRight: "auto",
            marginLeft: "auto",
            borderRadius: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px",
            paddingTop: "20px",
            paddingLeft: "25px",
            paddingRight: "25px",
            marginTop: "25px",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <CardGroup>
            <Card>
              <Card.Header>
                <strong>CONFIANZA</strong>
              </Card.Header>
              <Card.Body>
                {isResultadosLoading ? (
                  <Spinner animation="border" variant="secondary" />
                ) : (
                  <div>
                    <ApexRadialChart
                      series={
                        resultados["confianza"] ? resultados["confianza"] : 0
                      }
                    />
                    <Card.Text>{resultados["confianza"]}</Card.Text>
                  </div>
                )}
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <strong>SOPORTE</strong>
              </Card.Header>
              <Card.Body>
                {isResultadosLoading ? (
                  <Spinner animation="border" variant="secondary" />
                ) : (
                  <div>
                    <ApexRadialChart
                      series={resultados["soporte"] ? resultados["soporte"] : 0}
                    />
                    <Card.Text>{resultados["soporte"]}</Card.Text>
                  </div>
                )}
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <strong>LIFT</strong>
              </Card.Header>
              <Card.Body>
                {isResultadosLoading ? (
                  <Spinner animation="border" variant="secondary" />
                ) : (
                  <div>
                    <ApexRadialChart
                      series={resultados["lift"] ? resultados["lift"] / 2 : 0}
                    />
                    <Card.Text>{resultados["lift"]}</Card.Text>
                  </div>
                )}
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      )}
      <br />
      {isLoading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        <>
          {parseInt(formData.tab_tipo) === 1 ? (
            <>
              <Button
                variant="outline-secondary"
                style={{
                  height: "40px",
                  display: "flex",
                  float: "right",
                  alignItems: "center",
                  position: "absolute",
                  right: "5vw",
                  marginTop: "5px",
                  marginRight: "5px",
                }}
                onClick={() => {
                  setFilter(null);
                  setAntecedentes([]);
                  setConsecuentes([]);
                  setResultados([]);
                }}
                title="Restaurar"
              >
                <ReloadIcon />
              </Button>
              <AutoDasboard
                data={data}
                setSelectedOption={handlefilterClick}
                tipo={"estudiantes"}
              />
            </>
          ) : (
            <HtmlEmbedder
              idFormulario={idFormulario}
              idFacultad={usuario_actual?.usu_facultad_pertenece}
            />
          )}
        </>
      )}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Definición de la Regla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h5>Antecedentes</h5>
              <ListGroup>
                {antecedentes.map((item, index) => (
                  <ListGroup.Item key={index} style={{ textAlign: "left" }}>
                    {item}
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => handleMoveToConsecuentes(item)}
                      title="Mover a Consecuentes"
                      style={{ float: "right" }}
                    >
                      <RightIcon />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <h5>Consecuentes</h5>
              <ListGroup>
                {consecuentes.map((item, index) => (
                  <ListGroup.Item key={index} style={{ textAlign: "right" }}>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => handleMoveToAntecedentes(item)}
                      title="Mover a Antecedentes"
                      style={{ float: "left" }}
                    >
                      <LeftIcon />
                    </Button>{" "}
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Button
            variant="dark"
            onClick={() => {
              handleEnviarClick({
                antecedente: antecedentes,
                consecuente: consecuentes,
                formulario_id: idFormulario,
              });
            }}
            style={{ width: "25%" }}
          >
            Calcular
          </Button>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{
              backgroundColor: "#AA1415",
              borderColor: "#AA1415",
              width: "25%",
            }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableroEstudiantes;
