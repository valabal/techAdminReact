import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DashboardContent from "./DashboardContent";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

describe("DashboardContent", () => {
  it("should render error message when there is an error fetching data", async () => {
    const getContentDataMock = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch data"));

    useQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch data"),
      refetch: jest.fn(),
    });

    render(<DashboardContent getContentData={getContentDataMock} />);

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe(
      "Failed To Fetch Data Please Refresh the Browser"
    );
  });

  it("should render loading text and then display user cards and chart when data is loaded", async () => {
    const getContentData = jest.fn().mockResolvedValue({ data: [] });
    useQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });
    render(<DashboardContent getContentData={getContentData} />);
    // Wait for data to be loaded
    await waitFor(() => screen.findByTestId("gender-detail"));

    // Check if user cards are rendered
    expect(screen.getByTestId("Male")).toBeInTheDocument();
    expect(screen.getByTestId("Female")).toBeInTheDocument();

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
});
