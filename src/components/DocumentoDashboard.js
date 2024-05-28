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
const MyDocumentDashboard = ({ data, total, facultad, filtros }) => {
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
    const opcionesPadre = data?.map((item) => item.padre_opcion);
    return [...new Set(opcionesPadre)];
  };

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
            <Text style={styles.title}>{facultad.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Nombre de la Encuesta</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{data?.nombre_encuesta}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Número de encuestados</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{total}</Text>
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
            marginBottom: "20px",
          }}
        >
          Resultados por Pregunta
        </Text>
        {Array.isArray(filtros) && filtros.length > 0 && (
          <Text
            style={{
              fontSize: 12,
              textAlign: "left",
              marginBottom: "20px",
            }}
          >
            Filtros aplicados: {filtros.join(", ")}
          </Text>
        )}
        <br />
        {data?.preguntas?.map((valor, index) => (
          <div key={valor} style={{ marginBottom: "15px" }}>
            <Text style={[styles.text, { marginBottom: "10px" }]}>
              {index + 1}. {valor.titulo_pregunta}
            </Text>
            <br />
            <Text style={styles.text}>{valor.texto_pregunta}</Text>
            <br />
            <View
              style={{
                display: "table",
                width: "70%",
                fontFamily: "Tinos",
                borderStyle: "solid",
                borderColor: "#bfbfbf",
                borderWidth: 1,
                marginVertical: 10,
                marginHorizontal: "15%",
              }}
            >
              <View style={styles.tableRow}>
                <View
                  style={{
                    margin: 5,
                    fontSize: 10,
                    width: "80%",
                    textAlign: "center",
                  }}
                >
                  <Text>Opción de Respuesta</Text>
                </View>
                <br />
                <View
                  style={{
                    margin: 5,
                    fontSize: 10,
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  <Text>Recuento</Text>
                </View>
              </View>
              {valor?.opciones[0]?.padre_opcion === null ||
              valor?.opciones[0]?.padre_opcion === ""
                ? valor?.opciones?.map((pregunta) => (
                    <View style={styles.tableRow}>
                      <View
                        style={{
                          margin: 5,
                          fontSize: 10,
                          width: "80%",
                        }}
                      >
                        <Text>{pregunta.texto_opcion}</Text>
                      </View>
                      <br />
                      <View
                        style={{
                          margin: 5,
                          fontSize: 10,
                          width: "20%",
                          textAlign: "center",
                        }}
                      >
                        <Text>{pregunta.numero_selecciones}</Text>
                      </View>
                    </View>
                  ))
                : obtenerOpcionesPadreUnicas(valor.opciones)?.map((padre) => (
                    <View key={padre}>
                      <View
                        style={{
                          flexDirection: "row",
                          margin: "auto",
                          borderTop: "1px solid #bfbfbf",
                          width: "100%",
                          backgroundColor: "#F8F9FA",
                        }}
                      >
                        <View
                          style={{
                            margin: 5,
                            fontSize: 10,
                            width: "100%",
                          }}
                        >
                          <Text>{padre}</Text>
                        </View>
                      </View>
                      {valor?.opciones
                        ?.filter((item) => item.padre_opcion === padre)
                        ?.map((opc) => (
                          <View style={styles.tableRow} key={opc.id}>
                            <View
                              style={{ margin: 5, fontSize: 10, width: "80%" }}
                            >
                              <Text>{opc.texto_opcion}</Text>
                            </View>
                            <View
                              style={{
                                margin: 5,
                                fontSize: 10,
                                width: "20%",
                                textAlign: "center",
                              }}
                            >
                              <Text>{opc.numero_selecciones}</Text>
                            </View>
                          </View>
                        ))}
                    </View>
                  ))}
            </View>
          </div>
        ))}
      </Page>
    </Document>
  );
};

export default MyDocumentDashboard;
