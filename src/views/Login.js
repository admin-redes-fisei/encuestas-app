import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import * as Msal from "msal";
import { iniciarSesion } from "../services/UsuariosService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [aud, setAud] = useState("");
  const [ms, setMs] = useState(false);
  const navigate = useNavigate();

  const msalConfig = {
    auth: {
      clientId: "9beb7af4-2e55-47f1-99e1-1f1d313ce88a",
      redirectUri: window.location.origin,
    },
  };

  const msalInstance = new Msal.UserAgentApplication(msalConfig);

  useEffect(() => {
    if (ms) {
      handleSubmit();
      setMs(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, aud, ms]);

  const handleLoginMS = async () => {
    msalInstance.loginPopup().then((response) => {
      setUsername(response?.account.userName);
      setPassword("");
      setAud(response?.account.idToken.aud);
      setMs(true);
    });
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();

    try {
      iniciarSesion(username, password, aud).then((resultado) => {
        if (
          resultado &&
          resultado.user &&
          resultado.token &&
          parseInt(resultado.user.usu_estado) === 1
        ) {
          localStorage.setItem("token", JSON.stringify(resultado.token));
          localStorage.setItem("userdata", JSON.stringify(resultado.user));
          navigate("/home");
        } else {
          toast.error("Usuario o contraseña incorrectos", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <div>
      <div
        className="backgraund-container"
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="login-container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            width: "60vw",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
            borderRadius: "25px",
          }}
        >
          <div
            className="logo-section"
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "40vw",
              margin: "5%",
            }}
          >
            <div className="logo"></div>
            <div className="imagen">
              <img
                src="https://voipberry.com/wp-content/uploads/2021/09/banner001a01comp-768x707.png"
                alt="Descripción de la imagen"
                style={{ width: "400px" }}
              />
            </div>
          </div>
          <div
            className="form-section"
            style={{
              flex: "2",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://sistemaseducaciononline.uta.edu.ec/pluginfile.php/1/theme_adaptable/adaptablemarkettingimages/0/logo_uta.png"
              alt="Logo UTA"
              style={{ width: "100px" }}
            />
            <h2 style={{ margin: "0", textAlign: "center" }}>
              Universidad Técnica de Ambato
            </h2>
            <div className="formulario">
              <Form
                className="formLogin"
                onSubmit={handleSubmit}
                style={{
                  width: "20vw",
                  paddingTop: "20px",
                  justifyItems: "center",
                }}
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Correo Electrónico"
                  className="mb-3"
                >
                  <Form.Control
                    type="correo"
                    placeholder="name@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Contraseña">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
                <Button
                  type="submit"
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    backgroundColor: "#AA1415",
                    border: "none",
                  }}
                >
                  Ingresar
                </Button>
                <br />
                <br />
                <p style={{ margin: "0", textAlign: "left" }}>
                  Ingresar con tu cuenta en:
                </p>
                <Button
                  variant="light"
                  style={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                  onClick={handleLoginMS}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3deABR3--1J3lQFdFrwRyFlwE-uIY-ut4Tw&usqp=CAU"
                    alt="Logo Microsoft"
                    style={{ width: "25px", marginRight: "5px" }}
                  />
                  Microsoft Office 365
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
