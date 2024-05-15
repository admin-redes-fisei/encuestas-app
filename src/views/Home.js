import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

function Home() {
  const tabs = [
    { id: 1, label: "Tableros", link: "/tablero" },
    { id: 2, label: "Formularios", link: "/formularios" },
    { id: 3, label: "Reportes", link: "/reportes" },
    { id: 4, label: "Carreras", link: "/carreras" },
    { id: 5, label: "Usuarios", link: "/usuarios" },
  ];

  //Para volver
  let navigate = useNavigate();

  //para responsividad
  useEffect(() => {
    const userPermisos = JSON.parse(localStorage.getItem("userpermisos"));
    if (userPermisos && userPermisos.length > 0) {
      const primerPermiso = userPermisos[0];

      if (userPermisos === "S") {
        navigate("/usuarios");
      }

      // Filtrar el tab cuyo label comience con la primera letra del primer permiso
      const tabFiltrado = tabs.find(
        (tab) => tab.label.charAt(0).toUpperCase() === primerPermiso
      );

      if (tabFiltrado) {
        navigate(tabFiltrado.link);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spinner animation="border" variant="danger" />;
}

export default Home;
