import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home Component", () => {
  test("renders dashboard title", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /dashboard sample/i })
    ).toBeInTheDocument();
  });

  test("renders button to go to dashboard", () => {
    render(<Home />);
    expect(
      screen.getByRole("button", { name: /go to dashboard/i })
    ).toBeInTheDocument();
  });
});
