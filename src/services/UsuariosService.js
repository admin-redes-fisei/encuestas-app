const URL_acceso = "http://localhost:8084/pruebaTesis/";
//const URL_acceso = "https://hatunsoft.uta.edu.ec/back_encuestas/";

export async function iniciarSesion(username, password, aud) {
  const data = {
    username: username,
    password: password,
    aud: aud,
  };
  try {
    const respuesta = await fetch(`${URL_acceso}iniciarSesion.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!respuesta.ok) {
      throw new Error(`Error al iniciar sesión: ${respuesta.statusText}`);
    }

    const resultado = await respuesta.json();

    // Extraer los datos necesarios de la respuesta
    const { user, token } = resultado;

    return {
      user: user,
      token: token,
    };
  } catch (error) {
    console.error("Error:", error.message);
  }
}
