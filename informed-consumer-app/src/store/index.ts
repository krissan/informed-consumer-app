import { combineReducers } from 'redux';
import { productReducer } from './product/productReducer';
import { searchReducer } from './search/searchReducer';

const rootReducer = combineReducers({
    product: productReducer,
    search: searchReducer
});

export default rootReducer;