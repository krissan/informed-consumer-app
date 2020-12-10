import { Auth } from "aws-amplify";
import { Dispatch } from "redux";
import { History } from 'history';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    AUTH_LOAD,
    AuthDispatchTypes,
    User
} from '../types';



//Register User
export const register = (username:string,email:string,password:string,history: History) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    //start loading auth dependent components
    dispatch({type: AUTH_LOAD});
    try {
        //Signup aws cognito auth
        await Auth.signUp({
            username: email,
            password: password,
            attributes: {name: username}
        });

        //Sign in using newly created credentials
        await Auth.signIn(email, password);
        
        //Get user details and dispatch to store
        const userInfo:any = await Auth.currentUserInfo();
        const userData:User = {id: userInfo.name, username: userInfo.attributes.name, email: userInfo.attributes.email}
        dispatch({
            type: USER_LOADED,
            payload: {user: userData}
        });

        history.push('/');

        alert("Signed Up");
      } catch (e) {
        //generate error
        alert(e.message);
        dispatch({
            type: AUTH_ERROR,
        });
    }
}

//Login User
export const login = (username:string,password:string,history: History) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    //start loading auth dependent components
    dispatch({type: AUTH_LOAD});

    try {
        //Sign in aws Auth
        await Auth.signIn(username, password);

        //Get user details and dispatch to store
        const userInfo:any = await Auth.currentUserInfo();
        const userData:User = {id: userInfo.username, username: userInfo.attributes.name, email: userInfo.attributes.email}
        
        dispatch({
            type: USER_LOADED,
            payload: {user: userData}
        });

        history.push('/');
      } catch (e) {
        //generate error
        alert(e.message);
        dispatch({
            type: AUTH_ERROR,
        });
    }
}

// Logout
export const logout = (history: History) => async  (dispatch: Dispatch<AuthDispatchTypes>) => {
    //start loading auth dependent components
    dispatch({type: AUTH_LOAD});

    try {
        //Sign out aws Auth
        await Auth.signOut();
        await dispatch({ type: LOGOUT });
        //Change login
        history.push('/login');
        //alert("Logged out");
      } catch (e) {
        //generate error
        alert(e.message);
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const checkAuth = () => async  (dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        //Get user info 
        const userInfo:any = await Auth.currentUserInfo();

        //Check if user info is available
        if (userInfo.username) {
            const userData:User = {id: userInfo.username, username: userInfo.attributes.name, email: userInfo.attributes.email}
            dispatch({
                type: USER_LOADED,
                payload: {user: userData}
            });
        }
      } catch (e) {
        //generate error
        alert(e.message);
        dispatch({
            type: AUTH_ERROR,
        });
    }
};