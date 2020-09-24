import axios from 'axios';
import { History } from 'history';

import { GET_PRODUCT, SET_PRODUCT, ProductDispatchTypes, ProductData } from './types';
import { Dispatch } from "redux";



//grab product data based on search query
export const getProductData = (history:History, appid: number) => async(dispatch: Dispatch<ProductDispatchTypes>) => {
    //Start product loading flag
    dispatch({type: GET_PRODUCT});

    //Grab game data from steam based on appid
    try {
        const resp = await axios.get('http://localhost:5000/api/game?appid='+appid);

        const storeData = resp.data[appid].data;

        const product:ProductData ={
            name: storeData.name,
            productKey: storeData.steam_appid,
            price: storeData.price_overview.final_formatted,
            currency: storeData.price_overview.currency,
            store: "Steam",
            picture: storeData.header_image
        }

        history.push('/game');
        
        //push product data to store and end loading flag
        dispatch({
            type: SET_PRODUCT, 
            payload: {product: product}
        });
    }
    catch(err) {
        console.log(err);
    }
}

