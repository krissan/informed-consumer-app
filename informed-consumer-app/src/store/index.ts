import { combineReducers } from 'redux';
import { productReducer } from './product/productReducer';
import { searchReducer } from './search/searchReducer';
import { authReducer } from './auth/authReducer';
import { voteReducer } from './vote/voteReducer';

const rootReducer = combineReducers({
    product: productReducer,
    search: searchReducer,
    auth: authReducer,
    vote: voteReducer
});

export default rootReducer;