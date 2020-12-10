import { GET_SEARCH,
    SET_SEARCH,
    CLEAR_SEARCH,
    SET_SEARCH_PREVIEW,
    SearchDispatchTypes,
    SearchPreviewItem,
    SearchItem
    } from '../types';

export interface SearchState {
    isLoading: boolean,
    SearchItems: Array<SearchItem>
    SearchPreview: Array<SearchPreviewItem>
    SearchTerm: string
}

const initialState: SearchState = {
    isLoading: false,
    SearchPreview: [],
    SearchItems: [],
    SearchTerm: '',
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
                SearchPreview: [...action.payload.products],
                SearchTerm: action.payload.form.query
            }
        //End loading, Store Search Preview
        case SET_SEARCH:
            return{
                ...state,
                isLoading: false,
                SearchItems: [...action.payload.products]
            }
        case CLEAR_SEARCH:
            return{
                ...state,
                isLoading: false,
                SearchItems: []
            }       
        default:
            return state;
    }
}