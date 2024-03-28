import Card from "react-bootstrap/Card";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

function StatisticsQuestionCard({ questionData }) {
  const colores = [
    "#FF638480",
    "#36A2EB80",
    "#FFCE5680",
    "#4BC0C080",
    "#9966FF80",
  ];
  const coloresHover = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  return (
    <Card
      style={{
        width: "70%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "10px",
        marginBottom: "20px",
      }}
    >
      <Card.Body>
        <Card.Title>{questionData[0]?.pre_titulo}</Card.Title>
        <Card.Text>{questionData[0]?.pre_texto}</Card.Text>
        <div
          style={{
            width: "60%",
            marginRight: "auto",
            marginLeft: "auto",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Doughnut
            data={{
              labels: questionData?.map((item) => item.res_texto),
              datasets: [
                {
                  label: questionData[0]?.pre_alias,
                  data: questionData?.map((item) => item.count_respuesta),
                  backgroundColor: colores,
                  hoverBackgroundColor: coloresHover,
                  borderRadius: 5,
                },
              ],
              options: {
                plugins: {
                  legend: {
                    position: "bottom",
                    align: "start",
                  },
                },
              },
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default StatisticsQuestionCard;
