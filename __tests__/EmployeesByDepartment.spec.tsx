import { render, screen } from "@testing-library/react";
import EmployeesByDepartment from "../components/Charts/EmployeesByDepartment";

const mockData = {
  Sales: 10,
  Marketing: 15,
  IT: 5,
};

describe("EmployeesByDepartment Component", () => {
  test("renders pie chart with data", () => {
    render(<EmployeesByDepartment data={mockData} isLoading={false} />);
    expect(
      screen.getByLabelText(/employees by department pie chart/i)
    ).toBeInTheDocument();
  });
});
