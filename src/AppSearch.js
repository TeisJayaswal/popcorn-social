/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import MovieGrid from "./MovieGrid";
import Search from "./Search";

const apiKey = `0452af7a26b17e3bde1121a0ca08fb46`;

const AppSearch = ({ setFilmToShow }) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);
    const formattedSearchValue = searchValue.split(" ").join("+");
    console.log(
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${formattedSearchValue}    `
      ).then((response) => response.json())
    );
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${formattedSearchValue}    `
      ),
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}    `
      ),
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        const dataArray = [];
        data.map((dataset) => dataArray.push(dataset.results));
        const collapsedArray = [].concat(...dataArray);
        console.log(collapsedArray);
        setLoading(false);
        setMovies(collapsedArray);
        setSearchResults(collapsedArray);
      });
    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}    `
    // )
    //   .then((response) => response.json())
    //   .then((jsonResponse) => {
    //     console.log("showing results");
    //     console.log(jsonResponse.results);
    //     setLoading(false);
    //     setMovies(jsonResponse.results);
    //     setSearchResults(jsonResponse.results);
    //     console.log(movies);
    //   });
  };

  return (
    <div className="App app-search">
      <Search search={search} />
      {/* <p className="App-intro">Sharing a few of our favourite movies</p> */}
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <MovieGrid movies={movies} setFilmToShow={setFilmToShow} />
        )}
      </div>
    </div>
  );
};

export default AppSearch;
