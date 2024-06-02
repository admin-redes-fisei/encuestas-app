import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

function EncuestaSideBar() {
  //para navegacion
  const navigate = useNavigate();
  const sections = JSON.parse(localStorage.getItem("for_pub_secciones"));
  const [mostrarElemento, setMostrarElemento] = useState(true);
  const rutaActual = window.location.pathname;
  const partesRuta = rutaActual.split("/");
  const rutaRaiz = partesRuta.slice(0, -1).join("/");
  const seccionIndex = String(partesRuta[partesRuta.length - 1]);

  useEffect(() => {
    // Escucha el cambio de tamaño de la ventana
    const handleResize = () => {
      const anchoVentana = window.innerWidth;
      if (anchoVentana <= 644) {
        setMostrarElemento(false);
      } else {
        setMostrarElemento(true);
      }
    };

    // Agrega el evento al montar el componente
    window.addEventListener("resize", handleResize);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //para redirigir
  const handleRedirect = (index) => {
    const rutaDestino = `${rutaRaiz}/${index}`;
    navigate(rutaDestino);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {mostrarElemento && (
        <Nav
          defaultActiveKey="/home"
          className="flex-column"
          style={{
            backgroundColor: "#FFF",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
            padding: " 20px 10px 0px 0px",
            borderRadius: "10px",
            height: "auto",
            width: "20%",
            position: "fixed",
            left: 0,
            marginTop: "125px",
          }}
        >
          {sections.map((section, index) => (
            <Nav.Link
              as={Button}
              variant="link"
              onClick={() => {
                handleRedirect(index);
              }}
              key={index}
              style={{
                width: "100%",
                margin: "20px 10px",
              }}
            >
              <div
                className="circle"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: seccionIndex < index ? "#D9D9D9" : "#aa1415",
                  borderRadius: "50%",
                  display: "flex",
                  float: "left",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                {seccionIndex > index ? (
                  <svg
                    fill="#FFFFFF"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ) : (
                  <strong>
                    <span
                      style={{
                        // eslint-disable-next-line eqeqeq
                        color: seccionIndex == index ? "#fff" : "#666666",
                        textAlign: "left",
                      }}
                    >
                      {index + 1}
                    </span>
                  </strong>
                )}
              </div>
              <p
                style={{
                  // eslint-disable-next-line eqeqeq
                  color: seccionIndex == index ? "#000000" : "#666666",
                  textAlign: "left",
                }}
              >
                <strong>{section}</strong>
              </p>
            </Nav.Link>
          ))}
        </Nav>
      )}
    </>
  );
}

export default EncuestaSideBar;
