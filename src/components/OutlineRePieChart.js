import { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

function OutlineRePieChart({ data, onOptionClick }) {
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

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      percent,
    } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {`${(percent * 100).toFixed(2)}%`}
        </text>
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
      const selectedName = data[index].name;
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
          innerRadius={60}
          outerRadius={80}
          cx="50%"
          cy="50%"
          labelLine={false}
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

export default OutlineRePieChart;
