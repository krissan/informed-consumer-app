export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGOUT = 'LOGOUT';
export const AUTH_LOAD = 'AUTH_LOAD';


//User Types
export type User  = {
    email: string
    username: string
    id: string
}

//User Types
export type UserItem  = {
    username: string
    id: string
}

//Action Interfaces
export interface UserLoaded {
    type: typeof USER_LOADED
    payload: {
        user: User,
    }
}

export interface AuthError {
    type: typeof AUTH_ERROR
}

export interface Logout {
    type: typeof LOGOUT
}

export interface AuthLoad {
    type: typeof AUTH_LOAD
}

//Combined Auth interfaces
export type AuthDispatchTypes = UserLoaded | AuthError | Logout | AuthLoad
/*---------------------------------------------------------------------------- */

export const GET_PRODUCT = 'GET_PRODUCT'
export const SET_PRODUCT = 'SET_PRODUCT'
export const ERR_PRODUCT = 'ERR_PRODUCT'

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

export interface ErrProducts {
    type: typeof ERR_PRODUCT
}

export type ProductDispatchTypes = GetProducts | SetProducts | ErrProducts| SetVote;
/*---------------------------------------------------------------------------- */

export const SET_SEARCH_PREVIEW = 'SET_SEARCH_PREVIEW'
export const GET_SEARCH = 'GET_SEARCH'
export const SET_SEARCH = 'SET_SEARCH'
export const ERR_SEARCH = 'ERR_SEARCH'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

//Search Preview Item type
export type SearchPreviewItem = {
    appid: number,
    name: string
}

//Search Preview Item type
export type SearchItem = {
    appid: number,
    name: string,
    category: string,
    entity: string
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
        products: Array<SearchItem>
    }
}

export interface ClearSearch {
    type: typeof CLEAR_SEARCH
}

export interface ErrSearch {
    type: typeof ERR_SEARCH
}

export type SearchDispatchTypes = GetSearch | SetSearchPreview | SetSearch | ClearSearch | ErrSearch;

/*---------------------------------------------------------------------------- */

export const GET_USER_VOTES = 'GET_USER_VOTES'
export const GET_TOTAL_VOTES = 'GET_TOTAL_VOTES'
export const SET_VOTE = 'SET_VOTE'
export const DELETE_VOTE = 'DELETE_VOTE'
export const CHANGE_LOADING = 'CHANGE_LOADING'
export const CLEAR_VOTES = 'CLEAR_VOTES'
export const LOAD_VOTE = 'LOAD_VOTE'

//Entity types
export type Entities = {
    [categoryKey: string] : {[entityKey: string] : {vote?: boolean, votes: number, vote_id?: string, isloading: boolean}}
}

export type Entity = {
    categoryKey: string,
    entityKey: string,
    votes?: number,
    vote?: boolean,
    vote_id?: string
    isloading: boolean
}

//Vote interfaces
export interface GetUserVotes {
    type: typeof GET_USER_VOTES,
    payload: {
        entity: Entity
    }
}

export interface GetTotalVotes {
    type: typeof GET_TOTAL_VOTES,
    payload: {
        entities: Entities
    }
}

export interface SetVote {
    type: typeof SET_VOTE,
    payload: {
        entity: Entity
    }
}

export interface DeleteVote {
    type: typeof DELETE_VOTE,
    payload: {
        entity: Entity
    }
}

export interface ClearVotes {
    type: typeof CLEAR_VOTES
}

export interface LoadVote {
    type: typeof LOAD_VOTE
    payload: {
        entity: Entity
    }
}

export type VoteDispatchTypes = GetUserVotes | GetTotalVotes | SetVote | DeleteVote | ClearVotes | LoadVote;