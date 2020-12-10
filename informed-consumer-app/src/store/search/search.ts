import axios from 'axios';

import { SearchDispatchTypes, GET_SEARCH, CLEAR_SEARCH, SET_SEARCH, SET_SEARCH_PREVIEW, ERR_SEARCH } from '../types';
import { Dispatch } from "redux";


type votingOn = {
    category: string
    entity: string
}

//grab product data based on search query
export const getSearch = (query: string, limit: number, preview: boolean) => async(dispatch: Dispatch<SearchDispatchTypes>) => {
    //Start search loading flag
    dispatch({type: GET_SEARCH});
    
    try {        
        console.log(query);
        //if query is empty dont perform search and set stores query to empty
        if(query === '')
        {
            dispatch({
                type: SET_SEARCH_PREVIEW,
                payload: {
                    products: [],
                    form: {query:''}
                }
            });
        } 
        //if query exists perform search
        else {
            //grab amount of previews corresponding with limit and based on query
            const resp = await axios.get('http://localhost:5000/api/game/search?name='+query+'&limit='+limit);            
            
            let searchItems = []
            //sift out necessary data
            if(preview === true)
            {
                searchItems = resp.data.map((x: { appid: number; name: string; }) => {return {appid: x.appid, name: x.name}});
            }
            else
            {
                searchItems = resp.data.map((x: { appid: number; name: string; }) => {return {appid: x.appid, name: x.name, category: "game store", entity:"steam"}});
            }
            /******************
            
            grab distinct entities
            grab their vote data
            grab users vote
            put them through new vote reducer into a dictionary (category, enity = {vote, votes})
            use dictionary to populate tags
            */

            //set preview of search  results
            if (preview === true)
            {
                dispatch({
                    type: SET_SEARCH_PREVIEW,
                    payload: {
                        products: searchItems,
                        form: {query: query}
                    }
                });
            }
            else
            //set search results
            {
                dispatch({
                    type: SET_SEARCH,
                    payload: {
                        products: searchItems,
                        form: {query: query}
                    }
                });
            }
        }

    }
    catch(err) {
        //End search loading flag
        dispatch({type: ERR_SEARCH});
        throw new Error(err);
    }
}

//clear search preview results
export const clearSearchPreview = () => async(dispatch: Dispatch<SearchDispatchTypes>) => {
    dispatch({
        type: CLEAR_SEARCH
    });
}