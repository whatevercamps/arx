import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Home from "../Home";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders", () => {
  act(() => {
    render(<Home />, container);
  });
  expect(container.textContent).toBe(
    "Welcome to Arx, start chatting and meeting new people!"
  );

  act(() => {
    render(
      <Home header={"Your better half is waiting for your message"} />,
      container
    );
  });
  expect(container.textContent).toBe(
    "Your better half is waiting for your message"
  );
});
