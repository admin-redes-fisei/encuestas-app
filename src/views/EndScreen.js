import Header from "../components/Header";
import { Card } from "react-bootstrap";
import FacebookIcon from "../assets/facebookIcon";
import InstagramIcon from "../assets/instagramIcon";
import MailIcon from "../assets/mailIcon";
import { useParams } from "react-router-dom";

function EndPage() {
  let { for_alias } = useParams();
  // Eliminar los elementos específicos de localStorage
  localStorage.removeItem("for_pub_preguntas");
  localStorage.removeItem("respuestas");
  localStorage.setItem("for_alias", JSON.stringify(for_alias));


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
      <Header />
      <div
        style={{
          width: "100%",
          height: "100vh",
          float: "right",
          padding: "20px",
          borderRadius: "25px",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <br />
        <div
          className="titles"
          style={{
            textAlign: "center",
            margin: "100px 40px",
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
                  <MailIcon /> <b>comunicacionuta@uta.edu.ec</b>
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
                  handleRedirect(
                    "https://www.instagram.com/utecnicaambato/?hl=es"
                  );
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
