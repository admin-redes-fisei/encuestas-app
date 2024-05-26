import { useEffect, useState } from "react";
import AdminSideBar from "../components/SidebarBashboard";
import {
  agregarTablero,
  obtenerCodeTablero,
} from "../services/TablerosService";
import {
  Alert,
  Button,
  Container,
  Form,
  Image,
  Modal,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import imagenNoTablero from "../assets/noEncontrado.jpg";

const TableroAnalytics = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [temporalCode, setTemporalCode] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  //para carga
  const [isLoading, setIsLoading] = useState(true);
  //para actualizar
  //const [refresh, setRefresh] = useState(0);

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
    obtenerCodeTablero(null, usuario_actual?.usu_facultad_pertenece).then(
      (response) => {
        if (response) {
          setHtmlCode(response[0]?.tab_codigo);
          setTemporalCode(response[0]?.tab_codigo);
        } else {
          setHtmlCode("");
          setTemporalCode("");
        }
        setIsLoading(false);
      }
    );
  }, [usuario_actual?.usu_facultad_pertenece]);

  useEffect(() => {
    if (htmlCode) {
      // Ejecutar handleEmbed después de que htmlCode haya sido actualizado
      handleEmbed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlCode]);

  const handleSave = () => {
    agregarTablero({
      tab_codigo: temporalCode,
      tab_formulario_pertenece: "",
      tab_facultad_pertenece: usuario_actual?.usu_facultad_pertenece,
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
            <b>Tablero de Comportamiento</b>
          </h3>
        </div>
      </div>
      <br />
      {isLoading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        <>
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
                  <Alert
                    key="secondary"
                    variant="secondary"
                    style={{
                      width: "fit-content",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Aún no se ha registrado ningún tablero para esta encuesta.
                  </Alert>
                  <Image
                    src={imagenNoTablero}
                    rounded
                    style={{ width: "30%" }}
                  />
                </>
              )}
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default TableroAnalytics;
