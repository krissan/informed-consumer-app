import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { FormGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import SearchBar from '../Input/SearchBar';
import VoteButton from '../Misc/VoteButton';

import { RootStore } from '../../store/store';
import { getSearch } from '../../store/search/search';
import { getProductData } from '../../store/product/product';

import './Form.css';
import { getVotes } from '../../store/vote/vote';

const SearchForm: React.FC = () => {
  //Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootStore) => state.search);
  const voteState = useSelector((state: RootStore) => state.vote);
  const searchListRef = React.useRef<HTMLDivElement>(null);

  //Search form data
  const [searchParams, setSearchParams] = useState({
    searchQuery: searchState.SearchTerm
  });

  //Alter input value based on autocomplete selected
  useEffect(() => {
    let entities = [{category: 'game store', entity: 'steam'}] //temp results 
    dispatch(getVotes(entities))
  }, [searchState.SearchItems, dispatch])

  //Refresh page if vote count changes
  useEffect(() => {
  }, [voteState.entities])

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
  }

  //To be run when search preview item is clicked
  const previewItemEvent = (appid: number) => {
    dispatch(getProductData(history, appid));
  }

  //Submit search form
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Perform search action
    if(validateForm()){
      dispatch(getSearch(searchParams.searchQuery,20,false));
    }
    if(null !== searchListRef.current)
    {
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

            </FormGroup>
      </form>

      {/* Search Results */}
      <div className= 'searchItems' ref={searchListRef} tabIndex={-1}>
        {searchState.SearchItems.map((item)=>
          <div className="searchItem" key={item.appid}>
            <button type='submit' onClick={() => dispatch(getProductData(history, item.appid))}>{item.name}</button>
            <VoteButton 
              isloading={voteState.entities[item.category][item.entity].isloading} 
              vote={voteState.entities[item.category][item.entity].vote} 
              vote_id={voteState.entities[item.category][item.entity].vote_id} 
              categoryKey={item.category}
              entityKey={item.entity}
              icon="https://steamstore-a.akamaihd.net/public/shared/images/responsive/header_logo.png" 
              imgAltText="Steam Logo">
            </VoteButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;