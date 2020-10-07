import React from "react";
import SearchForm from '../Form/SearchForm';

import './Layout.css';

const Layout: React.FC = () => {

  return (
    <div className="layout">
      <SearchForm></SearchForm>
    </div>
  );
}

export default Layout;