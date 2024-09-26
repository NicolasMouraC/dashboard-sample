import React from "react";
import { FaChevronDown } from "react-icons/fa6";

const TABLE_HEADERS = ["Employee", "Last login", "Department", "Status", ""];

export default function EmployeeTableSkeleton() {
  return (
    <div className="flex flex-col gap-5 bg-white shadow-xl p-5 rounded-[8px] grow-[2] overflow-x-auto animate-pulse">
      <h3 className="text-start font-normal text-[28px] text-[#4A5568]">
        Employees
      </h3>
      <div className="overflow-x-auto border rounded-[8px] h-[450px]">
        <table
          className="border-gray-200 divide-y divide-gray-200 w-full"
          aria-labelledby="employeesTable"
          role="table"
        >
          <caption id="employeesTable" className="sr-only">
            Employee details
          </caption>
          <thead>
            <tr role="row">
              {TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  className="px-4 pb-4 pt-6 text-left text-[12px] font-medium text-[#00000080] tracking-wider"
                  scope="col"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" role="rowgroup">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50" role="row">
                <td
                  className="flex px-4 py-4 gap-2 whitespace-nowrap text-[12px] font-normal items-center"
                  role="cell"
                >
                  <div className="w-[20px] h-[20px] rounded-full bg-gray-300" />
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                </td>
                <td
                  className="px-4 py-4 whitespace-nowrap text-[12px] font-normal"
                  role="cell"
                >
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                  <div className="h-3 w-16 bg-gray-200 rounded mt-1" />
                </td>
                <td
                  className="px-4 py-4 whitespace-nowrap text-[12px] font-normal"
                  role="cell"
                >
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                </td>
                <td className="px-4 py-4 whitespace-nowrap" role="cell">
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                </td>
                <td role="cell">
                  <div className="flex justify-center items-center">
                    <FaChevronDown className="text-gray-300 w-[10px]" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={5}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-24 bg-gray-300 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-16 bg-gray-300 rounded" />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
