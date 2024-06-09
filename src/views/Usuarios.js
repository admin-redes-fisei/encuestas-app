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
  Spinner,
} from "react-bootstrap";
import {
  agregarUsuario,
  cambiarClave,
  editarUsuario,
  eliminarUsuario,
  listarUsuarios,
} from "../services/UsuariosService";
import OpenEyeIcon from "../assets/openEyeIcon";
import CloseEyeIcon from "../assets/closeEyeIcon";
import CryptoJS from "crypto-js";
import UserPasswordIcon from "../assets/userPasswordIcon";
import { listarFacultades } from "../services/FacultadesService";

const Usuarios = () => {
  //data de encabezados
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
      nombre: "Cédula",
      style: {
        width: "10%",
        color: "#fff",
      },
    },
    {
      id: 3,
      nombre: "Nombre Completo",
      style: {
        width: "30%",
        color: "#fff",
      },
    },
    {
      id: 4,
      nombre: "Tipo de Usuario",
      style: {
        width: "15%",
        color: "#fff",
      },
    },
    {
      id: 5,
      nombre: "Permisos",
      style: {
        width: "10%",
        color: "#fff",
      },
    },
    {
      id: 6,
      nombre: "Estado",
      style: {
        width: "10%",
        color: "#fff",
      },
    },
    {
      id: 7,
      nombre: "Acciones",
      style: {
        width: "20%",
        color: "#fff",
        flex: 3,
      },
    },
  ];
  //data de usuarios
  const [data, setData] = useState([]);
  //para tipo de usuarioa actual
  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  //para listar facultades
  const [facultades, setFacultades] = useState([]);
  //para datos
  const [formData, setFormData] = useState({
    usu_id: "",
    usu_cedula: "",
    usu_nombres: "",
    usu_apellidos: "",
    usu_correo: "",
    usu_usuario: "",
    usu_clave: "",
    usu_clave2: "",
    usu_tipo: "",
    usu_permisos: "",
    usu_estado: 1,
    usu_facultad_pertenece: parseInt(usuario_actual.usu_facultad_pertenece),
  });
  //para tipos
  const dataTipos = [
    { id: 1, nombre: "Superadministrador", permisos: "S" },
    { id: 2, nombre: "Líder de Investigación", permisos: "TRFCU" },
    { id: 3, nombre: "Investigador", permisos: "FRC" },
    { id: 4, nombre: "Autoridad", permisos: "TR" },
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
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchedData?.length / itemsPerPage);
  //para el modal
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  //para modo de vista
  const [isView, setIsView] = useState(false);
  //para contraseña visible
  const [viewPassword, setViewPassword] = useState(false);
  const [viewValidationPass, setViewVlidationPass] = useState(false);
  //para encriptado de datos
  const clave = "HatunSoft@2023";
  //para carga
  const [isLoading, setIsLoading] = useState(true);

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
          const permisosFilter = filteredInfo["usu_permisos"]?.find((p) =>
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
      (filteredInfo["usu_estado"] && filteredInfo["usu_estado"]?.length > 0) ||
      (filteredInfo["usu_tipo"] && filteredInfo["usu_tipo"]?.length > 0) ||
      (filteredInfo["usu_permisos"] && filteredInfo["usu_permisos"]?.length > 0)
    ) {
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
          item.usu_nombres?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.usu_apellidos
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.usu_cedula?.toLowerCase().includes(searchValue.toLowerCase())
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
      usu_clave2: "",
      usu_tipo: "",
      usu_permisos: "",
      usu_estado: 1,
      usu_facultad_pertenece: parseInt(usuario_actual.usu_facultad_pertenece),
    });
    setPermisosSeleccionados([]);
    setIsView(false);
  };

  //para el modal2
  const handleClose2 = () => {
    setShow2(false);
    setFormData({
      usu_id: "",
      usu_cedula: "",
      usu_nombres: "",
      usu_apellidos: "",
      usu_correo: "",
      usu_usuario: "",
      usu_clave: "",
      usu_clave2: "",
      usu_tipo: "",
      usu_permisos: "",
      usu_estado: 1,
      usu_facultad_pertenece: parseInt(usuario_actual.usu_facultad_pertenece),
    });
    setViewPassword(false);
    setViewVlidationPass(false);
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
  const validarCedulaEcuador = (cedula) => {
    if (cedula.length !== 10) return false;

    const digitoRegion = parseInt(cedula.substring(0, 2));
    if (digitoRegion < 1 || digitoRegion > 24) return false;

    const digitos = cedula.split("").map(Number);
    const digitoVerificador = digitos.pop();

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
      let valor = digitos[i] * coeficientes[i];
      if (valor >= 10) valor -= 9;
      suma += valor;
    }

    const digitoCalculado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
    return digitoCalculado === digitoVerificador;
  };

  const handleValidate = () => {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formData.usu_cedula !== "" &&
      validarCedulaEcuador(formData.usu_cedula) &&
      formData.usu_nombres !== "" &&
      formData.usu_apellidos !== "" &&
      formData.usu_correo !== "" &&
      correoRegex.test(formData.usu_correo) &&
      !data?.some(
        (usuario) =>
          usuario.usu_correo === formData.usu_correo &&
          usuario.usu_id !== formData.usu_id
      ) &&
      formData.usu_usuario !== "" &&
      !data?.some(
        (usuario) =>
          usuario.usu_usuario === formData.usu_usuario &&
          usuario.usu_id !== formData.usu_id
      ) &&
      formData.usu_clave === formData.usu_clave2 &&
      formData.usu_tipo !== "" &&
      (formData.usu_tipo !== "S"
        ? formData.usu_facultad_pertenece !== null
        : true)
    ) {
      if (formData.usu_clave !== "" && formData.usu_id !== "") {
        handleSavePassword();
      } else {
        handleSave();
      }
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
    setIsLoading(true);
    listarUsuarios().then((datos) => {
      if (datos?.error) {
        setData([]);
      } else {
        const datosDesencriptados = datos?.map((dato) => {
          return {
            ...dato,
            usu_cedula: desencriptar(dato.usu_cedula),
            usu_nombres: desencriptar(dato.usu_nombres),
            usu_apellidos: desencriptar(dato.usu_apellidos),
            usu_correo: dato.usu_correo,
            usu_usuario: dato.usu_usuario,
            usu_clave: "",
            usu_clave2: "",
          };
        });
        if (usuario_actual.usu_permisos === "S") {
          setData(datosDesencriptados);
        } else {
          setData(
            datosDesencriptados.filter(
              (item) =>
                item.usu_facultad_pertenece ===
                usuario_actual.usu_facultad_pertenece
            )
          );
        }
      }
      setIsLoading(false);
    });
  }, [
    refresh,
    usuario_actual.usu_facultad_pertenece,
    usuario_actual.usu_permisos,
  ]);

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

  //Para editar contraseña
  const handleEditPassword = (idusuario) => {
    const newSelectedData = data.find((item) => item.usu_id === idusuario);
    setFormData(newSelectedData);
    setShow2(true);
  };

  //para eliminar
  const handleDelete = (idusuario) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de eliminar al usuario?"
    );

    if (confirmDelete) {
      eliminarUsuario({ usu_id: idusuario }).then((respuesta) => {
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

  //para guardar
  const handleSave = () => {
    const usu_cedula = encriptar(formData.usu_cedula.toString());
    const usu_nombres = encriptar(formData.usu_nombres.toString());
    const usu_apellidos = encriptar(formData.usu_apellidos.toString());
    const usu_correo = formData.usu_correo.toString();
    const usu_usuario = formData.usu_usuario.toString();
    const usu_clave = formData.usu_clave.toString();

    const usu_tipo = formData.usu_tipo.toString();
    const usu_permisos =
      parseInt(formData.usu_tipo) === 1
        ? "S"
        : permisosSeleccionados.map((permiso) => permiso.id).join("");
    const usu_estado = formData.usu_estado.toString();
    const usu_facultad_pertenece = formData.usu_facultad_pertenece;

    if (formData.usu_id) {
      const usu_id = formData.usu_id;
      editarUsuario({
        usu_cedula: usu_cedula,
        usu_nombres: usu_nombres,
        usu_apellidos: usu_apellidos,
        usu_correo: usu_correo,
        usu_usuario: usu_usuario,
        usu_tipo: usu_tipo,
        usu_permisos: usu_permisos,
        usu_estado: usu_estado,
        usu_id: usu_id,
        usu_facultad_pertenece: usu_facultad_pertenece,
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
        usu_facultad_pertenece: usu_facultad_pertenece,
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
    const usu_cedula = encriptar(usuario.usu_cedula.toString());
    const usu_nombres = encriptar(usuario.usu_nombres.toString());
    const usu_apellidos = encriptar(usuario.usu_apellidos.toString());
    const usu_correo = usuario.usu_correo.toString();
    const usu_usuario = usuario.usu_usuario.toString();
    const usu_tipo = usuario.usu_tipo.toString();
    const usu_permisos =
      parseInt(usuario.usu_tipo) === 1 ? "S" : usuario.usu_permisos;
    const usu_estado = (isChecked ? 1 : 0).toString();
    const usu_facultad_pertenece = formData.usu_facultad_pertenece;

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
        usu_tipo: usu_tipo,
        usu_permisos: usu_permisos,
        usu_estado: usu_estado,
        usu_id: usu_id,
        usu_facultad_pertenece: usu_facultad_pertenece,
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

  //para cambiar contraseña
  const handleSavePassword = () => {
    const usu_clave = formData.usu_clave.toString();
    const usu_id = formData.usu_id;

    cambiarClave({
      usu_clave: usu_clave,
      usu_id: usu_id,
    }).then((resultado) => {
      if (resultado.mensaje === "OK") {
        handleClose2();
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

  //para listar facultades
  useEffect(() => {
    //const token = JSON.parse(localStorage.getItem("token"));
    listarFacultades().then((datos) => {
      if (datos?.error) {
        setFacultades([]);
      } else {
        setFacultades(datos.filter((item) => parseInt(item.fac_estado) !== 0));
      }
    });
  }, [refresh]);

  const handleChangeFacultad = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      usu_facultad_pertenece: value,
    }));
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
        <b>Usuarios</b>
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
            justifyContent: "end",
            width: "25%",
          }}
        >
          <Button
            variant="dark"
            style={{
              height: "40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={handleShow}
          >
            <PlusIcon />
            Nuevo Usuario
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
        {isLoading ? (
          <Spinner animation="border" variant="danger" />
        ) : searchedData?.length > 0 ? (
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
                <tr key={item.usu_id} style={{ marginTop: "50px" }}>
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
                      width: "10%",
                      color: "#333F49",
                      paddingTop: "15px",
                      textAlign: "left",
                    }}
                  >
                    {"*".repeat(6)}
                    {item.usu_cedula.slice(-4)}
                  </td>
                  <td
                    style={{
                      width: "30%",
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
                      width: "10%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {item.usu_permisos}
                  </th>
                  <td
                    style={{
                      width: "10%",
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
                      title="Ver datos"
                    >
                      <OpenEyeIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleEdit(item.usu_id)}
                      title="Editar datos"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleEditPassword(item.usu_id)}
                      title="Editar contraseña"
                    >
                      <UserPasswordIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleDelete(item.usu_id)}
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
                      name="usu_correo"
                      value={formData.usu_correo}
                      onChange={handleChange}
                      disabled={isView}
                    />
                  </Form.Group>
                  {data?.some(
                    (usuario) =>
                      usuario.usu_correo === formData.usu_correo &&
                      usuario.usu_id !== formData.usu_id
                  ) && (
                    <Row>
                      <spam
                        style={{
                          color: "red",
                          fontSize: "small",
                          marginTop: "-5px",
                          marginBottom: "15px",
                        }}
                      >
                        Ya existe un usuario con este correo
                      </spam>
                    </Row>
                  )}
                </Col>
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
                      name="usu_usuario"
                      value={formData.usu_usuario}
                      onChange={handleChange}
                      disabled={isView}
                    />
                  </Form.Group>
                  {data?.some(
                    (usuario) =>
                      usuario.usu_usuario === formData.usu_usuario &&
                      usuario.usu_id !== formData.usu_id
                  ) && (
                    <Row>
                      <spam
                        style={{
                          color: "red",
                          fontSize: "small",
                          marginTop: "-5px",
                          marginBottom: "15px",
                        }}
                      >
                        El usuario ya existe
                      </spam>
                    </Row>
                  )}
                </Col>
              </Row>
              {formData.usu_id === "" && (
                <>
                  <Row>
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
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          <b>Confirmación de Contraseña</b>
                        </Form.Label>
                        <InputGroup className="mb-3">
                          <Form.Control
                            type={viewValidationPass ? "text" : "password"}
                            name="usu_clave2"
                            value={formData.usu_clave2}
                            onChange={handleChange}
                          />
                          <Button
                            variant="outline-secondary"
                            id="ver_confirmacion"
                            onClick={() =>
                              setViewVlidationPass(!viewValidationPass)
                            }
                          >
                            {viewValidationPass ? (
                              <OpenEyeIcon />
                            ) : (
                              <CloseEyeIcon />
                            )}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  {formData.usu_clave !== formData.usu_clave2 && (
                    <Row>
                      <p style={{ color: "red" }}>
                        Las contraseñas no coinsiden
                      </p>
                    </Row>
                  )}
                </>
              )}
              {}

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
                      {(usuario_actual.usu_permisos === "S"
                        ? dataTipos
                        : dataTipos.filter((item) => item.id !== 1)
                      ).map((tipo, index) => (
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
                            disabled={
                              isView || parseInt(formData.usu_tipo) === 1
                            }
                          />
                        </Form.Group>
                      </div>
                    )
                  )}
                </Col>
              </Row>
              {usuario_actual.usu_permisos === "S" &&
                parseInt(formData.usu_tipo) !== 1 && (
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlSelect1"
                      >
                        <Form.Label>
                          <b>Facultad</b>
                        </Form.Label>
                        <Form.Select
                          aria-label="Tipo de usuario"
                          name="usu_facultad_pertenece"
                          value={formData.usu_facultad_pertenece}
                          onChange={handleChangeFacultad}
                          disabled={isView}
                        >
                          <option value="">Seleccionar facultad</option>
                          {facultades.map((tipo, index) => (
                            <option key={index} value={tipo.fac_id}>
                              {tipo.fac_nombre}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                )}
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
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Cambio de Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginLeft: "20px", marginRight: "20px" }}>
          <Form>
            <Container>
              <Row>
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
                    />
                    <Button
                      variant="outline-secondary"
                      id="ver_clave"
                      onClick={() => setViewPassword(!viewPassword)}
                    >
                      {viewPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <b>Confirmación de Contraseña</b>
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type={viewValidationPass ? "text" : "password"}
                      name="usu_clave2"
                      value={formData.usu_clave2}
                      onChange={handleChange}
                    />
                    <Button
                      variant="outline-secondary"
                      id="ver_confirmacion"
                      onClick={() => setViewVlidationPass(!viewValidationPass)}
                    >
                      {viewValidationPass ? <OpenEyeIcon /> : <CloseEyeIcon />}
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Row>
              {formData.usu_clave !== formData.usu_clave2 && (
                <Row>
                  <p style={{ color: "red" }}>Las contraseñas no coinsiden</p>
                </Row>
              )}
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
            style={{ width: "25%" }}
            onClick={handleValidate}
          >
            Guardar
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose2}
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
