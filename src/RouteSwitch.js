/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DisplayFilm from "./components/film/OneFilm";
import AppSearch from "./components/search/AppSearch";
import Post from "./components/post/Post";
import DisplayFeed from "./components/feed/DisplayFeed";
import DisplayUsers from "./components/users/DisplayUsers";
import Profile from "./components/profile/Profile";
import Logo from "./images/Popcorn-link.png";
// import Dropdown from "react-bootstrap/Dropdown";
import "./stylesheets/App.css";
import Watchlist from "components/watchlist/Watchlist";

// import ReactionSelector from "./Selector";

const RouteSwitch = ({
  addFilmToWatchList,
  watchlist,
  feed,
  setFeed,
  addPostToFeed,
  addFilmToPost,
  selectedMovie,
  setSelectedMovie,
  users,
  followUser,
  unfollowUser,
  following,
  fetchFeed,
  addCommentToPost,
  addSizeToGoogleProfilePic,
  setFilmToShow,
  movieForMoviePage,
  removeFilmFromWatchList,
}) => {
  // console.log(setFilmToShow);
  return (
    <BrowserRouter>
      <div className="top-bar">
        <img className="logo" src={Logo} />

        <ul className="menu-list">
          <li>
            <Link to="/">FRIEND FEED</Link>
          </li>
          <li>
            <Link to="/search">SEARCH</Link>
          </li>
          <li>
            <Link to="/watchlist">WATCHLIST</Link>
          </li>
          <li>
            <Link to="/users">FIND FRIENDS</Link>
          </li>
          <li>
            <Link to="/post">
              <button className="add-post-button">POST</button>
            </Link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route
          path="/search"
          element={<AppSearch setFilmToShow={setFilmToShow} />}
        />
        <Route
          path="/watchlist"
          element={
            <>
              <p className="feed-header">WATCHLIST</p>
              <Watchlist setFilmToShow={setFilmToShow} movies={watchlist} />
            </>
          }
        />
        <Route path={`user/:userId`} element={<Profile />} />
        <Route
          path={`video/:filmId`}
          element={
            <DisplayFilm
              watchlist={watchlist}
              addFilmToWatchList={addFilmToWatchList}
              removeFilmFromWatchList={removeFilmFromWatchList}
              movieForMoviePage={movieForMoviePage}
              setFilmToShow={setFilmToShow}
            />
          }
        />
        <Route
          path={`/post`}
          element={
            <Post
              feed={feed}
              addPostToFeed={addPostToFeed}
              selectedMovie={selectedMovie}
              addFilmToPost={addFilmToPost}
              setSelectedMovie={setSelectedMovie}
            />
          }
        />
        <Route
          path={`/`}
          element={
            <DisplayFeed
              feed={feed}
              fetchFeed={fetchFeed}
              setFilmToShow={setFilmToShow}
              addCommentToPost={addCommentToPost}
              addSizeToGoogleProfilePic={addSizeToGoogleProfilePic}
            />
          }
        />
        <Route
          path={`/users`}
          element={
            <DisplayUsers
              users={users}
              followUser={followUser}
              following={following}
              unfollowUser={unfollowUser}
              addSizeToGoogleProfilePic={addSizeToGoogleProfilePic}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
