import * as actions from '../store/product/product';
import * as types from '../store/types';
import { createMemoryHistory } from 'history';

import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import expect from 'expect';
import { server, rest } from "../testServer";

//Setup mock store
const initialState = {isLoading: false};
type State = typeof initialState;
const middlewares = [thunk];
const mockStore = configureStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);
const store = mockStore(initialState);

describe('product actions', () => {
  //Clear store after each run
  afterEach(() => {
    store.clearActions();
  });
  
  //Mock history
  const history = createMemoryHistory();

  /**************/
  test('create game with price', async() => {
    //setup
    const product:types.ProductData ={
      name: "The Witcher 3: Wild Hunt - Hearts of Stone Soundtrack",
      productKey: "1233280",
      price: "7,99€",
      currency: "EUR",
      store: "Steam",
      picture: "https://steamcdn-a.akamaihd.net/steam/apps/1233280/header.jpg?t=1590493615"
    }


    server.use(
      rest.get("http://localhost:5000/api/game?appid=1233280", (_req, res, ctx) => {
        return res(
          ctx.status(200), 
          ctx.json({
              1233280: { data: {
              name: "The Witcher 3: Wild Hunt - Hearts of Stone Soundtrack",
              price_overview: {
                currency: "EUR",
                final_formatted: "7,99€"
              },
              steam_appid: 1233280,
              header_image: "https://steamcdn-a.akamaihd.net/steam/apps/1233280/header.jpg?t=1590493615"
            }}
          })
        );
      })
    );


    const expectedActions = [
      { type: types.GET_PRODUCT },
      { type: types.SET_PRODUCT, payload: {product: product} }
    ]

    //work
    await store.dispatch(actions.getProductData(history, 1233280));
    
    //expect
    expect(store.getActions()).toEqual(expectedActions);
    expect(history.location.pathname).toEqual('/game'); 
  })

  /**************/
  test('create game when free', async() => {
    //setup
    const product:types.ProductData ={
      name: "The Witcher 3: Wild Hunt - Hearts of Stone Soundtrack",
      productKey: "1233280",
      price: "Free",
      currency: "",
      store: "Steam",
      picture: "https://steamcdn-a.akamaihd.net/steam/apps/1233280/header.jpg?t=1590493615"
    }

    server.use(
      rest.get("http://localhost:5000/api/game?appid=1233280", (_req, res, ctx) => {
        return res(
          ctx.status(200), 
          ctx.json({
              1233280: { data: {
              name: "The Witcher 3: Wild Hunt - Hearts of Stone Soundtrack",
              steam_appid: 1233280,
              header_image: "https://steamcdn-a.akamaihd.net/steam/apps/1233280/header.jpg?t=1590493615"
            }}
          })
        );
      })
    );

    //work
    const expectedActions = [
      { type: types.GET_PRODUCT },
      { type: types.SET_PRODUCT, payload: {product: product} }
    ]

    //expect
    await store.dispatch(actions.getProductData(history, 1233280));
    expect(store.getActions()).toEqual(expectedActions);
    expect(history.location.pathname).toEqual('/game'); 
  })

  /**************/
  test('throw error when nothing is returned', async() => {
    //setup
    const product:types.ProductData ={
      name: "The Witcher 3: Wild Hunt - Hearts of Stone Soundtrack",
      productKey: "1233280",
      price: "Free",
      currency: "",
      store: "Steam",
      picture: "https://steamcdn-a.akamaihd.net/steam/apps/1233280/header.jpg?t=1590493615"
    }

    server.use(
      rest.get("http://localhost:5000/api/game?appid=1233280", (_req, res, ctx) => {
        return res(
          ctx.status(404)
        );
      })
    );

    //work
    const expectedActions = [
      { type: types.GET_PRODUCT },
      { type: types.ERR_PRODUCT }
    ]

    //expect
    await expect(store.dispatch(actions.getProductData(history, 1233280))).rejects.toThrow("404");
    expect(store.getActions()).toEqual(expectedActions);
  })
})