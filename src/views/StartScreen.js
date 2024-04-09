import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { obtenerPreguntas } from "../services/FormulariosService";

function StartPage() {
  //para navegacion
  const navigate = useNavigate();
  //para responsividad
  const [ampliarElemento, setAmpliarElemento] = useState(true);
  //para carga
  const [isLoading, setIsLoading] = useState(true);
  //para obtener preguntas
  const rutaActual = window.location.pathname;

  //para obtener preguntas
  useEffect(() => {
    const partesRuta = rutaActual.split("/");

    obtenerPreguntas(partesRuta[partesRuta.length - 1]).then((response) => {
      const preguntas = JSON.stringify(response);
      localStorage.setItem("for_pub_preguntas", preguntas);
      localStorage.setItem("respuestas", JSON.stringify([]));
      seleccionarSecciones(response);
      setIsLoading(false)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //para almacenar secciones
  const seleccionarSecciones = (preguntas) => {
    const seccionesSet = new Set();
    preguntas.forEach((item) => {
      seccionesSet.add(item.seccion);
    });

    const secciones = Array.from(seccionesSet);
    const seccionesJson = JSON.stringify(secciones);
    localStorage.setItem("for_pub_secciones", seccionesJson);
  };

  //para navegacion
  const handleStarButton = () => {
    const rutaDestino = `${rutaActual}/0`;
    navigate(rutaDestino);
  };

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
                ¡Estamos emocionados de contar con tu participación. Tu opinión
                es muy valiosa para nosotros. Por favor, tómate el tiempo
                necesario para responder con sinceridad y detalle. ¡Gracias por
                formar parte de este proceso!
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={handleStarButton}
              style={{
                alignSelf: "left",
                bottom: 0,
                zIndex: 210,
                marginTop: "20px",
                backgroundColor: "#aa1415",
                border: "none",
              }}
            >
              Comenzar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StartPage;
