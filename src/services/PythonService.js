const URL_acceso = "http://127.0.0.1:5000/";
//const URL_acceso = "https://hatunsoft.uta.edu.ec/back_encuestas/";

export async function enviarReglas(reglas) {
  try {
    const response = await fetch(`${URL_acceso}calcular_regla`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reglas),
    });
    if (!response.ok) {
      throw new Error("Error al enviar la solicitud.");
    }
    const data = await response.json();
    // Aquí puedes usar los valores recibidos, por ejemplo:
    console.log("Confianza:", data.confianza);
    console.log("Lift:", data.lift);
    console.log("Soporte:", data.soporte);
    // Puedes realizar otras acciones según lo necesites con estos valores
    return data; // Opcional: puedes retornar los datos si deseas usarlos en otro lugar de tu aplicación
  } catch (error) {
    console.error("Error al enviar la respuesta:", error);
    throw error; // Opcional: puedes manejar el error aquí o lanzarlo para ser manejado en otro lugar
  }
}
