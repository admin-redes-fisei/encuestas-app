//const URL_acceso = "http://localhost:8084/pruebaTesis/encuestas_services/";
const URL_acceso = "https://hatunsoft.uta.edu.ec/encuestas/encuestas_back/";

export async function listarFormularios() {
  try {
    const respuesta = await fetch(`${URL_acceso}listarFormularios.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener los formularios");
    }

    const resultado = await respuesta.json();

    return resultado;
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
  }
}

export async function obtenerFormularioFacultad(facultadId, tipoFormulario) {
  try {
    const respuesta = await fetch(
      `${URL_acceso}obtenerFormularioFacultad.php?facultad_id=${facultadId}&tipo_formulario=${tipoFormulario}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!respuesta.ok) {
      throw new Error("Error al obtener las carreras");
    }

    const resultado = await respuesta.json();

    return resultado;
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
  }
}

export async function obtenerForSecciones(formularioId) {
  try {
    const respuesta = await fetch(
      `${URL_acceso}listarForSecciones.php?formulario_id=${formularioId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!respuesta.ok) {
      throw new Error("Error al obtener las carreras");
    }

    const resultado = await respuesta.json();

    return resultado;
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
  }
}

export async function obtenerAlias(formularioId) {
  try {
    const respuesta = await fetch(
      `${URL_acceso}listarForAlias.php?formulario_id=${formularioId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!respuesta.ok) {
      throw new Error("Error al obtener las carreras");
    }

    const resultado = await respuesta.json();

    return resultado;
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
  }
}

export async function agregarFormulario(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}agregarFormulario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al agregar el formulario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function editarFormulario(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}editarFormulario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar el formulario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function editarFormularioActivo(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}editarFormularioActivo.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar el formulario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function duplicarFormulario(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}duplicarFormulario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al duplicar el formulario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function eliminarFormulario(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}eliminarFormulario.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al eliminar el formulario: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function editarSeccion(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}editarSeccion.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar la seccion: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function agregarSeccion(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}agregarSeccion.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al agregar la seccion: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function eliminarSeccion(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}eliminarSeccion.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al eliminar la seccion: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function agregarPregunta(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}agregarPregunta.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al agregar la pregunta: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function editarPregunta(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}editarPregunta.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar la pregunta: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function duplicarPregunta(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}duplicarPregunta.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al duplicar la pregunta: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function eliminarPregunta(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}eliminarPregunta.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al eliminar la pregunta: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function agregarOpcion(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}agregarOpcion.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al agregar la opcion: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function editarOpcion(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}editarOpcion.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al editar la opcion: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function eliminarOpcion(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}eliminarOpcion.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al eliminar la opcion: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function restaurarOpcion(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}restaurarOpcion.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al restaurar la opcion: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}
