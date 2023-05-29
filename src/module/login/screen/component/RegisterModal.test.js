import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RegisterModal from "./RegisterModal";

describe("RegisterModal", () => {
  const mockProps = {
    requestRegister: jest.fn(),
    isRegisterLoading: false,
    registerError: "",
    isLogin: false,
  };

  test("renders without errors", () => {
    render(<RegisterModal {...mockProps} />);
    expect(screen.getByTestId("register-form")).toBeInTheDocument();
  });

  test("displays validation label when there is an error", () => {
    const error = "Some registration error";
    render(<RegisterModal {...mockProps} registerError={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  test("calls requestRegister with correct data on form submission", () => {
    render(<RegisterModal {...mockProps} />);
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByText("REGISTER");

    const regParam = {
      email: "john.doe@example.com",
      password: "password123",
    };

    const testData = {
      firstName: "John",
      lastName: "Doe",
      ...regParam,
    };

    fireEvent.change(firstNameInput, {
      target: { value: testData.firstName },
    });
    fireEvent.change(lastNameInput, {
      target: { value: testData.lastName },
    });
    fireEvent.change(emailInput, {
      target: { value: testData.email },
    });
    fireEvent.change(passwordInput, {
      target: { value: testData.password },
    });
    fireEvent.click(registerButton);

    expect(mockProps.requestRegister).toHaveBeenCalledWith(regParam);
  });

  test("renders ActivityLoader when isRegisterLoading is true", () => {
    render(<RegisterModal isRegisterLoading={true} />);

    const activityLoaderElement = screen.getByTestId("activity-loader");
    expect(activityLoaderElement).toBeInTheDocument();
  });
});
