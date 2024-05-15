import { ResponsiveContainer, Treemap } from "recharts";

function ReTreemapChart({ data }) {
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
  const CustomizedContent = (props) => {
    const { root, depth, x, y, width, height, index, colors, name } = props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : "#ffffff00",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        width={400}
        height={200}
        data={data}
        dataKey="size"
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS} />}
      />
    </ResponsiveContainer>
  );
}

export default ReTreemapChart;
