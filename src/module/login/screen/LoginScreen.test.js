import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import { QueryClient, QueryClientProvider } from "react-query";

// Mocking the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const queryClient = new QueryClient();

describe("LoginScreen", () => {
  it("should render LoginScreen and switch to register mode", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginScreen />
      </QueryClientProvider>
    );

    // Assert initial content
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Login Page")).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();

    // Switch to register mode
    fireEvent.click(screen.getByText("Register"));

    // Assert updated content
    expect(screen.getByText("Welcome to Register Page")).toBeInTheDocument();
    expect(screen.getByTestId("register-form")).toBeInTheDocument();
    expect(screen.getByText("Back To Login")).toBeInTheDocument();
  });

  it("should navigate to dashboard when logged in", () => {
    // Mocking the useNavigate hook to spy on its usage
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <QueryClientProvider client={queryClient}>
        <LoginScreen isLogin={true} loginReset={jest.fn()} />
      </QueryClientProvider>
    );

    // Assert navigate is called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});
