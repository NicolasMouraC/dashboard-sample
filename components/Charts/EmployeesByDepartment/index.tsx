"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, LegendProps, Tooltip } from "recharts";
import LoadingSkeleton from "./loading";
import EmployeesPerDepartment from "@/types/models/EmployeesPerDepartment";

interface DataItem {
  name: string;
  value: number;
}

const COLORS = [
  "#E289F2",
  "#855CF8",
  "#503795",
  "#B085FF",
  "#F6D44D",
  "#FF6F61",
  "#68B4E5",
];

const renderLegend = (props: LegendProps) => {
  const { payload } = props;

  const itemsPerRow = 4;
  const rows = [];

  for (let i = 0; i < (payload?.length || 0); i += itemsPerRow) {
    rows.push(payload?.slice(i, i + itemsPerRow));
  }

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      {rows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex flex-row justify-center mb-2 items-start gap-1"
        >
          {row?.map((entry, index) => (
            <div
              key={`item-${rowIndex}-${index}`}
              className="flex flex-col items-center mx-2 w-min"
              role="listitem"
            >
              <div
                style={{ backgroundColor: entry.color }}
                className="w-4 h-4 rounded-full self-start"
              ></div>
              <span
                className="text-[#263238] font-normal text-[13px]"
                role="list"
              >
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export interface EmployeesByDepartmentProps {
  data: EmployeesPerDepartment | null;
  isLoading: boolean;
}

export default function EmployeesByDepartment({
  data,
  isLoading,
}: EmployeesByDepartmentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) return <LoadingSkeleton />;

  const pieChartData: DataItem[] = data
    ? Object.entries(data).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className="bg-white shadow-xl p-5 rounded-[8px] flex flex-col justify-between grow-[1] h-auto">
      <div>
        <h3 className="text-[#4A5568] text-[18px] font-normal">
          Employees by Department
        </h3>
        <h4 className="text-[#A0AEC0] font-normal">Departments</h4>
      </div>
      <div className="flex justify-center">
        <PieChart
          width={300}
          height={400}
          className="flex justify-center w-full"
          aria-label="Employees by department pie chart"
        >
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            labelLine={false}
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
            itemStyle={{ color: "#4A5568" }}
            formatter={(value: number, name: string) => [`${value}`, name]}
          />
          <Legend content={renderLegend as any} />
        </PieChart>
      </div>
    </div>
  );
}
