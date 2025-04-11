import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const GaugeChart = ({ value = 1830, total = 3000, label = "Points" }) => {
    // Calculate percentage for the gauge
    const percentage = (value / total) * 100;

    // Generate data for the pie chart
    // We'll use a pie chart with two sections to create the gauge effect
    const data = [
        { name: "completed", value: percentage },
        { name: "remaining", value: 100 - percentage },
    ];

    // Colors for the gauge sections
    const COLORS = ["var(--buy)", "var(--sell)"];

    return (
        <div className="flex flex-col items-center justify-center w-full h-64">
            <PieChart width={300} height={200}>
                <Pie
                    data={data}
                    cx={150}
                    cy={130}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={90}
                    outerRadius={120}
                    paddingAngle={2}
                    cornerRadius={12}
                    dataKey="value"
                    stroke="none">
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <svg>
                    <text
                        x={150}
                        y={120}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            fill: "#fff",
                        }}>
                        {value.toLocaleString()}/{total.toLocaleString()}
                    </text>
                    /
                    <text
                        x={150}
                        y={150}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fontSize: 12, fill: "#fff" }}>
                        {label}
                    </text>
                </svg>
            </PieChart>
        </div>
    );
};

export default GaugeChart;
