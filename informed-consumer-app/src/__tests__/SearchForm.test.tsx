import React from 'react';
import { render, fireEvent, cleanup} from "@testing-library/react";
import SearchForm from "../components/Form/SearchForm";
import waitForExpect from 'wait-for-expect';
import expect from 'expect';

import {Provider} from 'react-redux';
import store from '../store/store';
import * as types from '../store/types';

import { server, rest } from "../testServer";


describe("<SearchForm />", () => {
  afterEach(() => {
    cleanup();
  });
  
  const query:string = 'hello';

  /**************/
  test("End to End testing", async () => {
    //setup
    let products1:Array<types.SearchPreviewItem> = [
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

    server.use(
      rest.get("http://localhost:5000/api/game/search?name="+query+"&limit="+10, (_req, res, ctx) => {
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
      }),
      rest.get("http://localhost:5000/api/game/search?name="+products1[1].name+"&limit="+10, (_req, res, ctx) => {
        return res(
          ctx.status(200), 
          ctx.json(
            [
            {"_id":"5f66a5dc8e8f4b0e601554fe","appid":1364960,"name":"Hello Neighbor 2 Alpha 1","__v":0},
            {"_id":"5f66ad0d8e8f4b0e60158f49","appid":1321720,"name":"Hello Neighbor 2 Alpha 1 (demo)","__v":0},
            ] 
          )
        );
      })
    );

    let endState1 = { 
      isLoading: false,
      SearchPreview: products1,
      SearchItems: [],
      SearchTerm: query
    };    

    const {getByTestId,debug} = render(<Provider store={store}><SearchForm/></Provider>);
    let input = getByTestId("searchInput") as HTMLInputElement;
      
    //check focus is on search input
    expect(document.activeElement).toEqual(input);

    //search query
    fireEvent.change(input, {target: {value: query}});

    //setup random time out for expected value
    const randomTimeout = Math.floor(Math.random() * 300);
 
    setTimeout(() => {}, randomTimeout);

    //check if store contains expected data
    await waitForExpect(async () => {
      expect(store.getState().search).toStrictEqual(endState1);
    });

    //check if expected data is displayed
    await waitForExpect(async () => {
      products1.forEach(x => {
        expect(getByTestId('preview'+x.appid).textContent).toEqual(x.name);
      })
    });

    //check focus and press down
    input = getByTestId("searchInput") as HTMLInputElement;
    expect(document.activeElement).toEqual(input);
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    await waitForExpect(async() => {
      const  currentEle = getByTestId('preview'+products1[0].appid);
      expect(currentEle.classList).toContain("active");
      const  otherEle = getByTestId('preview'+products1[1].appid);
      expect(otherEle.classList.contains("active")).toBeFalsy();
    });
    
    //check focus and press down
    input = getByTestId("searchInput") as HTMLInputElement;
    expect(document.activeElement).toEqual(input);
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    await waitForExpect(async() => {
      const  currentEle = getByTestId('preview'+products1[2].appid);
      expect(currentEle.classList).toContain("active");
      const  otherEle = getByTestId('preview'+products1[0].appid);
      expect(otherEle.classList.contains("active")).toBeFalsy();
    });

    //check focus and press up
    input = getByTestId("searchInput") as HTMLInputElement;
    expect(document.activeElement).toEqual(input);
    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    await waitForExpect(async() => {
      const  currentEle = getByTestId('preview'+products1[1].appid);
      expect(currentEle.classList).toContain("active");
      const  otherEle = getByTestId('preview'+products1[0].appid);
      expect(otherEle.classList.contains("active")).toBeFalsy();
    });

    //check focus and press left
    input = getByTestId("searchInput") as HTMLInputElement;
    expect(document.activeElement).toEqual(input);
    fireEvent.keyDown(input, { key: 'ArrowLeft', code: 'ArrowLeft' });
    await waitForExpect(async() => {
      expect(input.value).toBe(products1[1].name);
      const  currentEle = getByTestId('preview'+products1[1].appid);
      expect(currentEle.classList.contains("active")).toBeFalsy();
      const  otherEle = getByTestId('preview'+products1[0].appid);
      expect(otherEle.classList.contains("active")).toBeFalsy();
    });


    fireEvent.submit(input); 

    //update expected store state
    let products2:Array<types.SearchPreviewItem> = [
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

    let endState2 = { 
      isLoading: false,
      SearchPreview: products1,
      SearchItems: products2,
      SearchTerm: query
    };

    //check if store contains expected data
    await waitForExpect(async () => {
      expect(store.getState().search).toStrictEqual(endState2);
    });

    debug();
  });

  //search for existing products

  //search for non existant product

  //traverse search preview through arrow keys

  //traverse search results through tab

  //traverse search results through mouse

  //search
});