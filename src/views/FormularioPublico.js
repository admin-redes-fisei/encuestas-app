/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header from "../components/Header";
import EncuestaSideBar from "../components/FormSidebar";
import { Button, ProgressBar } from "react-bootstrap";
import OptionsQuestionCard from "../components/OptionsQuestionCard";
import { useNavigate } from "react-router-dom";
import { enviarRespuestas } from "../services/FormulariosService";
import { toast } from "react-toastify";

function FormularioPublico() {
  //para redirigir
  const navigate = useNavigate();
  //obtener los datos de local storage
  const preguntas_completo = JSON.parse(
    localStorage.getItem("for_pub_preguntas")
  );
  const secciones = JSON.parse(localStorage.getItem("for_pub_secciones"));
  const rutaActual = window.location.pathname;
  const partesRuta = rutaActual.split("/");
  const rutaRaiz = partesRuta.slice(0, -1).join("/");
  const seccionIndex = String(partesRuta[partesRuta.length - 1]);
  const [data, setData] = useState([]);
  //para responsividad
  const [ampliarElemento, setAmpliarElemento] = useState(true);
  //para respuestas
  const [respuestas, setRespuestas] = useState(
    JSON.parse(localStorage.getItem("respuestas")) || []
  );
  //para progresbar
  const [scrollValue, setScrollValue] = useState(0);

  //para secciones
  useEffect(() => {
    const filtrada = preguntas_completo.filter((pregunta) => {
      return pregunta.seccion === secciones[seccionIndex];
    });
    setData(filtrada);
  }, [seccionIndex]);

  //para responsividad
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

  //para repsuestas
  const handleCheckChange = (event, questionId, optionLabel, questionType) => {
    if (questionType === "radio") {
      const { name, value } = event.target;
      setRespuestas((prevRespuestas) => ({
        ...prevRespuestas,
        [name]: {
          formulario_id: data[0].for_id,
          pregunta_id: questionId,
          opcion_id: value,
          respuesta_texto: optionLabel,
          ip_usuario: "",
        },
      }));
    }
    if (questionType === "checkbox") {
      const { name, value, checked } = event.target;

      setRespuestas((prevRespuestas) => {
        if (checked) {
          // Si el checkbox está marcado, agregamos la respuesta al arreglo
          return {
            ...prevRespuestas,
            [name]: [
              ...(prevRespuestas[name] || []),
              {
                formulario_id: data[0].for_id,
                pregunta_id: questionId,
                opcion_id: value,
                respuesta_texto: optionLabel,
                ip_usuario: "",
              },
            ],
          };
        } else {
          // Si el checkbox está desmarcado, filtramos la respuesta del arreglo
          return {
            ...prevRespuestas,
            [name]: (prevRespuestas[name] || []).filter(
              (item) => item.opcion_id !== value
            ),
          };
        }
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("respuestas", JSON.stringify(respuestas));
  }, [respuestas]);

  //para respustas de texto
  const handleOtrosChange = (respuestasTexto) => {
    setRespuestas((prevRespuestas) => {
      const updatedOthers = [...(prevRespuestas["otros"] || [])];
      const existingOptionIndex = updatedOthers.findIndex(
        (op) => op.pregunta_id === respuestasTexto.pregunta_id
      );

      if (existingOptionIndex !== -1) {
        // Si ya existe una opción con la misma pregunta_id, actualiza su valor
        updatedOthers[existingOptionIndex] = respuestasTexto;
      } else {
        // Si no existe, agrega la nueva opción al arreglo
        updatedOthers.push(respuestasTexto);
      }

      return {
        ...prevRespuestas,
        otros: updatedOthers,
      };
    });
  };

  //para redirigir
  const handleRedirect = (index) => {
    if (validarPreguntas(seccionIndex) === true) {
      const rutaDestino = `${rutaRaiz}/${index}`;
      navigate(rutaDestino);
      window.scrollTo(0, 0);
    } else {
      toast.error("Complete las preguntas obligatorias", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  //para progresbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercentage =
        (scrollPosition / (documentHeight - windowHeight)) * 100;
      setScrollValue(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //para enviar respuestas
  const handleEnviarRespuestas = () => {
    if (validarPreguntas()) {
      enviarRespuestas(JSON.parse(localStorage.getItem("respuestas"))).then(
        (response) => {
          navigate("/encuestas/endpage");
        }
      );
    } else {
      toast.error("Complete las preguntas obligatorias", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  //para validar
  const validarPreguntas = (seccion) => {
    const respondidas = JSON.parse(localStorage.getItem("respuestas"));
    const preguntasSinResponder = [];

    (seccion ? data : preguntas_completo).forEach((pregunta) => {
      if (pregunta.requerida === 1) {
        const enOtros = respondidas["otros"]?.findIndex(
          (otro) => otro.pregunta_id === pregunta.id
        );
        if (!(respondidas[pregunta.pre_alias] || enOtros !== -1)) {
          preguntasSinResponder.push(pregunta);
        }
      }
    });
    if (preguntasSinResponder.length > 0) {
      return false;
    } else {
      return true;
    }
  };

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
          <ProgressBar
            now={scrollValue}
            variant="danger"
            style={{ color: "#aa1415" }}
          />
        </div>
        <div
          style={{
            marginTop: "60px",
          }}
        >
          <Button
            variant="light"
            onClick={() => {
              handleRedirect(parseInt(seccionIndex) - 1);
            }}
            disabled={parseInt(seccionIndex) === 0}
            style={{ alignSelf: "left", display: "flex" }}
          >
            ← Regresar
          </Button>
        </div>
        <div style={{ marginTop: "20px" }}>
          {data.map((question) => (
            <OptionsQuestionCard
              key={question.id}
              question={question}
              handleCheckChange={handleCheckChange}
              handleOtrosChange={handleOtrosChange}
              respuestas={respuestas}
            />
          ))}
        </div>
        {seccionIndex < secciones.length - 1 ? (
          <Button
            variant="secondary"
            onClick={() => {
              handleRedirect(parseInt(seccionIndex) + 1);
            }}
            style={{
              marginLeft: "auto",
              backgroundColor: "#aa1415",
              marginRight: "20px",
              marginBottom: "40px",
              border: "none",
            }}
          >
            Siguiente ⭢
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={handleEnviarRespuestas}
            style={{
              marginLeft: "auto",
              backgroundColor: "#aa1415",
              marginRight: "20px",
              border: "none",
              marginBottom: "40px",
            }}
          >
            Finalizar
          </Button>
        )}
      </div>
    </div>
  );
}

export default FormularioPublico;
