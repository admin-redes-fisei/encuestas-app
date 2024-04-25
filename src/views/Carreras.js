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
import DownloadIcon from "../assets/downloadIcon";
import DeleteIcon from "../assets/deleteIcon";
import EditIcon from "../assets/editIcon";
import OpenEyeIcon from "../assets/openEyeIcon";
import { toast } from "react-toastify";
import {
  agregarCarreras,
  editarCarreras,
  eliminarCarreras,
  listarCarreras,
} from "../services/CarrerasService";

const Carreras = () => {
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
      nombre: "Carrera",
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
  //data de carreras
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    car_id: "",
    car_nombre: "",
    car_estado: "",
  });
  //para filtros
  const [filteredData, setFilteredData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  //Para el buscador
  const [searchValue, setSearchValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  //para el modal
  const [show, setShow] = useState(false);
  //para modo de vista
  const [isView, setIsView] = useState(false);
  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
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
    const filterData = () => {
      var paseEstado = false;

      const filtered = data.filter((item) => {
        // Filtrar por usu_estado
        if (filteredInfo["car_estado"]?.length > 0) {
          const estadoFilter = filteredInfo["car_estado"].find(
            (e) => e.id === parseInt(item.car_estado)
          );
          paseEstado = estadoFilter ? true : false;
        }

        return paseEstado;
      });

      setFilteredData(filtered);
    };

    if (filteredInfo["car_estado"] && filteredInfo["car_estado"].length > 0) {
      filterData();
    } else {
      setFilteredData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredInfo]);

  //para el buscador
  useEffect(() => {
    setSearchedData(
      filteredData.filter((item) =>
        item.car_nombre?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [filteredData, searchValue]);

  //para el modal
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setFormData({
      car_id: "",
      car_nombre: "",
      car_estado: "",
    });
    setIsView(false);
  };

  //para cambio directo de estado
  const handleCambiarEstado = (e, carrera) => {
    const isChecked = e.target.checked;
    const car_id = carrera.car_id.toString();
    const car_nombre = carrera.car_nombre.toString();
    const car_estado = (isChecked ? 1 : 0).toString();

    const confirmChange = window.confirm(
      "Está a punto de cambiar el estado de la carrera ¿Desea continuar?"
    );

    if (confirmChange) {
      editarCarreras({
        car_nombre: car_nombre,
        car_estado: car_estado,
        car_id: car_id,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          handleClose();
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
    }
  };

  //Para editar
  const handleEdit = (idcarrera) => {
    const newSelectedData = data.find((item) => item.car_id === idcarrera);
    setFormData(newSelectedData);
    setShow(true);
  };

  //para eliminar
  const handleDelete = (idcarrera) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de eliminar la carrera?"
    );

    if (confirmDelete) {
      eliminarCarreras({ car_id: idcarrera }).then((respuesta) => {
        if (respuesta.mensaje === "OK") {
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

  //para listar
  useEffect(() => {
    //const token = JSON.parse(localStorage.getItem("token"));
    listarCarreras().then((datos) => {
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
    if (formData.car_nombre !== "" && formData.car_estado !== "") {
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

  //para guardar
  const handleSave = () => {
    const car_nombre = formData.car_nombre.toString();
    const car_estado = formData.car_estado.toString();

    if (formData.car_id) {
      const car_id = formData.car_id;
      editarCarreras({
        car_nombre: car_nombre,
        car_estado: car_estado,
        car_id: car_id,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          handleClose();
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
    } else {
      agregarCarreras({
        car_nombre: car_nombre,
        car_estado: car_estado,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          handleClose();
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
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          color: "#000",
          textAlign: "left",
          width: "80vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <b>Carreras</b>
      </h3>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <InputGroup className="mb-2" style={{ width: "50%" }}>
          <DropdownButton
            variant="outline-secondary"
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
                  "car_estado"
                )
              }
              checked={filteredInfo["car_estado"]?.find(
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
                  "car_estado"
                )
              }
              checked={filteredInfo["usu_estado"]?.find(
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
            justifyContent: "space-between",
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
            Nueva Carrera
          </Button>
          <Button
            variant="outline-dark"
            style={{
              height: "37px",
              width: "110px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DownloadIcon color="#333F49" />
            Exportar
          </Button>
        </div>
      </div>
      <div
        style={{
          marginTop: "25px",
          marginBottom: "10px",
          width: "95vw",
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
          width: "95vw",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          paddingTop: "0px",
          paddingLeft: "45px",
          paddingRight: "45px",
          marginBottom: "35px",
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
                <tr key={item.car_id} style={{ marginTop: "50px" }}>
                  <td
                    style={{
                      width: "5%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {index + 1 + 6 * (currentPage - 1)}
                  </td>
                  <td
                    style={{
                      width: "45%",
                      color: "#333F49",
                      paddingTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    {item.car_nombre}
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
                        parseInt(item.car_estado) === 1 ? "Activo" : "Inactivo"
                      }
                      checked={parseInt(item.car_estado) === 1 ? true : false}
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
                      onClick={() => {
                        setIsView(true);
                        handleEdit(item.car_id);
                      }}
                    >
                      <OpenEyeIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleEdit(item.car_id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleDelete(item.car_id)}
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
                      <b>Estado</b>
                    </Form.Label>
                    <br />
                    <Form.Check
                      type="switch"
                      name="car_estado"
                      label={
                        parseInt(formData.car_estado) === 1
                          ? "Activo"
                          : "Inactivo"
                      }
                      checked={
                        parseInt(formData.car_estado) === 1 ? true : false
                      }
                      onChange={(e) => handleEstadoModalChange(e)}
                      disabled={isView}
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
                      name="car_nombre"
                      value={formData.car_nombre}
                      onChange={handleChange}
                      disabled={isView}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: isView ? "none" : "flex",
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

export default Carreras;
