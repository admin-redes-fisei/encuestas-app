import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPersonalizado = () => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/tablero/personalizado-estudiantes");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <iframe
        title="empresasBI"
        width="100%"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=5416f298-850d-4312-9687-d3fedd5522d8&autoAuth=true&ctid=a988ccd4-00ed-4bf3-a4d1-b5661f44abdf"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default DashboardPersonalizado;
