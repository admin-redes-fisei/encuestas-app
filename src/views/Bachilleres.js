import {
  Button,
  Col,
  Form,
  Image,
  OverlayTrigger,
  ProgressBar,
  Row,
  Tooltip,
} from "react-bootstrap";
import StaticSideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import IdeaIcon from "../assets/infoIncon copy";
import CheckIcon from "../assets/checkIncon";
import XIcon from "../assets/xIcon";
import { useNavigate } from "react-router-dom";

function Bachilleres() {
  const questions = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
      title: "Recidencia",
      question: "",
      options: [
        {
          id: 11,
          name: "residencia",
          provincia: "Cotopaxi",
          ciudades: [
            "Latacunga",
            "La Maná",
            "Pujilí",
            "Salcedo",
            "Saquisilí",
            "Sigchos",
          ],
        },
        {
          id: 12,
          name: "residencia",
          provincia: "Chimborazo",
          ciudades: [
            "Riobamba",
            "Alausí",
            "Guano",
            "Chambo",
            "Chunchi",
            "Colta",
            "Cumandá",
            "Guamote",
            "Pallatanga",
            "Penipe",
          ],
        },
        {
          id: 13,
          name: "residencia",
          provincia: "Pastaza",
          ciudades: ["Puyo", "Arajuno", "Mera", "Santa Clara"],
        },
        {
          id: 14,
          name: "residencia",
          provincia: "Tungurahua",
          ciudades: [
            "Ambato",
            "Baños",
            "Pelileo",
            "Patate",
            "Píllaro",
            "Quero",
          ],
        },
      ],
    },
  ];

  const extraQuestion = [
    {
      id: 1,
      name: "Tim Berners-Lee",
      tip: "Conocido como el “padre de la World Wide Web”, Tim Berners-Lee es un pionero en el campo de las redes informáticas. ",
      url: "https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/qz-et.jpg?alt=media&token=270a0e6e-e5d9-4042-af44-ebb6228e872b",
      aswer: "Electrónica y Telecomunicaciones",
    },

    {
      id: 2,
      name: "Sophia",
      tip: "El primer robot ciudadano del mundo, creado por Hanson Robotics.",
      url: "https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/qz-ar.jpg?alt=media&token=cae0802b-c237-4134-9991-be225b977f70",
      aswer: "Automatización y Robótica",
    },
    {
      id: 3,
      name: "Ada Lovelace",
      tip: "Conocida como la primera programadora de la historia.",
      url: "https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/qz-sw.jpg?alt=media&token=f2ddcc7b-0c5e-40b8-b4c7-f5e68f65a07a",
      aswer: "Software",
    },
    {
      id: 4,
      name: "Alan Turing",
      tip: "Matemático y científico de la computación, conocido como el padre de la Inteligencia Artificial.",
      url: "https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/qz-ia.jpg?alt=media&token=843b1bfd-3b23-443e-8f83-4d1456345fc7",
      aswer: "Ciencia de Datos en Inteligencia Artificial",
    },
    {
      id: 5,
      name: "Elon Musk",
      tip: "CEO de SpaceX y Tesla, empresas que han innovado en la industria espacial y automotriz respectivamente.",
      url: "https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/qz-ii.jpg?alt=media&token=23b851a1-2644-4708-a03e-c436d055c757",
      aswer: "Ingeniería Industrial",
    },
    {
      id: 7,
      name: "Mark Zuckerberg",
      tip: "Cofundador de Facebook, una de las redes sociales más populares del mundo. ",
      url: "https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/qz-ti.jpg?alt=media&token=c594d7f3-2635-4b4f-a514-62cb8bc6799a",
      aswer: "Tecnologías de la Información",
    },
    {
      id: 6,
      name: "Tux",
      tip: "Representa la naturaleza amigable, colaborativa y comunitaria del sistema operativo Linux.",
      url: "https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/qz-cc.jpg?alt=media&token=15b0d2eb-c644-459e-8308-5d84130151b3",
      aswer: "Ciencias de la Computación",
    },
  ];

  const itemStyle = {
    backgroundColor: "#fff",
    width: "70%",
    borderRadius: "5px",
    border: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
    paddingLeft: "12px",
  };
  //para traer los datos
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const response = await fetch(
          `https://hatunsoft.uta.edu.ec/back_encuestas/formulario.php?id=2`
        );
        const data = await response.json();

        setPreguntas(data);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
      }
    };

    obtenerPreguntas();
  }, []);

  //envio de datos
  const enviarRespuestas = () => {
    fetch("https://hatunsoft.uta.edu.ec/back_encuestas/respuestas.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(respuestas),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error al enviar la respuesta:", error);
      });
    redirectToAboutPage();
  };

  //navegacion
  const navigate = useNavigate();
  const redirectToAboutPage = () => {
    navigate("/encuestas/endpage");
  };

  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    switch (currentPage - 1) {
      case 1:
        setType(1);
        break;
      case 2:
      case 3:
        setType(2);
        break;
      case 4:
      case 5:
        setType(3);
        break;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        setType(4);
        break;
      default:
        setType(1);
        break;
    }
  };

  const goToNextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    switch (currentPage + 1) {
      case 1:
        setType(1);
        break;
      case 2:
      case 3:
        setType(2);
        break;
      case 4:
      case 5:
        setType(3);
        break;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        setType(4);
        break;
      default:
        setType(1);
        break;
    }

    handleChange(respuestasTexto);
  };

  //SIDEBAR Calcular el tipo basado en el número de página actual
  const [type, setType] = useState(1);

  //PROGRESSBAR  Calcular el porcentaje de progreso
  const progress = ((currentPage - 1) / (totalPages - 1)) * 100;

  //para provincias y ciudades
  const [selectedProvincia, setsSlectedProvincia] = useState(null);

  //para almacenar respuestas
  const [respuestas, setRespuestas] = useState([]);

  const handleInputChange = (event, questionId, optionLabel, questionType) => {
    if (questionType === "radio") {
      const { name, value } = event.target;
      setRespuestas((prevRespuestas) => ({
        ...prevRespuestas,
        [name]: {
          formulario_id: 2,
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
                formulario_id: 2,
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

  //para almacenar campos de texto
  const [respuestasTexto, setRespuestaTexto] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleTextChange = (e, pregunta_id) => {
    const { value } = e.target;
    setInputValue(e.target.value);
    setRespuestaTexto({
      pregunta_id: pregunta_id,
      respuesta_otra_texto: value,
    });
  };
  const handleChange = (respuestasTexto) => {
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
      setInputValue("");

      return {
        ...prevRespuestas,
        otros: updatedOthers,
      };
    });
  };

  //Para pregunta extra
  const [qzAnswer, setQzAnswer] = useState({});

  const handleSelectChange = (e, questionId) => {
    const qzAnswerSeleccionada = e.target.value;
    const esRespuestaCorrecta =
      parseInt(qzAnswerSeleccionada) === extraQuestion[questionId - 1].id; // Puedes cambiar esto por la lógica correcta

    setQzAnswer({
      ...qzAnswer,
      [questionId]: esRespuestaCorrecta,
    });
  };

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

    // Agrega el evento al montar el componente
    window.addEventListener("resize", handleResize);

    // Limpia el evento al desmontar el componente
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
      <StaticSideBar type={type} survey={2} />
      <div
        style={{
          width: ampliarElemento ? "70%" : "100%",
          height: "90vh",
          float: "right",
          margin: "20px",
          padding: "20px",
          borderRadius: "25px",
          backgroundColor: "#F5F5F5",
        }}
      >
        <ProgressBar
          now={progress}
          variant="danger"
          style={{ color: "#aa1415" }}
        />
        <br />
        {currentPage !== 1 && (
          <Button
            variant="light"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            style={{ alignSelf: "left", display: "flex" }}
          >
            ← Regresar
          </Button>
        )}

        <Form
          onSubmit={enviarRespuestas}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxHeight: "70vh",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            overflowY: "auto",
          }}
        >
          {currentPage === 1 && (
            <>
              <h2> Información General </h2>
              <br />
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  <strong>Género</strong>
                </Form.Label>
                <Col sm="10">
                  <Form.Select
                    name={"genero"}
                    style={{ width: ampliarElemento ? "30vw" : "80vw" }}
                    defaultValue={0}
                    onChange={(e) => {
                      handleInputChange(
                        e,
                        preguntas[0].id,
                        preguntas[0].options.find(
                          (op) => op.id === parseInt(e.target.value)
                        )?.label,
                        "radio"
                      );
                    }}
                  >
                    <option key={0} value={0}>
                      Seleccione
                    </option>
                    {preguntas[0]?.options.map((opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  <strong>Edad</strong>
                </Form.Label>
                <Col sm="10">
                  <Form.Select
                    style={{ width: ampliarElemento ? "30vw" : "80vw" }}
                    name="edad"
                    defaultValue={0}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        preguntas[1].id,
                        preguntas[1].options.find(
                          (op) => op.id === parseInt(e.target.value)
                        )?.label,
                        "radio"
                      )
                    }
                  >
                    <option key={0} value={0}>
                      Seleccione
                    </option>
                    {preguntas[1]?.options.map((opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  <strong>Provincia </strong>
                </Form.Label>
                <Col sm="10">
                  <Form.Select
                    defaultValue={0}
                    name="provincia"
                    onChange={(e) => {
                      setsSlectedProvincia(parseInt(e.target.value) - 11);
                      handleChange({
                        pregunta_id: 54,
                        respuesta_otra_texto: questions[2].options.find(
                          (op) => op.id === parseInt(e.target.value)
                        )?.provincia,
                      });
                    }}
                    style={{ width: ampliarElemento ? "30vw" : "80vw" }}
                  >
                    <option key={0} value={0}>
                      Seleccione
                    </option>
                    {questions[2].options.map((opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.provincia}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  <strong>Ciudad</strong>
                </Form.Label>
                <Col sm="10">
                  <Form.Select
                    style={{ width: ampliarElemento ? "30vw" : "80vw" }}
                    defaultValue={0}
                    name="ciudad"
                    onChange={(e) => {
                      handleChange({
                        pregunta_id: 55,
                        respuesta_otra_texto:
                          questions[2].options[selectedProvincia].ciudades[
                            parseInt(e.target.value)
                          ],
                      });
                    }}
                  >
                    <option key={0} value={0}>
                      Seleccione
                    </option>
                    {questions[2].options[
                      selectedProvincia ? selectedProvincia : 0
                    ].ciudades.map((opcion, index) => (
                      <option key={index} value={index}>
                        {opcion}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Label
                column
                sm="2"
                style={{ textAlign: "left", width: "75%" }}
              >
                <strong>Tipo de colegio en que estudia/graduó </strong>
              </Form.Label>
              {preguntas[2]?.options.map((option) => (
                <Form.Group className="mb-3" style={itemStyle} key={option.id}>
                  <Form.Check
                    label={option.label}
                    type="radio"
                    name={option.name}
                    value={option.id}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        preguntas[2].id,
                        option.label,
                        "radio"
                      )
                    }
                    checked={
                      respuestas[option.name]?.respuesta_texto === option.label
                    }
                    style={{
                      minHeight: "30px",
                      marginTop: "5px",
                    }}
                  />
                </Form.Group>
              ))}
              <Form.Label
                column
                sm="2"
                style={{ textAlign: "left", width: "75%" }}
              >
                <strong>Nombre del Colegio </strong>
              </Form.Label>
              <Form.Group
                style={{
                  width: "70%",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Nombre del Colegio"
                  value={inputValue}
                  onChange={(e) => handleTextChange(e, 57)}
                />
              </Form.Group>
            </>
          )}
          {currentPage === 2 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "20px 40px",
                  width: "60%",
                }}
              >
                <h2> {preguntas[3].title} </h2>
                <p>{preguntas[3].question}</p>
              </div>
              {preguntas[3]?.options.map((option) => (
                <Form.Group className="mb-3" style={itemStyle} key={option.id}>
                  <Form.Check
                    label={option.label}
                    type="radio"
                    name={option.name}
                    value={option.id}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        preguntas[3].id,
                        option.label,
                        "radio"
                      )
                    }
                    checked={
                      respuestas[option.name]?.respuesta_texto === option.label
                    }
                    style={{
                      minHeight: "30px",
                      marginTop: "5px",
                    }}
                  />
                </Form.Group>
              ))}
              <br />
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "20px 40px",
                  width: "60%",
                }}
              >
                <p>{preguntas[4].question}</p>
              </div>
              {preguntas[4]?.options.map((option) => (
                <Form.Group className="mb-3" style={itemStyle} key={option.id}>
                  <Form.Check
                    label={option.label}
                    type="radio"
                    name={option.name}
                    value={option.id}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        preguntas[4].id,
                        option.label,
                        "radio"
                      )
                    }
                    checked={
                      respuestas[option.name]?.respuesta_texto === option.label
                    }
                    style={{
                      minHeight: "30px",
                      marginTop: "5px",
                    }}
                  />
                </Form.Group>
              ))}
            </>
          )}
          {currentPage === 3 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "20px 40px",
                  width: "60%",
                }}
              >
                <h2> {preguntas[5].title} </h2>
                <p>{preguntas[5].question}</p>
              </div>
              {preguntas[5]?.options.map((option) => (
                <Form.Group className="mb-3" style={itemStyle} key={option.id}>
                  <Form.Check
                    label={option.label}
                    type="checkbox"
                    name={option.name}
                    value={option.id}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        preguntas[5].id,
                        option.label,
                        "checkbox"
                      )
                    }
                    checked={respuestas[option.name]?.some(
                      (item) => item.respuesta_texto === option.label
                    )}
                    style={{
                      minHeight: "30px",
                      marginTop: "5px",
                    }}
                  />
                </Form.Group>
              ))}
            </>
          )}
          {currentPage === 4 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "20px 40px",
                  width: "60%",
                }}
              >
                <h2> {preguntas[6].title} </h2>
                <p>{preguntas[6].question}</p>
              </div>
              {preguntas[6]?.options.map((option) => (
                <Form.Group className="mb-3" style={itemStyle} key={option.id}>
                  <Form.Check
                    label={option.label}
                    type="radio"
                    name={option.name}
                    value={option.id}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        preguntas[6].id,
                        option.label,
                        "radio"
                      )
                    }
                    checked={
                      respuestas[option.name]?.respuesta_texto === option.label
                    }
                    style={{
                      minHeight: "30px",
                      marginTop: "5px",
                    }}
                  />
                </Form.Group>
              ))}
            </>
          )}
          {currentPage === 5 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>Intereses de Carrera</h2>
                <p>
                  Por favor califica tu interés en cada carrera del 1 al 5,
                  siendo 1 “No estoy interesado” y 5 “Estoy muy interesado”.
                </p>
              </div>
              <br />

              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "70%",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={1}>
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/ia1.jpg?alt=media&token=691e3f2b-52fd-48f8-82fc-b59c79ef4e51"
                        style={{ height: "auto", width: "100%" }}
                      />
                      J.A.R.V.I.S., el asistente virtual de Tony Stark en el
                      Universo Cinematográfico de Marvel, es un ejemplo de
                      inteligencia artificial avanzada. A veces, la ficción
                      inspira la realidad.
                    </Tooltip>
                  }
                >
                  <Button
                    variant="light"
                    className="d-inline-flex align-items-center"
                  >
                    <IdeaIcon />
                    <span className="ms-1">
                      <strong>{preguntas[7].title}</strong>
                    </span>
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                {preguntas[7]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[7].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "70%",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={2}>
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/cc1.jpg?alt=media&token=afd279ba-8af5-49ec-bae1-ea6be40a5521"
                        style={{ height: "auto", width: "100%" }}
                      />
                      En la película "Matrix", Neo "aprende" a dominar las artes
                      marciales mediante la descarga directa de programas a su
                      cerebro. La interfaz cerebro-computadora es un campo de
                      investigación real en las ciencias de la computación.
                    </Tooltip>
                  }
                >
                  <Button
                    variant="light"
                    className="d-inline-flex align-items-center"
                  >
                    <IdeaIcon />
                    <span className="ms-1">
                      <strong>{preguntas[8].title}</strong>
                    </span>
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                {preguntas[8]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[8].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "70%",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={3}>
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/sw1.jpg?alt=media&token=a7ca694b-417a-4035-beaa-6bc9a81295e1"
                        style={{ height: "auto", width: "100%" }}
                      />
                      ¿Has visto la serie “Silicon Valley”? Los personajes
                      principales son desarrolladores de software que crean su
                      propia startup.
                    </Tooltip>
                  }
                >
                  <Button
                    variant="light"
                    className="d-inline-flex align-items-center"
                  >
                    <IdeaIcon />
                    <span className="ms-1">
                      <strong>{preguntas[9].title}</strong>
                    </span>
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                {preguntas[9]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[9].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "70%",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={4}>
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/ti1.png?alt=media&token=06c4dd82-a6b8-4fa0-a79d-6298eacbe4f4"
                        style={{ height: "auto", width: "100%" }}
                      />
                      En la película “The Social Network”, Mark Zuckerberg
                      utiliza sus habilidades en Tecnologías de la Información
                      para crear Facebook.
                    </Tooltip>
                  }
                >
                  <Button
                    variant="light"
                    className="d-inline-flex align-items-center"
                  >
                    <IdeaIcon />
                    <span className="ms-1">
                      <strong>{preguntas[10].title}</strong>
                    </span>
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                {preguntas[10]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[10].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "70%",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={5}>
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/et1.png?alt=media&token=306222e2-b921-4662-ad5b-4758128969da"
                        style={{ height: "auto", width: "100%" }}
                      />
                      En la serie “Mr. Robot”, Elliot Alderson es un experto en
                      seguridad cibernética y telecomunicaciones.
                    </Tooltip>
                  }
                >
                  <Button
                    variant="light"
                    className="d-inline-flex align-items-center"
                  >
                    <IdeaIcon />
                    <span className="ms-1">
                      <strong>{preguntas[11].title}</strong>
                    </span>
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                {preguntas[11]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[11].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "70%",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={6}>
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/ii1.png?alt=media&token=b578c196-6cdc-48fc-bf7f-5d16d03587c2"
                        style={{ height: "auto", width: "100%" }}
                      />
                      Hermione Granger, del universo de Harry Potter, demuestra
                      habilidades de organización y gestión en situaciones de
                      crisis. Su capacidad para planificar y coordinar es
                      esencial en la ingeniería industrial, donde se busca
                      mejorar la eficiencia y la productividad.
                    </Tooltip>
                  }
                >
                  <Button
                    variant="light"
                    className="d-inline-flex align-items-center"
                  >
                    <IdeaIcon />
                    <span className="ms-1">
                      <strong>{preguntas[12].title}</strong>
                    </span>
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                {preguntas[12]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[12].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "70%",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={7}>
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/ar1.jpg?alt=media&token=766cee24-1751-4995-8e29-7520a498fab8"
                        style={{ height: "auto", width: "100%" }}
                      />
                      R2-D2, el astromecánico de la saga “Star Wars”, es un
                      ejemplo icónico de automatización y robótica. Su
                      versatilidad para reparar naves espaciales y su interfaz
                      con otros sistemas lo convierten en un modelo a seguir
                      para los ingenieros en robótica.
                    </Tooltip>
                  }
                >
                  <Button
                    variant="light"
                    className="d-inline-flex align-items-center"
                  >
                    <IdeaIcon />
                    <span className="ms-1">
                      <strong>{preguntas[13].title}</strong>
                    </span>
                  </Button>
                </OverlayTrigger>
              </div>
              <div>
                {preguntas[13]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[13].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
            </>
          )}
          {currentPage === 6 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>{preguntas[14]?.title}</h2>
                <p>{preguntas[14]?.question}</p>
              </div>
              <div>
                {preguntas[14]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[14].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              {respuestas["conocimiento-ia"]?.respuesta_texto && (
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/carrera-ia.png?alt=media&token=815ad182-d738-40f0-864d-95787732bec9"
                  style={{ width: "100%" }}
                />
              )}
            </>
          )}
          {currentPage === 7 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>{preguntas[15]?.title}</h2>
                <p>{preguntas[15]?.question}</p>
              </div>
              <div>
                {preguntas[15]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[15].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              {respuestas["conocimiento-cc"]?.respuesta_texto && (
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/carrera-cc.png?alt=media&token=fc31b1c6-b0dc-4776-a3bd-4b973fd03125"
                  style={{ width: "100%" }}
                />
              )}
            </>
          )}
          {currentPage === 8 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>{preguntas[16]?.title}</h2>
                <p>{preguntas[16]?.question}</p>
              </div>
              <div>
                {preguntas[16]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[16].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              {respuestas["conocimiento-sw"]?.respuesta_texto && (
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/carrera-sw.png?alt=media&token=df9c5e9b-6c2c-4e08-8c33-9d1cd29da045"
                  style={{ width: "100%" }}
                />
              )}
            </>
          )}
          {currentPage === 9 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>{preguntas[17]?.title}</h2>
                <p>{preguntas[17]?.question}</p>
              </div>
              <div>
                {preguntas[17]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[17].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              {respuestas["conocimiento-ti"]?.respuesta_texto && (
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/carrera-ti.png?alt=media&token=b208683a-2772-4a44-bb98-547ed77ed5d1"
                  style={{ width: "100%" }}
                />
              )}
            </>
          )}
          {currentPage === 10 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>{preguntas[18]?.title}</h2>
                <p>{preguntas[18]?.question}</p>
              </div>
              <div>
                {preguntas[18]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[18].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              {respuestas["conocimiento-et"]?.respuesta_texto && (
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/carrera-et.png?alt=media&token=02d72d2a-7b06-4e28-8a31-f282a67dcd7a"
                  style={{ width: "100%" }}
                />
              )}
            </>
          )}
          {currentPage === 11 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>{preguntas[19]?.title}</h2>
                <p>{preguntas[19]?.question}</p>
              </div>
              <div>
                {preguntas[19]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[19].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              {respuestas["conocimiento-ii"]?.respuesta_texto && (
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/carrera-ii.png?alt=media&token=345fa8ef-e1dc-4242-9022-af5bc4e057f9"
                  style={{ width: "100%" }}
                />
              )}
            </>
          )}
          {currentPage === 12 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>{preguntas[20]?.title}</h2>
                <p>{preguntas[20]?.question}</p>
              </div>
              <div>
                {preguntas[20]?.options.map((option, index) => (
                  <Form.Group
                    className="mb-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "auto",
                      borderRadius: "5px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      textAlign: "left",
                      float: "left",
                      padding: " 0px 12px",
                    }}
                    key={option.id}
                  >
                    <Form.Check
                      inline
                      label={index + 1}
                      type="radio"
                      name={option.name}
                      value={option.id}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          preguntas[20].id,
                          option.label,
                          "radio"
                        )
                      }
                      checked={
                        respuestas[option.name]?.respuesta_texto ===
                        option.label
                      }
                      style={{
                        minHeight: "30px",
                        marginTop: "5px",
                      }}
                    />
                  </Form.Group>
                ))}
              </div>
              <br />
              {respuestas["conocimiento-ar"]?.respuesta_texto && (
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/carrera-ar.png?alt=media&token=e3b2fb1a-e6e8-4639-977c-0fc3663a8dea"
                  style={{ width: "100%" }}
                />
              )}
            </>
          )}
          {currentPage === 13 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "0px",
                  width: "60%",
                }}
              >
                <h2>Retroalimentación</h2>
                <p>
                  Ahora que has aprendido un poco más sobre cada carrera,
                  ¿puedes relacionar a cada figura destacada de la vida real con
                  la carrera que mejor se ajusta a sus habilidades o intereses?
                </p>
              </div>
              {extraQuestion.map((question) => (
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id={question.id}>{question.tip}</Tooltip>}
                >
                  <div
                    key={question.id}
                    style={{
                      display: "inline",
                      marginBottom: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      border: `2px solid ${
                        qzAnswer[question.id] === undefined
                          ? "#e0e0e0"
                          : qzAnswer[question.id]
                          ? "#49BC56"
                          : "#AA1415"
                      }`,
                      padding: "10px",
                    }}
                  >
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="5">
                        {qzAnswer[question.id] === undefined ? (
                          ""
                        ) : qzAnswer[question.id] ? (
                          <CheckIcon />
                        ) : (
                          <XIcon />
                        )}
                        <strong>{question.name}</strong>
                      </Form.Label>
                      <Image
                        src={question.url}
                        style={{ width: "50%", height: "120px" }}
                      />
                      <Col sm="5">
                        <Form.Select
                          style={{ width: "30vw", marginTop: "5px" }}
                          defaultValue={0}
                          onChange={(e) => handleSelectChange(e, question.id)}
                        >
                          <option key={0} value={0}>
                            Seleccione
                          </option>
                          {extraQuestion.map((opcion) => (
                            <option key={opcion.id} value={opcion.id}>
                              {opcion.aswer}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Form.Group>
                  </div>
                </OverlayTrigger>
              ))}
            </>
          )}
          {currentPage === 14 && (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "20px 40px",
                  width: "60%",
                }}
              >
                <h2> {preguntas[21].title} </h2>
                <p>{preguntas[21].question}</p>
              </div>
              {preguntas[21]?.options.map((option) => (
                <Form.Group className="mb-3" style={itemStyle} key={option.id}>
                  <Form.Check
                    label={option.label}
                    type="checkbox"
                    name={option.name}
                    value={option.id}
                    disabled={
                      respuestas[option.name]?.some(
                        (item) => item.respuesta_texto === "Ninguna"
                      ) && option.label !== "Ninguna"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        preguntas[21].id,
                        option.label,
                        "checkbox"
                      )
                    }
                    checked={respuestas[option.name]?.some(
                      (item) => item.respuesta_texto === option.label
                    )}
                    style={{
                      minHeight: "30px",
                      marginTop: "5px",
                    }}
                  />
                </Form.Group>
              ))}
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "20px 40px",
                  width: "60%",
                }}
              >
                <p>
                  ¿Hay alguna otra carrera no mencionada en esta encuesta que te
                  interese?
                </p>
              </div>
              <Form.Group
                style={{
                  width: "70%",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Nombre de la carrera"
                  value={inputValue}
                  onChange={(e) => handleTextChange(e, 77)}
                />
              </Form.Group>
            </>
          )}
          {/*Para botones de navegacion */}
          <br />
          {currentPage !== totalPages && (
            <Button
              variant="secondary"
              onClick={() => goToNextPage()}
              disabled={currentPage === totalPages}
              style={{
                marginLeft: "auto",
                backgroundColor: "#aa1415",
                marginRight: "20px",
                border: "none",
              }}
            >
              Siguiente Pregunta ⭢
            </Button>
          )}
          {currentPage === totalPages && (
            <Button
              variant="primary"
              type="submit"
              style={{
                marginLeft: "auto",
                backgroundColor: "#aa1415",
                border: "none",
                marginRight: "20px",
              }}
              onClick={() => {
                handleChange(respuestasTexto);
              }}
            >
              Finalizar
            </Button>
          )}
        </Form>
        <br />
      </div>
    </div>
  );
}
export default Bachilleres;
