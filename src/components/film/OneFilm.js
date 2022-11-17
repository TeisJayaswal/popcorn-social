/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import MovieGrid from "../grids/MovieGrid";
import "../../stylesheets/film.css";

DisplayFilm.propTypes = {
  watchlist: PropTypes.array.isRequired,
  movieForMoviePage: PropTypes.array.isRequired,
  addFilmToWatchList: PropTypes.func.isRequired,
  removeFilmFromWatchList: PropTypes.func.isRequired,
  setFilmToShow: PropTypes.func.isRequired,
};

function DisplayFilm({
  addFilmToWatchList,
  watchlist,
  movieForMoviePage,
  removeFilmFromWatchList,
  setFilmToShow,
}) {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [film, setFilm] = useState({});
  const [credits, setCredits] = useState({});
  const apiKey = `0452af7a26b17e3bde1121a0ca08fb46`;
  const params = useParams();
  useEffect(() => {
    console.log(movieForMoviePage);
    setFilm(movieForMoviePage[0]);
  }, [movieForMoviePage]);

  useEffect(() => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${parseInt(
          params.filmId
        )}/similar?api_key=${apiKey}&language=en-US&page=1`,
        { mode: "cors" }
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${parseInt(
          params.filmId
        )}/similar?api_key=${apiKey}&language=en-US&page=1`,
        { mode: "cors" }
      ),
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            console.log(response);
            return response.json();
          })
        );
      })
      .then(
        function (data) {
          console.log(data);
          const dataToDisplay = data.find((dataset) => dataset.results);
          console.log(dataToDisplay);
          setSimilarMovies(dataToDisplay.results);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [params.filmId]);

  const genresArray = [];

  if (error) {
    return <div> Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <>
          <div className="item-box one-film">
            <p className="feed-header">{film.title || film.name}</p>
            <div className="film-info">
              <img
                key={film.id}
                className="item-image single-film"
                src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${film.poster_path}`}
                alt={film.title || film.name}
              />
              {/* <h2>Description</h2> */}
              <div className="film-info-text">
                <p>{film.overview || ""}</p>
                {film.release_date ? (
                  <p>Release Year: {film.release_date.substring(0, 4) || ""}</p>
                ) : film.first_air_date ? (
                  <p>
                    First Air Date: {film.first_air_date.substring(0, 4) || ""}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            {console.log(watchlist)}
            {watchlist.includes(film) ? (
              <button
                type="button"
                className=""
                onClick={(event) => removeFilmFromWatchList(film)}
              >
                Remove from Watchlist
              </button>
            ) : (
              <button
                type="button"
                className=""
                onClick={(event) =>
                  // addItemToCart(event, items, item.quantity, index)
                  addFilmToWatchList(film)
                }
              >
                Add to Watchlist
              </button>
            )}
          </div>
        </>
        <h2 className="similar-header">Similar Movies</h2>
        <MovieGrid movies={similarMovies} setFilmToShow={setFilmToShow} />
      </div>
    );
  }
}

export default DisplayFilm;

// useEffect(() => {
//   if (filmToShow.genres) {
//     filmToShow.genres.forEach((element) => {
//       genresArray.push(element.name);
//     });
//   }
// }, [filmToShow]);

// const Genres = (filmToShow) => {
//   const lisItem = filmToShow.genres.forEach((genre) => <li>{genre.name}</li>);
//   return <ul>{lisItem}</ul>;
// };

// useEffect(() => {
//   fetch(
//     `https://api.themoviedb.org/3/movie/${parseInt(
//       params.filmId
//     )}/similar?api_key=${apiKey}&language=en-US&page=1`,
//     { mode: "cors" }
//   )
//     .then((response) => response.json())
//     .then(
//       (result) => {
//         setIsLoaded(true);
//         setSimilarMovies(result.results);
//       },

//       (error) => {
//         setIsLoaded(true);
//         setError(error);
//       }
//     );
// }, [params.filmId]);

// useEffect(() => {
//   fetch(
//     `https://api.themoviedb.org/3/movie/${params.filmId}/credits?api_key=${apiKey}&language=en-US`,
//     { mode: "cors" }
//   )
//     .then((response) => response.json())
//     .then(
//       (creditResult) => {
//         setIsLoaded(true);
//         setCredits(creditResult);
//       },

//       (error) => {
//         setIsLoaded(true);
//         setError(error);
//       }
//     );
// }, [params.filmId]);

// Promise.all([
//   fetch(
//     `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${formattedSearchValue}    `
//   ),
//   fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}    `
//   ),
// ])
//   .then(function (responses) {
//     return Promise.all(
//       responses.map(function (response) {
//         return response.json();
//       })
//     );
//   })
//   .then(function (data) {
//     const dataArray = [];
//     data.map((dataset) => dataArray.push(dataset.results));
//     const collapsedArray = [].concat(...dataArray);
//     console.log(collapsedArray);
//     setLoading(false);
//     setMovies(collapsedArray);
//     setSearchResults(collapsedArray);
//   });
// useEffect(() => {
//   Promise.all([
//     fetch(
//       `https://api.themoviedb.org/3/movie/${parseInt(
//         params.filmId
//       )}?api_key=${apiKey}&language=en-US`,
//       { mode: "cors" }
//     ),
//     fetch(
//       `https://api.themoviedb.org/3/tv/${parseInt(
//         params.filmId
//       )}?api_key=${apiKey}&language=en-US`,
//       { mode: "cors" }
//     ),
//   ])
//     .then(function (responses) {
//       return Promise.all(
//         responses.map(function (response) {
//           console.log(response);
//           return response.json();
//         })
//       );
//     })
//     .then(function (data) {
//       console.log(data);
//       // data.forEach((dataset) => console.log(dataset.id));
//       // console.log(params.filmId);
//       const dataToDisplay = data.find(
//         (dataset) => dataset.id === parseInt(params.filmId)
//       );
//       console.log(dataToDisplay);
//       setFilmToShow(dataToDisplay);
//       setIsLoaded(true);

//       // console.log(filmToShow);
//     });
// }, [params.filmId]);

// console.log(filmToShow);
// useEffect(() => {
//   fetch(
//     `https://api.themoviedb.org/3/movie/${parseInt(
//       params.filmId
//     )}?api_key=${apiKey}&language=en-US`,
//     { mode: "cors" }
//   )
//     .then((response) => response.json())
//     .then((res) => {
//       setFilmToShow(res);
//     });
// }, [params.filmId]);

// const filmToDisplay = upcoming.find(
//   (film) => film.id === parseInt(params.filmId)
// );
// simmilar movies bring back
