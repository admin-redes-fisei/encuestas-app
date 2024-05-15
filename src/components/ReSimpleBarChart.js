import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

function ReSimpleBarChart({ data, onOptionClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

   const onBarEnter = (_, index) => {
     setActiveIndex(index);
   };

  const clickOption = (index) => {
    if (index !== null) {
      const selectedName = data[index].name;
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
      <BarChart
        width={150}
        height={40}
        data={data.filter((item) => item.name !== "Otra")}
      >
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="value"
          fill="#8884d8"
          onMouseEnter={onBarEnter}
          onClick={() => clickOption(activeIndex)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ReSimpleBarChart;
