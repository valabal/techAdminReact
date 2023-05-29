import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DashboardCard } from "./DashboardCard";

describe("DashboardCard", () => {
  const label = "Male";
  const users = [{ name: "John" }, { name: "Mike" }, { name: "Adam" }];
  const children = <div>Avatar</div>;

  test("renders the card component with correct label and user count", () => {
    render(<DashboardCard label={label} users={users} children={children} />);

    // Assert label
    const labelElement = screen.getByText(`Total of ${label}`);
    expect(labelElement).toBeInTheDocument();

    // Assert user count
    const userCountElement = screen.getByText(`${users.length} Users`);
    expect(userCountElement).toBeInTheDocument();
  });
});
