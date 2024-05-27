import { useEffect, useState } from "react";
import AutoDasboard from "../components/AutoDasboard";
import AdminSideBar from "../components/SidebarBashboard";
import {
  obtenerConteoDatos,
  obtenerConteoDatosFiltrados,
  obtenerDatasetFiltrado,
} from "../services/TablerosService";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  Col,
  DropdownButton,
  Form,
  ListGroup,
  Modal,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
} from "react-bootstrap";
import ReloadIcon from "../assets/reloadIcon";
import { obtenerFormularioFacultad } from "../services/FormulariosAppService";
import DownloadIcon from "../assets/downloadIcon";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocumentDashboard from "../components/DocumentoDashboard";
import HtmlEmbedder from "../components/HtmlEmbedder";
import { toast } from "react-toastify";
import { enviarReglas } from "../services/PythonService";
import { CSVLink } from "react-csv";
import ApexRadialChart from "../components/ApexRadialChart";
import RightIcon from "../assets/rightIcon";
import LeftIcon from "../assets/leftIcon";
import AlertIcon from "../assets/alertIcon";
import InfoIcon from "../assets/infoIncon";

const TableroEmpresas = () => {
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
  const [isDatasetLoading, setIsDatasetLoading] = useState(false);
  //para data
  const [formData, setFormData] = useState({
    tab_tipo: 1,
  });
  //para resultados de regla
  const [resultados, setResultados] = useState(null);
  //para el dataset
  const [dataset, setDataset] = useState([]);
  //para la alerta
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    obtenerFormularioFacultad(
      parseInt(usuario_actual.usu_facultad_pertenece),
      "empresas"
    ).then((response) => {
      setIdFormulario(parseInt(response?.for_id));
      if (filter) {
        obtenerConteoDatosFiltrados({
          id: parseInt(response?.for_id),
          valores_filtro: filter,
        }).then((response) => {
          setData(response);
          setIsLoading(false);
        });
      } else {
        setIsLoading(true);
        obtenerConteoDatos(parseInt(response?.for_id)).then((response) => {
          setData(response);
          setIsLoading(false);
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

  //para modal de apriori
  const handleShowModal = () => {
    if (antecedentes.length + consecuentes.length !== filter.length) {
      setAntecedentes(filter);
      setConsecuentes([]);
    }
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  //para manejor de antecedente y consecuentes
  const handleMoveToConsecuentes = (item) => {
    setAntecedentes((prev) => prev.filter((i) => i !== item));
    setConsecuentes((prev) => [...prev, item]);
  };

  const handleMoveToAntecedentes = (item) => {
    setConsecuentes((prev) => prev.filter((i) => i !== item));
    setAntecedentes((prev) => [...prev, item]);
  };

  //para validar datos llenos
  const handleValidar = () => {
    if (antecedentes?.length > 0 && consecuentes?.length > 0) {
      handleEnviarClick({
        antecedente: antecedentes,
        consecuente: consecuentes,
        formulario_id: idFormulario,
      });
    } else {
      toast.error("Dede existir al menos un antecedente y un consecuente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  //para calcular valores de regla
  const handleEnviarClick = (reglas) => {
    setIsResultadosLoading(true);
    handleCloseModal();
    setResultados([]);
    setAlert(false);
    try {
      enviarReglas(reglas).then((data) => {
        if (data.error) {
          setAlert(true);
        }
        setResultados(data);
        setIsResultadosLoading(false);
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  //para el dataset
  useEffect(() => {
    setIsDatasetLoading(true);
    obtenerDatasetFiltrado({
      formulario_id: idFormulario,
      filtros: filter ? filter : [],
    }).then((response) => {
      if (response?.error) {
        setDataset([]);
        setIsDatasetLoading(false);
      } else {
        setDataset(response);
        setIsDatasetLoading(false);
      }
    });
  }, [filter, idFormulario]);

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
            <b>Tablero de Empleabilidad</b>
          </h3>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
          <Form.Select
            aria-label="Tipo de usuario"
            name="tab_tipo"
            value={formData.tab_tipo}
            onChange={handleChangeTipoTablero}
          >
            {dataTipos?.map((tipo, index) => (
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
          disabled={
            parseInt(formData.tab_tipo) === 2 ||
            !data?.total_encuestados ||
            isDatasetLoading
          }
          align={{ lg: "end" }}
          variant="light"
          style={{
            height: "40px",
          }}
          title={
            <>
              {isDatasetLoading ? (
                <Spinner animation="border" variant="secondary" size="sm" />
              ) : (
                <DownloadIcon color="#333F49" />
              )}
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
          <CSVLink
            data={dataset}
            filename={`${data?.nombre_encuesta}-filtrado`}
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "16px",
            }}
          >
            Exportar CSV
          </CSVLink>
        </DropdownButton>
      </div>
      {resultados && parseInt(formData.tab_tipo) === 1 && (
        <div
          style={{
            width: "90vw",
            marginRight: "auto",
            marginLeft: "auto",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "25px",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ margin: "10px" }}>
            <b>Regla: </b> Si{" "}
            {antecedentes?.map((item) => (
              <>
                <Badge pill bg="primary" key={item}>
                  {item}
                </Badge>{" "}
              </>
            ))}
            Entonces{" "}
            {consecuentes?.map((item) => (
              <>
                <Badge
                  pill
                  bg={
                    isResultadosLoading
                      ? "secondary"
                      : alert === true
                      ? "warning"
                      : parseInt(resultados["lift"]) >= 1
                      ? "success"
                      : "warning"
                  }
                  key={item}
                >
                  {item}
                </Badge>{" "}
              </>
            ))}
          </div>
          {parseInt(resultados["lift"]) < 1 && (
            <Alert
              key="secondary"
              variant="warning"
              style={{
                width: "fit-content",
                margin: "20px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <AlertIcon /> La regla no es relevante debido a su lift menor a 1.
            </Alert>
          )}
          <CardGroup
            style={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "white",
            }}
          >
            {alert === true ? (
              <Alert
                key="secondary"
                variant="warning"
                style={{
                  width: "fit-content",
                  margin: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <AlertIcon /> La regla no se ha tomado en cuenta debido a su
                bajo soporte y confianza.
              </Alert>
            ) : (
              <>
                <Card>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <strong>CONFIANZA</strong>
                      <OverlayTrigger
                        trigger="click"
                        key="topconfianza"
                        placement="top"
                        overlay={
                          <Popover id={`popoverConfianza`}>
                            <Popover.Header as="h3">{`Confianza`}</Popover.Header>
                            <Popover.Body>
                              Mide el <strong>interés</strong> de la regla.{" "}
                              <br />
                              La confianza indica la probabilidad de que el
                              consecuente ocurra cuando el antecedente está
                              presente.
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <Button variant="light">
                          <InfoIcon />
                        </Button>
                      </OverlayTrigger>
                    </div>
                    {isResultadosLoading ? (
                      <>
                        <br />
                        <Spinner animation="border" variant="secondary" />
                      </>
                    ) : (
                      <div>
                        <ApexRadialChart
                          series={
                            resultados["confianza"]
                              ? resultados["confianza"]
                              : 0
                          }
                        />
                      </div>
                    )}
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <strong>SOPORTE</strong>
                      <OverlayTrigger
                        trigger="click"
                        key="topsoporte"
                        placement="top"
                        overlay={
                          <Popover id={`popoverSoporte`}>
                            <Popover.Header as="h3">{`Soporte`}</Popover.Header>
                            <Popover.Body>
                              Mide la <strong>frecuencia</strong> de la regla.{" "}
                              <br />
                              El soporte mide cuántas veces ocurre una
                              combinación de ítems en el conjunto de datos.
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <Button variant="light">
                          <InfoIcon />
                        </Button>
                      </OverlayTrigger>
                    </div>
                    {isResultadosLoading ? (
                      <>
                        <br />
                        <Spinner animation="border" variant="secondary" />
                      </>
                    ) : (
                      <div>
                        <ApexRadialChart
                          series={
                            resultados["soporte"] ? resultados["soporte"] : 0
                          }
                        />
                      </div>
                    )}
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <strong>LIFT</strong>
                      <OverlayTrigger
                        trigger="click"
                        key="toplift"
                        placement="top"
                        overlay={
                          <Popover id={`popoverLift`}>
                            <Popover.Header as="h3">{`Lift`}</Popover.Header>
                            <Popover.Body>
                              Mide la <strong>correlación</strong> entre los
                              items. <br />
                              El lift define la relevancia de una regla,
                              comparando la probabilidad observada de los ítems
                              juntos con la probabilidad de que ocurran por
                              separado.
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <Button variant="light">
                          <InfoIcon />
                        </Button>
                      </OverlayTrigger>
                    </div>
                    {isResultadosLoading ? (
                      <>
                        <br />
                        <Spinner animation="border" variant="secondary" />
                      </>
                    ) : (
                      <div>
                        <ApexRadialChart
                          series={resultados["lift"] ? resultados["lift"] : 0}
                        />
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </>
            )}
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
                  setResultados(null);
                  setAlert(false);
                }}
                title="Restaurar"
                disabled={!data?.total_encuestados}
              >
                <ReloadIcon />
              </Button>
              <AutoDasboard
                data={data}
                setSelectedOption={handlefilterClick}
                tipo={"empresas"}
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
              handleValidar();
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

export default TableroEmpresas;
