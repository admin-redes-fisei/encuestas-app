import Card from "react-bootstrap/Card";
import ApexPieChart from "./ApexPieChart.js";
import ApexBarChart from "./ApexBarChart.js";

function StatisticsQuestionCard({ questionData }) {
  return (
    <>
      <Card
        style={{
          width: "85%",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <Card.Body>
          <Card.Title>{questionData[0]?.pre_titulo}</Card.Title>
          <Card.Text
            style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}
          >
            {questionData[0]?.pre_texto}
          </Card.Text>
          <div
            style={{
              width: "100%",
              height:
                questionData[0].opc_padre !== null &&
                questionData[0].opc_padre !== ""
                  ? "800px"
                  : "300px",
              marginRight: "auto",
              marginLeft: "auto",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {questionData[0].opc_padre !== null &&
            questionData[0].opc_padre !== "" ? (
              <ApexBarChart data={questionData} />
            ) : (
              <ApexPieChart data={questionData} />
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default StatisticsQuestionCard;
