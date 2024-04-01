import Card from "react-bootstrap/Card";
import ApexPieChart from "./ApexPieChart.js";

function StatisticsQuestionCard({ questionData }) {
  return (
    <>
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
              width: "100%",
              height: "300px",
              marginRight: "auto",
              marginLeft: "auto",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <ApexPieChart data={questionData} />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default StatisticsQuestionCard;
