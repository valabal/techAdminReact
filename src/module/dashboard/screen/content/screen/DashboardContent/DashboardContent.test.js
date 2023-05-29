import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DashboardContent from "./DashboardContent";
import userEvent from "@testing-library/user-event";

describe("DashboardContent", () => {
  it("should render loading text and then display user cards and chart when data is loaded", async () => {
    const getContentData = jest.fn().mockResolvedValue({ data: [] });

    render(<DashboardContent getContentData={getContentData} />);

    // Check if loading text is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for data to be loaded
    await waitFor(() => screen.findByText("Male"));

    // Check if user cards are rendered
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();

    const chartTypeSelect = screen.getByLabelText("Select Chart Type");
    expect(chartTypeSelect).toBeInTheDocument();
    userEvent.click(chartTypeSelect);
    const barChartOptions = screen.getAllByText("Bar Chart");
    userEvent.click(barChartOptions[0]);

    // Check if bar chart is rendered
    expect(screen.getByTestId("user-bar")).toBeInTheDocument();

    userEvent.click(chartTypeSelect);
    const pieChartOptions = screen.getAllByText("Pie Chart");
    userEvent.click(pieChartOptions[0]);

    // Check if pie chart is rendered
    expect(screen.getByTestId("user-pie")).toBeInTheDocument();
  });

  it("should display error message when data loading fails", async () => {
    // Mock getContentData function to reject
    const getContentData = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch data"));

    render(<DashboardContent getContentData={getContentData} />);

    // Check if loading text is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for error message to be displayed
    await waitFor(() =>
      screen.findByText("Failed To Fetch Data Please Refresh the Browser")
    );

    // Check if error message is rendered
    expect(
      screen.getByText("Failed To Fetch Data Please Refresh the Browser")
    ).toBeInTheDocument();
  });
});
