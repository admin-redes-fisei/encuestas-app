import { useEffect, useState } from "react";
import AutoDasboard from "../components/AutoDasboard";
import AdminSideBar from "../components/SidebarBashboard";
import {
  obtenerConteoDatos,
  obtenerConteoDatosFiltrados,
} from "../services/TablerosService";
import { Button } from "react-bootstrap";
import ReloadIcon from "../assets/reloadIcon";

const TableroEstudiantes = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(null);
  //para carga
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (filter) {
      setIsLoading(true);
      obtenerConteoDatosFiltrados({ id: 2, valores_filtro: filter }).then(
        (response) => {
          setData(response);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(true);
      obtenerConteoDatos(2).then((response) => {
        setData(response);
        setIsLoading(false);
      });
    }
    console.log(filter?.toString());
  }, [filter]);

  const handlefilterClick = (name) => {
    if (filter) {
      setFilter((prevFilter) => [...prevFilter, name]);
    } else {
      setFilter([]);
      setFilter((prevFilter) => [...prevFilter, name]);
    }
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
        <Button
          variant="light"
          style={{
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => setFilter(null)}
          title="Restaurar"
        >
          <ReloadIcon />
        </Button>
      </div>
      <br />
      <AutoDasboard data={data} setSelectedOption={handlefilterClick} />
    </div>
  );
};

export default TableroEstudiantes;
