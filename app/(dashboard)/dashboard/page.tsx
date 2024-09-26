"use client";

import EmployeesByDepartment from "@/components/Charts/EmployeesByDepartment";
import EmployeeTable from "@/components/Charts/EmployeesTable";
import { useState, useEffect } from "react";
import EmployeeFilter from "@/components/Filters/DashboardFilters";
import createMockApi from "./apiMock";
import useFetchEmployeeData from "@/hooks/useFetchEmployeeData";

const DEPARTMENTS = [
  "Sales",
  "Research and Development",
  "Finance",
  "Human Resources",
  "Marketing",
  "IT",
  "Operations",
];

createMockApi();

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [employee, setEmployee] = useState("");
  const [lastLogin, setLastLogin] = useState<Date | null>(null);
  const [department, setDepartment] = useState("");
  const [isActive, setIsActive] = useState<string>("");

  const {
    employeesData,
    departmentData,
    totalPages,
    isLoading,
    error,
    fetchEmployeeData,
  } = useFetchEmployeeData({
    currentPage,
    itemsPerPage,
    employee,
    lastLogin,
    department,
    isActive,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [employee, lastLogin, department, isActive]);

  const filterSearch = () => {
    setCurrentPage(1);
    fetchEmployeeData();
  };

  return (
    <main className="flex flex-col gap-5 justify-between">
      <EmployeeFilter
        department={department}
        employee={employee}
        lastLogin={lastLogin}
        isActive={isActive}
        setDepartment={setDepartment}
        setEmployee={setEmployee}
        setLastLogin={setLastLogin}
        setIsActive={setIsActive}
        departments={DEPARTMENTS}
        onFilter={filterSearch}
      />
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        <EmployeesByDepartment data={departmentData} isLoading={isLoading} />
        <EmployeeTable
          data={employeesData}
          changePage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          changeItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
