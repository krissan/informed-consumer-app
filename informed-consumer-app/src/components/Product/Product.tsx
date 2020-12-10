import React from "react";
import {useSelector} from "react-redux";

import {RootStore} from '../../store/store';
import './Product.css';

const Product: React.FC = () => {
  const productState = useSelector((state: RootStore) => state.product.Product);

  return (
    <div className="product">
        <div className="productCard">
          {/* Check if product exists */}
          {productState ?
            <div>
              {/* Product image */}
              <img src={productState.picture} alt={productState.name+" image"}></img>
              {/* Product Info */}
              <div>
                <div className="productTitle">{productState.name}</div>
                <div>{productState.price}</div>
                <div>Available on {productState.store}</div>
              </div>
            </div>
            :
            <div className="productTitle">Product Not Selected</div>
          }
        </div>
    </div>
  );
}

export default Product;