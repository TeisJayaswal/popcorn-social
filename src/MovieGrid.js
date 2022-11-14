/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./MovieGrid.css";

function MovieGrid({ movies, watchlist, setFilmToShow }) {
  // console.log(movies);
  // console.log(`here is my watchlist from moviegrid`);
  // console.log(setFilmToShow);
  return (
    <div className="film-grid movie-grid">
      {movies.map((film) => (
        <>
          {/* {console.log(film)} */}
          <div className="item-box single-film">
            <Link to={`/video/${film.id}`}>
              <img
                key={film.id}
                onClick={(event) => setFilmToShow(film)}
                className="item-image film-image"
                src={
                  film.poster_path !== null
                    ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${film.poster_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                }
                alt={film.title}
              />
            </Link>
            {/* <Link to={`/video/${film.id}`}>
              <img
                key={film.id}
                className="item-image film-image"
                src={
                  film.poster_path !== null
                    ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${film.poster_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                }
                alt={film.title}
              />
            </Link> */}
            <h2 className="film-header">{film.title || film.name}</h2>
          </div>
        </>
      ))}
    </div>
  );
}

export default MovieGrid;
