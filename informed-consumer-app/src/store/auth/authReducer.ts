import { USER_LOADED, 
    AUTH_ERROR, 
    LOGOUT,
    AUTH_LOAD,
    AuthDispatchTypes, 
    User
    } from '../types';

export interface AuthState {
    isAuthenticated: boolean,
    user: User,
    authLoading: boolean,
}


const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        email: '',
        username: '',
        id: ''
    },
    authLoading: false
};


export const authReducer = (state:AuthState = initialState, action: AuthDispatchTypes) : AuthState => {
    switch(action.type) {
        //load credentials, stop auth load
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                authLoading: false
            }
        //Remove credentials, stop auth load
        case LOGOUT:
            return{
                ...state,
                isAuthenticated: false,
                user: {
                    email: '',
                    username: '',
                    id: ''
                },
                authLoading: false
            }
        //Return Error and stop auth load
        case AUTH_ERROR:
            return{
                ...state,
                isAuthenticated: false,
                authLoading: false
            }
        //Start auth specific loading
        case AUTH_LOAD:
            return{
                ...state,
                authLoading: true
            }
        default:
            return state;
    }
}