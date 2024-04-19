import { useEffect, useState } from "react";
import Header from "../components/Header";
import Spinner from "react-bootstrap/Spinner";

function Home() {
  //para carga
  const [isLoading, setIsLoading] = useState(false);
  //para responsividad
  const [ampliarElemento, setAmpliarElemento] = useState(true);

  //para responsividad
  useEffect(() => {
    const handleResize = () => {
      const anchoVentana = window.innerWidth;
      if (anchoVentana <= 644) {
        setAmpliarElemento(false);
      } else {
        setAmpliarElemento(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Header />
      <div
        style={{
          width: ampliarElemento ? "100%" : "100%",
          height: "100vh",
          float: "right",
          padding: "20px",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <br />
        {isLoading ? (
          <Spinner animation="border" variant="danger" />
        ) : (
          <div>
            <div
              className="titles"
              style={{
                textAlign: "center",
                marginTop: "100px",
                width: "60%",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              <h2>
                <strong>¡BIENVENIDO/A!</strong>
              </h2>
              <p>
                a home
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
