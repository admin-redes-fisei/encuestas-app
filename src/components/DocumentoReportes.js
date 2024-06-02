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
const MyDocument = ({ data, preguntasId, formulario, total, facultad }) => {
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
              <Text>{formulario}</Text>
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
          }}
        >
          Resultados por Pregunta
        </Text>
        <br />
        {preguntasId.map((valor, index) => (
          <div key={valor} style={{ marginBottom: "15px" }}>
            <Text style={styles.text}>
              {index + 1}.{" "}
              {
                data.filter(
                  (item) =>
                    parseInt(item.res_pregunta_pertenece) === parseInt(valor)
                )[0].pre_titulo
              }
            </Text>
            <br />
            <Text style={styles.text}>
              {
                data.filter(
                  (item) =>
                    parseInt(item.res_pregunta_pertenece) === parseInt(valor)
                )[0].pre_texto
              }
            </Text>
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
              {data.filter(
                (item) =>
                  parseInt(item.res_pregunta_pertenece) === parseInt(valor)
              )[0].opc_padre === null ||
              data.filter(
                (item) =>
                  parseInt(item.res_pregunta_pertenece) === parseInt(valor)
              )[0].opc_padre === ""
                ? data
                    .filter(
                      (item) =>
                        parseInt(item.res_pregunta_pertenece) ===
                        parseInt(valor)
                    )
                    .map((pregunta) => (
                      <View style={styles.tableRow}>
                        <View
                          style={{
                            margin: 5,
                            fontSize: 10,
                            width: "80%",
                          }}
                        >
                          <Text>{pregunta.res_texto}</Text>
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
                          <Text>{pregunta.count_respuesta}</Text>
                        </View>
                      </View>
                    ))
                : obtenerOpcionesPadreUnicas(
                    data.filter(
                      (item) =>
                        parseInt(item.res_pregunta_pertenece) ===
                        parseInt(valor)
                    )
                  ).map((padre) => (
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
                      {data
                        .filter(
                          (item) =>
                            parseInt(item.res_pregunta_pertenece) ===
                              parseInt(valor) && item.opc_padre === padre
                        )
                        .map((opc) => (
                          <View style={styles.tableRow} key={opc.id}>
                            <View
                              style={{ margin: 5, fontSize: 10, width: "80%" }}
                            >
                              <Text>{opc.res_texto}</Text>
                            </View>
                            <View
                              style={{
                                margin: 5,
                                fontSize: 10,
                                width: "20%",
                                textAlign: "center",
                              }}
                            >
                              <Text>{opc.count_respuesta}</Text>
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

export default MyDocument;
