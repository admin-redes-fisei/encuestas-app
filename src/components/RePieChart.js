import { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

function RePieChart({ data, onOptionClick }) {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF66CC",
    "#FFA07A",
    "#20B2AA",
    "#87CEEB",
    "#FFD700",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    if (percent < 0.1) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + (radius + 10) * Math.cos(-midAngle * RADIAN); // Ajuste para centrar el label
    const y = cy + (radius + 10) * Math.sin(-midAngle * RADIAN); // Ajuste para centrar el label

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "12px" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
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

  const clickOption = (index) => {
    if (index !== null) {
      const selectedName = data[index];
      onOptionClick(selectedName);
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onClick={() => clickOption(activeIndex)}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default RePieChart;
