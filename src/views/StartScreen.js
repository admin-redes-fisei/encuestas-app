import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { obtenerPreguntas } from "../services/FormulariosService";

function StartPage() {
  //para navegacion
  const navigate = useNavigate();
  //para responsividad
  const [ampliarElemento, setAmpliarElemento] = useState(true);
  //para obtener preguntas
  const rutaActual = window.location.pathname;

  //para obtener preguntas
  useEffect(() => {
    const partesRuta = rutaActual.split("/");

    obtenerPreguntas(partesRuta[partesRuta.length - 1]).then((response) => {
      const preguntas = JSON.stringify(response);
      localStorage.setItem("for_pub_preguntas", preguntas);
      //localStorage.setItem("respuestas", []);
      seleccionarSecciones(response);
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
      <div
        style={{
          width: ampliarElemento ? "70%" : "100%",
          height: "90vh",
          float: "right",
          margin: "20px",
          borderRadius: "25px",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Header />
        <Button
          variant="light"
          onClick={handleStarButton}
          style={{
            alignSelf: "left",
            bottom: 0,
            zIndex: 210,
            marginTop: "200px",
          }}
        >
          Comenzar
        </Button>
      </div>
    </div>
  );
}

export default StartPage;
