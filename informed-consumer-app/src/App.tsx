import React from 'react';
import Navbar from "./components/Layout/NavBar";
import Layout from "./components/Layout/Layout";
import Product from "./components/Product/Product";
import ProductDNE from "./components/Product/ProductDoesNotExist";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

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
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/gameNotFound">
                <ProductDNE />
              </Route>
              <Route exact path="/">
                <Layout />
              </Route>
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
