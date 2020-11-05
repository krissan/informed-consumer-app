import React from "react";
import {useSelector} from "react-redux";

import {RootStore} from '../../store/store';
import './Product.css';

const ProductDNE: React.FC = () => {
  const productState = useSelector((state: RootStore) => state.product.Product);

  return (
    <div className="product">
        <div className="productDNE">
            The Following product does not currently exist in any system.
        </div>
    </div>
  );
}

export default ProductDNE;