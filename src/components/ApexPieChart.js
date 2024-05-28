import ReactApexChart from "react-apexcharts";

function ApexPieChart({ data }) {
  const valores = data
    .sort((a, b) => a.res_opcion_pertenece - b.res_opcion_pertenece)
    .map((item) => parseInt(item.count_respuesta));

  const labels = data
    .sort((a, b) => a.res_opcion_pertenece - b.res_opcion_pertenece)
    .map((item) => item.res_texto);

  const seriesData = valores;
  const chartOptions = {
    chart: {
      width: 180,
      type: "pie",
      toolbar: {
        show: true, // Ocultar la barra de herramientas con opciones de descarga
      },
    },
    plotOptions: {
      pie: {
        size: 10,
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "12px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: function (seriesName) {
        return `${seriesName}`;
      },
      inverseOrder: false,
      width: "100%",
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
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div style={{ height: "100%", width:"100%" }}>
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="pie"
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default ApexPieChart;
