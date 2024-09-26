"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa6";
import profilePic from "@/public/profile_placeholder.jpg";
import Employee from "@/types/models/Employee";
import LoadingSkeleton from "./loading";
import {
  formatDateToLongMonthDayYear,
  calculateTimeElapsedFromDate,
} from "@/utils";

const TABLE_HEADERS = ["Employee", "Last login", "Department", "Status", ""];

export interface EmployeesTableProps {
  data: Employee[];
  totalPages: number;
  currentPage: number;
  changePage: (newPage: number) => void;
  itemsPerPage: number;
  changeItemsPerPage: (itemsPerPage: number) => void;
  isLoading: boolean;
}

export default function EmployeesTable({
  data,
  currentPage,
  totalPages,
  changePage,
  changeItemsPerPage,
  itemsPerPage,
  isLoading,
}: EmployeesTableProps) {
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPageOptions = [5, 10, 20];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) return <LoadingSkeleton />;

  return (
    <div className="flex flex-col gap-5 bg-white shadow-xl p-5 rounded-[8px] grow-[2] overflow-x-auto">
      <h3 className="text-start font-normal text-[28px] text-[#4A5568]">
        Employees
      </h3>
      <div className="overflow-x-auto border rounded-[8px] h-[450px]">
        <table
          className="border-gray-200 divide-y divide-gray-200 min-w-[800px] w-full"
          aria-labelledby="employeesTable"
          role="table"
        >
          <caption id="employeesTable" className="sr-only">
            Employee details
          </caption>
          <thead className="top-0 sticky bg-white">
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
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50" role="row">
                <td
                  className="flex px-4 py-4 gap-2 whitespace-nowrap text-[12px] font-normal items-center min-w-[200px]"
                  role="cell"
                >
                  <Image
                    className="w-[20px] h-[20px] rounded-full"
                    width={20}
                    height={20}
                    src={item.avatar || profilePic}
                    alt="User avatar"
                  />
                  <div>
                    <div>{item.employee}</div>
                    <div className="text-[#00000080]">{item.mail}</div>
                  </div>
                </td>
                <td
                  className="px-4 py-4 whitespace-nowrap text-[12px] font-normal min-w-[150px]"
                  role="cell"
                >
                  <div>{formatDateToLongMonthDayYear(item.lastLogin)}</div>
                  <div className="text-[#00000080]">
                    {calculateTimeElapsedFromDate(item.lastLogin)}
                  </div>
                </td>
                <td
                  className="px-4 py-4 whitespace-nowrap text-[12px] font-normal min-w-[150px]"
                  role="cell"
                >
                  {item.department}
                </td>
                <td
                  className="px-4 py-4 whitespace-nowrap min-w-[100px]"
                  role="cell"
                >
                  <span
                    className={`text-[12px] font-semibold rounded-full ${
                      item.isActive ? "text-[#3DC13C]" : "text-[#F15051]"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-4 min-w-[50px]" role="cell">
                  <button aria-label="Toggle details">
                    <FaChevronDown className="text-[#C2C9D1] w-[10px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bottom-0 sticky bg-white">
            <tr>
              <td colSpan={TABLE_HEADERS.length}>
                <div className="flex justify-center gap-5 py-2 border-t border-t-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <label htmlFor="itemsPerPage" className="text-sm">
                      Items per page:
                    </label>
                    <select
                      id="itemsPerPage"
                      className="border rounded-md p-1"
                      value={itemsPerPage}
                      onChange={(e) =>
                        changeItemsPerPage(parseInt(e.currentTarget.value, 10))
                      }
                      aria-label="Select number of items per page"
                    >
                      {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="pageSelect" className="text-sm">
                      Page:
                    </label>
                    <select
                      id="pageSelect"
                      className="border rounded-md p-1"
                      value={currentPage}
                      onChange={(e) => changePage(Number(e.target.value))}
                      aria-label="Select page number"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
