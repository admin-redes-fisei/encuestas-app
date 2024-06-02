import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  agregarPregunta,
  editarPregunta,
} from "../services/FormulariosAppService";

const ModalPreguntas = ({ data, show, handleClose, seccion_pertenece }) => {
  const tipos_pregunta = [
    { id: 1, tipo: "radio", label: "Pregunta de Selección Única" },
    { id: 2, tipo: "checkbox", label: "Pregunta de Selección Múltiple" },
    { id: 3, tipo: "accordeon", label: "Pregunta Desplegable por Carrera" },
    { id: 4, tipo: "text", label: "Pregunta de Respuesta Abierta" },
    { id: 5, tipo: "scale", label: "Pregunta de Escala" },
  ];

  const tipos_imagen = [
    { id: 1, tipo: "Siempre visible" },
    { id: 2, tipo: "Visible solo después de responder" },
  ];

  const [formData, setFormData] = useState({
    pre_id: "",
    pre_numero: "",
    pre_alias: "",
    pre_titulo: "",
    pre_texto: "",
    pre_tipo: "",
    pre_url_imagen: "",
    pre_tipo_imagen: "",
    pre_tooltip_texto: "",
    pre_tooltip_imagen: "",
    pre_es_abierta: 0,
    pre_es_obligatoria: 0,
    pre_estado: 1,
    pre_seccion_pertenece: "",
  });

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //para validar
  const handleValidate = () => {
    if (
      formData.pre_alias !== "" &&
      formData.pre_tipo !== "" &&
      formData.pre_titulo !== "" &&
      (formData.pre_tipo_imagen !== ""
        ? formData.pre_tipo_imagen !== "" && formData.pre_url_imagen !== ""
        : true) &&
      (formData.pre_url_imagen !== ""
        ? formData.pre_url_imagen !== "" && formData.pre_tipo_imagen !== ""
        : true)
    ) {
      handleSave();
    } else {
      toast.error("Campos incompletos o incorrectos", {
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
    const pre_numero = formData.pre_numero;
    const pre_alias = formData.pre_alias;
    const pre_titulo = formData.pre_titulo;
    const pre_texto = formData.pre_texto;
    const pre_tipo = formData.pre_tipo;
    const pre_url_imagen = formData.pre_url_imagen;
    const pre_tipo_imagen = formData.pre_tipo_imagen;
    const pre_tooltip_texto = formData.pre_tooltip_texto;
    const pre_tooltip_imagen = formData.pre_tooltip_imagen;
    const pre_es_abierta = formData.pre_es_abierta;
    const pre_es_obligatoria = formData.pre_es_obligatoria;
    const pre_estado = formData.pre_estado;
    const pre_seccion_pertenece = seccion_pertenece;
    if (formData.pre_id) {
      const pre_id = formData.pre_id;
      editarPregunta({
        pre_id: pre_id,
        pre_numero: pre_numero,
        pre_alias: pre_alias,
        pre_titulo: pre_titulo,
        pre_texto: pre_texto,
        pre_tipo: pre_tipo,
        pre_url_imagen: pre_url_imagen,
        pre_tipo_imagen: pre_tipo_imagen,
        pre_tooltip_texto: pre_tooltip_texto,
        pre_tooltip_imagen: pre_tooltip_imagen,
        pre_es_abierta: pre_es_abierta,
        pre_es_obligatoria: pre_es_obligatoria,
        pre_estado: pre_estado,
        pre_seccion_pertenece: pre_seccion_pertenece,
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
      agregarPregunta({
        pre_alias: pre_alias,
        pre_titulo: pre_titulo,
        pre_texto: pre_texto,
        pre_tipo: pre_tipo,
        pre_url_imagen: pre_url_imagen,
        pre_tipo_imagen: pre_tipo_imagen,
        pre_tooltip_texto: pre_tooltip_texto,
        pre_tooltip_imagen: pre_tooltip_imagen,
        pre_es_abierta: pre_es_abierta,
        pre_es_obligatoria: pre_es_obligatoria,
        pre_estado: pre_estado,
        pre_seccion_pertenece: pre_seccion_pertenece,
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

  const handleSwitchModalChange = (e) => {
    const isChecked = e.target.checked;
    const { name } = e.target;

    if (isChecked) {
      setFormData({ ...formData, [name]: 1 });
    } else {
      setFormData({ ...formData, [name]: 0 });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Datos de la Pregunta</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ marginLeft: "20px", marginRight: "20px" }}>
        <Form>
          <Container>
            <Row>
              <Col>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  name="pre_estado"
                  label={
                    parseInt(formData.pre_estado) === 1 ? "Activo" : "Inactivo"
                  }
                  checked={parseInt(formData.pre_estado) === 1 ? true : false}
                  inline
                  onChange={(e) => handleSwitchModalChange(e)}
                />
              </Col>
              <Col>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  name="pre_es_obligatoria"
                  label={"Pregunta Obligatoria"}
                  checked={
                    parseInt(formData.pre_es_obligatoria) === 1 ? true : false
                  }
                  inline
                  onChange={(e) => handleSwitchModalChange(e)}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlSelect1"
                >
                  <Form.Label>
                    <b>Tipo de Pregunta</b>
                  </Form.Label>
                  <Form.Select
                    aria-label="Tipo de pregunta"
                    name="pre_tipo"
                    value={formData.pre_tipo}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione</option>
                    {tipos_pregunta?.map((tipo, index) => (
                      <option key={index} value={tipo.tipo}>
                        {tipo.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <b>Alias</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="pre_alias"
                    value={formData.pre_alias}
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
                    <b>Título</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="pre_titulo"
                    value={formData.pre_titulo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <b>Texto de la Pregunta</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="pre_texto"
                    value={formData.pre_texto}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            {(formData.pre_tipo === "checkbox" ||
              formData.pre_tipo === "radio") && (
              <>
                <br />
                <Row>
                  <Col>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Agregar campo Otros.."
                      name="pre_es_abierta"
                      checked={
                        parseInt(formData.pre_es_abierta) === 1 ? true : false
                      }
                      inline
                      onChange={(e) => handleSwitchModalChange(e)}
                    />
                  </Col>
                </Row>
              </>
            )}
            <br />
            <br />
            <h6>Configuración de Imagen (Opcional)</h6>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlSelect1"
                >
                  <Form.Label>
                    <b>Tipo de Imagen</b>
                  </Form.Label>
                  <Form.Select
                    aria-label="Tipo de imagen"
                    name="pre_tipo_imagen"
                    value={formData.pre_tipo_imagen}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione</option>
                    {tipos_imagen?.map((tipo, index) => (
                      <option key={index} value={tipo.id}>
                        {tipo.tipo}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <b>URL Imagen</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="pre_url_imagen"
                    value={formData.pre_url_imagen}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
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
                    name="pre_tooltip_texto"
                    value={formData.pre_tooltip_texto}
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
                    <b>URL Imagen del Tooltip</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="pre_tooltip_imagen"
                    value={formData.pre_tooltip_imagen}
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

export default ModalPreguntas;
