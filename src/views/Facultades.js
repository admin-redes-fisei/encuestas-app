import { useEffect, useState } from "react";
import {
  Button,
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
import PlusIcon from "../assets/addIcon";
import DeleteIcon from "../assets/deleteIcon";
import EditIcon from "../assets/editIcon";
import { toast } from "react-toastify";
import {
  agregarFacultad,
  editarFacultad,
  eliminarFacultad,
  listarFacultades,
} from "../services/FacultadesService";

const Facultades = () => {
  const encabezados = [
    {
      id: 1,
      nombre: "",
      style: {
        width: "5%",
        color: "#fff",
      },
    },
    {
      id: 2,
      nombre: "Facultad",
      style: {
        width: "45%",
        color: "#fff",
      },
    },
    {
      id: 3,
      nombre: "Siglas",
      style: {
        width: "10%",
        color: "#fff",
      },
    },
    {
      id: 4,
      nombre: "Estado",
      style: {
        width: "25%",
        color: "#fff",
      },
    },
    {
      id: 5,
      nombre: "Acciones",
      style: {
        width: "15%",
        color: "#fff",
        flex: 3,
      },
    },
  ];
  //data de carreras
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    fac_id: "",
    fac_nombre: "",
    fac_siglas: "",
    fac_estado: 1,
  });
  //para filtros
  const [filteredData, setFilteredData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  //Para el buscador
  const [searchValue, setSearchValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  //para el modal
  const [show, setShow] = useState(false);
  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchedData?.length / itemsPerPage);
  //para actualizar
  const [refresh, setRefresh] = useState(0);

  //para los filtros
  const handleCheckFiltrosChange = (e, filtro, padre) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setFilteredInfo((prevFiltros) => {
        return {
          ...prevFiltros,
          [padre]: [...(prevFiltros[padre] || []), filtro],
        };
      });
    } else {
      setFilteredInfo((prevFiltros) => {
        return {
          ...prevFiltros,
          [padre]: (prevFiltros[padre] || []).filter(
            (item) => item.nombre !== filtro.nombre
          ),
        };
      });
    }
  };
  useEffect(() => {
    setCurrentPage(1);
    const filterData = () => {
      var paseEstado = false;

      const filtered = data.filter((item) => {
        // Filtrar por usu_estado
        if (filteredInfo["fac_estado"]?.length > 0) {
          const estadoFilter = filteredInfo["fac_estado"].find(
            (e) => e.id === parseInt(item.fac_estado)
          );
          paseEstado = estadoFilter ? true : false;
        }

        return paseEstado;
      });

      setFilteredData(filtered);
    };

    if (filteredInfo["fac_estado"] && filteredInfo["fac_estado"].length > 0) {
      filterData();
    } else {
      setFilteredData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredInfo]);

  //para el buscador
  useEffect(() => {
    setCurrentPage(1);
    setSearchedData(
      filteredData.filter(
        (item) =>
          item.fac_nombre?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.fac_siglas?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [filteredData, searchValue]);

  //para el modal
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setFormData({
      fac_id: "",
      fac_nombre: "",
      fac_siglas: "",
      fac_estado: 1,
    });
  };

  //para cambio directo de estado
  const handleCambiarEstado = (e, facultad) => {
    const isChecked = e.target.checked;
    const fac_id = facultad.fac_id.toString();
    const fac_nombre = facultad.fac_nombre.toString();
    const fac_siglas = facultad.fac_siglas.toString();
    const fac_estado = (isChecked ? 1 : 0).toString();

    const confirmChange = window.confirm(
      "Está a punto de cambiar el estado de la carrera ¿Desea continuar?"
    );

    if (confirmChange) {
      editarFacultad({
        fac_nombre: fac_nombre,
        fac_siglas: fac_siglas,
        fac_estado: fac_estado,
        fac_id: fac_id,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          handleClose();
          setRefresh(refresh + 1);
        } else {
          toast.error("Campos vacios o incorrectos", {
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

  //Para editar
  const handleEdit = (idFacultad) => {
    const newSelectedData = data.find((item) => item.fac_id === idFacultad);
    setFormData(newSelectedData);
    setShow(true);
  };

  //para eliminar
  const handleDelete = (idfacultad) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de eliminar la carrera?"
    );

    if (confirmDelete) {
      eliminarFacultad({ fac_id: idfacultad }).then((respuesta) => {
        if (respuesta?.mensaje === "OK") {
          setRefresh(refresh + 1);
        } else {
          toast.error("Error: Facultad con dependencias", {
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

  //para listar
  useEffect(() => {
    listarFacultades().then((datos) => {
      if (datos?.error) {
        setData([]);
      } else {
        setData(datos);
      }
    });
  }, [refresh]);

  //para data del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //para cambio de estado
  const handleEstadoModalChange = (e) => {
    const isChecked = e.target.checked;
    const { name } = e.target;

    if (isChecked) {
      setFormData({ ...formData, [name]: 1 });
    } else {
      setFormData({ ...formData, [name]: 0 });
    }
  };

  //para validar
  const handleValidate = () => {
    const noSpacesOrSpecialChars = /^[a-zA-Z]*$/;
    if (
      formData.fac_nombre !== "" &&
      formData.fac_siglas !== "" &&
      formData.fac_estado !== "" &&
      noSpacesOrSpecialChars.test(formData.fac_siglas)
    ) {
      handleSave();
    } else {
      toast.error("Campos vacios o incorrectos", {
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
    const fac_nombre = formData.fac_nombre.toString();
    const fac_siglas = formData.fac_siglas.toString().toLowerCase();
    const fac_estado = formData.fac_estado.toString();

    if (formData.fac_id) {
      const fac_id = formData.fac_id;
      editarFacultad({
        fac_nombre: fac_nombre,
        fac_siglas: fac_siglas,
        fac_estado: fac_estado,
        fac_id: fac_id,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          handleClose();
          setRefresh(refresh + 1);
        } else {
          toast.error("Campos vacios o incorrectos", {
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
      agregarFacultad({
        fac_nombre: fac_nombre,
        fac_siglas: fac_siglas,
        fac_estado: fac_estado,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          handleClose();
          setRefresh(refresh + 1);
        } else {
          toast.error("Campos vacios o incorrectos", {
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
      <h3
        style={{
          color: "#fff",
          textAlign: "left",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <b>Facultades</b>
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
          <DropdownButton
            variant="light"
            title="Filtrar"
            id="input-group-dropdown-1"
          >
            <Dropdown.Header href="#">Estado</Dropdown.Header>
            <Form.Check
              type="checkbox"
              id={`1`}
              name="filtros"
              label={`Activo`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
              onChange={(e) =>
                handleCheckFiltrosChange(
                  e,
                  { id: 1, nombre: "Activo" },
                  "fac_estado"
                )
              }
              checked={filteredInfo["fac_estado"]?.find(
                (item) => item.nombre === "Activo"
              )}
            />
            <Form.Check
              type="checkbox"
              id={`0`}
              name="filtros"
              label={`Inactivo`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
              onChange={(e) =>
                handleCheckFiltrosChange(
                  e,
                  { id: 0, nombre: "Inactivo" },
                  "fac_estado"
                )
              }
              checked={filteredInfo["fac_estado"]?.find(
                (item) => item.nombre === "Inactivo"
              )}
            />
          </DropdownButton>
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
            Nueva Facultad
          </Button>
        </div>
      </div>
      <div
        style={{
          marginTop: "40px",
          marginBottom: "10px",
          width: "83vw",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "45px",
          paddingRight: "45px",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              {encabezados.map((columna) => (
                <th key={columna.id} style={columna.style}>
                  {columna.nombre}
                </th>
              ))}
            </tr>
          </thead>
        </table>
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
          marginBottom: "35px",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
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
              {currentItems.map((item, index) => (
                <tr key={item.fac_id} style={{ marginTop: "50px" }}>
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
                    {item.fac_nombre}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      color: "#333F49",
                      paddingTop: "15px",
                      textAlign: "center",
                    }}
                  >
                    {item.fac_siglas.toUpperCase()}
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
                        parseInt(item.fac_estado) === 1 ? "Activo" : "Inactivo"
                      }
                      checked={parseInt(item.fac_estado) === 1 ? true : false}
                      inline
                      onChange={(e) => handleCambiarEstado(e, item)}
                    />
                  </td>
                  <td
                    style={{
                      width: "15%",
                      color: "333F49",
                      flex: 3,
                    }}
                  >
                    <Button
                      variant="outline-light"
                      onClick={() => handleEdit(item.fac_id)}
                      title="Editar"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleDelete(item.fac_id)}
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
            {[...Array(totalPages)].map((_, i) => (
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
          <Modal.Title>Datos de la Facultad</Modal.Title>
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
                      <b>Estado</b>
                    </Form.Label>
                    <br />
                    <Form.Check
                      type="switch"
                      name="fac_estado"
                      label={
                        parseInt(formData.fac_estado) === 1
                          ? "Activo"
                          : "Inactivo"
                      }
                      checked={
                        parseInt(formData.fac_estado) === 1 ? true : false
                      }
                      onChange={(e) => handleEstadoModalChange(e)}
                      inline
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
                      <b>Nombre</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="fac_nombre"
                      value={formData.fac_nombre}
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
                      <b>Siglas</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fac_siglas"
                      value={formData.fac_siglas.toUpperCase()}
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
    </div>
  );
};

export default Facultades;
