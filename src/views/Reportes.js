import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import {
  obtenerConteoRespuestas,
  obtenerDataset,
  obtenerFormularios,
} from "../services/ReportesService";
import { ButtonGroup, Card, DropdownButton, Spinner } from "react-bootstrap";
import StatisticsQuestionCard from "../components/StatisticsQuestionCard";
import DownloadIcon from "../assets/downloadIcon";
import "jspdf-autotable";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../components/DocumentoReportes";
import { CSVLink } from "react-csv";

function Reportes() {
  const [data, setData] = useState([]);
  //const [dataEmpresas, setDataEmpresas] = useState([]);
  const [formularios, setformularios] = useState([]);
  const [formularioSeleccionado, setformularioSeleccionado] = useState(0);
  const [preguntasId, setPreguntasId] = useState([]);
  //const [actualizar, setActualizar] = useState(0);
  //para tabs
  const [enlaceSeleccionado, setEnlaceSeleccionado] = useState(1);
  //para carga
  const [isLoading, setIsLoading] = useState(true);
  //para dataset
  const [dataset, setDataset] = useState([]);
  const [datasetHeaders, setDatasetHeaders] = useState([]);
  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    obtenerFormularios(parseInt(usuario_actual.usu_facultad_pertenece)).then(
      (response) => {
        setformularios(response);
      }
    );
  }, [usuario_actual.usu_facultad_pertenece]);

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

  useEffect(() => {
    if (formularioSeleccionado !== 0) {
      obtenerDataset(formularioSeleccionado[0]?.for_id).then((response) => {
        if (response?.error) {
          setDataset([]);
          setDatasetHeaders(getHeadersFromData([]));
        } else {
          setDataset(response);
          setDatasetHeaders(getHeadersFromData(response));
        }
      });
    }
    console.log(formularioSeleccionado);
  }, [formularioSeleccionado]);

  //para tabs
  const handleClick = (id) => {
    setEnlaceSeleccionado(id);
  };

  //para exportar csv
  const getHeadersFromData = (data) => {
    if (!data || data.length === 0) return [];

    // Obtenemos las keys de la primera fila para los headers
    const headers = Object.keys(data[0]);
    return headers.map((header) => ({ label: header, key: header }));
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
          minHeight: "70vh",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Nav
          className="justify-content-center"
          variant="pills"
          defaultActiveKey="0"
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
          <>
            <br />
            <br />
            {formularioSeleccionado === 0 ? (
              <span>Seleccione una encuesta</span>
            ) : (
              <Spinner animation="border" variant="danger" />
            )}
          </>
        ) : (
          <div className="contenido_encuestas" style={{ position: "relative" }}>
            <DropdownButton
              as={ButtonGroup}
              align={{ lg: "end" }}
              variant="light"
              style={{
                height: "40px",
                position: "absolute",
                top: 0,
                right: "7.5%",
                zIndex: 100,
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
                  <MyDocument
                    data={data}
                    preguntasId={preguntasId}
                    formulario={formularioSeleccionado[0]?.for_nombre}
                    total={parseInt(
                      formularioSeleccionado[0]?.cantidad_respuestas
                    )}
                    facultad={usuario_actual.fac_nombre}
                  />
                }
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginLeft: "16px",
                }}
                fileName={`reporte_${formularioSeleccionado[0]?.for_nombre}.pdf`}
              >
                Exportar PDF
              </PDFDownloadLink>
              <br />
              <CSVLink
                data={dataset}
                headers={datasetHeaders}
                filename={`data_${formularioSeleccionado[0]?.for_nombre}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginLeft: "16px",
                }}
              >
                Exportar CSV
              </CSVLink>
            </DropdownButton>
            {formularioSeleccionado !== 0 &&
              formularioSeleccionado?.map((item) => (
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
                    data.filter(
                      (item) =>
                        parseInt(item.res_pregunta_pertenece) ===
                        parseInt(valor)
                    )
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
