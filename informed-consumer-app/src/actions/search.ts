import axios from 'axios';

import { SearchDispatchTypes, GET_SEARCH_PREVIEW, SET_SEARCH_PREVIEW } from './types';
import { Dispatch } from "redux";


//grab product data based on search query
export const getSearchPreview = (query: string) => async(dispatch: Dispatch<SearchDispatchTypes>) => {
    //Start search loading flag
    dispatch({type: GET_SEARCH_PREVIEW});
    
    try {        
        if(query == '')
        {
            dispatch({
                type: SET_SEARCH_PREVIEW,
                payload: {
                    products: []
                }
            });
        } else {
            const resp = await axios.get('http://localhost:5000/api/game/search?name='+query);

            dispatch({
                type: SET_SEARCH_PREVIEW,
                payload: {
                    products: resp.data
                }
            });
        }

    }
    catch(err) {
        console.log(err);
    }
}