import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

function ReStackedBarChart({ data, onOptionClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [padres, setPadres] = useState([
    ...new Set(data.map((item) => item.padre)),
  ]);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  useEffect(() => {
    setPadres([...new Set(data.map((item) => item.padre))]);
  }, [data]);

  const onBarEnter = (_, index) => {
    setActiveIndex(index);
  };

  const clickOption = (index) => {
    if (index !== null) {
      const selectedName = data[index];
      onOptionClick(selectedName);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="recharts-default-tooltip"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #ccc",
            padding: "10px",
            width: "180px",
          }}
        >
          <p className="recharts-tooltip-label">{`Cantidad: ${payload[0].value}`}</p>
          <p className="recharts-tooltip-item">{`${payload[0].payload.name}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="80%">
      <div style={{ display: "flex" }}>
        {padres.map((padre) => (
          <div key={padre} style={{ display: "flex", flexDirection: "column" }}>
            <BarChart
              width={100}
              height={220}
              data={data.filter(
                (item) => item.name !== "Otra" && item.padre === padre
              )}
            >
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="#8884d8"
                onMouseEnter={onBarEnter}
                onClick={() => clickOption(activeIndex)}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
            <p className="content" style={{ fontSize: "10px" }}>{`${padre}`}</p>
          </div>
        ))}
      </div>
    </ResponsiveContainer>
  );
}

export default ReStackedBarChart;
