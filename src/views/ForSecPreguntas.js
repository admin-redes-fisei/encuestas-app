import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  duplicarPregunta,
  editarPregunta,
  eliminarOpcion,
  eliminarPregunta,
  obtenerForSecciones,
  restaurarOpcion,
} from "../services/FormulariosAppService";
import { useNavigate, useParams } from "react-router-dom";
import BackIcon from "../assets/backIcon";
import EditIcon from "../assets/editIcon";
import CloseIcon from "../assets/closeIcon";
import PlusIcon from "../assets/addIcon";
import ModalOpciones from "../components/ModalOpciones";
import { toast } from "react-toastify";
import EllipsisIcon from "../assets/ellipsisIcon";
import UpIcon from "../assets/UpIcon";
import DownIcon from "../assets/DownIcon";
import DeleteIcon from "../assets/deleteIcon";
import ModalPreguntas from "../components/ModalPreguntas";
import imagenNoData from "../assets/noEncontrado.jpg";
import DuplicateIcon from "../assets/duplicateIcon";

const Preguntas = () => {
  //para parametros
  let { forID, secID } = useParams();
  //datos obtenidos
  const [dataFormulario, setDataFormulario] = useState([]);
  const [dataSeccion, setdataSeccion] = useState([]);
  const [dataPreguntas, setDataPreguntas] = useState([]);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState([]);
  //para formData
  const [formDataPreguntas, setFormDataPreguntas] = useState({
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
  });
  const [formDataOpciones, setFormDataOpciones] = useState({
    opc_id: "",
    opc_numero: "",
    opc_label: "",
    opc_padre: "",
    opc_tooltip_texto: "",
    opc_tooltip_imagen: "",
    opc_pregunta_pertenece: "",
  });

  //para actualizar
  const [refresh, setRefresh] = useState(0);
  //para el modal
  const [showPregunta, setShowPregunta] = useState(false);
  const [showOpcion, setShowOpcion] = useState(false);
  //const [nuevaSec, setNuevaSec] = useState("");
  //para navegar
  const navigate = useNavigate();
  //cargando
  const [isLoading, setIsLoading] = useState(true);

  //para listar
  useEffect(() => {
    setIsLoading(true);
    obtenerForSecciones(forID).then((datos) => {
      setDataFormulario({
        for_id: datos.for_id,
        for_nombre: datos.for_nombre,
        for_alias: datos.for_alias,
        for_descripcion: datos.for_descripcion,
      });
      setdataSeccion(
        datos?.secciones?.filter(
          (item) => parseInt(item.sec_id) === parseInt(secID)
        )
      );
      setDataPreguntas(
        datos?.secciones?.filter(
          (item) => parseInt(item.sec_id) === parseInt(secID)
        )[0]?.preguntas
      );
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, forID]);

  //para el modal
  const handleShowPregunta = () => setShowPregunta(true);

  const handleClosePregunta = () => {
    setRefresh(refresh + 1);
    setShowPregunta(false);
    setFormDataPreguntas({
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
  };

  //para el modal
  const handleShowOpcion = () => {
    setShowOpcion(true);
  };

  const handleCloseOpcion = () => {
    setRefresh(refresh + 1);
    setShowOpcion(false);
    setFormDataOpciones({
      opc_id: "",
      opc_numero: "",
      opc_label: "",
      opc_padre: "",
      opc_tooltip_texto: "",
      opc_tooltip_imagen: "",
      opc_pregunta_pertenece: "",
    });
  };

  //Para editar
  const handleEditOpcion = (opcion) => {
    setFormDataOpciones(opcion);
    setShowOpcion(true);
  };
  const handleEditPregunta = (pregunta) => {
    setFormDataPreguntas(pregunta);
    setShowPregunta(true);
  };

  //para duplicar
  const handleDuplicarPregunta = (pregunta_id) => {
    duplicarPregunta({ pre_id: pregunta_id }).then((respuesta) => {
      if (respuesta?.mensaje === "OK") {
        setRefresh(refresh + 1);
      } else {
        toast.error("Error al duplicar la pregunta", {
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

  //para eliminar
  const handleDeleteOpcion = (idopcion) => {
    const confirmDelete = window.confirm("¿Está seguro de eliminar la opción?");

    if (confirmDelete) {
      eliminarOpcion({ opc_id: idopcion }).then((respuesta) => {
        if (respuesta?.mensaje === "OK") {
          setRefresh(refresh + 1);
        } else {
          toast.error("Error al intentar eliminar", {
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

  const handleDeletePregunta = (idPregunta) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de eliminar la pregunta?"
    );

    if (confirmDelete) {
      eliminarPregunta({ pre_id: idPregunta }).then((respuesta) => {
        if (respuesta?.mensaje === "OK") {
          setRefresh(refresh + 1);
        } else {
          toast.error("Error: Pregunta con dependencias", {
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

  //para restaurar
  const handleResetOpcion = (idopcion) => {
    restaurarOpcion({ opc_id: idopcion }).then((respuesta) => {
      if (respuesta?.mensaje === "OK") {
        setRefresh(refresh + 1);
      } else {
        toast.error("Error al intentar eliminar", {
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

  //cambio de posicion de preguntas
  const handleCambiarPoscicion = (pregunta, index, direction) => {
    const oldPregunta =
      direction === "d" ? dataPreguntas[index + 1] : dataPreguntas[index - 1];
    const newPregunta = pregunta;

    editarPregunta({
      pre_id: oldPregunta.pre_id,
      pre_numero: newPregunta.pre_numero,
      pre_alias: oldPregunta.pre_alias,
      pre_titulo: oldPregunta.pre_titulo,
      pre_texto: oldPregunta.pre_texto,
      pre_tipo: oldPregunta.pre_tipo,
      pre_url_imagen: oldPregunta.pre_url_imagen,
      pre_tipo_imagen: oldPregunta.pre_tipo_imagen,
      pre_tooltip_texto: oldPregunta.pre_tooltip_texto,
      pre_tooltip_imagen: oldPregunta.pre_tooltip_imagen,
      pre_es_abierta: oldPregunta.pre_es_abierta,
      pre_es_obligatoria: oldPregunta.pre_es_obligatoria,
      pre_estado: oldPregunta.pre_estado,
      pre_seccion_pertenece: oldPregunta.pre_seccion_pertenece,
    }).then((resultado) => {
      if (resultado.mensaje === "OK") {
        editarPregunta({
          pre_id: newPregunta.pre_id,
          pre_numero: oldPregunta.pre_numero,
          pre_alias: newPregunta.pre_alias,
          pre_titulo: newPregunta.pre_titulo,
          pre_texto: newPregunta.pre_texto,
          pre_tipo: newPregunta.pre_tipo,
          pre_url_imagen: newPregunta.pre_url_imagen,
          pre_tipo_imagen: newPregunta.pre_tipo_imagen,
          pre_tooltip_texto: newPregunta.pre_tooltip_texto,
          pre_tooltip_imagen: newPregunta.pre_tooltip_imagen,
          pre_es_abierta: newPregunta.pre_es_abierta,
          pre_es_obligatoria: newPregunta.pre_es_obligatoria,
          pre_estado: newPregunta.pre_estado,
          pre_seccion_pertenece: newPregunta.pre_seccion_pertenece,
        }).then((resultado) => {
          if (resultado.mensaje === "OK") {
            setRefresh(refresh + 1);
          } else {
            toast.error("Error al cambiar posición", {
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
        toast.error("Error al cambiar posición", {
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
  const handleCambiarEstado = (e, pregunta) => {
    const isChecked = e.target.checked;
    const pre_numero = pregunta.pre_numero.toString();
    const pre_alias = pregunta.pre_alias.toString();
    const pre_titulo = pregunta.pre_titulo.toString();
    const pre_texto = pregunta.pre_texto.toString();
    const pre_tipo = pregunta.pre_tipo.toString();
    const pre_url_imagen = pregunta.pre_url_imagen;
    const pre_tipo_imagen = pregunta.pre_tipo_imagen;
    const pre_tooltip_texto = pregunta.pre_tooltip_texto;
    const pre_tooltip_imagen = pregunta.pre_tooltip_imagen;
    const pre_es_abierta = pregunta.pre_es_abierta;
    const pre_es_obligatoria = pregunta.pre_es_obligatoria;
    const pre_estado = (isChecked ? 1 : 0).toString();
    const pre_seccion_pertenece = secID;
    const pre_id = pregunta.pre_id;

    const confirmChange = window.confirm(
      "Está a punto de cambiar el estado de la pregunta ¿Desea continuar?"
    );

    if (confirmChange) {
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
        if (resultado.mensaje === "OK") {
          setRefresh(refresh + 1);
        } else {
          toast.error("Error al cambiar estado", {
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
          width: "84vw",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
        }}
      >
        <Button variant="link" onClick={() => navigate(-1)}>
          <BackIcon />
        </Button>
        <h3
          style={{
            color: "#fff",
            textAlign: "left",
          }}
        >
          <b>
            {dataFormulario?.for_nombre} / {dataSeccion[0]?.sec_nombre}
          </b>
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="dark"
          style={{ width: "auto", float: "right", marginLeft: "auto" }}
          onClick={() => {
            handleShowPregunta();
          }}
        >
          <PlusIcon />
          Nueva Pregunta
        </Button>
      </div>
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
        {isLoading ? (
          <Spinner animation="border" variant="danger" />
        ) : dataPreguntas?.length > 0 ? (
          dataPreguntas?.map((item, index) => (
            <>
              <Card
                key={item.pre_id}
                style={{ width: "95%", marginTop: "20px" }}
              >
                <Card.Body>
                  <Row>
                    <Col>
                      <div
                        style={{
                          width: "93%",
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                          marginLeft: "auto",
                        }}
                      >
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label={
                            parseInt(item.pre_estado) === 1
                              ? "Activo"
                              : "Inactivo"
                          }
                          checked={
                            parseInt(item.pre_estado) === 1 ? true : false
                          }
                          inline
                          onChange={(e) => handleCambiarEstado(e, item)}
                        />
                      </div>
                    </Col>
                    <Col>
                      <Card.Subtitle>{item.pre_titulo}</Card.Subtitle>
                    </Col>
                    <Col>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "center",
                        }}
                      >
                        <DropdownButton
                          as={ButtonGroup}
                          variant="outline-light"
                          title={
                            <>
                              <EllipsisIcon
                                fill={"#000"}
                                height={20}
                                width={20}
                              />
                            </>
                          }
                          style={{ float: "right" }}
                        >
                          <Dropdown.Item
                            eventKey="2"
                            disabled={index === 0}
                            onClick={() =>
                              handleCambiarPoscicion(item, index, "u")
                            }
                          >
                            <UpIcon /> Mover Arriba
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="2"
                            disabled={index === dataPreguntas?.length - 1}
                            onClick={() =>
                              handleCambiarPoscicion(item, index, "d")
                            }
                          >
                            <DownIcon /> Mover Abajo
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() => {
                              handleDuplicarPregunta(item.pre_id);
                            }}
                          >
                            <DuplicateIcon /> Duplicar
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() => {
                              handleEditPregunta(item);
                            }}
                          >
                            <EditIcon /> Editar
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="2"
                            onClick={() => {
                              handleDeletePregunta(item.pre_id);
                            }}
                          >
                            <DeleteIcon /> Eliminar
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <Card.Text>{item.pre_texto}</Card.Text>
                  {item?.opciones?.length > 0 ? (
                    <Table
                      hover
                      style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: "20px",
                        marginTop: "5px",
                      }}
                    >
                      <tbody>
                        {item?.opciones?.map((opcion, index) => (
                          <tr key={opcion.opc_id} style={{ marginTop: "50px" }}>
                            <td
                              style={{
                                width: "5%",
                                color:
                                  parseInt(opcion.opc_eliminado) === 1
                                    ? "#CBCBCB"
                                    : "#333F49",
                                paddingTop: "15px",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                width: opcion.opc_padre ? "50%" : "80%",
                                color:
                                  parseInt(opcion.opc_eliminado) === 1
                                    ? "#CBCBCB"
                                    : "#333F49",
                                paddingTop: "15px",
                                textAlign: "left",
                              }}
                            >
                              {opcion.opc_label}
                            </td>
                            {opcion.opc_padre && (
                              <td
                                style={{
                                  width: "30%",
                                  color:
                                    parseInt(opcion.opc_eliminado) === 1
                                      ? "#CBCBCB"
                                      : "#333F49",
                                  paddingTop: "15px",
                                  textAlign: "left",
                                }}
                              >
                                {opcion.opc_padre}
                              </td>
                            )}
                            <td
                              style={{
                                width: "15%",
                                color: "333F49",
                                flex: 3,
                              }}
                            >
                              {parseInt(opcion.opc_eliminado) === 1 ? (
                                <Button
                                  variant="link"
                                  title="Editar opción"
                                  onClick={() =>
                                    handleResetOpcion(opcion.opc_id)
                                  }
                                >
                                  Restaurar
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    variant="outline-light"
                                    title="Editar opción"
                                    onClick={() => {
                                      setPreguntaSeleccionada(item);
                                      handleEditOpcion(opcion);
                                    }}
                                  >
                                    <EditIcon />
                                  </Button>
                                  <Button
                                    variant="outline-light"
                                    title="Eliminar opción"
                                    onClick={() =>
                                      handleDeleteOpcion(opcion.opc_id)
                                    }
                                  >
                                    <CloseIcon />
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <div>
                      {item?.pre_tipo !== "text"
                        ? "No hay opciones registradas"
                        : "Las preguntas abiertas no contienen opciones"}
                    </div>
                  )}
                  {item?.pre_tipo !== "text" && (
                    <Row
                      style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <Col>
                        <div className="d-grid gap-2">
                          <Button
                            variant="outline-secondary"
                            style={{
                              height: "37px",
                              width: "50%",
                              marginLeft: "auto",
                              marginRight: "auto",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() => {
                              setPreguntaSeleccionada(item);
                              handleShowOpcion();
                            }}
                          >
                            <PlusIcon color={"#000"} />
                            Nueva opción
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </>
          ))
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
              Aún no se ha registrado ninguna pregunta para esta sección.
            </Alert>
            <Image src={imagenNoData} rounded style={{ width: "30%" }} />
          </>
        )}
      </div>
      <ModalOpciones
        data={formDataOpciones}
        show={showOpcion}
        handleClose={handleCloseOpcion}
        isAccordeon={preguntaSeleccionada?.pre_tipo === "accordeon"}
        isScale={preguntaSeleccionada?.pre_tipo === "scale"}
        pregunta_pertenece={preguntaSeleccionada.pre_id}
      />
      <ModalPreguntas
        data={formDataPreguntas}
        show={showPregunta}
        handleClose={handleClosePregunta}
        seccion_pertenece={parseInt(secID)}
      />
    </div>
  );
};

export default Preguntas;
