import React, { useEffect } from "react";
import SearchBar from '../Input/SearchBar';

import './Layout.css';

const Layout: React.FC = () => {

  return (
    <div className="layout">
      <SearchBar></SearchBar>
    </div>
  );
}

export default Layout;