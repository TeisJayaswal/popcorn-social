/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactionSelector from "./Selector";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import CommentField from "./Comment";
import UserIcon from "./user-icon.png";
import "./feed.css";
// import { FacebookSelector } from "./react-reactions/src/components/facebook/FacebookSelector";

DisplayFeed.propTypes = {
  feed: PropTypes.array.isRequired,
  fetchFeed: PropTypes.func.isRequired,
  addCommentToPost: PropTypes.func.isRequired,
  addSizeToGoogleProfilePic: PropTypes.func.isRequired,
  setFilmToShow: PropTypes.func.isRequired,
};

function DisplayFeed({
  feed,
  fetchFeed,
  addCommentToPost,
  addSizeToGoogleProfilePic,
  setFilmToShow,
}) {
  // const handleClick = (reaction) => {
  //   console.log(reaction);
  // };

  return (
    <div className="feed">
      <p className="feed-header">FEED</p>
      <div className="item-grid friend-feed">
        {console.log(feed.reverse())}
        {feed.map((singlePost) => (
          <>
            <div className="item-box, post">
              <div className="upper-level-info">
                <img
                  className="feed-pic"
                  // src="https://www.commonsensemedia.org/sites/default/files/styles/ratio_16_9_small/public/screenshots/csm-movie/the-dark-knight-ss1.jpg"
                  src={
                    addSizeToGoogleProfilePic(singlePost.userPic) || UserIcon
                  }
                />
                <div className="upper-level-text">
                  <p className="film-user">{singlePost.user}</p>
                  <p className="timestamp">
                    {singlePost.timestamp
                      .toDate([], { hour12: true })
                      .toLocaleString([], {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                  </p>
                </div>
              </div>
              <p className="just-watched">Just Watched</p>
              <h3 className="film-header">{singlePost.filmTitle}</h3>
              <div className="review">
                {/* <Link to={`/video/${singlePost.filmId}`}>
                  <img className="post-image" src={singlePost.imgSrc} />
                </Link> */}
                <Link to={`/video/${singlePost.filmId}`}>
                  <img
                    key={singlePost.filmId}
                    onClick={(event) => setFilmToShow(...singlePost.filmObject)}
                    className="post-image"
                    src={
                      singlePost.imgSrc !== null
                        ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${singlePost.imgSrc}`
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                    }
                    alt={singlePost.title}
                  />
                </Link>
                <div className="review-text">
                  {/* <p>{singlePost.startDate}</p> */}
                  <p className="comment-box">{singlePost.comment}</p>
                  <p className="recommend-review">{singlePost.recommend}</p>
                </div>
              </div>
              <div className="icons-post">
                <ReactionSelector
                  post={singlePost}
                  feed={feed}
                  fetchFeed={fetchFeed}
                />
                <CommentField
                  singlePost={singlePost}
                  addCommentToPost={addCommentToPost}
                />
                {/* <FacebookSelector onSelect={handleClick} /> */}
              </div>
              <div className="comments-field">
                {singlePost.comments
                  ? singlePost.comments.map((singleComment) => (
                      <>
                        <div className="indiv-comment">
                          <img
                            className="comment-pic"
                            // src="https://www.indiewire.com/wp-content/uploads/2019/08/joker-phoenix-1135161-1280x0.jpeg?w=780"
                            src={
                              addSizeToGoogleProfilePic(
                                singleComment.userPic
                              ) || ""
                            }
                          ></img>
                          <div className="comment-text">
                            {console.log(singleComment.comment)}
                            <p className="comment-user">{singleComment.by}</p>
                            <p className="comment-content">
                              {singleComment.comment}
                            </p>
                          </div>
                        </div>
                      </>
                    ))
                  : null}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default DisplayFeed;
