import { Button, Card, Form, Image, Overlay, Tooltip } from "react-bootstrap";
import InfoIcon from "../assets/infoIncon";
import { useRef, useState } from "react";

function OptionsQuestionCard({ question }) {
  //para tooltip
  const [tooltipStates, setTooltipStates] = useState({}); // Estado individual para cada tooltip
  const buttonRefs = useRef([]); // Array de refs para los botones
  console.log(question);

  const handleButtonClick = (optionId) => {
    setTooltipStates((prevState) => ({
      ...prevState,
      [optionId]: !prevState[optionId], // Cambia el estado del tooltip específico
    }));
  };

  //para campos de texto
  const [respuestasTexto, setRespuestaTexto] = useState("");
  const [inputValue, setInputValue] = useState("");

  /*useEffect(() => {
    const text = respuestas["otros"]?.some(
      (op) => op.pregunta_id === currentPage
    )
      ? respuestas["otros"]?.some((op) => op.pregunta_id === currentPage)
          .respuesta_otra_texto
      : "";
    setInputValue(text);
  }, [currentPage]);*/

  const handleTextChange = (e, pregunta_id) => {
    const { value } = e.target;
    setInputValue(e.target.value);
    setRespuestaTexto({
      pregunta_id: pregunta_id,
      respuesta_otra_texto: value,
    });
  };
  /*const handleChange = (respuestasTexto) => {
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
  };*/

  return (
    <Card
      style={{
        width: "95%",
        display: "flex",
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <Card.Body>
        <Card.Title>{question.title}</Card.Title>
        <Card.Text>{question.question}</Card.Text>
        <div
          style={{
            width: "fit-content",
            maxWidth: "90%",
            padding: "10px",
            textAlign: "left",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
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
              />
              {option.tooltip_texto && (
                <>
                  <Button
                    variant="outline-light"
                    ref={(ref) =>
                      (buttonRefs.current[`${question.id}${option.id}`] = ref)
                    } // Asigna un ref al botón
                    onClick={() =>
                      handleButtonClick(`${question.id}${option.id}`)
                    }
                  >
                    <InfoIcon width="20px" />
                  </Button>
                  <Overlay
                    target={buttonRefs.current[`${question.id}${option.id}`]}
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
          {question.isOpenQuestion == 1 && (
            <Form.Group
              style={{
                width: "70%",
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
      {question.pre_url_imagen && (
        <Card.Img
          variant="top"
          src="https://firebasestorage.googleapis.com/v0/b/encuestas-71bc8.appspot.com/o/carrera-sw.png?alt=media&token=df9c5e9b-6c2c-4e08-8c33-9d1cd29da045"
        />
      )}
    </Card>
  );
}

export default OptionsQuestionCard;
