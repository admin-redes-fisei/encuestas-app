import { useEffect, useState } from "react";
import logoLeft from "../assets/logoLeft.jpg";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { obtenerForSecciones } from "../services/FormulariosAppService";

Font.register({
  family: "Tinos",
  src: "http://fonts.gstatic.com/s/tinos/v9/R0GUby9C7Xd7F2g6Wjdydw.ttf",
});

// Define un estilo para el documento PDF
const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Tinos" },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 10,
    fontFamily: "Tinos",
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    fontFamily: "Tinos",
    textAlign: "justify",
  },
  table: {
    display: "table",
    width: "auto",
    fontFamily: "Tinos",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    margin: "auto",
    borderTop: "1px solid #bfbfbf",
    width: "100%",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    width: "50%",
  },
});

// Componente para renderizar el PDF
const MyDocumentEncuesta = ({ formularioId }) => {
  const [data, setData] = useState([]);
  // Obtener la fecha actual
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  // Formatear la fecha con ceros a la izquierda si es necesario
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  const obtenerOpcionesPadreUnicas = (data) => {
    const opcionesPadre = data.map((item) => item.opc_padre);
    return [...new Set(opcionesPadre)];
  };

  useEffect(() => {
    obtenerForSecciones(formularioId).then((datos) => {
      if (datos?.mensaje) {
        setData([]);
      } else {
        setData(datos);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logoLeft} style={{ width: "40px", height: "auto" }} />
          <br />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Text style={styles.title}>UNIVERSIDAD TÉCNICA DE AMBATO</Text>
            <Text style={styles.title}>{data?.fac_nombre?.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Nombre de la Encuesta</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{data?.for_nombre}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Fecha de Generación</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{formattedDate}</Text>
            </View>
          </View>
        </View>
        <br />
        <Text
          style={{
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Estructura de la encuesta
        </Text>
        <br />
        {data?.secciones?.map((seccion, index) => (
          <>
            {parseInt(seccion?.sec_estado) === 1 &&
              parseInt(seccion?.sec_eliminado) === 0 && (
                <>
                  <div key={seccion?.sec_id} style={{ marginBottom: "15px" }}>
                    <Text style={[styles.text, { fontWeight: "bold" }]}>
                      {seccion?.sec_nombre.toUpperCase()}
                    </Text>
                  </div>
                  {seccion?.preguntas?.map(
                    (pregunta, index) =>
                      parseInt(pregunta?.pre_estado) === 1 &&
                      parseInt(pregunta?.pre_eliminado) === 0 && (
                        <>
                          <div key={seccion} style={{ marginBottom: "15px" }}>
                            <Text
                              style={[styles.text, { marginBottom: "10px" }]}
                            >
                              {index + 1}. {pregunta?.pre_titulo}
                            </Text>
                            <Text
                              style={[styles.text, { marginBottom: "5px" }]}
                            >
                              {pregunta?.pre_texto}
                            </Text>
                            {pregunta?.opciones[0]?.opc_padre
                              ? obtenerOpcionesPadreUnicas(
                                  pregunta?.opciones
                                ).map((padre) => (
                                  <div>
                                    <Text
                                      style={[
                                        styles.text,
                                        {
                                          marginBottom: "5px",
                                          marginTop: "8px",
                                          marginLeft: "25px",
                                        },
                                      ]}
                                    >
                                      - {padre}
                                    </Text>
                                    {pregunta?.opciones
                                      ?.filter(
                                        (opcion) => opcion.opc_padre === padre
                                      )
                                      .map(
                                        (opcion, index) =>
                                          parseInt(opcion.opc_eliminado) ===
                                            0 && (
                                            <Text
                                              style={[
                                                styles.text,
                                                { marginLeft: "50px" },
                                              ]}
                                            >
                                              {index + 1}. {opcion.opc_label}
                                            </Text>
                                          )
                                      )}
                                  </div>
                                ))
                              : pregunta?.opciones?.map(
                                  (opcion, index) =>
                                    parseInt(opcion.opc_eliminado) === 0 && (
                                      <Text
                                        style={[
                                          styles.text,
                                          { marginLeft: "25px" },
                                        ]}
                                      >
                                        {index + 1}. {opcion.opc_label}
                                      </Text>
                                    )
                                )}
                            <div key={seccion} style={{ marginBottom: "10px" }}>
                              {parseInt(pregunta?.pre_es_abierta) === 1 && (
                                <Text
                                  style={[styles.text, { marginLeft: "25px" }]}
                                >
                                  {"- Otro"}
                                </Text>
                              )}
                            </div>
                          </div>
                        </>
                      )
                  )}
                </>
              )}
          </>
        ))}
      </Page>
    </Document>
  );
};

export default MyDocumentEncuesta;
