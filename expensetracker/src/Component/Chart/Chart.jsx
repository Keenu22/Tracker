import React from "react";
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps } from "recharts";

const COLORS = ['#FF9304', '#00C49F', '#FFBB28'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: PieLabelRenderProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Chart({ transactions }) {
  // Aggregate data
  const aggregatedData = transactions.reduce((acc, { category, price }) => {
    if (!acc[category]) {
      acc[category] = { name: category, value: 0 };
    }
    acc[category].value += price;
    return acc;
  }, {});

  const data = Object.values(aggregatedData);

  return (
    <PieChart width={300} height={400}> {/* Increased height to fit legend */}
      <Pie
        data={data}
        cx={150}  // Centered the chart
        cy={150}  // Centered the chart
        labelLine={false}
        outerRadius={120}  // Adjusted to fit the chart better
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        layout="vertical"
        verticalAlign="bottom"
        align="center"
        height={70}  // Increased height to give more space
        wrapperStyle={{ paddingTop: 20 }}  // Added padding to push legend down
        payload={data.map((entry, index) => ({
          id: entry.name,
          type: "square",
          value: `${entry.name}`,
          color: COLORS[index % COLORS.length],
        }))}
      />
    </PieChart>
  );
}
