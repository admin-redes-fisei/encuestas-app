import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Modal,
  Spinner,
  Image,
  Alert,
} from "react-bootstrap";
import {
  agregarTablero,
  obtenerCodeTablero,
} from "../services/TablerosService";
import { toast } from "react-toastify";
import imagenNoTablero from "../assets/noEncontrado.jpg";

const HtmlEmbedder = ({ idFormulario, idFacultad }) => {
  const [htmlCode, setHtmlCode] = useState("");
  const [temporalCode, setTemporalCode] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [showModal, setShowModal] = useState(false);
  //para actualizar
  //const [refresh, setRefresh] = useState(0);
  //para tipo de usuarioa actual
  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  //para carga
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (event) => {
    setTemporalCode(event.target.value);
  };

  const handleEmbed = () => {
    const blob = new Blob([htmlCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    setIsLoading(true);
    obtenerCodeTablero(idFormulario, idFacultad).then((response) => {
      if (response) {
        setHtmlCode(response[0]?.tab_codigo);
        setTemporalCode(response[0]?.tab_codigo);
      } else {
        setHtmlCode("");
        setTemporalCode("");
      }
      setIsLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idFormulario]);

  useEffect(() => {
    // Ejecutar handleEmbed después de que htmlCode haya sido actualizado
    if (htmlCode) {
      handleEmbed();
      console.log("HI");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlCode]);

  const handleSave = () => {
    agregarTablero({
      tab_codigo: temporalCode,
      tab_formulario_pertenece: idFormulario.toString(),
      tab_facultad_pertenece: idFacultad,
    }).then((resultado) => {
      if (resultado?.mensaje === "OK") {
        setHtmlCode(temporalCode);
        handleEmbed();
        setShowModal(false);
      } else {
        toast.error("Error al guardar el tablero", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };

  return (
    <div
      style={{
        width: "90vw",
        marginRight: "auto",
        marginLeft: "auto",
        minHeight: "70vh",
        borderRadius: "20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "20px",
        paddingTop: "20px",
        paddingLeft: "25px",
        paddingRight: "25px",
        marginBottom: "35px",
        backgroundColor: "white",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Container>
        {parseInt(usuario_actual.usu_tipo) !== 4 && (
          <Button variant="dark" onClick={handleShow} className="mb-3">
            Insertar Código
          </Button>
        )}
        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Código HTML</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="htmlInput">
                <Form.Label>Ingrese el Código HTML:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={temporalCode}
                  onChange={handleInputChange}
                  placeholder="Pega tu código html aquí"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              variant="dark"
              onClick={handleSave}
              style={{ width: "25%" }}
            >
              Guardar
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
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

        {isLoading ? (
          <>
            <br />
            <Spinner animation="border" variant="danger" />
          </>
        ) : iframeSrc ? (
          <div className="mt-4">
            <iframe
              src={iframeSrc}
              title="Embedded HTML"
              style={{ width: "100%", height: "600px", border: "none" }}
            />
          </div>
        ) : (
          <>
            <br />
            <br />
            <Alert key="secondary" variant="secondary" style={{ width: "fit-content", marginLeft:"auto", marginRight:"auto" }}>
              Aún no se ha registrado ningún tablero para esta encuesta.
            </Alert>
            <Image src={imagenNoTablero} rounded style={{ width: "30%" }} />
          </>
        )}
      </Container>
    </div>
  );
};

export default HtmlEmbedder;
