import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  agregarSeccion,
  editarFormulario,
  editarSeccion,
  eliminarSeccion,
  obtenerForSecciones,
} from "../services/FormulariosAppService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PlusIcon from "../assets/addIcon";
import BackIcon from "../assets/backIcon";
import UpIcon from "../assets/UpIcon";
import DownIcon from "../assets/DownIcon";
import EditIcon from "../assets/editIcon";
import DeleteIcon from "../assets/deleteIcon";

const Secciones = () => {
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
      nombre: "Nombre",
      style: {
        width: "45%",
        color: "#000",
      },
    },
    {
      id: 5,
      nombre: "Estado",
      style: {
        width: "25%",
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
  //para parametros
  let { forID } = useParams();
  const [dataFormulario, setDataFormulario] = useState([]);
  const [data, setData] = useState([]);
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
  //para actualizar
  const [refresh, setRefresh] = useState(0);
  //para formData
  const [formData, setFormData] = useState({
    for_id: "",
    for_nombre: "",
    for_alias: "",
    for_descripcion: "",
  });
  //para el modal
  const [show, setShow] = useState(false);
  const [nuevaSec, setNuevaSec] = useState("");
  //para navegar
  const navigate = useNavigate();
  //cargando
  const [isLoading, setIsLoading] = useState(true);

  //para el buscador
  useEffect(() => {
    setCurrentPage(1);
    setSearchedData(
      data?.filter((item) =>
        item.sec_nombre?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [data, searchValue]);

  //para listar
  useEffect(() => {
    setIsLoading(true);
    obtenerForSecciones(forID).then((datos) => {
      setFormData({
        for_id: datos.for_id,
        for_nombre: datos.for_nombre,
        for_alias: datos.for_alias,
        for_descripcion: datos.for_descripcion,
      });
      setDataFormulario(datos?.for_nombre);
      setData(datos?.secciones);
      console.log(datos);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forID, refresh]);

  //parafomrdata
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //para validar
  const handleValidate = () => {
    if (formData.for_nombre !== "" && formData.for_alias !== "") {
      handleSave();
    } else {
      toast.error("Complete los campos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSave = () => {
    const for_nombre = formData.for_nombre.toString();
    const for_alias = formData.for_alias.toString();
    const for_descripcion = formData.for_descripcion.toString();
    const for_id = formData.for_id;

    if (formData.for_id) {
      editarFormulario({
        for_nombre: for_nombre,
        for_alias: for_alias,
        for_descripcion: for_descripcion,
        for_id: for_id,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          setRefresh(refresh + 1);
          toast.success("Datos Actualizados", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
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

  //para cambio directo de estado
  const handleCambiarEstado = (e, seccion) => {
    const isChecked = e.target.checked;
    const sec_id = seccion.sec_id.toString();
    const sec_nombre = seccion.sec_nombre.toString();
    const sec_numero = seccion.sec_numero.toString();
    const sec_estado = (isChecked ? 1 : 0).toString();

    const confirmChange = window.confirm(
      "Está a punto de cambiar el estado de la sección ¿Desea continuar?"
    );

    if (confirmChange) {
      editarSeccion({
        sec_nombre: sec_nombre,
        sec_numero: sec_numero,
        sec_estado: sec_estado,
        sec_id: sec_id,
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

  const handleCambiarPoscicion = (seccion, index, direction) => {
    const oldSection =
      direction === "d" ? currentItems[index + 1] : currentItems[index - 1];

    const newSection = seccion;
    editarSeccion({
      sec_nombre: oldSection.sec_nombre,
      sec_numero: newSection.sec_numero,
      sec_estado: oldSection.sec_estado,
      sec_id: oldSection.sec_id,
    }).then((resultado) => {
      if (resultado.mensaje === "OK") {
        editarSeccion({
          sec_nombre: newSection.sec_nombre,
          sec_numero: oldSection.sec_numero,
          sec_estado: newSection.sec_estado,
          sec_id: newSection.sec_id,
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
  //para el modal
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setNuevaSec("");
  };

  const handleChangeNuevaSec = (e) => {
    const { value } = e.target;
    setNuevaSec(value);
  };
  //para guardar una nueva seccion
  const handleSaveSeccion = () => {
    const sec_nombre = nuevaSec;
    const sec_numero = data.length + 1;
    const sec_formulario_pertenece = parseInt(formData.for_id);

    console.log(parseInt(formData.for_id));
    if (nuevaSec) {
      agregarSeccion({
        sec_numero: sec_numero,
        sec_nombre: sec_nombre,
        sec_formulario_pertenece: sec_formulario_pertenece,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          setRefresh(refresh + 1);
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

  //para eliminar
  const handleDelete = (idSeccion) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de eliminar la sección?"
    );

    if (confirmDelete) {
      eliminarSeccion({ sec_id: idSeccion }).then((respuesta) => {
        if (respuesta?.mensaje === "OK") {
          setRefresh(refresh + 1);
        } else {
          toast.error("No se pueden eliminar secciones con datos almacenados", {
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
          <b>{dataFormulario}</b>
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
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#fff" }}>
                <b>Nombre del Formulario</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="for_nombre"
                value={formData.for_nombre}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#fff" }}>
                <b>Alias del Formulario</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="for_alias"
                value={formData.for_alias}
                onChange={handleChange}
                disabled={true}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#fff" }}>
                <b>Descripción</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                name="for_descripcion"
                value={formData.for_descripcion}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <div className="d-grid gap-2">
              <Button
                variant="dark"
                onClick={handleValidate}
                style={{ width: "auto", marginTop: "30px" }}
              >
                Guardar
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <h5
        style={{
          color: "#fff",
          textAlign: "left",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <b>Secciones</b>
      </h5>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            width: "25%",
          }}
        >
          <Button
            variant="dark"
            style={{
              height: "37px",
              width: "155px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={handleShow}
          >
            <PlusIcon />
            Nueva Sección
          </Button>
        </div>
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
                  {columna.id === 1 && isLoading ? (
                    <Spinner animation="border" variant="danger" />
                  ) : (
                    columna.nombre
                  )}
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
                <tr key={item.sec_id} style={{ marginTop: "50px" }}>
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
                      width: "45%",
                      color: "#333F49",
                      paddingTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    {item.sec_nombre}
                  </td>
                  <td
                    style={{
                      width: "25%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label={
                        parseInt(item.sec_estado) === 1 ? "Activo" : "Inactivo"
                      }
                      checked={parseInt(item.sec_estado) === 1 ? true : false}
                      inline
                      onChange={(e) => handleCambiarEstado(e, item)}
                    />
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
                      title="Mover Arriba"
                      disabled={index === 0}
                      onClick={() => handleCambiarPoscicion(item, index, "u")}
                    >
                      <UpIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      title="Mover Abajo"
                      disabled={index === currentItems?.length - 1}
                      onClick={() => handleCambiarPoscicion(item, index, "d")}
                    >
                      <DownIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() =>
                        navigate(`/formularios/${forID}/${item.sec_id}`)
                      }
                      title="Editar"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleDelete(item.sec_id)}
                      title="Eliminar"
                    >
                      <DeleteIcon />
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
          <Modal.Title>Nombre de la Sección</Modal.Title>
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
                    <Form.Control
                      type="text"
                      autoFocus
                      name="sec_nombre"
                      value={nuevaSec}
                      onChange={handleChangeNuevaSec}
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
            onClick={handleSaveSeccion}
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

export default Secciones;
