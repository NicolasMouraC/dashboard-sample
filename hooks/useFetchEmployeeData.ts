import { useState, useCallback, useEffect } from "react";
import { buildDashboardFiltersQuery } from "@/utils";
import Employee from "@/types/models/Employee";

interface UseFetchEmployeeDataParams {
  currentPage: number;
  itemsPerPage: number;
  employee: string;
  lastLogin: Date | null;
  department: string;
  isActive: string | null;
}

interface FetchResult {
  employeesPerDepartment: Record<string, number>;
  data: Employee[];
  meta: {
    totalPages: number;
  };
}

const useFetchEmployeeData = ({
  currentPage,
  itemsPerPage,
  employee,
  lastLogin,
  department,
  isActive,
}: UseFetchEmployeeDataParams) => {
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [departmentData, setDepartmentData] = useState<Record<
    string,
    number
  > | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeData = useCallback(
    (newCurrentPage = currentPage) => {
      const filterQuery = buildDashboardFiltersQuery({
        employee,
        lastLogin,
        department,
        isActive,
      });

      setIsLoading(true);

      fetch(
        `/api/employees?page=${newCurrentPage}&pageSize=${itemsPerPage}${filterQuery}`
      )
        .then((response) => response.json() as Promise<FetchResult>)
        .then((result) => {
          setDepartmentData(result.employeesPerDepartment);
          setEmployeesData(result.data);
          setTotalPages(result.meta.totalPages);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to fetch employee data. Please try again later.");
        })
        .finally(() => setIsLoading(false));
    },
    [currentPage, itemsPerPage, employee, lastLogin, department, isActive]
  );

  useEffect(() => {
    fetchEmployeeData();
  }, [currentPage, itemsPerPage]);

  return {
    employeesData,
    departmentData,
    totalPages,
    isLoading,
    error,
    fetchEmployeeData,
  };
};

export default useFetchEmployeeData;
