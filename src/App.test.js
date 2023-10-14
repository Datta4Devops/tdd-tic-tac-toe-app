import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should display a square with X", () => {
    render(<App />);
    // const boardWithX = screen.getByTestId("x-box");
    // expect(boardWithX.textContent).toBe('X');
  });
  it("square with X should be a button", () => {
    render(<App />);
    // const button = screen.getAllByRole("button",{name: /X/i});
    // expect(button[0].textContent).toBe('X');
  });
  it("should render 9 buttons", () => {
    render(<App />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(9);
  });

  it("should display 3 buttons only in each board row", () => {
    render(<App />);
    // const boardRow = screen.getByTestId("board-row");
    // const buttons = within(boardRow).getAllByRole("button");
    // expect(buttons.length).toBe(3);
  });

  it("button should display X when clicked", () => {
    render(<App />);
    const button = screen.getAllByRole("button")[0];
    fireEvent.click(button);
    expect(button.textContent).toBe("X");
  });

  it("should render O if button clicked afetr X", () => {
    // O is Big O not zero.
    render(<App />);
    const button = screen.getAllByRole("button");
    fireEvent.click(button[0]);
    fireEvent.click(button[1]);
    expect(button[1].textContent).toBe("O");
  });
  it("button should be immutable once clicked", () => {
    // O is Big O not zero.
    render(<App />);
    const button = screen.getAllByRole("button");
    fireEvent.click(button[0]);
    expect(button[0].textContent).toBe("X");
    fireEvent.click(button[0]);
    expect(button[0].textContent).toBe("X");
  });

  it("status should change when button clicked", () => {
    render(<App />);
    const button = screen.getAllByRole("button");
    const status = screen.getByTestId("status");
    const firstValue = status.textContent;
    fireEvent.click(button[0]);
    const secondValue = status.textContent;
    expect(firstValue).not.toEqual(secondValue);
  });

  it("should be able to calculate winner", () => {
    render(<App />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // X
    fireEvent.click(buttons[3]); // O
    fireEvent.click(buttons[4]); // X
    fireEvent.click(buttons[7]); // O
    fireEvent.click(buttons[8]); // X
    const status = screen.getByTestId("status");
    expect(status.textContent).toEqual("Winner: X");
  });

  it("All buttons be disabled once winner is declared", () => {
    render(<App />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // X
    fireEvent.click(buttons[3]); // O
    fireEvent.click(buttons[4]); // X
    fireEvent.click(buttons[7]); // O
    fireEvent.click(buttons[8]); // X
    const status = screen.getByTestId("status");
    expect(status.textContent).toEqual("Winner: X");
    const previousValue = buttons[1].textContent;
    fireEvent.click(buttons[1]);
    const nextValue = buttons[1].textContent;
    expect(previousValue).toEqual(nextValue);
  });
});
