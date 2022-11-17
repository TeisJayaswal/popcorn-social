/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import db from "../../firebase.config";
import MovieGrid from "../grids/MovieGrid";
// NOTE: not actually used
export default function Watchlist({ setFilmToShow, movies }) {
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    fetchWatchlist();
  }, []);
  const fetchWatchlist = async () => {
    const email = getAuth().currentUser.email;
    const response = db.collection("users").doc(`${email}`);
    const data = await response.get();
    console.log("fetching watchlist");
    console.log(data.data());
    const userWatchlist = data.data().watch_list;
    console.log(userWatchlist);
    const newWatchList = [...watchlist];
    userWatchlist.forEach((item) => {
      const newFilm = item;
      if (
        watchlist.filter((element) => element.title === newFilm.title).length >
        0
      ) {
        console.log("skipping film");
      } else {
        newWatchList.push(newFilm);
        setWatchlist(newWatchList);
      }
    });
  };

  return (
    <>
      <p className="feed-header">WATCHLIST</p>
      <MovieGrid setFilmToShow={setFilmToShow} movies={watchlist} />
    </>
  );
}
