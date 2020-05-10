import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MatchList from "../components/MatchList";

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render user data", async () => {
  const fakeUser = {
    name: "David Bautista",
    _id: "21234566e23",
    facebookId: "1234567421",
    email: "david@mail.com",
  };

  const fakeConversations = {
    _id: "5eb658683fe6de99394bd828ç",
    user1: "0rQ8xf3/g5pk8RQvMHI5/w==",
    user2: "/YOTVuq+oS0T2aqk9yB6tg==",
    likes: 3,
    startTime: 1589008468893,
    user2dbId: "5eb61c4dc6d64b04c166097d",
    user2name: "Rick Aleaahghcgffa Greeneman",
    user1dbId: "5eac64a1c6d64b04c1ce1926",
    user1name: "David Bautista",
    messages: ["hola", "como estas", "chao"],
  };

  const fetch = jest.spyOn(global, "fetch");
  console.log(fetch);
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );

  // Usa la versión asíncrona de act para aplicar promesas resueltas
  await act(async () => {
    render(
      <MatchList user={fakeUser} conversations={fakeConversations} />,
      container
    );
  });

  const p = container.querySelector("[data-testid=name-display]");
  expect(p.innerHTML).toBe(fakeUser.name);

  // elimina la simulación para asegurar que las pruebas estén completamente aisladas
  global.fetch.mockRestore();
});
