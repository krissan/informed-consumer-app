import { GET_SEARCH_PREVIEW,
    SET_SEARCH_PREVIEW,
    SearchDispatchTypes,
    SearchPreviewItem
    } from '../actions/types';

export interface SearchState {
    isLoading: boolean,
    SearchItems: Array<SearchPreviewItem>
}

const initialState: SearchState = {
    isLoading: false,
    SearchItems: []
}

export const searchReducer = (state:SearchState = initialState, action: SearchDispatchTypes) : SearchState => {
    switch(action.type) {
        //Start loading
        case GET_SEARCH_PREVIEW:
            return{
                ...state,
                isLoading: true
            }
        //End loading, Store Search Results
        case SET_SEARCH_PREVIEW:
            return{
                ...state,
                isLoading: false,
                SearchItems: [...action.payload.products]
            }
        default:
            return state;
    }
}