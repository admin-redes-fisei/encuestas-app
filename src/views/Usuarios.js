import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import PlusIcon from "../assets/addIcon";
import EditIcon from "../assets/editIcon";
import DeleteIcon from "../assets/deleteIcon";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  InputGroup,
  Row,
} from "react-bootstrap";
import DownloadIcon from "../assets/downloadIcon";
import { listarUsuarios } from "../services/UsuariosService";

const Usuarios = () => {
  //data de encabezados
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
      nombre: "Nombre Completo",
      style: {
        width: "25%",
        color: "#000",
      },
    },
    {
      id: 3,
      nombre: "Tipo de Usuario",
      style: {
        width: "15%",
        color: "#000",
      },
    },
    {
      id: 4,
      nombre: "Permisos",
      style: {
        width: "15%",
        color: "#000",
      },
    },
    {
      id: 5,
      nombre: "Estado",
      style: {
        width: "15%",
        color: "#000",
      },
    },
    {
      id: 6,
      nombre: "Acciones",
      style: {
        width: "20%",
        color: "#000",
        flex: 3,
      },
    },
  ];
  //data de usuarios
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    usu_id: "",
    usu_cedula: "",
    usu_nombres: "",
    usu_apellidos: "",
    usu_correo: "",
    usu_usuario: "",
    usu_clave: "",
    usu_permisos: "",
    usu_estado: "",
  });
  //para tipos
  const dataTipos = [
    { id: 1, nombre: "Líder de Investigación" },
    { id: 2, nombre: "Investigador" },
    { id: 3, nombre: "Autoridad" },
  ];
  //para permisos
  const dataPermisos = [
    { id: "T", nombre: "Tableros" },
    { id: "F", nombre: "Formularios" },
    { id: "R", nombre: "Reportes" },
    { id: "C", nombre: "Carreras" },
    { id: "U", nombre: "Usuarios" },
  ];
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  //para actualizar
  const [refresh, setRefresh] = useState(0);
  //Para el buscador
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  //para el modal
  const [show, setShow] = useState(false);

  //para el buscador
  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          item.usu_nombres?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.usu_apellidos?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [data, searchValue]);

  //para el modal
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setFormData({
      usu_id: "",
      usu_cedula: "",
      usu_nombres: "",
      usu_apellidos: "",
      usu_correo: "",
      usu_usuario: "",
      usu_clave: "",
      usu_permisos: "",
      usu_estado: "",
    });
  };

  //para data del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeTipoUsuario = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      idfacultad: value,
    }));
  };

  //para permisos
  const handleCheckPermisoChange = (e, permiso) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Agregar el permiso a la lista
      setPermisosSeleccionados((prevPermisos) => [...prevPermisos, permiso]);
    } else {
      // Remover la pregunta de antecedentesSeleccion si se desmarca
      setPermisosSeleccionados((prevPermisos) =>
        prevPermisos.filter((item) => item.id !== permiso.id)
      );
    }
    console.log(permisosSeleccionados);
  };

  //para validar
  const handleValidate = () => {
    if (
      formData.usu_cedula !== "" &&
      formData.usu_nombres !== "" &&
      formData.usu_apellidos !== "" &&
      formData.usu_correo !== "" &&
      formData.usu_usuario !== "" &&
      formData.usu_clave !== "" &&
      formData.usu_permisos !== "" &&
      formData.usu_estado !== ""
    ) {
      handleSave();
    } else {
      toast.error("Complete los campos requeridos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  //para listar
  useEffect(() => {
    //const token = JSON.parse(localStorage.getItem("token"));
    listarUsuarios().then((datos) => {
      console.log(datos);
      if (datos?.error) {
        setData([]);
      } else {
        setData(datos);
      }
    });
  }, [refresh]);

  //Para editar
  const handleEdit = (idusuario) => {
    const selectedData = data.find((item) => item.usu_id === idusuario);
    setFormData(selectedData);
    setShow(true);
  };

  //para eliminar
  const handleDelete = (idusuario) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de eliminar al administrador?"
    );

    if (confirmDelete) {
      /*eliminarAdministrador({ token, idusuario }).then((respuesta) => {
        if (respuesta.req === "OK") {
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
      });*/
    }
  };

  //para guardar
  const handleSave = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const usu_cedula = formData.usu_cedula;
    const usu_nombres = formData.usu_nombres;
    const usu_apellidos = formData.usu_apellidos;
    const usu_correo = formData.usu_correo;
    const usu_usuario = formData.sobrenombre;
    const usu_clave = formData.usu_clave;
    const usu_permisos = formData.usu_permisos;
    const usu_estado = formData.usu_estado;

    if (formData.usu_id) {
      const idusuario = formData.usu_id;
      /*editarAdministrador({
        token,
        idusuario,
        nombres,
        apellidos,
        correo,
        usuario,
        contrasenia,
      }).then((resultado) => {
        if (resultado.req === "OK") {
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
      });*/
    } else {
      /*agregarAdministrador({
        token,
        nombres,
        apellidos,
        correo,
        usuario,
        idfacultad,
        contrasenia,
      }).then((resultado) => {
        if (resultado.req === "OK") {
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
      });*/
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
        <b>Usuarios</b>
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
              id={`default-radio`}
              name="filtros"
              label={`Activo`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Inactivo`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Dropdown.Divider />
            <Dropdown.Header href="#">Tipo de Usuario</Dropdown.Header>
            {dataTipos.map((tipo) => (
              <Form.Check
                key={tipo.id}
                type="checkbox"
                id={tipo.id}
                name="filtros"
                label={tipo.nombre}
                style={{ marginLeft: "15px", paddingRight: "15px" }}
              />
            ))}
            <Dropdown.Divider />
            <Dropdown.Header href="#">Permisos</Dropdown.Header>
            {dataPermisos.map((permiso) => (
              <Form.Check
                key={permiso.id}
                type="checkbox"
                id={permiso.id}
                name="filtros"
                label={permiso.nombre}
                style={{ marginLeft: "15px", paddingRight: "15px" }}
              />
            ))}
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
            Nuevo Usuario
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
          marginTop: "20px",
          marginBottom: "15px",
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
          paddingLeft: "45px",
          paddingRight: "45px",
          marginBottom: "35px",
        }}
      >
        {data.length > 0 ? (
          <Table
            style={{
              width: "100%",
              borderRadius: "20px",
              marginTop: "5px",
            }}
          >
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.usu_id} style={{ marginTop: "50px" }}>
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
                      width: "25%",
                      color: "#333F49",
                      paddingTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    {item.usu_nombres} {item.usu_apellidos}
                  </td>
                  <td
                    style={{
                      width: "15%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {parseInt(item.usu_tipo) === 1
                      ? "Líder de Investigación"
                      : parseInt(item.usu_tipo) === 2
                      ? "Autoridad"
                      : "Investigador"}
                  </td>
                  <th
                    style={{
                      width: "15%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {item.usu_permisos}
                  </th>
                  <td
                    style={{
                      width: "15%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    Estado
                  </td>
                  <td
                    style={{
                      width: "20%",
                      color: "333F49",
                      flex: 3,
                    }}
                  >
                    <Button
                      variant="outline-light"
                      onClick={() => handleEdit(item.usu_id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleDelete(item.usu_id)}
                      style={{ marginLeft: " 18px" }}
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
          <Modal.Title>Datos del Usuario</Modal.Title>
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
                      <b>Cédula</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="usu_cedula"
                      value={formData.usu_cedula}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>Estado</Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>Nombres</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="usu_nombres"
                      value={formData.usu_nombres}
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
                      <b>Apellidos</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="usu_apellidos"
                      value={formData.usu_apellidos}
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
                      <b>Correo</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="usu_correo"
                      value={formData.usu_correo}
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
                      <b>Usuario</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="usu_usuario"
                      value={formData.usu_usuario}
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
                      <b>Contraseña</b>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      autoFocus
                      name="usu_clave"
                      value={formData.usu_clave}
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
                      <b>Tipo de Usuario</b>
                    </Form.Label>
                    <Form.Select
                      aria-label="Tipo de usuario"
                      name="usu_tipo"
                      value={formData.usu_tipo}
                      onChange={handleChangeTipoUsuario}
                    >
                      <option value="">Seleccionar tipo</option>
                      {dataTipos.map((tipo, index) => (
                        <option key={index} value={tipo.id}>
                          {tipo.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  Permisos:
                  {dataPermisos?.map((seccion) => (
                    <div key={seccion.id}>
                      <Form.Group className="mb-3" key={seccion.id}>
                        <Form.Check
                          inline
                          label={seccion.nombre}
                          name="permisos"
                          type="checkbox"
                          id={seccion.id}
                          onChange={(e) => handleCheckPermisoChange(e, seccion)}
                          checked={permisosSeleccionados?.find(
                            (item) => item.id === seccion.id
                          )}
                        />
                      </Form.Group>
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
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

export default Usuarios;
