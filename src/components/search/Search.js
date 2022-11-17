/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../../stylesheets/App.css";
import "../../stylesheets/users.css";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    console.log(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        className="searcharea"
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input
        className="search-button"
        onClick={callSearchFunction}
        type="submit"
        value="SEARCH"
      />
    </form>
  );
};

export default Search;
