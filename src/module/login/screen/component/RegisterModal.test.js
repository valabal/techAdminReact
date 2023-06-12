import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RegisterModal from "./RegisterModal";
import { useMutation } from "react-query";

// Mock the useMutation hook
jest.mock("react-query", () => ({
  useMutation: jest.fn(),
}));

describe("RegisterModal", () => {
  const registerUser = jest.fn();
  const requestRegisterSuccess = jest.fn();

  const RegisterModalWithClient = (props) => {
    useMutation.mockReturnValue({
      mutate: registerUser,
      isLoading: false,
      data: { test: "" },
      error: null,
    });
    return (
      <RegisterModal
        registerUser={registerUser}
        requestRegisterSuccess={requestRegisterSuccess}
      />
    );
  };

  test("renders without errors", () => {
    render(<RegisterModalWithClient />);
    expect(screen.getByTestId("register-form")).toBeInTheDocument();
  });

  test("calls requestRegister with correct data on form submission", () => {
    render(<RegisterModalWithClient />);
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

    expect(registerUser).toHaveBeenCalled();
    expect(requestRegisterSuccess).toHaveBeenCalled();
  });

  test("calls requestRegister with correct data on form submission negative case", async () => {
    render(<RegisterModalWithClient />);
    useMutation.mockReturnValue({
      mutate: registerUser,
      isLoading: false,
      data: null,
      error: "ERROR",
    });
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

    expect(registerUser).toHaveBeenCalled();
    await waitFor(() =>
      screen.findByText("There something wrong in the server please try again")
    );

    // Check if error message is rendered
    expect(
      screen.getByText("There something wrong in the server please try again")
    ).toBeInTheDocument();
  });

  it("should display the activity loader when loading", () => {
    // Mock the loginUser mutation function
    const loginUserMock = jest.fn();

    // Mock the useMutation hook response
    useMutation.mockReturnValue({
      mutate: loginUserMock,
      isLoading: true,
      data: null,
      error: null,
    });

    // Render the component
    render(<RegisterModal registerUser={loginUserMock} />);

    // Assert that the activity loader is present
    const activityLoader = screen.getByTestId("activity-loader");
    expect(activityLoader).toBeInTheDocument();
  });
});
