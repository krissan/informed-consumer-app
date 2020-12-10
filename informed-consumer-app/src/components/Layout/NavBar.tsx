import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";

import { RootStore } from '../../store/store';
import { checkAuth, logout } from '../../store/auth/auth';

import './Layout.css';

const Navbar: React.FC = () => {
  const authState = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  //check if already logged in page load
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  //Perform logout action
  const handleLogout = () => {
    dispatch(logout(history));
  }

  return (
    <div className="navColor">
      <nav className="navBar">
        <div className="navStart">
          <div className="navItems">
            {/* App logo and home button */}
            <Link to="/">
              <img className="navbarLogo" alt="Informed Consumer" src={require('../../imgs/Logo.png')} />
            </Link>
          </div>
          {/* Nav link */}
          <div className="navItems container">
            <LinkContainer className="navSpace" to="/">
                  <NavItem>Search</NavItem>
            </LinkContainer>
            <LinkContainer className="navSpace" to="/">
                  <NavItem>Popular</NavItem>
            </LinkContainer>
            <LinkContainer className="navSpace" to="/">
                  <NavItem>Organizations</NavItem>
            </LinkContainer>
            <LinkContainer className="navSpace" to="/">
                  <NavItem>About</NavItem>
            </LinkContainer>
          </div>
        </div>
        {/*Auth*/}
        {authState.isAuthenticated ?
          <div className="navEnd">
            <div onClick={() => handleLogout()} className="navSpace">
              Logout
            </div>
          </div>
        :
          <div className="navEnd">
            <LinkContainer className="navSpace" to="/Login">
              <NavItem>Login</NavItem>
            </LinkContainer>
            <span className="navDivider">|</span>
            <LinkContainer className="navSpace" to="/Signup">
              <NavItem>Signup</NavItem>
            </LinkContainer>
          </div>
        }
      </nav>
    </div>
  );
}

export default Navbar;