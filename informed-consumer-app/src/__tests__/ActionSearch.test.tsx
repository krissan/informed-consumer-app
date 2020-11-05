import * as actions from '../store/search/search';
import * as types from '../store/types';

import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import expect from 'expect';
import { server, rest } from "../testServer";
import { cleanup } from '@testing-library/react';

//Setup mock store
const initialState = {isLoading: false};
type State = typeof initialState;
const middlewares = [thunk];
const mockStore = configureStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);
const store = mockStore(initialState);

describe('search actions', () => {
  //Clear store after each run
  afterEach(() => {
    cleanup();
    store.clearActions();
  });

  /**************/
  test('number of search results for preview less than limit', async() => {
    //setup
    const products:Array<types.SearchPreviewItem> = [
      {appid:1200450,name:"HELLO PLAYER"},
      {appid:1364960,name:"Hello Neighbor 2 Alpha 1"},
      {appid:1387970,name:"Hello Teacher"},
      {appid:1406740,name:"DumbBots: Hello World"},
      {appid:562080,name:"Hello Neighbor Demo"}] ;
    const query:string = 'hello';
    const limit:number = 10;
    const preview:boolean = true;
    
    server.use(
      rest.get("http://localhost:5000/api/game/search?name="+query+"&limit="+limit, (_req, res, ctx) => {
        return res(
            ctx.status(200), 
            ctx.json(
              [{"_id":"5f66a3718e8f4b0e60153e6c","appid":1200450,"name":"HELLO PLAYER","__v":0},
              {"_id":"5f66a5dc8e8f4b0e601554fe","appid":1364960,"name":"Hello Neighbor 2 Alpha 1","__v":0},
              {"_id":"5f66a6868e8f4b0e60155b6d","appid":1387970,"name":"Hello Teacher","__v":0},
              {"_id":"5f66a6f48e8f4b0e60155f66","appid":1406740,"name":"DumbBots: Hello World","__v":0},
              {"_id":"5f66a8568e8f4b0e60156acc","appid":562080,"name":"Hello Neighbor Demo","__v":0}] 
            )
        );
      })
    );

    const expectedActions = [
      {type: types.GET_SEARCH},
      {
        type: types.SET_SEARCH_PREVIEW,
        payload: {
            products: products,
            form: {query: query}
        }
      }
    ]

    //work
    await store.dispatch(actions.getSearch(query, limit, preview));

    //expect
    expect(store.getActions()).toEqual(expectedActions);
  })

  /**************/
  test('number of search results for preview equal to limit', async() => {
    //setup
    const products:Array<types.SearchPreviewItem> = [
      {appid:1200450,name:"HELLO PLAYER"},
      {appid:1364960,name:"Hello Neighbor 2 Alpha 1"},
      {appid:1387970,name:"Hello Teacher"},
      {appid:1406740,name:"DumbBots: Hello World"},
      {appid:562080,name:"Hello Neighbor Demo"},
      {appid:557630,name:"Hello Charlotte"},
      {appid:557800,name:"Hello Charlotte EP1"},
      {appid:1321680,name:"Hello Neighbor 2"},
      {appid:1321720,name:"Hello Neighbor 2 Alpha 1 (demo)"},
      {appid:1287320,name:"Gladiabots - Hello World Pack"}] ;
    const query:string = 'hello';
    const limit:number = 10;
    const preview:boolean = true;

    server.use(
      rest.get("http://localhost:5000/api/game/search?name="+query+"&limit="+limit, (_req, res, ctx) => {
        return res(
            ctx.status(200), 
            ctx.json(
              [{"_id":"5f66a3718e8f4b0e60153e6c","appid":1200450,"name":"HELLO PLAYER","__v":0},
              {"_id":"5f66a5dc8e8f4b0e601554fe","appid":1364960,"name":"Hello Neighbor 2 Alpha 1","__v":0},
              {"_id":"5f66a6868e8f4b0e60155b6d","appid":1387970,"name":"Hello Teacher","__v":0},
              {"_id":"5f66a6f48e8f4b0e60155f66","appid":1406740,"name":"DumbBots: Hello World","__v":0},
              {"_id":"5f66a8568e8f4b0e60156acc","appid":562080,"name":"Hello Neighbor Demo","__v":0},
              {"_id":"5f66a8838e8f4b0e60156c1e","appid":557630,"name":"Hello Charlotte","__v":0},
              {"_id":"5f66a8858e8f4b0e60156c2b","appid":557800,"name":"Hello Charlotte EP1","__v":0},
              {"_id":"5f66ad0d8e8f4b0e60158f47","appid":1321680,"name":"Hello Neighbor 2","__v":0},
              {"_id":"5f66ad0d8e8f4b0e60158f49","appid":1321720,"name":"Hello Neighbor 2 Alpha 1 (demo)","__v":0},
              {"_id":"5f66ae0f8e8f4b0e601597ca","appid":1287320,"name":"Gladiabots - Hello World Pack","__v":0}] 
            )
        );
      })
    );

    const expectedActions = [
      {type: types.GET_SEARCH},
      {
        type: types.SET_SEARCH_PREVIEW,
        payload: {
            products: products,
            form: {query: query}
        }
      }
    ]

    //work
    await store.dispatch(actions.getSearch(query, limit, preview));

    //expect
    expect(store.getActions()).toEqual(expectedActions);
  })

  /**************/
  test('number of search results less than limit', async() => {
    //setup
    const products:Array<types.SearchPreviewItem> = [
      {appid:1200450,name:"HELLO PLAYER"},
      {appid:1364960,name:"Hello Neighbor 2 Alpha 1"},
      {appid:1387970,name:"Hello Teacher"},
      {appid:1406740,name:"DumbBots: Hello World"},
      {appid:562080,name:"Hello Neighbor Demo"}] ;
    const query:string = 'hello';
    const limit:number = 10;
    const preview:boolean = false;
    
    server.use(
      rest.get("http://localhost:5000/api/game/search?name="+query+"&limit="+limit, (_req, res, ctx) => {
        return res(
            ctx.status(200), 
            ctx.json(
              [{"_id":"5f66a3718e8f4b0e60153e6c","appid":1200450,"name":"HELLO PLAYER","__v":0},
              {"_id":"5f66a5dc8e8f4b0e601554fe","appid":1364960,"name":"Hello Neighbor 2 Alpha 1","__v":0},
              {"_id":"5f66a6868e8f4b0e60155b6d","appid":1387970,"name":"Hello Teacher","__v":0},
              {"_id":"5f66a6f48e8f4b0e60155f66","appid":1406740,"name":"DumbBots: Hello World","__v":0},
              {"_id":"5f66a8568e8f4b0e60156acc","appid":562080,"name":"Hello Neighbor Demo","__v":0}] 
            )
        );
      })
    );

    const expectedActions = [
      {type: types.GET_SEARCH},
      {
        type: types.SET_SEARCH,
        payload: {
            products: products,
            form: {query: query}
        }
      }
    ]

    //work
    await store.dispatch(actions.getSearch(query, limit, preview));

    //expect
    expect(store.getActions()).toEqual(expectedActions);
  })

  /**************/
  test('number of search results equal to limit', async() => {
    //setup
    const products:Array<types.SearchPreviewItem> = [
      {appid:1200450,name:"HELLO PLAYER"},
      {appid:1364960,name:"Hello Neighbor 2 Alpha 1"},
      {appid:1387970,name:"Hello Teacher"},
      {appid:1406740,name:"DumbBots: Hello World"},
      {appid:562080,name:"Hello Neighbor Demo"},
      {appid:557630,name:"Hello Charlotte"},
      {appid:557800,name:"Hello Charlotte EP1"},
      {appid:1321680,name:"Hello Neighbor 2"},
      {appid:1321720,name:"Hello Neighbor 2 Alpha 1 (demo)"},
      {appid:1287320,name:"Gladiabots - Hello World Pack"}] ;
    const query:string = 'hello';
    const limit:number = 10;
    const preview:boolean = false;

    server.use(
      rest.get("http://localhost:5000/api/game/search?name="+query+"&limit="+limit, (_req, res, ctx) => {
        return res(
            ctx.status(200), 
            ctx.json(
              [{"_id":"5f66a3718e8f4b0e60153e6c","appid":1200450,"name":"HELLO PLAYER","__v":0},
              {"_id":"5f66a5dc8e8f4b0e601554fe","appid":1364960,"name":"Hello Neighbor 2 Alpha 1","__v":0},
              {"_id":"5f66a6868e8f4b0e60155b6d","appid":1387970,"name":"Hello Teacher","__v":0},
              {"_id":"5f66a6f48e8f4b0e60155f66","appid":1406740,"name":"DumbBots: Hello World","__v":0},
              {"_id":"5f66a8568e8f4b0e60156acc","appid":562080,"name":"Hello Neighbor Demo","__v":0},
              {"_id":"5f66a8838e8f4b0e60156c1e","appid":557630,"name":"Hello Charlotte","__v":0},
              {"_id":"5f66a8858e8f4b0e60156c2b","appid":557800,"name":"Hello Charlotte EP1","__v":0},
              {"_id":"5f66ad0d8e8f4b0e60158f47","appid":1321680,"name":"Hello Neighbor 2","__v":0},
              {"_id":"5f66ad0d8e8f4b0e60158f49","appid":1321720,"name":"Hello Neighbor 2 Alpha 1 (demo)","__v":0},
              {"_id":"5f66ae0f8e8f4b0e601597ca","appid":1287320,"name":"Gladiabots - Hello World Pack","__v":0}] 
            )
        );
      })
    );

    const expectedActions = [
      {type: types.GET_SEARCH},
      {
        type: types.SET_SEARCH,
        payload: {
            products: products,
            form: {query: query}
        }
      }
    ]

    //work
    await store.dispatch(actions.getSearch(query, limit, preview));

    //expect
    expect(store.getActions()).toEqual(expectedActions);
  })

  /**************/
  test('empty query', async() => {
    //setup
    const products:Array<types.SearchPreviewItem> = [
      {appid:1200450,name:"HELLO PLAYER"},
      {appid:1364960,name:"Hello Neighbor 2 Alpha 1"},
      {appid:1387970,name:"Hello Teacher"},
      {appid:1406740,name:"DumbBots: Hello World"},
      {appid:562080,name:"Hello Neighbor Demo"},
      {appid:557630,name:"Hello Charlotte"},
      {appid:557800,name:"Hello Charlotte EP1"},
      {appid:1321680,name:"Hello Neighbor 2"},
      {appid:1321720,name:"Hello Neighbor 2 Alpha 1 (demo)"},
      {appid:1287320,name:"Gladiabots - Hello World Pack"}] ;
    const query:string = '';
    const limit:number = 10;
    const preview: boolean = true;

    server.use(
      rest.get("http://localhost:5000/api/game/search?name="+query+"&limit="+limit, (_req, res, ctx) => {
        return res(
            ctx.status(200), 
            ctx.json(
              [{"_id":"5f66a3718e8f4b0e60153e6c","appid":1200450,"name":"HELLO PLAYER","__v":0},
              {"_id":"5f66a5dc8e8f4b0e601554fe","appid":1364960,"name":"Hello Neighbor 2 Alpha 1","__v":0},
              {"_id":"5f66a6868e8f4b0e60155b6d","appid":1387970,"name":"Hello Teacher","__v":0},
              {"_id":"5f66a6f48e8f4b0e60155f66","appid":1406740,"name":"DumbBots: Hello World","__v":0},
              {"_id":"5f66a8568e8f4b0e60156acc","appid":562080,"name":"Hello Neighbor Demo","__v":0},
              {"_id":"5f66a8838e8f4b0e60156c1e","appid":557630,"name":"Hello Charlotte","__v":0},
              {"_id":"5f66a8858e8f4b0e60156c2b","appid":557800,"name":"Hello Charlotte EP1","__v":0},
              {"_id":"5f66ad0d8e8f4b0e60158f47","appid":1321680,"name":"Hello Neighbor 2","__v":0},
              {"_id":"5f66ad0d8e8f4b0e60158f49","appid":1321720,"name":"Hello Neighbor 2 Alpha 1 (demo)","__v":0},
              {"_id":"5f66ae0f8e8f4b0e601597ca","appid":1287320,"name":"Gladiabots - Hello World Pack","__v":0}] 
            )
        );
      })
    );

    const expectedActions = [
      {type: types.GET_SEARCH},
      {
        type: types.SET_SEARCH_PREVIEW,
        payload: {
            products: [],
            form: {query:''}
        }
    }
    ]

    //work
    await store.dispatch(actions.getSearch(query, limit, preview));

    //expect
    expect(store.getActions()).toEqual(expectedActions);
  })

  /**************/
  test('throw error when nothing is returned', async() => {
    //setup
    const products:Array<types.SearchPreviewItem> = [
      {appid:1200450,name:"HELLO PLAYER"},
      {appid:1364960,name:"Hello Neighbor 2 Alpha 1"},
      {appid:1387970,name:"Hello Teacher"},
      {appid:1406740,name:"DumbBots: Hello World"},
      {appid:562080,name:"Hello Neighbor Demo"},
      {appid:557630,name:"Hello Charlotte"},
      {appid:557800,name:"Hello Charlotte EP1"},
      {appid:1321680,name:"Hello Neighbor 2"},
      {appid:1321720,name:"Hello Neighbor 2 Alpha 1 (demo)"},
      {appid:1287320,name:"Gladiabots - Hello World Pack"}] ;
    const query:string = 'hello';
    const limit:number = 10;
    const preview:boolean = true;

    server.use(
      rest.get("http://localhost:5000/api/game/search?name="+query+"&limit="+limit, (_req, res, ctx) => {
        return res(
          ctx.status(404) 
        );
      })
    );

    const expectedActions = [
      {type: types.GET_SEARCH},
      {type: types.ERR_SEARCH}
    ]

    //work
    await expect(store.dispatch(actions.getSearch(query, limit, preview))).rejects.toThrow("404");

    //expect
    expect(store.getActions()).toEqual(expectedActions);
  })
})