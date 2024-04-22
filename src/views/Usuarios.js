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
import {
  agregarUsuario,
  editarUsuario,
  eliminarUsuario,
  listarUsuarios,
} from "../services/UsuariosService";
import OpenEyeIcon from "../assets/openEyeIcon";
import CloseEyeIcon from "../assets/closeEyeIcon";
import CryptoJS from "crypto-js";

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
    usu_tipo: "",
    usu_permisos: "",
    usu_estado: "",
  });
  //para tipos
  const dataTipos = [
    { id: 1, nombre: "Líder de Investigación", permisos: "TRFCU" },
    { id: 2, nombre: "Investigador", permisos: "FRC" },
    { id: 3, nombre: "Autoridad", permisos: "TR" },
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
  const [searchedData, setSearchedData] = useState([]);
  //para filtros
  const [filteredData, setFilteredData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  //para el modal
  const [show, setShow] = useState(false);
  //para modo de vista
  const [isView, setIsView] = useState(false);
  //para contraseña visible
  const [viewPassword, setViewPassword] = useState(false);
  //para encriptado de datos
  const clave = "HatunSoft@2023";

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
      var paseEstado = null;
      var paseTipo = null;
      var pasePermisos = null;

      const filtered = data.filter((item) => {
        // Filtrar por usu_estado
        if (filteredInfo["usu_estado"]?.length > 0) {
          const estadoFilter = filteredInfo["usu_estado"].find(
            (e) => e.id === parseInt(item.usu_estado)
          );
          paseEstado = estadoFilter ? true : false;
        } else {
          paseEstado = true;
        }

        // Filtrar por usu_tipo
        if (filteredInfo["usu_tipo"]?.length > 0) {
          const tipoFilter = filteredInfo["usu_tipo"]?.find(
            (t) => t.id === parseInt(item.usu_tipo)
          );
          paseTipo = tipoFilter ? true : false;
        } else {
          paseTipo = true;
        }

        // Filtrar por usu_permisos
        if (filteredInfo["usu_permisos"]?.length > 0) {
          const permisosFilter = filteredInfo["usu_permisos"]?.some((p) =>
            item.usu_permisos.includes(p.id)
          );
          pasePermisos = permisosFilter ? true : false;
        } else {
          pasePermisos = true;
        }
        return paseEstado && pasePermisos && paseTipo; // Todos los filtros coinciden
      });

      setFilteredData(filtered);
    };

    if (
      (filteredInfo["usu_estado"] && filteredInfo["usu_estado"].length > 0) ||
      (filteredInfo["usu_tipo"] && filteredInfo["usu_tipo"].length > 0) ||
      (filteredInfo["usu_permisos"] && filteredInfo["usu_permisos"].length > 0)
    ) {
      filterData();
    } else {
      setFilteredData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredInfo]);

  //para el buscador
  useEffect(() => {
    setSearchedData(
      filteredData.filter(
        (item) =>
          item.usu_nombres?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.usu_apellidos?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [filteredData, searchValue]);

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
      usu_tipo: "",
      usu_permisos: "",
      usu_estado: "",
    });
    setPermisosSeleccionados([]);
    setIsView(false);
    setViewPassword(false);
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
      usu_tipo: value,
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
    if (
      formData.usu_cedula !== "" &&
      formData.usu_nombres !== "" &&
      formData.usu_apellidos !== "" &&
      formData.usu_correo !== "" &&
      formData.usu_usuario !== "" &&
      formData.usu_clave !== "" &&
      formData.usu_tipo !== "" &&
      formData.usu_estado !== ""
    ) {
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

  // Función para encriptar
  function encriptar(texto) {
    const cifrado = CryptoJS.AES.encrypt(texto, clave);
    return cifrado.toString();
  }

  // Función para desencriptar
  function desencriptar(cifrado) {
    const bytes = CryptoJS.AES.decrypt(cifrado, clave);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  //para listar
  useEffect(() => {
    //const token = JSON.parse(localStorage.getItem("token"));
    listarUsuarios().then((datos) => {
      if (datos?.error) {
        setData([]);
      } else {
        const datosDesencriptados = datos.map((dato) => {
          return {
            ...dato,
            usu_cedula: desencriptar(dato.usu_cedula),
            usu_nombres: desencriptar(dato.usu_nombres),
            usu_apellidos: desencriptar(dato.usu_apellidos),
            usu_correo: desencriptar(dato.usu_correo),
            usu_usuario: desencriptar(dato.usu_usuario),
            usu_clave: desencriptar(dato.usu_clave),
          };
        });
        setData(datosDesencriptados);
      }
    });
  }, [refresh]);

  //Para editar
  const handleEdit = (idusuario) => {
    const newSelectedData = data.find((item) => item.usu_id === idusuario);
    const actualPermisos = Array.from(newSelectedData.usu_permisos);

    const actualPermisosSeleccionados = [];

    actualPermisos.forEach((permiso) => {
      const permisoEncontrado = dataPermisos.find((p) => p.id === permiso);
      if (permisoEncontrado) {
        actualPermisosSeleccionados.push(permisoEncontrado);
      }
    });

    setPermisosSeleccionados((prevPermisos) => [
      ...prevPermisos,
      ...actualPermisosSeleccionados,
    ]);

    setFormData(newSelectedData);
    setShow(true);
  };

  //para eliminar
  const handleDelete = (idusuario) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de eliminar al usuario?"
    );

    if (confirmDelete) {
      eliminarUsuario({ usu_id: idusuario }).then((respuesta) => {
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

  //para guardar
  const handleSave = () => {
    const usu_cedula = encriptar(formData.usu_cedula.toString());
    const usu_nombres = encriptar(formData.usu_nombres.toString());
    const usu_apellidos = encriptar(formData.usu_apellidos.toString());
    const usu_correo = encriptar(formData.usu_correo.toString());
    const usu_usuario = encriptar(formData.usu_usuario.toString());
    const usu_clave = encriptar(formData.usu_clave.toString());
    const usu_tipo = formData.usu_tipo.toString();
    const usu_permisos = permisosSeleccionados
      .map((permiso) => permiso.id)
      .join("");
    const usu_estado = formData.usu_estado.toString();

    if (formData.usu_id) {
      const usu_id = formData.usu_id;
      editarUsuario({
        usu_cedula: usu_cedula,
        usu_nombres: usu_nombres,
        usu_apellidos: usu_apellidos,
        usu_correo: usu_correo,
        usu_usuario: usu_usuario,
        usu_clave: usu_clave,
        usu_tipo: usu_tipo,
        usu_permisos: usu_permisos,
        usu_estado: usu_estado,
        usu_id: usu_id,
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
      agregarUsuario({
        usu_cedula: usu_cedula,
        usu_nombres: usu_nombres,
        usu_apellidos: usu_apellidos,
        usu_correo: usu_correo,
        usu_usuario: usu_usuario,
        usu_clave: usu_clave,
        usu_tipo: usu_tipo,
        usu_permisos: usu_permisos,
        usu_estado: usu_estado,
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

  //para cambio directo de estado

  const handleCambiarEstado = (e, usuario) => {
    const isChecked = e.target.checked;
    const usu_id = usuario.usu_id.toString();
    const usu_cedula = usuario.usu_cedula.toString();
    const usu_nombres = usuario.usu_nombres.toString();
    const usu_apellidos = usuario.usu_apellidos.toString();
    const usu_correo = usuario.usu_correo.toString();
    const usu_usuario = usuario.usu_usuario.toString();
    const usu_clave = usuario.usu_clave.toString();
    const usu_tipo = usuario.usu_tipo.toString();
    const usu_permisos = usuario.usu_permisos;
    const usu_estado = (isChecked ? 1 : 0).toString();

    const confirmChange = window.confirm(
      "Está a punto de cambiar el estado del usuario ¿Desea continuar?"
    );

    if (confirmChange) {
      editarUsuario({
        usu_cedula: usu_cedula,
        usu_nombres: usu_nombres,
        usu_apellidos: usu_apellidos,
        usu_correo: usu_correo,
        usu_usuario: usu_usuario,
        usu_clave: usu_clave,
        usu_tipo: usu_tipo,
        usu_permisos: usu_permisos,
        usu_estado: usu_estado,
        usu_id: usu_id,
      }).then((resultado) => {
        if (resultado.mensaje === "OK") {
          handleClose();
          setRefresh(refresh + 1);
        } else {
          toast.error("No se pudo reaizar el cambio", {
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
              id={`1`}
              name="filtros"
              label={`Activo`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
              onChange={(e) =>
                handleCheckFiltrosChange(
                  e,
                  { id: 1, nombre: "Activo" },
                  "usu_estado"
                )
              }
              checked={filteredInfo["usu_estado"]?.find(
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
                  "usu_estado"
                )
              }
              checked={filteredInfo["usu_estado"]?.find(
                (item) => item.nombre === "Inactivo"
              )}
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
                onChange={(e) => handleCheckFiltrosChange(e, tipo, "usu_tipo")}
                checked={filteredInfo["usu_tipo"]?.find(
                  (item) => item.nombre === tipo.nombre
                )}
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
                onChange={(e) =>
                  handleCheckFiltrosChange(e, permiso, "usu_permisos")
                }
                checked={filteredInfo["usu_permisos"]?.find(
                  (item) => item.nombre === permiso.nombre
                )}
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
        {searchedData?.length > 0 ? (
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
                    {
                      dataTipos.find(
                        (tipo) => tipo.id === parseInt(item.usu_tipo)
                      ).nombre
                    }
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
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label={
                        parseInt(item.usu_estado) === 1 ? "Activo" : "Inactivo"
                      }
                      checked={parseInt(item.usu_estado) === 1 ? true : false}
                      inline
                      onChange={(e) => handleCambiarEstado(e, item)}
                    />
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
                      onClick={() => {
                        setIsView(true);
                        handleEdit(item.usu_id);
                      }}
                    >
                      <OpenEyeIcon />
                    </Button>
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
                      disabled={isView}
                    />
                  </Form.Group>
                </Col>
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
                      name="usu_estado"
                      label={
                        parseInt(formData.usu_estado) === 1
                          ? "Activo"
                          : "Inactivo"
                      }
                      checked={
                        parseInt(formData.usu_estado) === 1 ? true : false
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
                      <b>Nombres</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      name="usu_nombres"
                      value={formData.usu_nombres}
                      onChange={handleChange}
                      disabled={isView}
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
                      disabled={isView}
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
                      disabled={isView}
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
                      disabled={isView}
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
                    <InputGroup className="mb-3">
                      <Form.Control
                        type={viewPassword ? "text" : "password"}
                        autoFocus
                        name="usu_clave"
                        value={formData.usu_clave}
                        onChange={handleChange}
                        disabled={isView}
                      />
                      <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        onClick={() => setViewPassword(!viewPassword)}
                      >
                        {viewPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                      </Button>
                    </InputGroup>
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
                      disabled={isView}
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
                  {(isView ? permisosSeleccionados : dataPermisos)?.map(
                    (seccion) => (
                      <div key={seccion.id}>
                        <Form.Group className="mb-3" key={seccion.id}>
                          <Form.Check
                            inline
                            label={seccion.nombre}
                            name="permisos"
                            type="checkbox"
                            id={seccion.id}
                            onChange={(e) =>
                              handleCheckPermisoChange(e, seccion)
                            }
                            checked={permisosSeleccionados?.find(
                              (item) => item.id === seccion.id
                            )}
                            disabled={isView}
                          />
                        </Form.Group>
                      </div>
                    )
                  )}
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

export default Usuarios;
