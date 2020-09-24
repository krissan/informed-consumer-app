import React, { useState, ChangeEvent, FormEvent } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import {RootStore} from '../../store';
import { getProductData } from '../../actions/product';
import { getSearchPreview } from '../../actions/search';
import './Input.css';

const SearchBar: React.FC = () => {
  //Hooks
  let history = useHistory();
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootStore) => state.search);

  //Search form data
  const [searchParams, setSearchParams] = useState({
    searchQuery: '' 
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchParams({...searchParams, [e.target.name]: e.target.value})
    dispatch(getSearchPreview(e.target.value));   
  };

  //Validate search form data
  const validateForm = () =>  {
    return searchParams.searchQuery.length > 0;
  }

  //Submit search form
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //perform search action
    if(validateForm()){
      dispatch(getSearchPreview(searchParams.searchQuery));   
    }
  };


  return (
      <form onSubmit={handleSubmit}>
            <FormGroup className="searchBar" controlId="searchQuery">
                <div className="searchLabel">Search</div>
                <div className="searchBox">
                {/*search bar*/}
                  <input
                  type='text'
                  autoFocus
                  name="searchQuery"
                  placeholder="..."
                  value={searchParams.searchQuery}
                  onChange={handleChange} 
                  className="searchInput"
                  />
                  {/* Search Results */}
                  <div className= 'searchItems'>
                    {searchState.SearchItems.map((item)=>
                      <div onClick={() => dispatch(getProductData(history, item.appid))} key={item.appid}>{item.name}</div>
                    )}
                  </div>
                </div>
            </FormGroup>
      </form>
  );
}

export default SearchBar;