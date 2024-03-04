import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CheckboxesGroup = ({ idPregunta, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (optionId, label, isChecked) => {
    if (isChecked) {
      const newSelectedOptions = [
        ...selectedOptions,
        { idPregunta, opcion_id: optionId, respuesta_texto: label },
      ];
      setSelectedOptions(newSelectedOptions);
    } else {
      const newSelectedOptions = selectedOptions.filter(
        (option) => option.opcion_id !== optionId
      );  
      setSelectedOptions(newSelectedOptions);
    }
  };

  return (
    <Form>
      {options.map((option) => (
        <Form.Check
          key={option.idOpcion}
          type="checkbox"
          id={option.idOpcion}
          label={option.label}
          onChange={(e) =>
            handleOptionChange(option.idOpcion, option.label, e.target.checked)
          }
        />
      ))}
      {/* Aquí podrías incluir cualquier otra información adicional que necesites */}
    </Form>
  );
};

export default CheckboxesGroup;
