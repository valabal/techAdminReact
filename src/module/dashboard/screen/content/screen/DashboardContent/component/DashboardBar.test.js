import React from "react";
import { render, screen } from "@testing-library/react";
import { GenderBarChart, GenderPieChart } from "./DashboardBar"; // Replace 'YourChartComponent' with the actual file name/path

describe("GenderBarChart", () => {
  it("should render a bar chart with the provided statistics", () => {
    const statistics = [
      { name: "Male", count: 10 },
      { name: "Female", count: 20 },
    ];

    render(<div>{GenderBarChart(statistics)}</div>);
    // Check if the bar chart component is rendered
    expect(screen.getByTestId("user-bar")).toBeInTheDocument();
  });
});

describe("GenderPieChart", () => {
  it("should render a pie chart with the provided statistics", () => {
    const statistics = [
      { name: "Male", count: 10 },
      { name: "Female", count: 20 },
    ];

    render(<div>{GenderPieChart(statistics)}</div>);

    // Check if the pie chart component is rendered
    expect(screen.getByTestId("user-pie")).toBeInTheDocument();
  });
});
