import React from "react";
import {useSelector} from "react-redux";

import {RootStore} from '../../store/store';
import './Product.css';

const Product: React.FC = () => {
  const productState = useSelector((state: RootStore) => state.product.Product);

  return (
    <div className="product">
      {productState ?
        <div className="productCard">
          <img src={productState.picture} alt="Italian Trulli"></img>
          <div>
            <div className="productTitle">{productState.name}</div>
            <div>{productState.price}</div>
            <div>Available on {productState.store}</div>
          </div>
        </div>
      :
        <div></div>
      }
    </div>
  );
}
/*import React, { useEffect } from "react";
import SearchBar from '../Input/SearchBar';

import './Layout.css';

const Results: React.FC = () => {

  return (
    <div className="layout">
        <div className='centerBlock'>
            <SearchBar></SearchBar>
        </div>
    </div>
  );
}

export default Results;*/
export default Product;