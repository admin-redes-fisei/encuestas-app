import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Nav,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  obtenerConteoRespuestas,
  obtenerFormularios,
} from "../services/ReportesService";
import { enviarReglas } from "../services/PythonService";
import { toast } from "react-toastify";
import ApexRadialChart from "../components/ApexRadialChart";
import PlusIcon from "../assets/addIcon";
import CloseIcon from "../assets/closeIcon";

function SSD() {
  const [formularios, setformularios] = useState([]);
  const [formularioSeleccionado, setformularioSeleccionado] = useState("");
  const [antecedentesOpciones, setantecedentesOpciones] = useState([]);
  const [antecedentesSeleccionados, setantecedentesSeleccionados] = useState(
    []
  );
  const [consecuentesOpciones, setconsecuentesOpciones] = useState([]);
  const [consecuentesSeleccionados, setconsecuentesSeleccionados] = useState(
    []
  );
  const [resultados, setResultados] = useState(["-", "-", "-"]);
  //para carga
  const [isLoading, setIsLoading] = useState(true);
  const [isResultadosLoading, setIsResultadosLoading] = useState(false);
  //para modal
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  //para modal
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    obtenerFormularios().then((response) => {
      setformularios(response);
    });
  }, []);

  const agruparPorPregunta = (datos) => {
    const preguntasAgrupadas = {};
    datos.forEach((item) => {
      const preguntaId = item.res_pregunta_pertenece;
      if (!preguntasAgrupadas[preguntaId]) {
        preguntasAgrupadas[preguntaId] = {
          for_id: item.sec_formulario_pertenece, // ID del formulario
          id: preguntaId, // ID de la pregunta
          options: [],
          title: item.pre_titulo, // Título de la pregunta
        };
      }
      preguntasAgrupadas[preguntaId].options.push({
        id: item.res_opcion_pertenece,
        name: item.pre_alias,
        label: item.res_texto, // Valor de la respuesta
        // Puedes agregar más propiedades según tu estructura de datos
      });
    });
    return Object.values(preguntasAgrupadas);
  };

  const handleObtenerDatosFormulario = (id) => {
    setIsLoading(true);
    //const form = id === 1 ? "empleabilidad" : "demanda-estudiantes";
    obtenerConteoRespuestas(id).then((response) => {
      //const preguntasAgrupadas = agruparPorPregunta(response);
      setantecedentesOpciones(agruparPorPregunta(response));
      setconsecuentesOpciones(agruparPorPregunta(response));
      setantecedentesSeleccionados([]);
      setconsecuentesSeleccionados([]);
      setIsLoading(false);
      setformularioSeleccionado(id);
      setResultados([]);
    });
  };

  const handleCheckAnteChange = (e, pregunta) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Agregar la pregunta a antecedentesSeleccion
      setantecedentesSeleccionados((prevAntecedentes) => [
        ...prevAntecedentes,
        pregunta,
      ]);
      // Eliminar la pregunta de consecuentesOpciones si está presente
      setconsecuentesOpciones((prevConsecuentes) =>
        prevConsecuentes.filter((item) => item.id !== pregunta.id)
      );
    } else {
      // Remover la pregunta de antecedentesSeleccion si se desmarca
      setantecedentesSeleccionados((prevAntecedentes) =>
        prevAntecedentes.filter((item) => item.id !== pregunta.id)
      );
      // Agregar la pregunta de nuevo a consecuentesOpciones
      setconsecuentesOpciones((prevConsecuentes) => [
        ...prevConsecuentes,
        pregunta,
      ]);
    }
  };

  const handleCheckConsChange = (e, pregunta) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Agregar la pregunta a antecedentesSeleccion
      setconsecuentesSeleccionados((prevAntecedentes) => [
        ...prevAntecedentes,
        pregunta,
      ]);
      // Eliminar la pregunta de consecuentesOpciones si está presente
      setantecedentesOpciones((prevConsecuentes) =>
        prevConsecuentes.filter((item) => item.id !== pregunta.id)
      );
    } else {
      // Remover la pregunta de antecedentesSeleccion si se desmarca
      setconsecuentesSeleccionados((prevAntecedentes) =>
        prevAntecedentes.filter((item) => item.id !== pregunta.id)
      );
      // Agregar la pregunta de nuevo a consecuentesOpciones
      setantecedentesOpciones((prevConsecuentes) => [
        ...prevConsecuentes,
        pregunta,
      ]);
    }
  };

  const handleRemoveCons = (pregunta) => {
    // Remover la pregunta de antecedentesSeleccion si se desmarca
    setconsecuentesSeleccionados((prevAntecedentes) =>
      prevAntecedentes.filter((item) => item.id !== pregunta.id)
    );
    // Agregar la pregunta de nuevo a consecuentesOpciones
    setantecedentesOpciones((prevConsecuentes) => [
      ...prevConsecuentes,
      pregunta,
    ]);
  };

  const handleRemoveAnt = (pregunta) => {
    // Remover la pregunta de antecedentesSeleccion si se desmarca
    setantecedentesSeleccionados((prevAntecedentes) =>
      prevAntecedentes.filter((item) => item.id !== pregunta.id)
    );
    // Agregar la pregunta de nuevo a consecuentesOpciones
    setconsecuentesOpciones((prevConsecuentes) => [
      ...prevConsecuentes,
      pregunta,
    ]);
  };
  const handleEnviarClick = (reglas) => {
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
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleCalcular = () => {
    const antecedentesSeleccionadosTemp = [];
    const consecuentesSeleccionadosTemp = [];
    setResultados([]);

    antecedentesSeleccionados?.forEach((pregunta) => {
      const select = document.getElementById(
        `select-antecedente-${pregunta.id}`
      );
      const selectedValue = select.value;
      if (selectedValue !== "Seleccione") {
        antecedentesSeleccionadosTemp.push(selectedValue);
      }
    });

    consecuentesSeleccionados?.forEach((pregunta) => {
      const select = document.getElementById(
        `select-consecuente-${pregunta.id}`
      );
      const selectedValue = select.value;
      if (selectedValue !== "Seleccione") {
        consecuentesSeleccionadosTemp.push(selectedValue);
      }
    });

    setIsResultadosLoading(
      antecedentesSeleccionadosTemp.length > 0 &&
        consecuentesSeleccionadosTemp.length > 0
    );

    if (
      antecedentesSeleccionadosTemp.length > 0 &&
      consecuentesSeleccionadosTemp.length > 0
    ) {
      const jsonData = {
        antecedente: antecedentesSeleccionadosTemp,
        consecuente: consecuentesSeleccionadosTemp,
        archivo:
          formularioSeleccionado === 1
            ? "resultado_empresas.csv"
            : "resultado_estudiantes.csv",
      };
      handleEnviarClick(jsonData);
    } else {
      toast.error("Valores faltantes", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/home">
        {formularios?.map((form) => (
          <Nav.Item key={form.for_id}>
            <Nav.Link
              eventKey={form.for_id}
              onClick={() => {
                handleObtenerDatosFormulario(form.for_id);
              }}
            >
              {form.for_nombre}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {isLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <div
          className="contenido_preguntas"
          style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
        >
          <br />
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
          <br />
          <br />
          <div
            className="d-grid gap-2"
            style={{
              width: "40%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              variant="primary"
              onClick={() => {
                handleCalcular();
              }}
              disabled={isResultadosLoading}
            >
              CALCULAR
            </Button>
          </div>
          <br />
          <br />
          <Container>
            <Row>
              <Col style={{ alignItems: "start" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <h3>Antecedentes</h3>
                  <Button
                    style={{
                      height: "30px",
                      width: "40px",
                      backgroundColor: "#000",
                      border: "none",
                      marginLeft: "30px",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                    onClick={handleShow1}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                <br />
                <br />
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Selección de Preguntas</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {antecedentesOpciones?.map((pregunta) => (
                      <div key={pregunta.id}>
                        <Form.Group className="mb-3" key={pregunta.id}>
                          <Form.Check
                            inline
                            label={pregunta.title}
                            name="group1"
                            type="checkbox"
                            id={pregunta.id}
                            onChange={(e) => handleCheckAnteChange(e, pregunta)}
                            checked={antecedentesSeleccionados?.find(
                              (item) => item.id === pregunta.id
                            )}
                          />
                        </Form.Group>
                      </div>
                    ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                      Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose1}>
                      Guardar
                    </Button>
                  </Modal.Footer>
                </Modal>
                {antecedentesSeleccionados?.map((pregunta) => (
                  <div
                    key={pregunta.id}
                    style={{
                      width: "85%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                    }}
                  >
                    <Button
                      variant="outline-light"
                      onClick={() => handleRemoveAnt(pregunta)}
                    >
                      <CloseIcon />
                    </Button>
                    <Form.Group
                      className="mb-3"
                      key={pregunta.id}
                      style={{
                        width: "90%",
                        marginRight: "auto",
                        marginLeft: "auto",
                      }}
                    >
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label={pregunta.title}
                      >
                        <Form.Select
                          id={`select-antecedente-${pregunta.id}`}
                          aria-label="Selección"
                        >
                          <option>Seleccione</option>
                          {pregunta.options.map((opcion) => (
                            <option key={opcion.id} value={opcion.label}>
                              {opcion.label}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                    <br />
                  </div>
                ))}
              </Col>
              <Col style={{ alignItems: "start" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <h3>Concecuentes</h3>
                  <Button
                    style={{
                      height: "30px",
                      width: "40px",
                      backgroundColor: "#000",
                      border: "none",
                      marginLeft: "30px",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                    onClick={handleShow2}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                <br />
                <br />
                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Selección de Preguntas</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {consecuentesOpciones?.map((pregunta) => (
                      <div key={pregunta.id}>
                        <Form.Group className="mb-3" key={pregunta.id}>
                          <Form.Check
                            inline
                            label={pregunta.title}
                            name="group1"
                            type="checkbox"
                            id={pregunta.id}
                            onChange={(e) => handleCheckConsChange(e, pregunta)}
                            checked={consecuentesSeleccionados?.find(
                              (item) => item.id === pregunta.id
                            )}
                          />
                        </Form.Group>
                      </div>
                    ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose2}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                {consecuentesSeleccionados?.map((pregunta) => (
                  <div
                    key={pregunta.id}
                    style={{
                      width: "85%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                    }}
                  >
                    <Button
                      variant="outline-light"
                      onClick={() => handleRemoveCons(pregunta)}
                    >
                      <CloseIcon />
                    </Button>
                    <Form.Group
                      className="mb-3"
                      key={pregunta.id}
                      style={{
                        width: "90%",
                        marginRight: "auto",
                        marginLeft: "auto",
                      }}
                    >
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label={pregunta.title}
                      >
                        <Form.Select
                          id={`select-consecuente-${pregunta.id}`}
                          aria-label="Selección"
                        >
                          <option>Seleccione</option>
                          {pregunta.options.map((opcion) => (
                            <option key={opcion.id} value={opcion.label}>
                              {opcion.label}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                    <br />
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
export default SSD;
