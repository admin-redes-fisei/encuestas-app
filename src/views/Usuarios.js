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
import FilterIcon from "../assets/filterIcon";
import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import DownloadIcon from "../assets/downloadIcon";
import { listarUsuarios } from "../services/UsuariosService";

const Usuarios = () => {
  const [data, setData] = useState([]);
  const [dataFacultades, setDataFacultades] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [formData, setFormData] = useState({
    idusuario: "",
    nombres: "",
    apellidos: "",
    correo: "",
    sobrenombre: "",
    idfacultad: "",
  });

  //Para el buscador
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          item.usu_nombres?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.usu_apellidos?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [data, searchValue]);

  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [show, setShow] = useState(false);

  const handleEdit = (idusuario) => {
    const selectedData = data.find((item) => item.idusuario === idusuario);
    setFormData(selectedData);
    setShow(true);
  };

  //para eliminar
  const handleDelete = (idusuario) => {
    const token = JSON.parse(localStorage.getItem("token"));

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

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setFormData({
      idusuario: "",
      nombres: "",
      apellidos: "",
      correo: "",
      sobrenombre: "",
      idfacultad: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeFacultad = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      idfacultad: value,
    }));
  };

  //para validar
  const handleValidate = () => {
    if (
      formData.nombres !== "" &&
      formData.apellidos !== "" &&
      formData.correo !== "" &&
      formData.sobrenombre !== "" &&
      formData.contrasenia !== "" &&
      formData.idfacultad !== ""
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

  const handleSave = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const nombres = formData.nombres;
    const apellidos = formData.apellidos;
    const correo = formData.correo;
    const usuario = formData.sobrenombre;
    const idfacultad = formData.idfacultad;
    const contrasenia = formData.contrasenia;

    if (formData.idusuario) {
      const idusuario = formData.idusuario;
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

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    /*listarFacultades({ token }).then((datos) => {
      setDataFacultades(datos);
    });*/
  }, []);

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
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Autoridad`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Investigador`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Lider de Investigación`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Dropdown.Divider />
            <Dropdown.Header href="#">Permisos</Dropdown.Header>
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Tableros`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Formularios`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Reportes`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Carreras`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
            />
            <Form.Check
              type="checkbox"
              id={`default-radio`}
              name="filtros"
              label={`Usuarios`}
              style={{ marginLeft: "15px", paddingRight: "15px" }}
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
              <th
                style={{
                  width: "5%",
                  color: "#000",
                }}
              ></th>
              <th
                style={{
                  width: "25%",
                  color: "#000",
                }}
              >
                Nombre completo
              </th>
              <th
                style={{
                  width: "15%",
                  color: "#000",
                }}
              >
                Tipo de Usuario
              </th>
              <th
                style={{
                  width: "15%",
                  color: "#000",
                }}
              >
                Permisos
              </th>
              <th
                style={{
                  width: "15%",
                  color: "#000",
                }}
              >
                Estado
              </th>
              <th
                style={{
                  width: "20%",
                  color: "#000",
                  flex: 3,
                }}
              >
                Acciones
              </th>
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
                  <th
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
                  </th>
                  <th
                    style={{
                      width: "15%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    {item.usu_permisos}
                  </th>
                  <th
                    style={{
                      width: "15%",
                      color: "#333F49",
                      paddingTop: "15px",
                    }}
                  >
                    Estado
                  </th>
                  <td
                    style={{
                      width: "20%",
                      color: "333F49",
                      flex: 3,
                    }}
                  >
                    <Button
                      variant="outline-light"
                      onClick={() => handleEdit(item.idusuario)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => handleDelete(item.idusuario)}
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
          <Modal.Title>Datos del Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Nombres</b>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Apellidos</b>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Correo</b>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="correo"
                value={formData.correo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Usuario</b>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="sobrenombre"
                value={formData.sobrenombre}
                onChange={handleChange}
              />
            </Form.Group>
            {!formData.idusuario && (
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
                  name="contrasenia"
                  value={formData.contrasenia}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {!formData.idusuario && (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlSelect1"
              >
                <Form.Label>
                  <b>Facultad</b>
                </Form.Label>
                <Form.Select
                  aria-label="Facultad"
                  name="facultad"
                  value={formData.idfacultad}
                  onChange={handleChangeFacultad}
                >
                  <option value="">Seleccionar facultad</option>
                  {dataFacultades.map((facultad, index) => (
                    <option key={index} value={facultad.idfacultad}>
                      {facultad.siglas}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
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
