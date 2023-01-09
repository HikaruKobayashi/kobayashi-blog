import { render, screen } from "@testing-library/react";
import Header from "@/components/common/header";

it("renders Header component", () => {
  render(Header());
  const headerElement = screen.getByText("Kobayashi Blog");
  expect(headerElement).toBeTruthy();
});
