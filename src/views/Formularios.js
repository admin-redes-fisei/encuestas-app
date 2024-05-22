import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import {
  agregarFormulario,
  duplicarFormulario,
  editarFormularioActivo,
  eliminarFormulario,
  listarFormularios,
} from "../services/FormulariosAppService";
import OpenFIcon from "../assets/openFIcon";
import DownloadIcon from "../assets/downloadIcon";
import StudentIcon from "../assets/studentIcon";
import BussinesIcon from "../assets/bussinesIcon";
import EllipsisIcon from "../assets/ellipsisIcon";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import CopyIcon from "../assets/copyIcon";
import CopiedIcon from "../assets/copiedIcon copy";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocumentEncuesta from "../components/DocumentoEncuesta";
import { toast } from "react-toastify";
import PlusIcon from "../assets/addIcon";

const Formularios = () => {
  const encabezados = [
    {
      id: 1,
      nombre: "",
      style: {
        width: "5%",
        color: "#000",
      },
    },
    {
      id: 2,
      nombre: "Facultad",
      style: {
        width: "35%",
        color: "#000",
      },
    },
    {
      id: 5,
      nombre: "Encuesta",
      style: {
        width: "35%",
        color: "#000",
      },
    },
    {
      id: 6,
      nombre: "Acciones",
      style: {
        width: "25%",
        color: "#000",
        flex: 3,
      },
    },
  ];

  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  //data
  const [myData, setMyyData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  //Para el buscador
  const [searchValue, setSearchValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchedData?.length / itemsPerPage);
  //para navegar
  const navigate = useNavigate();
  //para compartir
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState(false);
  //para actualizar
  const [refresh, setRefresh] = useState(0);
  //para el modal
  const [showEncuesta, setShowEncuesta] = useState(false);
  //para el formulario
  const [formData, setFormData] = useState({
    for_nombre: "",
    for_alias: "",
    for_descripcion: "",
    for_tipo: "",
  });

  //para el buscador
  useEffect(() => {
    setCurrentPage(1);
    setSearchedData(
      otherData?.filter(
        (item) =>
          item.fac_nombre?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.for_nombre?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [otherData, searchValue]);

  //para listar
  useEffect(() => {
    listarFormularios().then((datos) => {
      if (datos?.error) {
        setOtherData([]);
        setMyyData([]);
      } else {
        setOtherData(
          datos.filter(
            (item) =>
              item.for_facultad_pertenece !==
              usuario_actual.usu_facultad_pertenece
          )
        );
        setMyyData(
          datos.filter(
            (item) =>
              item.for_facultad_pertenece ===
              usuario_actual.usu_facultad_pertenece
          )
        );
      }
    });
  }, [refresh, usuario_actual.usu_facultad_pertenece]);

  //para compartir
  const handleClose = () => setShow(false);
  const handleShow = (link) => {
    setLink(link);
    setShow(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  //para data del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //para validar
  const handleValidate = () => {
    if (formData.for_nombre !== "" && formData.for_descripcion !== "") {
      handleSave();
    } else {
      toast.error("Campos imcompletos o incorrectos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  //para el modal
  const handleShowEncuesta = () => setShowEncuesta(true);

  const handleCloseEncuesta = () => {
    setShowEncuesta(false);
    setRefresh(refresh + 1);
    setFormData({
      for_nombre: "",
      for_alias: "",
      for_descripcion: "",
      for_tipo: "",
    });
  };

  //para agregar
  const handleSave = () => {
    const for_nombre = formData.for_nombre.toString();
    const for_alias = formData.for_alias.toString();
    const for_descripcion = formData.for_descripcion.toString();
    const for_tipo = formData.for_tipo.toString();

    agregarFormulario({
      for_nombre: for_nombre,
      for_alias: for_alias,
      for_descripcion: for_descripcion,
      for_tipo: for_tipo,
      for_estado: 0,
      for_facultad_pertenece: parseInt(usuario_actual.usu_facultad_pertenece),
    }).then((resultado) => {
      if (resultado.mensaje === "OK") {
        handleCloseEncuesta();
        setRefresh(refresh + 1);
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
  };

  //para cambio directo de estado
  const handleCambiarEstado = (e, formulario) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const confirmChange = window.confirm(
        "Está a punto de cambiar el formulario activo ¿Desea continuar?"
      );

      if (confirmChange) {
        editarFormularioActivo({
          for_id: formulario,
        }).then((resultado) => {
          console.log(resultado);
          if (resultado?.mensaje === "OK") {
            setRefresh(refresh + 1);
          } else {
            toast.error("Error al actualizar", {
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
    }
  };

  //para duplicar formulario
  const handleDuplicar = (for_id) => {
    duplicarFormulario({ for_id: for_id }).then((resultado) => {
      if (resultado?.mensaje === "OK") {
        setRefresh(refresh + 1);
      } else {
        toast.error("Error al duplicar", {
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

  //para eliminar fomrulario vacio
  const handleEliminar = (for_id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de eliminar la encuesta?"
    );

    if (confirmDelete) {
      eliminarFormulario({ for_id: for_id }).then((resultado) => {
        if (resultado?.mensaje === "OK") {
          setRefresh(refresh + 1);
        } else {
          toast.error("Error al eliminar", {
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
          justifyContent: "space-between",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h3
          style={{
            color: "#fff",
            textAlign: "left",
          }}
        >
          <b>Mis Formularios</b>
        </h3>
        <Button
          variant="dark"
          style={{
            height: "37px",
            width: "155px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={handleShowEncuesta}
        >
          <PlusIcon />
          Nueva Carrera
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <Col style={{ width: "50%" }}>
          <Row
            style={{
              justifyContent: "center",
            }}
          >
            {myData
              ?.filter((data) => data.for_tipo === "empresas")
              ?.map((item) => (
                <Card
                  style={{
                    width: "90%",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                    margin: "10px",
                  }}
                >
                  <Card.Body
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {parseInt(item.for_estado) === 1 && (
                      <BussinesIcon fill={"#000"} height={50} width={50} />
                    )}
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label={
                        parseInt(item.for_estado) === 1 ? "Activo" : "Inactivo"
                      }
                      checked={parseInt(item.for_estado) === 1 ? true : false}
                      inline
                      onChange={(e) => handleCambiarEstado(e, item?.for_id)}
                      disabled={parseInt(item.for_estado) === 1}
                    />
                    <span
                      style={{
                        color: "#000",
                        textAlign:
                          parseInt(item.for_estado) === 1 ? "center" : "left",
                      }}
                    >
                      <b>{item.for_nombre}</b>
                    </span>
                    <DropdownButton
                      as={ButtonGroup}
                      variant="outline-light"
                      title={
                        <>
                          <EllipsisIcon fill={"#000"} height={20} width={20} />
                        </>
                      }
                      style={{ float: "right" }}
                    >
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() => navigate(`/formularios/${item.for_id}`)}
                      >
                        Editar
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() => handleDuplicar(item.for_id)}
                      >
                        Duplicar
                      </Dropdown.Item>
                      {parseInt(item.for_estado) === 1 ? (
                        <>
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() =>
                              window.open(
                                `/encuestas/${item.for_alias}`,
                                "_blank"
                              )
                            }
                          >
                            Ver encuesta
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="3"
                            onClick={() =>
                              handleShow(
                                `http://hatunsoft.uta.edu.ec:4000/encuestas/${item.for_alias}`
                              )
                            }
                          >
                            Compartir
                          </Dropdown.Item>
                        </>
                      ) : (
                        <Dropdown.Item
                          eventKey="2"
                          onClick={() => handleEliminar(item.for_id)}
                        >
                          Eliminar
                        </Dropdown.Item>
                      )}
                      <PDFDownloadLink
                        document={
                          <MyDocumentEncuesta formularioId={item.for_id} />
                        }
                        style={{
                          textDecoration: "none",
                          color: "black",
                          marginLeft: "16px",
                        }}
                        fileName={`encuesta_${item.for_alias}.pdf`}
                      >
                        Exportar PDF
                      </PDFDownloadLink>
                    </DropdownButton>
                  </Card.Body>
                </Card>
              ))}
          </Row>
        </Col>
        <Col style={{ width: "50%" }}>
          <Row
            style={{
              justifyContent: "center",
            }}
          >
            {myData
              ?.filter((data) => data.for_tipo === "estudiantes")
              ?.map((item) => (
                <Card
                  style={{
                    width: "90%",
                    paddingTop: "0px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                    margin: "10px",
                  }}
                >
                  <Card.Body
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {parseInt(item.for_estado) === 1 && (
                      <StudentIcon fill={"#000"} height={50} width={50} />
                    )}
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label={
                        parseInt(item.for_estado) === 1 ? "Activo" : "Inactivo"
                      }
                      checked={parseInt(item.for_estado) === 1 ? true : false}
                      inline
                      onChange={(e) => handleCambiarEstado(e, item?.for_id)}
                      disabled={parseInt(item.for_estado) === 1}
                    />
                    <sapn
                      style={{
                        color: "#000",
                        textAlign:
                          parseInt(item.for_estado) === 1 ? "center" : "left",
                      }}
                    >
                      <b>{item.for_nombre}</b>
                    </sapn>
                    <DropdownButton
                      as={ButtonGroup}
                      variant="outline-light"
                      title={
                        <>
                          <EllipsisIcon fill={"#000"} height={20} width={20} />
                        </>
                      }
                      style={{ float: "right" }}
                    >
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() => navigate(`/formularios/${item.for_id}`)}
                      >
                        Editar
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() => handleDuplicar(item.for_id)}
                      >
                        Duplicar
                      </Dropdown.Item>
                      {parseInt(item.for_estado) === 1 ? (
                        <>
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() =>
                              window.open(
                                `/encuestas/${item.for_alias}`,
                                "_blank"
                              )
                            }
                          >
                            Ver encuesta
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="3"
                            onClick={() =>
                              handleShow(
                                `http://hatunsoft.uta.edu.ec:4000/encuestas/${item.for_alias}`
                              )
                            }
                          >
                            Compartir
                          </Dropdown.Item>
                        </>
                      ) : (
                        <Dropdown.Item
                          eventKey="2"
                          onClick={() => handleEliminar(item.for_id)}
                        >
                          Eliminar
                        </Dropdown.Item>
                      )}
                      <PDFDownloadLink
                        document={
                          <MyDocumentEncuesta formularioId={item.for_id} />
                        }
                        style={{
                          textDecoration: "none",
                          color: "black",
                          marginLeft: "16px",
                        }}
                        fileName={`encuesta_${item.for_alias}.pdf`}
                      >
                        Exportar PDF
                      </PDFDownloadLink>
                    </DropdownButton>
                  </Card.Body>
                </Card>
              ))}
          </Row>
        </Col>
      </div>
      <h3
        style={{
          color: "#000",
          textAlign: "left",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <b>Otros Formularios</b>
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5px",
        }}
      >
        <InputGroup className="mb-2" style={{ width: "50%" }}>
          <Form.Control
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Buscar"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
      </div>
      <br />
      <div
        style={{
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          paddingTop: "10px",
          paddingLeft: "45px",
          paddingRight: "45px",
          marginBottom: "30px",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              {encabezados?.map((columna) => (
                <th key={columna.id} style={columna.style}>
                  {columna.nombre}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        {searchedData?.length > 0 ? (
          <Table
            hover
            style={{
              width: "100%",
              borderRadius: "20px",
              marginTop: "5px",
            }}
          >
            <tbody>
              {currentItems?.map((item, index) => (
                <tr key={item.for_id} style={{ marginTop: "50px" }}>
                  <td
                    style={{
                      width: "5%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {index + 1 + 5 * (currentPage - 1)}
                  </td>
                  <td
                    style={{
                      width: "35%",
                      color: "#333F49",
                      paddingTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    {item.fac_nombre}
                  </td>
                  <td
                    style={{
                      width: "35%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {item.for_nombre}
                  </td>
                  <td
                    style={{
                      width: "25%",
                      color: "333F49",
                      flex: 3,
                    }}
                  >
                    <Button
                      variant="outline-light"
                      title="Ver encuesta"
                      onClick={() =>
                        window.open(`/encuestas/${item.for_alias}`, "_blank")
                      }
                    >
                      <OpenFIcon />
                    </Button>
                    <Button variant="outline-light" title="Descargar">
                      <PDFDownloadLink
                        document={
                          <MyDocumentEncuesta formularioId={item.for_id} />
                        }
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        fileName={`encuesta_${item.for_alias}.pdf`}
                      >
                        <DownloadIcon color={"#000"} />
                      </PDFDownloadLink>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>No hay datos registrados</div>
        )}
        <div style={{ alignSelf: "center", marginTop: "10px" }}>
          <Pagination>
            {[...Array(totalPages)]?.map((_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Código QR y Enlace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <QRCode value={link} />
            <p>Escanea este código QR</p>
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <b>Enlace:</b>
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                value={link}
                readOnly
                onClick={(e) => e.target.select()}
              />
              <Button
                variant={copied ? "success" : "light"}
                id="button-addon2"
                onClick={copyToClipboard}
              >
                {copied ? <CopiedIcon /> : <CopyIcon />}
              </Button>
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEncuesta} onHide={handleCloseEncuesta}>
        <Modal.Header closeButton>
          <Modal.Title>Datos de la Carrera</Modal.Title>
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
                      name="for_nombre"
                      value={formData.for_nombre}
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
                      <b>Alias</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="for_alias"
                      value={formData.for_alias}
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
                      <b>Descripción</b>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="for_descripcion"
                      value={formData.for_descripcion}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlSelect1"
                  >
                    <Form.Label>
                      <b>Tipo de Formulario</b>
                    </Form.Label>
                    <Form.Select
                      aria-label="Tipo de formulario"
                      name="for_tipo"
                      value={formData.for_tipo}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar tipo de formulario</option>
                      <option value="empresas">
                        Encuesta de empleabilidad
                      </option>
                      <option value="estudiantes">
                        Encuesta de demanda estudiantil
                      </option>
                    </Form.Select>
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
    </div>
  );
};

export default Formularios;
