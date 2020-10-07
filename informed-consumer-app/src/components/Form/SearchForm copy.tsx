import React, { useState, ChangeEvent, FormEvent } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { FormGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select, { InputActionMeta } from 'react-select';

import { RootStore } from '../../store/store';
import { getSearch } from '../../store/search/search';
import { getProductData } from '../../store/product/product';
import './Input.css';

const customStyles = {
  control: (provided:any, state:any) => ({
    ...provided,
    height:'100%',
    padding:'0px',
    borderRadius: '0px 10px 10px 0px' 
  }),
};

const SearchBar: React.FC = () => {
  //Hooks
  let history = useHistory();
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootStore) => state.search);

  //Search form data
  const [searchParams, setSearchParams] = useState({
    searchQuery: ''
  });

  //handle input field changes
 /* const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchParams({...searchParams, [e.target.name]: e.target.value})
  }*/

  const handleSearchChange = (selectedOption: string, e: InputActionMeta) => {
    console.log(searchParams);
    setSearchParams({ ...searchParams, searchQuery: selectedOption});
    dispatch(getSearch(selectedOption,10,true));
  }

  //format search bar preview
  /*const getOptions = () => {
    return searchState.SearchPreview.map(x => {return ({value: x.appid.toString(), label: x.name} as OptionType)});
  }*/

  //Validate search form data
  const validateForm = () =>  {
    return searchParams.searchQuery.length > 0;
  }

  //Submit search form
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //perform search action
    if(validateForm()){
      dispatch(getSearch(searchParams.searchQuery,1000,false));   
    }
  };

  return (
      <form onSubmit={handleSubmit}>
            <FormGroup className="searchBar" controlId="searchQuery">
                <div className="searchLabel">Search</div>
                <div className="searchBox">
                  {/*search bar*/}
                  {/*<input
                  type='text'
                  autoFocus
                  name="searchQuery"
                  placeholder="..."
                  value={searchParams.searchQuery}
                  onChange={handleChange} 
                  className="searchInput"
                  />*/}
                  <Select 
                  onInputChange={(selectedOption: string, e: InputActionMeta) => handleSearchChange(selectedOption, e)}
                  inputValue={searchParams.searchQuery}
                  noOptionsMessage = {() => {return "No Results Found"}}
                  placeholder='...'
                  //options={getOptions()}
                  isLoading={searchState.isLoading}
                  styles={customStyles}
                  isMulti={false}
                  isSearchable
                  autoFocus
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