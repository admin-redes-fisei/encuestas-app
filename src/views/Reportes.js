import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import {
  obtenerConteoRespuestas,
  obtenerFormularios,
} from "../services/ReportesService";
import { Button, Card, Spinner } from "react-bootstrap";
import StatisticsQuestionCard from "../components/StatisticsQuestionCard";
import DownloadIcon from "../assets/downloadIcon";

function Reportes() {
  const [data, setData] = useState([]);
  //const [dataEmpresas, setDataEmpresas] = useState([]);
  const [formularios, setformularios] = useState([]);
  const [formularioSeleccionado, setformularioSeleccionado] = useState([]);
  const [preguntasId, setPreguntasId] = useState([]);
  //const [actualizar, setActualizar] = useState(0);
  //para tabs
  const [enlaceSeleccionado, setEnlaceSeleccionado] = useState(1);
  //para carga
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    obtenerFormularios().then((response) => {
      setformularios(response);
    });
  }, []);

  useEffect(() => {
    obtenerConteoRespuestas(1).then((response) => {
      setData(response);
      const valoresUnicos = [
        ...new Set(response.map((item) => item.res_pregunta_pertenece)),
      ];
      setPreguntasId(valoresUnicos);
    });
    const seleccion = Array.from(
      formularios.filter((formulario) => formulario.for_id === 1)
    );
    setformularioSeleccionado(seleccion);
    setIsLoading(false);
  }, [formularios]);

  const handleObtenerDatosFormulario = (id) => {
    setIsLoading(true);
    obtenerConteoRespuestas(id).then((response) => {
      setData(response);
      const valoresUnicos = [
        ...new Set(response.map((item) => item.res_pregunta_pertenece)),
      ];
      setPreguntasId(valoresUnicos);
      setIsLoading(false);
    });
    const seleccion = Array.from(
      formularios.filter((formulario) => formulario.for_id === id)
    );
    setformularioSeleccionado(seleccion);
  };

  //para tabs
  const handleClick = (id) => {
    setEnlaceSeleccionado(id);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "75vw",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            color: "#fff",
            textAlign: "left",
          }}
        >
          <b>Reportes</b>
        </h3>
        <Button
          variant="light"
          style={{
            height: "37px",
            width: "110px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DownloadIcon color="#333F49" />
          Exportar
        </Button>
      </div>
      <br />
      <div
        style={{
          backgroundColor: "#fff",
          width: "75vw",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          borderRadius: "25px",
        }}
      >
        <Nav
          className="justify-content-center"
          variant="pills"
          defaultActiveKey="1"
          style={{ marginBottom: "50px", marginTop: "20px" }}
        >
          {formularios?.map((form) => (
            <Nav.Item key={form.for_id}>
              <Nav.Link
                eventKey={form.for_id}
                onClick={() => {
                  handleObtenerDatosFormulario(form.for_id);
                  handleClick(form.for_id);
                }}
                style={{
                  backgroundColor:
                    enlaceSeleccionado === form.for_id ? "#2B3035" : "white",
                  color: enlaceSeleccionado === form.for_id ? "white" : "black",
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
          <div className="contenido_encuestas">
            {formularioSeleccionado.map((item) => (
              <div key={item.for_id}>
                <Card
                  style={{
                    width: "30%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>{item.cantidad_respuestas}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">TOTAL ENCUESTADOS</small>
                  </Card.Footer>
                </Card>
              </div>
            ))}
            {preguntasId.map((valor) => (
              <div key={valor}>
                <StatisticsQuestionCard
                  questionData={Array.from(
                    data.filter((item) => item.res_pregunta_pertenece === valor)
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reportes;
