/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MovieGrid from "./MovieGrid";
import DisplayFilm from "./OneFilm";
import AppSearch from "./AppSearch";
import Post from "./Post";
import DisplayFeed from "./DisplayFeed";
import DisplayUsers from "./DisplayUsers";
import Profile from "./Profile";
import Logo from "./Popcorn-link.png";
// import Dropdown from "react-bootstrap/Dropdown";
import "./App.css";

// import ReactionSelector from "./Selector";

const RouteSwitch = ({
  upcoming,
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
  fetchUserData,
  fetchFeed,
  updateFeed,
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
          {/* <li>
            <Link to="/upcoming">UPCOMING</Link>
          </li> */}
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
          path="/upcoming"
          element={
            <>
              <MovieGrid
                movies={upcoming}
                watchlist={watchlist}
                addFilmToWatchList={addFilmToWatchList}
              />
            </>
          }
        />
        <Route
          path="/search"
          element={<AppSearch setFilmToShow={setFilmToShow} />}
        />
        <Route
          path="/watchlist"
          element={
            <>
              <p className="feed-header">WATCHLIST</p>
              <MovieGrid
                setFilmToShow={setFilmToShow}
                movies={watchlist}
                addFilmToWatchList={addFilmToWatchList}
                removeFilmFromWatchList={removeFilmFromWatchList}
              />
            </>
          }
        />
        <Route
          path={`user/:userId`}
          element={<Profile fetchUserData={fetchUserData} />}
        />
        <Route
          path={`video/:filmId`}
          element={
            <DisplayFilm
              upcoming={upcoming}
              watchlist={watchlist}
              addFilmToWatchList={addFilmToWatchList}
              removeFilmFromWatchList={removeFilmFromWatchList}
              movieForMoviePage={movieForMoviePage}
            />
          }
        />
        <Route
          path={`/post`}
          element={
            <Post
              feed={feed}
              setFeed={setFeed}
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
              setFeed={setFeed}
              fetchFeed={fetchFeed}
              addPostToFeed={addPostToFeed}
              updateFeed={updateFeed}
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
        {/* element={<DisplayFilm upcoming={upcoming} id={upcoming.id} />} */}

        {/* <Route
          path="/fruits"
          element={
            <ItemGrid
              items={fruitItems}
              allItems={allItems}
              cart={cart}
              addItemToCart={addItemToCart}
            />
          }
        /> */}
        {/* <Route
          path="/vegetables"
          element={
            <ItemGrid
              items={vegetableItems}
              allItems={allItems}
              cart={cart}
              addItemToCart={addItemToCart}
            />
          }
        /> */}
        {/* <Route
          path="/cart"
          element={
            <DisplayCart
              allItems={allItems}
              cart={cart}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
            />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
