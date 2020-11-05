
import { GET_PRODUCT,
    SET_PRODUCT,
    ERR_PRODUCT,
    ProductDispatchTypes,
    ProductData
    } from '../types';

export interface ProductState {
    isLoading: boolean,
    Product?: ProductData
}

const initialState: ProductState = {
    isLoading: false
}

export const productReducer = (state:ProductState = initialState, action: ProductDispatchTypes) : ProductState => {
    switch(action.type) {
        //Start loading
        case GET_PRODUCT:
            return{
                ...state,
                isLoading: true
            }
        //Start loading
        case ERR_PRODUCT:
            return{
                ...state,
                isLoading: false
            }
        //End loading, Store Product
        case SET_PRODUCT:
            return{
                ...state,
                isLoading: false,
                Product: action.payload.product
            }
        default:
            return state;
    }
}