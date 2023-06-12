import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import LoginModal from "./LoginModal";
import { useMutation } from "react-query";

// Mock the useMutation hook
jest.mock("react-query", () => ({
  useMutation: jest.fn(),
}));

describe("LoginModal", () => {
  const LoginModalWithClient = (props) => {
    return <LoginModal {...props} />;
  };

  it("should call requestLogin with email and password on form submit", () => {
    const loginUserMock = jest.fn();
    const requestLoginSuccessMock = jest.fn();
    // Mock the useMutation hook response
    useMutation.mockReturnValue({
      mutate: loginUserMock,
      isLoading: false,
      data: { test: "" },
      error: null,
    });

    render(
      <LoginModalWithClient
        loginUser={loginUserMock}
        requestLoginSuccess={requestLoginSuccessMock}
      />
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("LOGIN"));

    expect(loginUserMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    expect(requestLoginSuccessMock).toHaveBeenCalled();
  });

  it("should call requestLogin with Error scenario", async () => {
    const loginUserMock = jest.fn();
    const requestLoginSuccessMock = jest.fn();
    // Mock the useMutation hook response
    useMutation.mockReturnValue({
      mutate: loginUserMock,
      isLoading: false,
      data: null,
      error: { response: { status: 400 } },
    });

    render(
      <LoginModalWithClient
        loginUser={loginUserMock}
        requestLoginSuccess={requestLoginSuccessMock}
      />
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("LOGIN"));

    await waitFor(() => screen.findByText("Username or Password not match"));

    // Check if error message is rendered
    expect(
      screen.getByText("Username or Password not match")
    ).toBeInTheDocument();
  });

  it("should display validation error when required fields are not filled", () => {
    const loginUserMock = jest.fn();
    const requestLoginSuccessMock = jest.fn();
    useMutation.mockReturnValue({
      mutate: loginUserMock,
      isLoading: false,
      data: { test: "" },
      error: null,
    });
    render(
      <LoginModalWithClient
        loginUser={loginUserMock}
        requestLoginSuccess={requestLoginSuccessMock}
      />
    );
    fireEvent.click(screen.getByText("LOGIN"));
    expect(
      screen.getByText("Please insert all required field")
    ).toBeInTheDocument();
  });
});
