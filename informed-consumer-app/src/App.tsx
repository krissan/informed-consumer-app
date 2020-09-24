import React from 'react';
import Navbar from "./components/Layout/NavBar";
import Layout from "./components/Layout/Layout";
import Product from "./components/Product/Product";
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Navbar></Navbar>
          <div className='centerBlock'>
            <Switch>
            <Route exact path="/game">
              <Product />
            </Route>
            <Route exact path="/">
              <Layout />
            </Route>
            <Layout></Layout>
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
