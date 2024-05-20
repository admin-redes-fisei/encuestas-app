import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import {
  eliminarOpcion,
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
    pre_es_abierta: "",
    pre_es_obligatoria: "",
    pre_estado: "",
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
      console.log(dataPreguntas);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, forID]);

  //para el modal
  const handleShowPregunta = () => setShowPregunta(true);

  const handleClosePregunta = () => {
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
      pre_es_abierta: "",
      pre_es_obligatoria: "",
      pre_estado: 1,
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
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <div className="d-grid gap-2">
              <Button
                variant="dark"
                style={{ width: "auto", marginTop: "30px" }}
                onClick={() => {
                  handleShowPregunta();
                }}
              >
                <PlusIcon />
                Nueva Pregunta
              </Button>
            </div>
          </Col>
        </Row>
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
        {dataPreguntas?.map((item) => (
          <>
            <Card key={item.pre_id} style={{ width: "95%", marginTop: "20px" }}>
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
                        checked={parseInt(item.pre_estado) === 1 ? true : false}
                        inline
                        //onChange={(e) => handleCambiarEstado(e, item)}
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
                        <Dropdown.Item eventKey="2">
                          <UpIcon /> Mover Arriba
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          <DownIcon /> Mover Abajo
                        </Dropdown.Item>

                        <Dropdown.Item
                          eventKey="1"
                          onClick={() => {
                            handleEditPregunta(item);
                          }}
                        >
                          <EditIcon /> Editar
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
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
                                onClick={() => handleResetOpcion(opcion.opc_id)}
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
                  <div>No hay opciones registrados</div>
                )}
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
              </Card.Body>
            </Card>
          </>
        ))}
      </div>
      <ModalOpciones
        data={formDataOpciones}
        show={showOpcion}
        handleClose={handleCloseOpcion}
        isAccordeon={
          preguntaSeleccionada?.opciones
            ? preguntaSeleccionada?.opciones[0]?.opc_padre !== null
            : false
        } // Puedes ajustar este valor según sea necesario
        pregunta_pertenece={preguntaSeleccionada.pre_id} // Ajusta según sea necesario
      />
      <ModalPreguntas
        data={formDataPreguntas}
        show={showPregunta}
        handleClose={handleClosePregunta}
        seccion_pertenece={parseInt(secID)} // Ajusta según sea necesario
      />
    </div>
  );
};

export default Preguntas;
