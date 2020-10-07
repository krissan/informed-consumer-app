import { GET_SEARCH,
    SET_SEARCH,
    SET_SEARCH_PREVIEW,
    SearchDispatchTypes,
    SearchPreviewItem
    } from '../types';

export interface SearchState {
    isLoading: boolean,
    SearchItems: Array<SearchPreviewItem>
    SearchPreview: Array<SearchPreviewItem>
    SearchTerm: string
}

const initialState: SearchState = {
    isLoading: false,
    SearchPreview: [],
    SearchItems: [],
    SearchTerm: ''
}

export const searchReducer = (state:SearchState = initialState, action: SearchDispatchTypes) : SearchState => {
    switch(action.type) {
        //Start loading
        case GET_SEARCH:
            return{
                ...state,
                isLoading: true
            }
        //End loading, Store Search Preview
        case SET_SEARCH_PREVIEW:
            return{
                ...state,
                isLoading: false,
                SearchPreview: [...action.payload.products]
            }
        //End loading, Store Search Preview
        case SET_SEARCH:
            return{
                ...state,
                isLoading: false,
                SearchItems: [...action.payload.products]
            }       
        default:
            return state;
    }
}