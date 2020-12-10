import React, { useState, ChangeEvent, FormEvent } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

import { Redirect } from 'react-router-dom';
import { FormGroup, FormControl } from "react-bootstrap";

import { login } from '../../store/auth/auth';
import {RootStore} from '../../store/store';
import LoaderButton from '../Misc/LoaderButton';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootStore) => state.auth);
  let history = useHistory();

  //Login form data
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  //Tie input fields to Login form data
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});


    //Validate Login form data
  function validateForm() {
    return formData.username.length > 0 
    && formData.password.length > 0;
  }

  //Perform Login action
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData.username, formData.password, history));
  };

  // Redirect if logged in
  if(authState.isAuthenticated){
    return <Redirect to="/home" />
  }


  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        {/* Username field */}
        <div className="formBody">
          <FormGroup controlId="username">
            <FormControl
              autoFocus
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange} 
            />
          </FormGroup>
          {/* Password Field */}
          <FormGroup controlId="password" >
            <FormControl
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange} 
              type="password"
            />
          </FormGroup>
        </div>
        {/* Submit form */}
        <div>
        <LoaderButton
          type="submit"     
          isLoading={authState.authLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
        </div>
      </form>
      {/* Navigate to sign up button */}
      <div>
        <button className="StandardButton">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;