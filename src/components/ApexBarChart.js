import ReactApexChart from "react-apexcharts";

function ApexBarChart({ data }) {
  const padres = [...new Set(data.map((item) => item.opc_padre))];

  const opPadre = (padre) => {
    const filtrado = data.filter((item) => item.opc_padre === padre);
    const hijos = filtrado.map((item) => item.res_texto);
    return hijos;
  };

  const opValores = (padre) => {
    const filtrado = data.filter((item) => item.opc_padre === padre);
    const hijos = filtrado.map((item) => item.count_respuesta);
    // Ordenar los hijos por el valor del contador count_respuesta
    return hijos;
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {padres.map((cat) => (
        <>
          <span
            style={{
              marginBottom: "20px",
            }}
          >
            {cat}
          </span>
          <ReactApexChart
            style={{ marginTop: "-25px", marginBottom: "-10px" }}
            options={{
              chart: {
                type: "bar",
                height: 352,
                toolbar: {
                  show: true,
                },
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  borderRadiusApplication: "end",
                  horizontal: true,
                  distributed: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              legend: {
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: "right",
                horizontalAlign: "left",
                floating: false,
                fontSize: "11px",
                fontFamily: "Helvetica, Arial",
                fontWeight: 400,
                formatter: function (seriesName) {
                  return `${seriesName}`;
                },
                inverseOrder: false,
                width: 400,
                height: undefined,
                tooltipHoverFormatter: undefined,
                customLegendItems: [],
                markers: {
                  width: 12,
                  height: 12,
                  strokeWidth: 0,
                  strokeColor: "#fff",
                  fillColors: undefined,
                  radius: 12,
                  customHTML: undefined,
                  onClick: undefined,
                  offsetX: 0,
                  offsetY: 0,
                },
                itemMargin: {
                  horizontal: 5,
                  vertical: 0,
                },
                onItemClick: {
                  toggleDataSeries: true,
                },
                onItemHover: {
                  highlightDataSeries: true,
                },
              },
              xaxis: {
                categories: opPadre(cat),
                labels: {
                  show: false, // Ocultar las etiquetas del eje x
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              grid: {
                padding: {
                  top: 0,
                  bottom: 0,
                },
                margin: {
                  top: 0,
                  bottom: 0,
                },
              },
            }}
            series={[{ data: opValores(cat) }]}
            type="bar"
            width="100%"
            height={110}
            key={cat}
          />
        </>
      ))}
    </div>
  );
}

export default ApexBarChart;
