/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header from "../components/Header";
import EncuestaSideBar from "../components/FormSidebar";
import { ProgressBar } from "react-bootstrap";
import OptionsQuestionCard from "../components/OptionsQuestionCard";

function FormularioPublico() {
  //obtener los datos de local storage
  const preguntas_completo = JSON.parse(
    localStorage.getItem("for_pub_preguntas")
  );
  const secciones = JSON.parse(localStorage.getItem("for_pub_secciones"));
  const rutaActual = window.location.pathname;
  const partesRuta = rutaActual.split("/");
  const seccionIndex = String(partesRuta[partesRuta.length - 1]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const filtrada = preguntas_completo.filter((pregunta) => {
      return pregunta.seccion === secciones[seccionIndex];
    });
    setData(filtrada);
  }, [seccionIndex]);

  //para responsividad
  const [ampliarElemento, setAmpliarElemento] = useState(true);

  useEffect(() => {
    // Escucha el cambio de tamaño de la ventana
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
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: ampliarElemento ? "end" : "center",
      }}
    >
      <Header />
      <EncuestaSideBar />
      <div
        style={{
          width: ampliarElemento ? "75%" : "95%",
          marginTop: "100px",
          paddingRight: ampliarElemento ? "20px" : "0px",
          paddingLeft: ampliarElemento ? "0px" : "0px",
        }}
      >
        <div
          style={{
            paddingTop: "25px",
            position: "fixed",
            zIndex: 90,
            width: ampliarElemento ? "75%" : "95%",
            backgroundColor: "#f5f5f5",
            paddingRight: ampliarElemento ? "20px" : "0px",
            paddingLeft: ampliarElemento ? "0px" : "0px",
          }}
        >
          <ProgressBar now={60} variant="danger" style={{ color: "#aa1415" }} />
        </div>
        <div style={{ marginTop: "60px" }}>
          {data.map((question) => (
            <OptionsQuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormularioPublico;
