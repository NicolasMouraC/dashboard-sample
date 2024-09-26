import Employee from "@/types/models/Employee";
import { QueryParams } from ".";

type DepartmentCount = {
  [key: string]: number;
};

export const countEmployeesByDepartment = (
  employees: Employee[]
): DepartmentCount => {
  return employees.reduce<DepartmentCount>((acc, employee) => {
    const department = employee.department;

    if (!acc[department]) {
      acc[department] = 0;
    }
    acc[department]++;
    return acc;
  }, {} as DepartmentCount);
};

export const fliterEmployees = (
  employeesArray: Employee[],
  queryParams: QueryParams
) => {
  let filteredEmployees = employeesArray;

  if (queryParams.employee) {
    const nameFilter = queryParams.employee.toLowerCase();
    filteredEmployees = filteredEmployees.filter((employee) =>
      employee.employee.toLowerCase().includes(nameFilter)
    );
  }

  if (queryParams.lastLogin) {
    const lastLoginFilterDate = new Date(queryParams.lastLogin);
    const lastLoginFilterYear = lastLoginFilterDate.getUTCFullYear();
    const lastLoginFilterMonth = lastLoginFilterDate.getUTCMonth();
    const lastLoginFilterDay = lastLoginFilterDate.getUTCDate() + 1;

    filteredEmployees = filteredEmployees.filter((employee) => {
      const employeeLastLoginDate = new Date(employee.lastLogin);
      const employeeLastLoginYear = employeeLastLoginDate.getUTCFullYear();
      const employeeLastLoginMonth = employeeLastLoginDate.getUTCMonth();
      const employeeLastLoginDay = employeeLastLoginDate.getUTCDate();

      return (
        employeeLastLoginYear === lastLoginFilterYear &&
        employeeLastLoginMonth === lastLoginFilterMonth &&
        employeeLastLoginDay === lastLoginFilterDay
      );
    });
  }

  if (queryParams.department) {
    const departmentFilter = queryParams.department.toLowerCase();
    filteredEmployees = filteredEmployees.filter((employee) =>
      employee.department.toLowerCase().includes(departmentFilter)
    );
  }

  if (queryParams.isActive !== null) {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.isActive === queryParams.isActive
    );
  }

  return filteredEmployees;
};
