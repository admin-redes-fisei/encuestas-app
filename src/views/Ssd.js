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
      setResultados(["-", "-", "-"]);
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
    console.log(antecedentesSeleccionados);
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
    console.log(antecedentesSeleccionados);
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
        console.log(data);
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleCalcular = () => {
    const antecedentesSeleccionadosTemp = [];
    const consecuentesSeleccionadosTemp = [];
    console.log(formularioSeleccionado);

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

    const jsonData = {
      antecedente: antecedentesSeleccionadosTemp,
      consecuente: consecuentesSeleccionadosTemp,
      archivo:
        formularioSeleccionado === 1
          ? "resultado_empresas.csv"
          : "resultado_estudiantes.csv",
    };
    handleEnviarClick(jsonData);
    console.log(jsonData);
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
        <Spinner animation="border" variant="danger" />
      ) : (
        <div className="contenido_preguntas">
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Confianza</Card.Title>
                <Card.Text>{resultados["confianza"]}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Soporte</Card.Title>
                <Card.Text>{resultados["soporte"]}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Lift</Card.Title>
                <Card.Text>{resultados["lift"]}</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
          <br />
          <Container>
            <Row>
              <Col style={{ alignItems: "start" }}>
                <h1>Antecedentes</h1>
                <Button variant="primary" onClick={handleShow1}>
                  Seleccionar
                </Button>
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
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose1}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                {antecedentesSeleccionados?.map((pregunta) => (
                  <div key={pregunta.id}>
                    <Form.Group className="mb-3" key={pregunta.id}>
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label={pregunta.title}
                      >
                        <Form.Select
                          id={`select-antecedente-${pregunta.id}`}
                          aria-label="Selección"
                          style={{ width: "60%" }}
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
                <h1>Concecuentes</h1>
                <Button variant="primary" onClick={handleShow2}>
                  Seleccionar
                </Button>
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
                  <div key={pregunta.id}>
                    <Form.Group className="mb-3" key={pregunta.id}>
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label={pregunta.title}
                      >
                        <Form.Select
                          id={`select-consecuente-${pregunta.id}`}
                          aria-label="Selección"
                          style={{ width: "60%" }}
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
          <Button variant="primary" onClick={handleCalcular}>
            Calcular
          </Button>
        </div>
      )}
    </div>
  );
}
export default SSD;
