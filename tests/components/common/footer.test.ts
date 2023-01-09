import { render } from "@testing-library/react";
import Footer from "@/components/common/footer";

it("renders Footer component", () => {
  render(Footer());
  const thisYear = new Date().getFullYear();
  expect.stringContaining(thisYear + "Kobayashi.All rights reserved.");
});
