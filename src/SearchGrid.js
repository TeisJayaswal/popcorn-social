/* eslint-disable react/prop-types */
import React from "react";
import "./MovieGrid.css";

function SearchGrid({
  movies,
  watchlist,
  selectedMovie,
  addFilmToPost,
  setSearchResults,
}) {
  // console.log(movies);
  // console.log(`here is my watchlist from moviegrid`);
  console.log(typeof addFilmToPost);

  const handleClick = (event, film) => {
    console.log(film);
    const filmToPost = film;
    addFilmToPost([filmToPost]);
    setSearchResults([]);
    // console.log(selectedMovie);
  };

  return (
    <div className="film-grid search-grid">
      {movies.map((film) => (
        <>
          <div className="item-box single-film-search">
            <img
              key={film.id}
              className="item-image film-image"
              src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${film.poster_path}`}
              alt={film.title}
              onClick={(event) => handleClick(event, film)}
            />
            <h2 className="film-header">{film.title || film.name}</h2>
          </div>
        </>
      ))}
    </div>
  );
}

export default SearchGrid;
