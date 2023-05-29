import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginModal from "./LoginModal";

describe("LoginModal", () => {
  it("should display validation error when loginError prop is set", () => {
    const loginError = "Invalid credentials";
    render(<LoginModal loginError={loginError} />);
    expect(screen.getByText(loginError)).toBeInTheDocument();
  });

  it("should clear validation error when isLogin prop is true", () => {
    const { rerender } = render(
      <LoginModal loginError='Invalid credentials' />
    );
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();

    rerender(<LoginModal isLogin />);
    expect(screen.queryByText("Invalid credentials")).not.toBeInTheDocument();
  });

  it("should call requestLogin with email and password on form submit", () => {
    const requestLoginMock = jest.fn();
    render(<LoginModal requestLogin={requestLoginMock} />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("LOGIN"));

    expect(requestLoginMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("should display validation error when required fields are not filled", () => {
    render(<LoginModal />);
    fireEvent.click(screen.getByText("LOGIN"));
    expect(
      screen.getByText("Please insert all required field")
    ).toBeInTheDocument();
  });
});
