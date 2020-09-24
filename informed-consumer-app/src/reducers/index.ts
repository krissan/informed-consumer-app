import { combineReducers } from 'redux';
import { productReducer } from './product';
import { searchReducer } from './search';

const rootReducer = combineReducers({
    product: productReducer,
    search: searchReducer
});

export default rootReducer;