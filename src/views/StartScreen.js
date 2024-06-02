import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Alert, Button, Image } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { obtenerPreguntas } from "../services/FormulariosService";
import imagenNoFormulario from "../assets/enmantenimiento.png";

function StartPage() {
  //para navegacion
  const navigate = useNavigate();
  //para responsividad
  const [ampliarElemento, setAmpliarElemento] = useState(true);
  //para carga
  const [isLoading, setIsLoading] = useState(true);
  const [formSize, setFormSize] = useState(0);
  //para obtener preguntas
  const rutaActual = window.location.pathname;

  //para obtener preguntas
  useEffect(() => {
    const partesRuta = rutaActual.split("/");

    obtenerPreguntas(partesRuta[partesRuta.length - 1]).then((response) => {
      const preguntas = JSON.stringify(response);
      localStorage.setItem("for_pub_preguntas", preguntas);
      localStorage.setItem("respuestas", JSON.stringify([]));
      localStorage.setItem("for_alias", JSON.stringify(""));
      seleccionarSecciones(response);
      setIsLoading(false);
      setFormSize(response?.length);
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
            {formSize > 0 ? (
              <>
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
                    ¡Estamos emocionados de contar con tu participación. Tu
                    opinión es muy valiosa para nosotros. Por favor, tómate el
                    tiempo necesario para responder con sinceridad y detalle.
                    ¡Gracias por formar parte de este proceso!
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
              </>
            ) : (
              <div
                style={{
                  width: "83vw",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  paddingTop: "10px",
                  paddingLeft: "45px",
                  paddingRight: "45px",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <br />
                <Alert
                  key="secondary"
                  variant="warning"
                  style={{
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Encuesta en Construcción
                </Alert>
                <Image
                  src={imagenNoFormulario}
                  rounded
                  style={{ width: "280px" }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StartPage;
