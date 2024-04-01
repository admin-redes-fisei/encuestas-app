import ReactApexChart from "react-apexcharts";

function ApexPieChart({ data }) {
  const valores = data
    .sort((a, b) => a.res_opcion_pertenece - b.res_opcion_pertenece)
    .map((item) => item.count_respuesta);

  const labels = data
    .sort((a, b) => a.res_opcion_pertenece - b.res_opcion_pertenece)
    .map((item) => item.res_texto);

  const seriesData = valores;
  const chartOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "right",
      horizontalAlign: "left",
      floating: true,
      fontSize: "13px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: function (seriesName, opts) {
        const percentage = opts.w.globals.seriesPercent[opts.seriesIndex]; // Obtiene el porcentaje y lo formatea
        return `${seriesName}: ${parseFloat(percentage).toFixed(2)}%`; // Concatena la serie y el porcentaje con un salto de línea
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
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={seriesData}
          type="pie"
          width={800}
          height={300}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexPieChart;
