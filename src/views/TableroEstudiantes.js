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
  Col,
  DropdownButton,
  Form,
  ListGroup,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import ReloadIcon from "../assets/reloadIcon";
import { obtenerFormularioFacultad } from "../services/FormulariosAppService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocumentDashboard from "../components/DocumentoDashboard";
import DownloadIcon from "../assets/downloadIcon";
import HtmlEmbedder from "../components/HtmlEmbedder";
import { enviarReglas } from "../services/PythonService";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import AlertIcon from "../assets/alertIcon";

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
  const [idPreguntaPrediccion, setidPreguntaPrediccion] = useState("");
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

  useEffect(() => {
    setIsLoading(true);
    obtenerFormularioFacultad(
      parseInt(usuario_actual.usu_facultad_pertenece),
      "estudiantes"
    ).then((response) => {
      setIdFormulario(parseInt(response?.for_id));
      const nombresFiltros = filter?.map((f) => f.name);
      if (filter) {
        obtenerConteoDatosFiltrados({
          id: parseInt(response?.for_id),
          valores_filtro: nombresFiltros,
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

  //para modal de apriori
  const handleShowModal = () => {
    if (antecedentes?.length !== filter?.length) {
      setAntecedentes(filter);
      setResultados(null);
    }
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  //para seleccion de pregunta a predecir
  const handleChangePreguntaPerdiccion = (e) => {
    const { value } = e.target;
    setidPreguntaPrediccion(value);
  };

  //para validar datos llenos
  const handleValidar = () => {
    if (antecedentes?.length > 0 && idPreguntaPrediccion !== "") {
      handleEnviarClick({
        headers: antecedentes?.map((a) => `P${a.id_pregunta}`),
        valores: antecedentes?.map((a) => a.name),
        formulario_id: idFormulario,
        target: `P${idPreguntaPrediccion}`,
      });
    } else {
      toast.error("Seleccione una pregunta para predecir", {
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
    setResultados([]);
    try {
      enviarReglas(reglas).then((data) => {
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
    const nombresFiltros = filter?.map((f) => f.name);
    obtenerDatasetFiltrado({
      formulario_id: idFormulario,
      filtros: nombresFiltros ? nombresFiltros : [],
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
      <AdminSideBar />
      <br />
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
        <Button
          variant="dark"
          onClick={handleShowModal}
          disabled={!(filter && filter?.length >= 1)}
        >
          <b>Analizar Datos Filtrados</b>
        </Button>
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
                filtros={filter?.map((f) => f.name)}
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
                  setResultados(null);
                  setidPreguntaPrediccion("");
                  setIsResultadosLoading(false);
                }}
                title="Restaurar"
                disabled={!data?.total_encuestados}
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
          <Modal.Title>Definición de Valores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h5>Antecedentes</h5>
              <ListGroup>
                {antecedentes?.map((item, index) => (
                  <ListGroup.Item key={index} style={{ textAlign: "left" }}>
                    {item.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <h5>Predicción</h5>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlSelect1"
              >
                <Form.Select
                  aria-label="Pregunta Predicción"
                  name="id_pregunta"
                  value={idPreguntaPrediccion}
                  onChange={handleChangePreguntaPerdiccion}
                >
                  <option value="">Seleccione</option>
                  {data?.preguntas
                    ?.filter(
                      (pre) =>
                        !antecedentes?.some(
                          (a) =>
                            parseInt(a.id_pregunta) ===
                            parseInt(pre.id_pregunta)
                        )
                    )
                    ?.map((pregunta, index) => (
                      <option key={index} value={pregunta?.id_pregunta}>
                        {pregunta?.titulo_pregunta}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Button
              variant="dark"
              onClick={() => {
                handleValidar();
              }}
              style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
              disabled={isResultadosLoading}
            >
              Predecir
            </Button>
          </Row>
          <br />
          {isResultadosLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner animation="border" variant="danger" />
            </div>
          ) : resultados && resultados?.error ? (
            <>
              <Row style={{ margin: "10px" }}>
                <Alert key="danger" variant="danger">
                  {resultados.error}
                </Alert>
              </Row>
            </>
          ) : (
            resultados &&
            parseInt(formData.tab_tipo) === 1 && (
              <>
                <Row style={{ margin: "10px" }}>
                  <Alert key="light" variant="light">
                    <h6>
                      <b>Regla: </b> Si{" "}
                      {antecedentes?.map((item) => (
                        <>
                          <Badge pill bg="primary" key={item.name}>
                            {item.name}
                          </Badge>{" "}
                        </>
                      ))}
                      Entonces{" "}
                      <Badge
                        pill
                        bg="success"
                        key={resultados?.clasificacion?.clase}
                      >
                        {resultados?.clasificacion?.clase}
                      </Badge>
                    </h6>
                  </Alert>
                </Row>
                <br />
                <h5>Tendencias Descubiertas</h5>
                {resultados?.asociacion?.error ? (
                  <Alert key="warning1" variant="warning">
                    <AlertIcon /> No se encontraron reglas asociadas válidas
                  </Alert>
                ) : (
                  <>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th
                            style={{
                              width: "70%",
                              color: "#333F49",
                              paddingTop: "15px",
                              textAlign: "center",
                            }}
                          >
                            Regla
                          </th>
                          <th
                            style={{
                              width: "10%",
                              color: "#333F49",
                              paddingTop: "15px",
                              textAlign: "center",
                            }}
                          >
                            Confianza
                          </th>
                          <th
                            style={{
                              width: "10%",
                              color: "#333F49",
                              paddingTop: "15px",
                              textAlign: "center",
                            }}
                          >
                            Soporte
                          </th>
                          <th
                            style={{
                              width: "10%",
                              color: "#333F49",
                              paddingTop: "15px",
                              textAlign: "center",
                            }}
                          >
                            Lift
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <Table
                      hover
                      style={{
                        width: "100%",
                        borderRadius: "20px",
                        marginTop: "5px",
                      }}
                    >
                      <tbody>
                        {resultados?.asociacion?.reglas.map((item, index) => (
                          <tr key={index} style={{ marginTop: "50px" }}>
                            <td
                              style={{
                                width: "70%",
                                color: "#333F49",
                                paddingTop: "10px",
                                textAlign: "left",
                              }}
                            >
                              <b>SI</b>{" "}
                              {item.antecedentes.map((a, index) =>
                                index < item.antecedentes.length - 1
                                  ? `${a}, `
                                  : a
                              )}
                              <br />
                              <b>ENTONCES</b>{" "}
                              {item.consecuentes.map((a, index) =>
                                index < item.consecuentes.length - 1
                                  ? `${a}, `
                                  : a
                              )}
                            </td>
                            <td
                              style={{
                                width: "10%",
                                color: "#333F49",
                                paddingTop: "10px",
                              }}
                            >
                              {(
                                parseFloat(
                                  resultados?.asociacion?.confianza[index]
                                ) * 100
                              ).toFixed(1)}
                              %
                            </td>
                            <td
                              style={{
                                width: "10%",
                                color: "#333F49",
                                paddingTop: "10px",
                              }}
                            >
                              {(
                                parseFloat(
                                  resultados?.asociacion?.soporte[index]
                                ) * 100
                              ).toFixed(1)}
                              %
                            </td>
                            <td
                              style={{
                                width: "10%",
                                color: "#333F49",
                                paddingTop: "10px",
                              }}
                            >
                              {parseFloat(
                                resultados?.asociacion?.lift[index]
                              ).toFixed(4)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </>
            )
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
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
