import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { listarCarreras } from "../services/CarrerasService";
import { toast } from "react-toastify";
import { agregarOpcion, editarOpcion } from "../services/FormulariosAppService";

const ModalOpciones = ({
  data,
  show,
  handleClose,
  isAccordeon,
  pregunta_pertenece,
}) => {
  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  //para carreras
  const [carreras, setCarreras] = useState([]);
  //para datos
  const [formData, setFormData] = useState({
    opc_id: "",
    opc_numero: "",
    opc_label: "",
    opc_padre: "",
    opc_tooltip_texto: "",
    opc_tooltip_imagen: "",
    opc_pregunta_pertenece: "",
  });

  //listar carreras
  useEffect(() => {
    listarCarreras().then((datos) => {
      if (datos?.error) {
        setCarreras([]);
      } else {
        setCarreras(
          datos?.filter(
            (item) =>
              item.car_facultad_pertenece ===
              usuario_actual.usu_facultad_pertenece
          )
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePadre = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //para validar
  const handleValidate = () => {
    if (
      formData.opc_label.trim() !== "" &&
      (isAccordeon ? formData.opc_padre.trim() !== "" : true)
    ) {
      handleSave();
    } else {
      toast.error("Campos inválidos o incorrectos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  //para guardar
  const handleSave = () => {
    const opc_label = formData.opc_label.toString();
    const opc_numero = formData.opc_numero.toString();
    const opc_padre = formData.opc_padre.toString();
    const opc_tooltip_texto = formData.opc_tooltip_texto.toString();
    const opc_tooltip_imagen = formData.opc_tooltip_imagen.toString();
    const opc_pregunta_pertenece = formData.opc_pregunta_pertenece.toString();

    if (formData.opc_id) {
      const opc_id = formData.opc_id;
      editarOpcion({
        opc_id: opc_id,
        opc_numero: opc_numero,
        opc_label: opc_label,
        opc_padre: opc_padre,
        opc_tooltip_texto: opc_tooltip_texto,
        opc_tooltip_imagen: opc_tooltip_imagen,
        opc_pregunta_pertenece: opc_pregunta_pertenece,
      }).then((resultado) => {
        if (resultado?.mensaje === "OK") {
          handleClose();
        } else {
          toast.error("Verifique los campos", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
    } else {
      agregarOpcion({
        opc_label: opc_label,
        opc_padre: opc_padre,
        opc_tooltip_texto: opc_tooltip_texto,
        opc_tooltip_imagen: opc_tooltip_imagen,
        opc_pregunta_pertenece: pregunta_pertenece,
      }).then((resultado) => {
        if (resultado?.mensaje === "OK") {
          handleClose();
        } else {
          toast.error("Verifique los campos", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Datos de la Opción de respuesta</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ marginLeft: "20px", marginRight: "20px" }}>
        <Form>
          <Container>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <b>Nombre</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    name="opc_label"
                    value={formData.opc_label}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            {isAccordeon && (
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlSelect1"
                  >
                    <Form.Label>
                      <b>Carrera relacionada</b>
                    </Form.Label>
                    <Form.Select
                      aria-label="Tipo de usuario"
                      name="opc_padre"
                      value={formData.opc_padre}
                      onChange={handleChangePadre}
                    >
                      <option value="">Seleccionar Carrera</option>
                      {carreras.map((tipo, index) => (
                        <option key={index} value={tipo.car_nombre}>
                          {tipo.car_nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}
            <br />
            <h6>Configuración de Tooltip (Opcional)</h6>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <b>Texto del Tooltip</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="opc_tooltip_texto"
                    value={formData.opc_tooltip_texto}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <b>URL para imgen del Tooltip</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="opc_tooltip_imagen"
                    value={formData.opc_tooltip_imagen}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
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
          onClick={handleValidate}
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
  );
};

export default ModalOpciones;
