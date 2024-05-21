import { useEffect, useState } from "react";
import AutoDasboard from "../components/AutoDasboard";
import AdminSideBar from "../components/SidebarBashboard";
import {
  obtenerConteoDatos,
  obtenerConteoDatosFiltrados,
} from "../services/TablerosService";
import {
  Button,
  ButtonGroup,
  DropdownButton,
  Form,
  Spinner,
} from "react-bootstrap";
import ReloadIcon from "../assets/reloadIcon";
import { obtenerFormularioFacultad } from "../services/FormulariosAppService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocumentDashboard from "../components/DocumentoDashboard";
import DownloadIcon from "../assets/downloadIcon";
import HtmlEmbedder from "../components/HtmlEmbedder";

const TableroEstudiantes = () => {
  const dataTipos = [
    { id: 1, nombre: "Tablero Automático" },
    { id: 2, nombre: "Tablero Personalizado" },
  ];
  const [data, setData] = useState([]);
  const [idFormulario, setIdFormulario] = useState(0);
  const usuario_actual = JSON.parse(localStorage.getItem("userdata"));
  const [filter, setFilter] = useState(null);
  //para carga
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    tab_tipo: 1,
  });

  useEffect(() => {
    setIsLoading(true);
    obtenerFormularioFacultad(
      parseInt(usuario_actual.usu_facultad_pertenece),
      "estudiantes"
    ).then((response) => {
      setIdFormulario(parseInt(response?.for_id));
      if (filter) {
        obtenerConteoDatosFiltrados({
          id: parseInt(response?.for_id),
          valores_filtro: filter,
        }).then((response) => {
          if (parseInt(response) !== 0) {
            console.log(response);
            setData(response);
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(true);
        obtenerConteoDatos(parseInt(response?.for_id)).then((response) => {
          if (parseInt(response) !== 0) {
            setData(response);
            setIsLoading(false);
          }
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
            <b>Tablero de Demanda Estudiantil</b>
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
        <DropdownButton
          as={ButtonGroup}
          disabled={parseInt(formData.tab_tipo) === 2}
          align={{ lg: "end" }}
          variant="light"
          style={{
            height: "40px",
          }}
          title={
            <>
              <DownloadIcon color="#333F49" />
              Exportar
            </>
          }
        >
          <PDFDownloadLink
            document={
              <MyDocumentDashboard
                data={data}
                total={data?.total_encuestados}
                facultad={usuario_actual.fac_nombre}
                filtros={filter}
              />
            }
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "16px",
            }}
            fileName={`reporteTablero_${data?.nombre_encuesta}.pdf`}
          >
            Exportar PDF
          </PDFDownloadLink>
          <br />
        </DropdownButton>
      </div>
      <br />
      {isLoading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        <>
          {parseInt(formData.tab_tipo) === 1 ? (
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
              <AutoDasboard
                data={data}
                setSelectedOption={handlefilterClick}
                tipo={"estudiantes"}
              />
            </>
          ) : (
            <HtmlEmbedder
              idFormulario={idFormulario}
              idFacultad={usuario_actual?.usu_facultad_pertenece}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TableroEstudiantes;
