import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import {
  obtenerConteoRespuestas,
  obtenerFormularios,
} from "../services/ReportesService";
import { Card } from "react-bootstrap";
import StatisticsQuestionCard from "../components/StatisticsQuestionCard";

function Reportes() {
  const [data, setData] = useState([]);
  //const [dataEmpresas, setDataEmpresas] = useState([]);
  const [formularios, setformularios] = useState([]);
  const [formularioSeleccionado, setformularioSeleccionado] = useState([]);
  const [preguntasId, setPreguntasId] = useState([]);
  //const [actualizar, setActualizar] = useState(0);

  useEffect(() => {
    obtenerFormularios().then((response) => {
      setformularios(response);
      console.log(response);
    });
  }, []);

  const handleObtenerDatosFormulario = (id) => {
    obtenerConteoRespuestas(id).then((response) => {
      setData(response);
      const valoresUnicos = [
        ...new Set(response.map((item) => item.res_pregunta_pertenece)),
      ];
      setPreguntasId(valoresUnicos);
    });
    const seleccion = Array.from(
      formularios.filter((formulario) => formulario.for_id === id)
    );
    setformularioSeleccionado(seleccion);
    //console.log(formularioSeleccionado);
  };

  return (
    <div>
      <Nav variant="tabs">
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
      <div className="contenido_encuestas">
        {formularioSeleccionado.map((item) => (
          <div key={item.for_id}>
            <Card
              style={{
                width: "40%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Card.Body>
                <Card.Title>TOTAL ENCUESTADOS</Card.Title>
                <Card.Text>{item.cantidad_respuestas}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
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
    </div>
  );
}

export default Reportes;
