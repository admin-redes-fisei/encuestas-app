import React from "react";
import ReactApexChart from "react-apexcharts";

function ApexRadialChart({series}) {
  const chartOptions = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: "60%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          enabled: false,
          show: false,
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "12px",
            display: "none",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };
  const seriess = [series*100]

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={seriess}
          type="radialBar"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexRadialChart;
