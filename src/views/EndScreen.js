import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Card } from "react-bootstrap";
import FacebookIcon from "../assets/facebookIcon";
import InstagramIcon from "../assets/instagramIcon";
import MailIcon from "../assets/mailIcon";

function EndPage() {
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

    // Agrega el evento al montar el componente
    window.addEventListener("resize", handleResize);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRedirect = (url) => {
    window.open(url, "_blank"); // Abre el URL en una nueva ventana del navegador
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: ampliarElemento ? "70%" : "100%",
          height: "90vh",
          float: "right",
          margin: "20px",
          borderRadius: "25px",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Header />
        <br />
        <div
          className="titles"
          style={{
            textAlign: "center",
            margin: "20px 40px",
            width: "60%",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <h2>
            <strong>¡GRACIAS!</strong>
          </h2>
          <p>
            Tu opinión es muy valiosa para nosotros. Agradecemos sinceramente
            que hayas dedicado tiempo a completar esta encuesta. Toda la
            información proporcionada será tratada con confidencialidad y
            utilizada para mejorar nuestros servicios.
          </p>
        </div>
        <div
          className="contactsection2"
          style={{
            justifyContent: "space-around",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          <div
            className="cardemail"
            style={{
              display: "flex",
              float: "left",
              flexDirection: "column",
              textAlign: "left",
              marginTop: "15%",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "0px",
              }}
            >
              <b>CONTACTANOS</b>
            </p>
            <h1>
              <b style={{ color: "#AA1415" }}>E-mail</b>
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                width: "100%",
              }}
            >
              <Card>
                <Card.Body>
                  <MailIcon /> <b>informacion.fisei@uta.edu.ec</b>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div
            className="cardredes"
            style={{
              display: "flex",
              float: "right",
              flexDirection: "column",
              marginTop: "5%",
              marginLeft: "5%",
              marginRight: "5%",
              textAlign: "right",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "0px",
              }}
            >
              <b>VISITANOS EN NUESTRAS</b>
            </p>
            <h1>
              <b style={{ color: "#AA1415" }}>Redes Sociales</b>
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "75%",
                marginLeft: "20%",
              }}
            >
              <FacebookIcon
                onClick={() => {
                  handleRedirect(
                    "https://www.facebook.com/UniversidadTecnicadeAmbatoOficial/?locale=es_LA"
                  );
                }}
                style={{ cursor: "pointer" }}
              />
              <InstagramIcon
                onClick={() => {
                  handleRedirect("https://fisei.uta.edu.ec/v4.0/");
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndPage;
