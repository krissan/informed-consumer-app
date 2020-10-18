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
export const GET_SEARCH = 'GET_SEARCH'
export const SET_SEARCH = 'SET_SEARCH'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

//Search Preview Item type
export type SearchPreviewItem = {
    appid: number,
    name: string
}

//Search Form type
export type SearchForm = {
    query: string
}

//Search Preview Interfaces
export interface GetSearch {
    type: typeof GET_SEARCH
}

export interface SetSearchPreview {
    type: typeof SET_SEARCH_PREVIEW,
    payload: {
        products: Array<SearchPreviewItem>,
        form: SearchForm
    }
}

export interface SetSearch {
    type: typeof SET_SEARCH,
    payload: {
        products: Array<SearchPreviewItem>
    }
}

export interface ClearSearch {
    type: typeof CLEAR_SEARCH
}

export type SearchDispatchTypes = GetSearch | SetSearchPreview | SetSearch | ClearSearch;