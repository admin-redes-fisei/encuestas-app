import {
  Accordion,
  Button,
  Card,
  Form,
  Image,
  Overlay,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import InfoIcon from "../assets/infoIncon";
import { useEffect, useRef, useState } from "react";
import IdeaIcon from "../assets/infoIncon copy";

function OptionsQuestionCard({
  question,
  handleCheckChange,
  handleOtrosChange,
  respuestas,
}) {
  //para almacenar secciones
  const [subsecciones, setSubsecciones] = useState([]);
  useEffect(() => {
    seleccionarSecciones(question.options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //para tooltip
  const [tooltipStates, setTooltipStates] = useState({});
  const buttonRefs = useRef([]);
  //para campos de texto
  const [respuestasTexto, setRespuestaTexto] = useState("");
  const [inputValue, setInputValue] = useState(
    (respuestas["otros"] &&
      respuestas["otros"].find((otro) => otro.pregunta_id === question.id)
        ?.respuesta_otra_texto) ||
      ""
  );
  //para provincia y ciudad
  const options = [
    {
      id: 1,
      name: "residencia",
      provincia: "Cotopaxi",
      ciudades: [
        "Latacunga",
        "La Maná",
        "Pangua",
        "Pujilí",
        "Salcedo",
        "Saquisilí",
        "Sigchos",
      ],
    },
    {
      id: 2,
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
      id: 3,
      name: "residencia",
      provincia: "Pastaza",
      ciudades: ["Puyo", "Arajuno", "Mera", "Santa Clara"],
    },
    {
      id: 4,
      name: "residencia",
      provincia: "Tungurahua",
      ciudades: [
        "Ambato",
        "Baños",
        "Cevallos",
        "Mocha",
        "Pelileo",
        "Patate",
        "Píllaro",
        "Quero",
      ],
    },
    {
      id: 5,
      name: "residencia",
      provincia: "Otra",
      ciudades: [],
    },
  ];
  const [selectedProvincia, setsSlectedProvincia] = useState(
    options.find(
      (op) =>
        op.provincia ===
        (respuestas["otros"] &&
          respuestas["otros"].find((otro) => otro.pregunta_id === question.id)
            ?.respuesta_otra_texto)
    )?.id || 0
  );
  //para pregunta respondida
  const [respondida, setRespondida] = useState(respuestas[question.pre_alias]);

  //para tooltip
  const handleButtonClick = (optionId) => {
    setTooltipStates((prevState) => ({
      ...prevState,
      [optionId]: !prevState[optionId], // Cambia el estado del tooltip específico
    }));
  };

  //para campos de texto
  const handleTextChange = (e, pregunta_id) => {
    const { value } = e.target;
    setInputValue(e.target.value);
    setRespuestaTexto({
      pregunta_id: pregunta_id,
      respuesta_otra_texto: value,
    });
    handleOtrosChange(respuestasTexto);
  };

  //para almacenar secciones
  const seleccionarSecciones = (opciones) => {
    const opcionesOrdenadas = opciones.sort(
      (a, b) => a.question_option - b.question_option
    );
    const seccionesSet = new Set();
    opcionesOrdenadas.forEach((item) => {
      seccionesSet.add(item.padre);
    });

    const secciones = Array.from(seccionesSet);
    setSubsecciones(secciones);
  };

  return (
    <Card
      style={{
        width: "95%",
        display: question.questionType === "ciudad" ? "none" : "flex",
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden",
      }}
    >
      <Card.Header
        as="h5"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {question.requerida === 1 ? <p style={{ color: "red" }}>*</p> : <p></p>}
        {question.title}{" "}
        {question.pre_tooltip_texto ? (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id={7}>
                <Image
                  src={question.pre_tooltip_imagen}
                  style={{ height: "auto", width: "100%" }}
                />
                {question.pre_tooltip_texto}
              </Tooltip>
            }
          >
            <Button
              variant="light"
              className="d-inline-flex align-items-center"
            >
              <IdeaIcon />
            </Button>
          </OverlayTrigger>
        ) : (
          <p></p>
        )}
      </Card.Header>
      <Card.Body style={{ padding: "20px" }}>
        <Card.Text>{question.question}</Card.Text>
        <div
          style={{
            width: "fit-content",
            maxWidth: "60%",
            padding: "10px",
            textAlign: "left",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {(question.questionType === "radio" ||
            question.questionType === "checkbox") && (
            <div>
              {question.options?.map((option, index) => (
                <Form.Group
                  className="mb-3"
                  key={option.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Check
                    label={option.label}
                    type={question.questionType}
                    name={option.name}
                    value={option.id}
                    style={{
                      minHeight: "30px",
                      marginTop: "5px",
                      whiteSpace: "normal",
                      marginRight: "5px",
                    }}
                    onChange={(e) => {
                      handleCheckChange(
                        e,
                        question.id,
                        option.label,
                        question.questionType
                      );
                      setRespondida(e.target.checked);
                    }}
                    checked={
                      question.questionType === "radio"
                        ? respuestas[option.name]?.respuesta_texto ===
                          option.label
                        : respuestas[option.name]?.some(
                            (item) => item.respuesta_texto === option.label
                          )
                    }
                  />
                  {option.tooltip_texto && (
                    <>
                      <Button
                        variant="outline-light"
                        ref={(ref) =>
                          (buttonRefs.current[`${question.id}${option.id}`] =
                            ref)
                        } // Asigna un ref al botón
                        onClick={() =>
                          handleButtonClick(`${question.id}${option.id}`)
                        }
                      >
                        <InfoIcon width="20px" />
                      </Button>
                      <Overlay
                        target={
                          buttonRefs.current[`${question.id}${option.id}`]
                        }
                        show={tooltipStates[`${question.id}${option.id}`]} //
                        placement="bottom"
                        key={`${question.id}${option.id}`}
                      >
                        {(props) => (
                          <Tooltip id={`${question.id}${option.id}`} {...props}>
                            {option.tooltip_img && (
                              <Image
                                src={option.tooltip_img}
                                style={{ height: "auto", width: "100%" }}
                              />
                            )}
                            {option.tooltip_texto}
                          </Tooltip>
                        )}
                      </Overlay>
                    </>
                  )}
                </Form.Group>
              ))}
            </div>
          )}
          {question.questionType === "scale" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              {question.options?.map((option, index) => (
                <Form.Group className="mb-3" key={option.id}>
                  <Form.Check
                    label={option.label}
                    type={"radio"}
                    name={option.name}
                    value={option.id}
                    onChange={(e) => {
                      handleCheckChange(
                        e,
                        question.id,
                        option.label,
                        question.questionType
                      );
                      setRespondida(e.target.checked);
                    }}
                    checked={
                      respuestas[option.name]?.respuesta_texto === option.label
                    }
                  />
                  {option.tooltip_texto && (
                    <>
                      <Button
                        variant="outline-light"
                        ref={(ref) =>
                          (buttonRefs.current[`${question.id}${option.id}`] =
                            ref)
                        } // Asigna un ref al botón
                        onClick={() =>
                          handleButtonClick(`${question.id}${option.id}`)
                        }
                      >
                        <InfoIcon width="20px" />
                      </Button>
                      <Overlay
                        target={
                          buttonRefs.current[`${question.id}${option.id}`]
                        }
                        show={tooltipStates[`${question.id}${option.id}`]} //
                        placement="bottom"
                        key={`${question.id}${option.id}`}
                      >
                        {(props) => (
                          <Tooltip id={`${question.id}${option.id}`} {...props}>
                            {option.tooltip_img && (
                              <Image
                                src={option.tooltip_img}
                                style={{ height: "auto", width: "100%" }}
                              />
                            )}
                            {option.tooltip_texto}
                          </Tooltip>
                        )}
                      </Overlay>
                    </>
                  )}
                </Form.Group>
              ))}
            </div>
          )}
          {question.questionType === "accordeon" && (
            <div
              style={{
                width: "fit-content",
                maxWidth: "60%",
                padding: "10px",
                textAlign: "left",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {subsecciones?.map((subseccion) => (
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{subseccion}</Accordion.Header>
                    <Accordion.Body>
                      {question.options
                        ?.filter((option) => option.padre === subseccion)
                        ?.sort((a, b) => b.question_option - a.question_option)
                        .map((option) => (
                          <Form.Group
                            className="mb-3"
                            key={option.id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Form.Check
                              label={option.label}
                              type="checkbox"
                              name={option.name}
                              value={option.id}
                              style={{
                                minHeight: "30px",
                                marginTop: "5px",
                                whiteSpace: "normal",
                                marginRight: "5px",
                              }}
                              onChange={(e) =>
                                handleCheckChange(
                                  e,
                                  question.id,
                                  option.label,
                                  "checkbox"
                                )
                              }
                              checked={respuestas[option.name]?.some(
                                (item) => item.respuesta_texto === option.label
                              )}
                            />
                            {option.tooltip_texto && (
                              <>
                                <Button
                                  variant="outline-light"
                                  ref={(ref) =>
                                    (buttonRefs.current[
                                      `${question.id}${option.id}`
                                    ] = ref)
                                  } // Asigna un ref al botón
                                  onClick={() =>
                                    handleButtonClick(
                                      `${question.id}${option.id}`
                                    )
                                  }
                                >
                                  <InfoIcon width="20px" />
                                </Button>
                                <Overlay
                                  target={
                                    buttonRefs.current[
                                      `${question.id}${option.id}`
                                    ]
                                  }
                                  show={
                                    tooltipStates[`${question.id}${option.id}`]
                                  } //
                                  placement="bottom"
                                  key={`${question.id}${option.id}`}
                                >
                                  {(props) => (
                                    <Tooltip
                                      id={`${question.id}${option.id}`}
                                      {...props}
                                    >
                                      {option.tooltip_img && (
                                        <Image
                                          src={option.tooltip_img}
                                          style={{
                                            height: "auto",
                                            width: "100%",
                                          }}
                                        />
                                      )}
                                      {option.tooltip_texto}
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
            </div>
          )}
          {question.questionType === "text" && (
            <div
              style={{
                width: "fit-content",
                maxWidth: "60%",
                padding: "10px",
                textAlign: "left",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Form.Group
                style={{
                  width: "100%",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Nombre del Colegio"
                  value={inputValue}
                  onChange={(e) => handleTextChange(e, question.id)}
                />
              </Form.Group>
            </div>
          )}
          {question.questionType === "provincia" && (
            <div
              style={{
                width: "fit-content",
                maxWidth: "60%",
                padding: "10px",
                textAlign: "left",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Form.Select
                defaultValue={selectedProvincia}
                name="provincia"
                onChange={(e) => {
                  setsSlectedProvincia(parseInt(e.target.value) - 1);
                  handleOtrosChange({
                    pregunta_id: question.id,
                    respuesta_otra_texto: options.find(
                      (op) => op.id === parseInt(e.target.value)
                    )?.provincia,
                  });
                }}
              >
                <option key={0} value={0}>
                  Seleccione
                </option>
                {options.map((opcion) => (
                  <option key={opcion.id} value={opcion.id}>
                    {opcion.provincia}
                  </option>
                ))}
              </Form.Select>
              <br />
              <p>
                <strong>Ciudad</strong>
              </p>
              <br />
              <Form.Select
                defaultValue={
                  options[selectedProvincia].ciudades.findIndex(
                    (op) =>
                      op ===
                      (
                        respuestas["otros"] &&
                        respuestas["otros"].find((otro) => otro.pregunta_id) ===
                          parseInt(question.id) + 1
                      )?.respuesta_otra_texto
                  ) || 0
                }
                name="ciudad"
                disabled={selectedProvincia === 4}
                onChange={(e) => {
                  handleOtrosChange({
                    pregunta_id: parseInt(question.id) + 1,
                    respuesta_otra_texto:
                      options[selectedProvincia].ciudades[
                        parseInt(e.target.value)
                      ],
                  });
                }}
              >
                <option key={0} value={0}>
                  Seleccione
                </option>
                {options[
                  selectedProvincia ? selectedProvincia : 0
                ].ciudades.map((opcion, index) => (
                  <option key={index} value={index}>
                    {opcion}
                  </option>
                ))}
              </Form.Select>
            </div>
          )}
          {parseInt(question.isOpenQuestion) === 1 && (
            <Form.Group
              style={{
                width: "100%",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Otro"
                value={inputValue}
                onChange={(e) => handleTextChange(e, question.id)}
              />
            </Form.Group>
          )}
        </div>
      </Card.Body>
      {question.pre_url_imagen && parseInt(question.pre_tipo_imagen) === 2 ? (
        respondida && <Card.Img variant="top" src={question.pre_url_imagen} />
      ) : (
        <Card.Img variant="top" src={question.pre_url_imagen} />
      )}
    </Card>
  );
}

export default OptionsQuestionCard;
