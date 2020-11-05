import React, { useState, ChangeEvent, FormEvent } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { FormGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SearchBar from '../Input/SearchBar';

import { RootStore } from '../../store/store';
import { getSearch } from '../../store/search/search';
import { getProductData } from '../../store/product/product';
import './Form.css';

const SearchForm: React.FC = () => {
  //Hooks
  let history = useHistory();
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootStore) => state.search);
  const searchListRef = React.useRef<HTMLDivElement>(null);

  //Search form data
  const [searchParams, setSearchParams] = useState({
    searchQuery: searchState.SearchTerm
  });

  //Validate search form data
  const validateForm = () =>  {
    return searchParams.searchQuery.length > 0;
  }

  //Handle input field changes
  const handleChange = (name: string, value: any) => {
    setSearchParams({...searchParams, [name]: value});
  }

  //Handle search preview
  const handleSearchPreview = (e:ChangeEvent<HTMLInputElement>) =>  {
    const {name, value} = e.target;
    handleChange(name, value);
    dispatch(getSearch(e.target.value,10,true));
    console.log(2);
  }

  //To be run when search preview item is clicked
  const previewItemEvent = (appid: number) => {
    dispatch(getProductData(history, appid));
  }

  //Submit search form
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(6);
    //Perform search action
    if(validateForm()){
      dispatch(getSearch(searchParams.searchQuery,1000,false));   
    }
    if(null !== searchListRef.current)
    {
      console.log(searchListRef.current);
      searchListRef.current.focus();
    }
  };


  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit}>
            <FormGroup controlId="searchQuery">
                  {/* Search bar */}
                  <SearchBar inputValue={searchParams.searchQuery} searchPreview={searchState.SearchPreview} handleSearchPreview={handleSearchPreview} handlePreviewItemEvent={previewItemEvent} handleChange={handleChange} name='searchQuery' autoFocus={true}></SearchBar>

                  {/* Divider */}
                  <div className='divider'></div>

                  {/* Search Results */}
                  <div className= 'searchItems' ref={searchListRef} tabIndex={-1}>
                    {searchState.SearchItems.map((item)=>
                      <button type='submit' onClick={() => dispatch(getProductData(history, item.appid))} key={item.appid}>{item.name}</button>
                    )}
                  </div>
            </FormGroup>
      </form>
    </div>
  );
}

export default SearchForm;