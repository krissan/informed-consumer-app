import React, { useState, ChangeEvent, FormEvent } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

import { Redirect } from 'react-router-dom';
import { FormGroup, FormControl } from "react-bootstrap";

import { RootStore } from '../../store/store';
import LoaderButton from '../Misc/LoaderButton';
import { register } from '../../store/auth/auth';

const Signup: React.FC = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootStore) => state.auth);
    const history = useHistory();

  //SignUp form data
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confPassword: ''
  });

    //Tie input fields to SignUp form data
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});

    //Validate SignUp form data
  function validateForm() {
    return formData.username.length > 0 
    && formData.email.length > 0
    && formData.password.length > 0 
    && formData.confPassword === formData.password;
  }

  //Perform submit action
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(formData.username, formData.email, formData.password, history));
  };

  // Redirect if logged in
  if(authState.isAuthenticated){
    return <Redirect to="/home" />
  }

  return (
    <div className="Signup flexxer">
      <form onSubmit={handleSubmit}>
        <div className="formBody">
          {/* Email field */}
          <FormGroup controlId="email">
            <FormControl
              autoFocus
              name="email"
              type="email"
              placeholder="Email"
              className="inputStyle"
              value={formData.email}
              onChange={handleChange} 
            />
          </FormGroup>
          {/* Username field */}
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
          {/* Password field */}
          <FormGroup controlId="password" >
            <FormControl
              name="password"
              value={formData.password}
              onChange={handleChange} 
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          {/* Confirm Password field */}
          <FormGroup controlId="confPassword" >
            <FormControl
              name="confPassword"
              value={formData.confPassword}
              onChange={handleChange} 
              type="password"
              placeholder="Confirm Password"
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
            Signup
          </LoaderButton>
        </div>
      </form>
      {/* Navigate to sign up button */}
      <div>
        <button className="StandardButton">
          Login
        </button>
      </div>
    </div>
  );
}

export default Signup;