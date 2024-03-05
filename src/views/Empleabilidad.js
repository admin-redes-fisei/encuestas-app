/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  Overlay,
  Pagination,
  ProgressBar,
  Tooltip,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import StaticSideBar from "../components/sidebar";
import { useEffect, useRef, useState } from "react";
import InfoIcon from "../assets/infoIncon";
import { useNavigate } from "react-router-dom";

function Empleabilidad() {
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
  const extraData = [
    {
      id: 1,
      isOpenQuestion: false,
    },
    {
      id: 2,
      isOpenQuestion: false,
    },
    {
      id: 3,
      isOpenQuestion: false,
    },
    {
      id: 4,
      isOpenQuestion: false,
    },
    {
      id: 5,
      tooltips: [
        "Se encarga de analizar grandes volúmenes de datos para obtener información valiosa y desarrollar sistemas inteligentes.",
        "Estudia los fundamentos teóricos y prácticos de la informática. Incluye algoritmos, estructuras de datos, teoría de la computación y diseño de software. Resuelven problemas complejos y crean soluciones eficientes utilizando la programación y la lógica.",
        "Se refiere al desarrollo, mantenimiento y mejora de programas informáticos. Los ingenieros de software diseñan, codifican y prueban aplicaciones y sistemas para satisfacer las necesidades de los usuarios.",
        "Se ocupa de los circuitos eléctricos y electrónicos, como dispositivos, amplificadores, microcontroladores y sistemas integrados. Diseña y gestiona sistemas de comunicación, como redes de telefonía, transmisión de datos, redes inalámbricas y satélites.",
        "Se centra en la administración y el uso eficiente de la tecnología de la información en las organizaciones. Incluye gestión de redes, seguridad cibernética, bases de datos y soporte técnico.",
        "Optimiza procesos y sistemas para mejorar la eficiencia y la productividad. Los ingenieros industriales trabajan en áreas como logística, cadena de suministro, calidad y diseño de instalaciones.",
        "Utiliza tecnología para automatizar tareas y procesos, como líneas de producción, control de procesos y sistemas de control. Diseña, construye y programa robots para realizar tareas específicas. Aplicaciones incluyen fabricación, exploración espacial y asistencia médica.",
      ],
      isOpenQuestion: false,
    },
    {
      id: 6,
      isOpenQuestion: false,
    },
    {
      id: 7,
      isOpenQuestion: false,
    },
    {
      id: 8,
      tooltips: [
        "Técnica de IA que permite a las máquinas aprender a través de redes neuronales profundas.",
        "Modelos de IA que generan datos realistas a partir de datos de entrenamiento.",
        "Tecnologías que combinan elementos virtuales con el mundo real o crean entornos completamente virtuales.",
        "Dispositivos voladores controlados de forma remota o autónoma.",
        "Procesamiento de datos cerca de la fuente de generación, reduciendo la latencia.",
        "Componentes de software que permiten la comunicación entre aplicaciones y la creación de sistemas modulares.",
        "Robots que trabajan junto a humanos de manera segura y eficiente.",
        "Técnica de construcción de objetos capa por capa a partir de materiales como plástico o metal.",
        "Manipulación de materiales a nivel molecular o atómico.",
        "Materiales con propiedades únicas y controlables.",
        "Tecnología que permite la comunicación directa entre el cerebro y dispositivos electrónicos.",
        "Sistemas como blockchain que permiten el registro seguro y descentralizado de transacciones.",
      ],
      isOpenQuestion: true,
    },
    {
      id: 9,
      isOpenQuestion: false,
    },
    {
      id: 10,
      isOpenQuestion: true,
    },
    {
      id: 11,
      isOpenQuestion: true,
    },
    {
      id: 12,
      isOpenQuestion: false,
    },
    {
      id: 13,
      isOpenQuestion: false,
    },
    {
      id: 14,
      isOpenQuestion: false,
    },
    {
      id: 15,
      isOpenQuestion: false,
    },
    {
      id: 16,
      isOpenQuestion: true,
    },
    {
      id: 17,
      isOpenQuestion: false,
    },
    {
      id: 18,
      isOpenQuestion: true,
    },
    {
      id: 19,
      suboptions: [
        {
          id: 1,
          tooltips: [
            "Creación de arquitecturas y modelos de redes neuronales profundas.",
            "Análisis estadístico y modelado predictivo de conjuntos de datos.",
            "Algoritmos y modelos de procesamiento de imágenes y video por computadora.",
            "Análisis del impacto ético de sistemas de IA.",
          ],
        },
        {
          id: 2,
          tooltips: [
            "Optimización de software para supercomputadoras.",
            "Desarrollo de algoritmos y lenguajes para computación cuántica.",
            "Diseño y análisis de algoritmos eficientes.",
            "Diseño de chips y sistemas inspirados en redes neuronales.",
          ],
        },
        {
          id: 3,
          tooltips: [
            "Creación de aplicaciones descentralizadas usando tecnología blockchain.",
            "Desarrollo de experiencias de realidad extendida con gafas o dispositivos móviles.",
            "Trabaja en la intersección del desarrollo y las operaciones para mejorar la colaboración y la productividad.",
            "Asesoría para implementar tecnologías disruptivas como IA, blockchain, computación cuántica.",
          ],
        },
        {
          id: 4,
          tooltips: [
            "Seguridad en entornos de cómputo distribuido.",
            "Estrategia e implementación de redes 5G.",
            "Analiza grandes volúmenes de datos para mejorar las operaciones de red y la experiencia del cliente.",
            "Trabaja con tecnologías que desacoplan el plano de control de la red del plano de datos.",
          ],
        },
        {
          id: 5,
          tooltips: [
            "Infraestructura y seguridad para computación distribuida.",
            "Identificación de vectores de ataque basados en manipulación de usuarios.",
            "Asesoría en computación resistente a modificaciones no autorizadas.",
            "Evalúa los sistemas de información en términos de riesgos potenciales y propone medidas de mitigación.",
          ],
        },
        {
          id: 6,
          tooltips: [
            "Diseño e implementación de tecnologías de impresión 3D.",
            "Diseño e integración de sistemas ciberfísicos de producción automatizada.",
            "Diseña y optimiza procesos industriales con un enfoque en la sostenibilidad.",
            "Desarrollo y pruebas de nuevos materiales avanzados como grafeno, biomateriales, etc.",
          ],
        },
        {
          id: 7,
          tooltips: [
            "Diseña y desarrolla robots que pueden trabajar de manera segura y efectiva junto a los humanos.",
            "Diseño y programación de vehículos aéreos no tripulados.",
            "Manejo de herramientas como corte láser, escáneres 3D, impresión 3D.",
            "Desarrollo de simulaciones y entornos inmersivos de realidad virtual.",
          ],
        },
      ],
      isOpenQuestion: false,
    },
  ];

  //navegacion
  const navigate = useNavigate();
  const redirectToAboutPage = () => {
    navigate("/encuestas/endpage");
  };

  //obtener datos
  const [preguntas, setPreguntas] = useState([]);
  const areas = [
    { id: 1, area: "Ciencia de Datos e Inteligencia Artificial" },
    { id: 2, area: "Ciencias de la Computación" },
    { id: 3, area: "Software" },
    { id: 4, area: "Tecnologías de la Información" },
    { id: 5, area: "Electrónica y Telecomunicaciones" },
    { id: 6, area: "Ingeniería Industrial" },
    { id: 7, area: "Automatización y Robótica" },
  ];

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const response = await fetch(
          `https://hatunsoft.uta.edu.ec/back_encuestas/formulario.php?id=1`
        );
        const preguntas = await response.json();

        const numero_subopciones1 = preguntas[13].options.length;
        const numero_subopciones2 = preguntas[18].options.length;

        // Dividir las opciones en grupos de 5
        const gruposDeOpciones1 = [];
        for (let i = 0; i < numero_subopciones1; i += 5) {
          gruposDeOpciones1.push(preguntas[13].options.slice(i, i + 5));
        }
        const gruposDeOpciones2 = [];
        for (let i = 0; i < numero_subopciones2; i += 4) {
          gruposDeOpciones2.push(preguntas[18].options.slice(i, i + 4));
        }

        const preguntasModificadas = preguntas.map((pregunta) => {
          if (pregunta.id === 14) {
            // Si la pregunta es la número 14, reemplazamos options por suboptions
            const { options, ...resto } = pregunta; // Extraemos options del resto de las propiedades
            return {
              ...resto, // Agregamos el resto de las propiedades
              suboptions: areas.flatMap((area, index) => {
                const opciones = gruposDeOpciones1[index] || []; // Si no hay suficientes opciones, se asigna un array vacío
                return {
                  id: area.id,
                  label: area.area,
                  suboptions: opciones.map((opcion) => ({
                    id: opcion.id,
                    name: opcion.name,
                    label: opcion.label,
                    question_option: opcion.question_option,
                  })),
                };
              }),
            };
          }
          if (pregunta.id === 19) {
            // Si la pregunta es la número 14, reemplazamos options por suboptions
            const { options, ...resto } = pregunta; // Extraemos options del resto de las propiedades
            return {
              ...resto, // Agregamos el resto de las propiedades
              suboptions: areas.flatMap((area, index) => {
                const opciones = gruposDeOpciones2[index] || []; // Si no hay suficientes opciones, se asigna un array vacío
                return {
                  id: area.id,
                  label: area.area,
                  suboptions: opciones.map((opcion) => ({
                    id: opcion.id,
                    name: opcion.name,
                    label: opcion.label,
                    question_option: opcion.question_option,
                  })),
                };
              }),
            };
          }
          return pregunta;
        });
        setPreguntas(preguntasModificadas);
        //const data = await response.json();
        //setPreguntas(data);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
      }
    };

    obtenerPreguntas();
  }, []);

  //envio de datos
  const enviarRespuestas = () => {
    fetch("http://172:4000/respuestas", {
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

  //para tooltip
  const [tooltipStates, setTooltipStates] = useState({}); // Estado individual para cada tooltip
  const buttonRefs = useRef([]); // Array de refs para los botones

  const handleButtonClick = (optionId) => {
    setTooltipStates((prevState) => ({
      ...prevState,
      [optionId]: !prevState[optionId], // Cambia el estado del tooltip específico
    }));
  };

  //Para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = preguntas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(preguntas.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    handleChange(respuestasTexto);
  };

  //SIDEBAR Calcular el tipo basado en el número de página actual
  const type = Math.ceil(currentPage / 4);

  //PROGRESSBAR  Calcular el porcentaje de progreso
  const progress = ((currentPage - 1) / (totalPages - 1)) * 100;

  //para almacenar respuestas
  const [respuestas, setRespuestas] = useState([]);

  const handleInputChange = (event, questionId, optionLabel, questionType) => {
    if (questionType === "radio") {
      const { name, value } = event.target;
      setRespuestas((prevRespuestas) => ({
        ...prevRespuestas,
        [name]: {
          formulario_id: 1,
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
                formulario_id: 1,
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
    console.log(respuestas);
  };

  const [respuestasTexto, setRespuestaTexto] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const text = respuestas["otros"]?.some(
      (op) => op.pregunta_id === currentPage
    )
      ? respuestas["otros"]?.some((op) => op.pregunta_id === currentPage)
          .respuesta_otra_texto
      : "";
    setInputValue(text);
  }, [currentPage]);

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

      return {
        ...prevRespuestas,
        otros: updatedOthers,
      };
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StaticSideBar type={type} survey={1} />
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
            overflowY: "auto",
          }}
        >
          {currentItems.map((item) => (
            <>
              <div
                className="titles"
                style={{
                  textAlign: "center",
                  margin: "20px 40px",
                  width: "50%",
                }}
              >
                <h2> {item.title} </h2>
                <p>{item.question}</p>
              </div>
              {item.options?.map((option, index) => (
                <Form.Group className="mb-3" style={itemStyle} key={option.id}>
                  <Form.Check
                    label={option.label}
                    type={item.questionType}
                    name={option.name}
                    value={option.id}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        item.id,
                        option.label,
                        item.questionType
                      )
                    }
                    checked={
                      item.questionType === "radio"
                        ? respuestas[option.name]?.respuesta_texto ===
                          option.label
                        : respuestas[option.name]?.some(
                            (item) => item.respuesta_texto === option.label
                          )
                    }
                    style={{
                      minHeight: "30px",
                      marginTop: "5px",
                    }}
                  />
                  {extraData[item.id - 1]?.tooltips && (
                    <>
                      <Button
                        variant="outline-light"
                        ref={(ref) =>
                          (buttonRefs.current[`${item.id}${option.id}`] = ref)
                        } // Asigna un ref al botón
                        onClick={() =>
                          handleButtonClick(`${item.id}${option.id}`)
                        }
                      >
                        <InfoIcon width="20px" />
                      </Button>
                      <Overlay
                        target={buttonRefs.current[`${item.id}${option.id}`]}
                        show={tooltipStates[`${item.id}${option.id}`]} //
                        placement="right"
                        key={`tool-${item.id}${option.id}`}
                      >
                        {(props) => (
                          <Tooltip
                            id={`tooltip-${item.id}${option.id}`}
                            {...props}
                          >
                            {extraData[item.id - 1]?.tooltips[index]}
                          </Tooltip>
                        )}
                      </Overlay>
                    </>
                  )}
                </Form.Group>
              ))}
              {item.suboptions?.map((option, index1) => (
                <Accordion
                  style={{
                    width: "70%",
                  }}
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{option.label}</Accordion.Header>
                    <Accordion.Body>
                      {option.suboptions?.map((suboption, index2) => (
                        <Form.Group
                          className="mb-3"
                          style={{
                            borderRadius: "5px",
                            border: "1px solid #e0e0e0",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            textAlign: "left",
                            paddingLeft: "12px",
                          }}
                        >
                          <Form.Check
                            label={suboption.label}
                            type={item.questionType}
                            name={suboption.name}
                            value={suboption.id}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                item.id,
                                suboption.label,
                                item.questionType
                              )
                            }
                            checked={
                              item.questionType === "radio"
                                ? respuestas[suboption.name]
                                    ?.respuesta_texto === option.label
                                : respuestas[suboption.name]?.some(
                                    (item) =>
                                      item.respuesta_texto === suboption.label
                                  )
                            }
                            style={{
                              minHeight: "30px",
                              marginTop: "5px",
                            }}
                          />
                          {extraData[item.id - 1]?.suboptions && (
                            <>
                              <Button
                                variant="outline-light"
                                ref={(ref) =>
                                  (buttonRefs.current[
                                    `${item.id}${suboption.id}`
                                  ] = ref)
                                } // Asigna un ref al botón
                                onClick={() =>
                                  handleButtonClick(`${item.id}${suboption.id}`)
                                }
                              >
                                <InfoIcon width="20px" />
                              </Button>
                              <Overlay
                                target={
                                  buttonRefs.current[
                                    `${item.id}${suboption.id}`
                                  ]
                                }
                                show={
                                  tooltipStates[`${item.id}${suboption.id}`]
                                } //
                                placement="right"
                                key={`tool-${item.id}${suboption.id}`}
                              >
                                {(props) => (
                                  <Tooltip
                                    id={`tooltip-${item.id}${suboption.id}`}
                                    {...props}
                                  >
                                    {
                                      extraData[item.id - 1]?.suboptions[index1]
                                        ?.tooltips[index2]
                                    }
                                  </Tooltip>
                                )}
                              </Overlay>
                            </>
                          )}
                        </Form.Group>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
              {extraData[item.id - 1]?.isOpenQuestion && (
                <>
                  <Form.Group
                    style={{
                      width: "70%",
                    }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Otro"
                      value={inputValue}
                      onChange={(e) => handleTextChange(e, item.id)}
                    />
                  </Form.Group>
                </>
              )}
            </>
          ))}

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
            >
              Finalizar
            </Button>
          )}
          <div
            style={{ alignSelf: "center", marginTop: "10px", display: "none" }}
          >
            <Pagination>
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Empleabilidad;
