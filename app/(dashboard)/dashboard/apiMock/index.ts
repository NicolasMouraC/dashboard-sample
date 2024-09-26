import { createServer } from "miragejs";
import { countEmployeesByDepartment } from "./utils";
import EMPLOYEES from "./data";
import { fliterEmployees } from "./utils";

export interface QueryParams {
  employee?: string | null;
  lastLogin?: string | null;
  department?: string | null;
  isActive?: boolean | null;
  page?: string | null;
  pageSize?: string | null;
}

const createMockApi = () =>
  createServer({
    routes() {
      this.namespace = "api";

      this.get("/employees", (schema, request) => {
        const queryParams: QueryParams = {
          employee: request.queryParams.employee as string | null,
          lastLogin: request.queryParams.lastLogin as string | null,
          department: request.queryParams.department as string | null,
          isActive:
            request.queryParams.isActive === "true"
              ? true
              : request.queryParams.isActive === "false"
                ? false
                : null,
          page: request.queryParams.page as string | null,
          pageSize: request.queryParams.pageSize as string | null,
        };

        let filteredEmployees = fliterEmployees(EMPLOYEES, queryParams);

        const page = parseInt(queryParams?.page || "1", 10);
        const pageSize = parseInt(queryParams.pageSize || "10", 10);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const paginatedEmployees = filteredEmployees.slice(
          startIndex,
          endIndex
        );

        const departmentCounts = countEmployeesByDepartment(filteredEmployees);

        return {
          data: paginatedEmployees,
          employeesPerDepartment: departmentCounts,
          meta: {
            total: filteredEmployees.length,
            page,
            pageSize,
            totalPages: Math.ceil(filteredEmployees.length / pageSize),
          },
        };
      });
    },
  });

export default createMockApi;
