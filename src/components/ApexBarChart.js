import ReactApexChart from "react-apexcharts";

function ApexBarChart({ data }) {
  const padres = [...new Set(data.map((item) => item.opc_padre))];

  const opPadre = (padre) => {
    const filtrado = data.filter((item) => item.opc_padre === padre);
    const hijos = [...new Set(filtrado.map((item) => item.res_texto))];
    return hijos;
  };

  const opValores = (padre) => {
    const filtrado = data.filter((item) => item.opc_padre === padre);
    const hijos = [...new Set(filtrado.map((item) => item.count_respuesta))];
    return hijos;
  };

  return (
    <div>
      <div id="chart">
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
                  height: 350,
                  toolbar: {
                    show: true, // Ocultar la barra de herramientas con opciones de descarga
                  },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    borderRadiusApplication: "end",
                    horizontal: true,
                    barHeight: "85%",
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
                  fontSize: "13px",
                  fontFamily: "Helvetica, Arial",
                  fontWeight: 400,
                  formatter: function (seriesName) {
                    return `${seriesName}`;
                  },
                  inverseOrder: false,
                  width: 250,
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
              width={800}
              height={110}
              key={cat}
            />
          </>
        ))}
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexBarChart;
