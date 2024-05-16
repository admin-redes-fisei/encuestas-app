import { useEffect, useState } from "react";
import AutoDasboard from "../components/AutoDasboard";
import AdminSideBar from "../components/SidebarBashboard";
import {
  obtenerConteoDatos,
  obtenerConteoDatosFiltrados,
} from "../services/TablerosService";
import { Button, Form, Spinner } from "react-bootstrap";
import ReloadIcon from "../assets/reloadIcon";
import { obtenerFormularioFacultad } from "../services/FormulariosAppService";

const TableroEmpresas = () => {
  const dataTipos = [
    { id: 1, nombre: "Tablero Automático" },
    { id: 2, nombre: "Tablero Personalizado" },
  ];
  const [data, setData] = useState([]);
  //const [idFormulario, setIdFormulario] = useState([]);
  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  const [filter, setFilter] = useState(null);
  //para carga
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    tab_tipo: 1,
  });

  useEffect(() => {
    //obtener id de tablero por tipo estudiantes y facultad
    setIsLoading(true);
    obtenerFormularioFacultad(
      parseInt(usuario_actual.usu_facultad_pertenece),
      "empresas"
    ).then((response) => {
      if (filter) {
        obtenerConteoDatosFiltrados({
          id: parseInt(response?.for_id),
          valores_filtro: filter,
        }).then((response) => {
          setData(response);
          setIsLoading(false);
        });
      } else {
        setIsLoading(true);
        obtenerConteoDatos(parseInt(response?.for_id)).then((response) => {
          setData(response);
          setIsLoading(false);
        });
      }
    });
    
  }, [filter, usuario_actual.usu_facultad_pertenece]);

  const handlefilterClick = (name) => {
    if (filter) {
      setFilter((prevFilter) => [...prevFilter, name]);
    } else {
      setFilter([]);
      setFilter((prevFilter) => [...prevFilter, name]);
    }
  };

  const handleChangeTipoTablero = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      tab_tipo: value,
    }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "85vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AdminSideBar />
          <h3
            style={{
              color: "#fff",
              textAlign: "left",
            }}
          >
            <b>Tablero de Empleabilidad</b>
          </h3>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
          <Form.Select
            aria-label="Tipo de usuario"
            name="tab_tipo"
            value={formData.tab_tipo}
            onChange={handleChangeTipoTablero}
          >
            {dataTipos.map((tipo, index) => (
              <option key={index} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <br />
      {isLoading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        <>
          <Button
            variant="outline-secondary"
            style={{
              height: "40px",
              display: "flex",
              float: "right",
              alignItems: "center",
              position: "absolute",
              right: "5vw",
              marginTop: "5px",
              marginRight: "5px",
            }}
            onClick={() => setFilter(null)}
            title="Restaurar"
          >
            <ReloadIcon />
          </Button>
          <AutoDasboard data={data} setSelectedOption={handlefilterClick} tipo={"empresas"} />
        </>
      )}
    </div>
  );
};

export default TableroEmpresas;
