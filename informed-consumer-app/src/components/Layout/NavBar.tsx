import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";

import './Layout.css';

const Navbar: React.FC = () => {

  return (
    <div className="navColor">
      <nav className="navBar container">
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
        <div className="navEnd navSpace">
          <div>Login</div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;