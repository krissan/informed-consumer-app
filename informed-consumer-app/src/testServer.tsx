  
import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://localhost:5000/api/game", (_req, res, ctx) => {
    return res(
        ctx.status(200), 
        ctx.json({
            data: { 1233280: { data: {
            name: "The Witcher 3: Wild Hunt - Hearts of Stone Soundtrack",
            price_overview: {
              currency: "EUR",
              discount_percent: 0,
              final: 799,
              final_formatted: "7,99€",
              initial: 799,
              initial_formatted: ""
            },
            steam_appid: 1233280,
            header_image: "https://steamcdn-a.akamaihd.net/steam/apps/1233280/header.jpg?t=1590493615"
          }}} 
        })
    );
  }),
  rest.get("http://localhost:5000/api/game/search", (_req, res, ctx) => {
    return res(
        ctx.status(200), 
        ctx.json(
          [{"_id":"5f66a3718e8f4b0e60153e6c","appid":1200450,"name":"HELLO PLAYER","__v":0},{"_id":"5f66a5dc8e8f4b0e601554fe","appid":1364960,"name":"Hello Neighbor 2 Alpha 1","__v":0},{"_id":"5f66a6868e8f4b0e60155b6d","appid":1387970,"name":"Hello Teacher","__v":0},{"_id":"5f66a6f48e8f4b0e60155f66","appid":1406740,"name":"DumbBots: Hello World","__v":0},{"_id":"5f66a8568e8f4b0e60156acc","appid":562080,"name":"Hello Neighbor Demo","__v":0},{"_id":"5f66a8838e8f4b0e60156c1e","appid":557630,"name":"Hello Charlotte","__v":0},{"_id":"5f66a8858e8f4b0e60156c2b","appid":557800,"name":"Hello Charlotte EP1","__v":0},{"_id":"5f66ad0d8e8f4b0e60158f47","appid":1321680,"name":"Hello Neighbor 2","__v":0},{"_id":"5f66ad0d8e8f4b0e60158f49","appid":1321720,"name":"Hello Neighbor 2 Alpha 1 (demo)","__v":0},{"_id":"5f66ae0f8e8f4b0e601597ca","appid":1287320,"name":"Gladiabots - Hello World Pack","__v":0}] 
        )
    );
  }),
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "You must add request handler." })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };