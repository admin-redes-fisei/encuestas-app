const URL_acceso = "http://localhost:8084/pruebaTesis/encuestas_services/";
//const URL_acceso = "https://hatunsoft.uta.edu.ec/encuestas/encuestas_back/";

export async function listarFacultades() {
  try {
    const respuesta = await fetch(`${URL_acceso}listarFacultades.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener las facultades");
    }

    const resultado = await respuesta.json();

    return resultado;
  } catch (error) {
    console.error("Error al obtener las facultades:", error);
  }
}

export async function agregarFacultad(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}agregarFacultad.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al agregar la facultad: ${respuesta.statusText}`);
    }
    console.log(respuesta);
    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function editarFacultad(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}editarFacultad.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar la facultad: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function eliminarFacultad(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}eliminarFacultad.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}
