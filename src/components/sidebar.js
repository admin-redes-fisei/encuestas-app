import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

function StaticSideBar({ type, survey }) {
  const empleabilidad = [
    { id: 1, title: "Información General" },
    { id: 2, title: "Tendencias del Mercado Ocupacional" },
    { id: 3, title: "Demanda Ocupacional" },
    { id: 4, title: "Prospectiva del Desarrollo: Competencias" },
    { id: 5, title: "Roles y Funciones" },
  ];

  const bachilleres = [
    { id: 1, title: "Información General" },
    { id: 2, title: "Estudios de Educación Superior" },
    { id: 3, title: "Perspectiva y Carreras" },
    { id: 4, title: "Exploración de Conocimientos" },
  ];

  const sections = survey === 1 ? empleabilidad : bachilleres;

  const [mostrarElemento, setMostrarElemento] = useState(true);

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
  return (
    <>
      {mostrarElemento && (
        <Nav
          defaultActiveKey="/home"
          className="flex-column"
          style={{
            backgroundColor: "#F5F5F5",
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
            padding: " 20px 10px 0px 0px",
            borderRadius: "25px",
          }}
        >
          <Image
            src="https://scontent.fatf4-1.fna.fbcdn.net/v/t1.6435-9/62341068_2455256624709766_5605034734775173120_n.png?_nc_cat=111&ccb=1-7&_nc_sid=7a1959&_nc_eui2=AeG2cof6YKn497zfN32YUhuUtRgC5iagyYu1GALmJqDJi4SS7T6bEXmlOuTaGIT1Wme09wSLLLnNJhy60b0A3T2i&_nc_ohc=mza4YPo7YTkAX9VP1Lo&_nc_ht=scontent.fatf4-1.fna&oh=00_AfBAJIHcUkiwKMRPOppPlqN3_H-7qwD9DLDNgJuFF8WRFg&oe=660622BC"
            roundedCircle
            width="100px"
          />

          {sections.map((section) => (
            <Nav.Link
              key={section.id}
              eventKey="disabled"
              disabled
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
                  backgroundColor: type < section.id ? "#D9D9D9" : "#aa1415",
                  borderRadius: "50%",
                  display: "flex",
                  float: "left",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                {type > section.id ? (
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
                        color: type === section.id ? "#fff" : "#666666",
                        textAlign: "left",
                      }}
                    >
                      {section.id}
                    </span>
                  </strong>
                )}
              </div>
              <p
                style={{
                  color: type === section.id ? "#000000" : "#666666",
                  textAlign: "left",
                }}
              >
                <strong>{section.title}</strong>
              </p>
            </Nav.Link>
          ))}
        </Nav>
      )}
    </>
  );
}

export default StaticSideBar;
