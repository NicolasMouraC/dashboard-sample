import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeFilter from "../components/Filters/DashboardFilters";

const mockDepartments = ["Sales", "Marketing", "IT"];

const mockProps = {
  departments: mockDepartments,
  employee: "",
  lastLogin: null,
  isActive: null,
  department: "",
  setDepartment: jest.fn(),
  setEmployee: jest.fn(),
  setLastLogin: jest.fn(),
  setIsActive: jest.fn(),
  onFilter: jest.fn(),
};

describe("EmployeeFilter Component", () => {
  test("renders filter button", () => {
    render(<EmployeeFilter {...mockProps} />);
    expect(
      screen.getByRole("button", { name: /filters/i })
    ).toBeInTheDocument();
  });

  test("opens filter menu when button is clicked", () => {
    render(<EmployeeFilter {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("calls onFilter when apply filters button is clicked", () => {
    render(<EmployeeFilter {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    fireEvent.click(screen.getByRole("button", { name: /apply filters/i }));
    expect(mockProps.onFilter).toHaveBeenCalled();
  });

  test("updates employee input", () => {
    render(<EmployeeFilter {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    const input = screen.getByPlaceholderText(/employee/i);
    fireEvent.change(input, { target: { value: "John Doe" } });
    expect(mockProps.setEmployee).toHaveBeenCalledWith("John Doe");
  });
});
