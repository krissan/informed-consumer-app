import React, { useState, ChangeEvent, useEffect } from 'react';
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

import { getProductData } from '../../store/product/product';
import './Input.css';
import { SearchPreviewItem } from '../../store/types';

type SearchBar = {
  inputValue: string,
  name: string,
  autoFocus?: boolean,
  searchPreview:Array<SearchPreviewItem>,
  handleSearchPreview: (e:ChangeEvent<HTMLInputElement>) => void 
  handlePreviewItemEvent: (index: number) => void
  handleChange: (name: string, value: any) => void 
}

const SearchBar: React.FC<SearchBar>= ({inputValue, name, autoFocus, searchPreview, handleSearchPreview, handlePreviewItemEvent, handleChange}) => {
  //Hooks
  let history = useHistory();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(false);
  const [hover, setHover] = useState(false);
  const [current, setCurrent] = useState(0);

  //Alter input value based on autocomplete selected
  useEffect(() => {
    if(current !== 0) {
      handleChange(name, searchPreview[current-1].name);
    }
  }, [current,handleChange,searchPreview,name])

  //If search preview changes return to input
  useEffect(() => {
    if(current !== 0) {
      setCurrent(0);
    }
  }, [searchPreview,current])

  //Handle keyboard actions on search bar
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch(e.key)
    {
      //Move down preview list
      case "ArrowDown": 
        e.preventDefault();
        if (current < searchPreview.length)
        {
          setCurrent(current+1);
        }
        break;
      //Move up preview list
      case "ArrowUp":
      e.preventDefault();
        if (current > 0)
        {
          setCurrent(current-1);
        }
        break;
      //Run preview item event passed through prop
      case "Enter": 
        if (current !== 0)
        {
          e.preventDefault();
          handlePreviewItemEvent(searchPreview[current-1].appid);
        }
        break;
      //Return to input field
      case "ArrowLeft":
        if (current !== 0) {
          e.preventDefault();
          setCurrent(0);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="searchBar" onBlur={() => setPreview(false)}>
      <div className="searchLabel">Search</div>
      <div className="searchBox">
        {/* Search bar */}
        <input
        type='text'
        tabIndex={0}
        autoFocus={autoFocus}
        name={name}
        placeholder="..."
        value={inputValue}
        data-testid="searchInput"
        onChange={(e)=>{handleChange(e.target.name, e.target.value);handleSearchPreview(e);}} 
        className="searchInput"
        autoComplete="off"
        onFocus={() => setPreview(true)}
        onKeyDown={(e) => handleKeyDown(e)}
        />

        {/* Search Preview */}
        <div hidden={!preview && !hover}>
        {searchPreview.length>0 ?
          <div className= 'searchPreviewItems' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              {searchPreview.map((item, index)=>
                <button
                  type="button"
                  className={`${index+1 === current ? "active": ""}`}
                  onClick={() => dispatch(getProductData(history, item.appid)) } 
                  key={item.appid} 
                  id={(index+1).toString()}
                  data-testid={'preview'+item.appid}
                >
                    {item.name}
                </button>
              )}
          </div>
          :
          <div hidden={inputValue === ''} className= 'searchPreviewItems noResult'>No Results Found</div>
        }
        </div>
      </div>
    </div>
  );
}

export default SearchBar;