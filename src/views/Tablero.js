import { useEffect } from "react";
import AdminSideBar from "../components/SidebarBashboard";
import { useNavigate } from "react-router-dom";

const Tablero = () => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/tablero/estudiantes");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <AdminSideBar />
    </div>
  );
};

export default Tablero;
