export const GET_PRODUCT = 'GET_PRODUCT'
export const SET_PRODUCT = 'SET_PRODUCT'

//Product Types
export type ProductData = {
        name: string
        productKey: string
        price: string
        currency:  string
        store: string
        picture: string
}

export type storeData = {
    name: string
    icon: string
    scores: Array<string>
}

//Product Interfaces
export interface GetProducts {
    type: typeof GET_PRODUCT
}

export interface SetProducts {
    type: typeof SET_PRODUCT,
    payload: {
        product: ProductData
    }
}


export type ProductDispatchTypes = GetProducts | SetProducts;
/*---------------------------------------------------------------------------- */
export const SET_SEARCH_PREVIEW = 'SET_SEARCH_PREVIEW'
export const GET_SEARCH_PREVIEW = 'GET_SEARCH_PREVIEW'

//Search Preview Item type
export type SearchPreviewItem = {
    appid: number,
    name: string
}

//Search Preview Interfaces
export interface GetSearchPreview {
    type: typeof GET_SEARCH_PREVIEW
}

export interface SetSearchPreview {
    type: typeof SET_SEARCH_PREVIEW,
    payload: {
        products: Array<SearchPreviewItem>
    }
}

export type SearchDispatchTypes = GetSearchPreview | SetSearchPreview;