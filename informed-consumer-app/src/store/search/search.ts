import axios from 'axios';

import { SearchDispatchTypes, GET_SEARCH, CLEAR_SEARCH, SET_SEARCH, SET_SEARCH_PREVIEW } from '../types';
import { Dispatch } from "redux";


//grab product data based on search query
export const getSearch = (query: string, limit: number, preview: boolean) => async(dispatch: Dispatch<SearchDispatchTypes>) => {
    //Start search loading flag
    dispatch({type: GET_SEARCH});
    
    try {        
        if(query === '')
        {
            dispatch({
                type: SET_SEARCH_PREVIEW,
                payload: {
                    products: [],
                    form: {query:''}
                }
            });
        } else {
            const resp = await axios.get('http://localhost:5000/api/game/search?name='+query+'&limit='+limit);

            if (preview === true)
            {
                dispatch({
                    type: SET_SEARCH_PREVIEW,
                    payload: {
                        products: resp.data,
                        form: {query: query}
                    }
                });
            }
            else
            {
                dispatch({
                    type: SET_SEARCH,
                    payload: {
                        products: resp.data,
                        form: {query: query}
                    }
                });
            }
        }

    }
    catch(err) {
        console.log(err);
    }
}

//clear search preview results
export const clearSearchPreview = () => async(dispatch: Dispatch<SearchDispatchTypes>) => {
    try {        
        dispatch({
            type: CLEAR_SEARCH
        });
    }
    catch(err) {
        console.log(err);
    }
}