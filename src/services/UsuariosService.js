//const URL_acceso = "http://localhost:8084/pruebaTesis/encuestas_services/";
const URL_acceso = "https://hatunsoft.uta.edu.ec/encuestas/encuestas_back/";

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

export async function listarUsuarios() {
  try {
    const respuesta = await fetch(`${URL_acceso}listarUsuarios.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    const resultado = await respuesta.json();

    return resultado;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}

export async function agregarUsuario(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}agregarUsuario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al agregar al usuario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function editarUsuario(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}editarUsuario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar el usuario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function cambiarClave(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}editarClaveUsuario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar el usuario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function eliminarUsuario(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}eliminarUsuario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar el usuario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}
