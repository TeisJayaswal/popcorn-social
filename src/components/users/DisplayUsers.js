/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import db from "../../firebase.config";
import PropTypes from "prop-types";
import { collection, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import "../../stylesheets/feed.css";
import "../../stylesheets/users.css";

DisplayUsers.propTypes = {
  users: PropTypes.array.isRequired,
  followUser: PropTypes.func.isRequired,
  following: PropTypes.array.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  addSizeToGoogleProfilePic: PropTypes.func.isRequired,
};

function DisplayUsers({
  users,
  followUser,
  following,
  unfollowUser,
  addSizeToGoogleProfilePic,
}) {
  console.log("logging follwoing");
  console.log(following);
  console.log(users);
  return (
    <>
      <p className="feed-header">SUGGESTED USERS</p>
      <div className="item-grid friend-feed">
        {users.map((user) => (
          <>
            {/* <Link to={`/user/${user}`}>
              <h1>{user}</h1>
            </Link> */}
            {user.name ? (
              <div className="user-field">
                <h1>{user.name}</h1>
                {/* <img src={addSizeToGoogleProfilePic(user.userPic) || ""} /> */}
                {following.includes(user.email) ? (
                  <button type="button" onClick={(event) => unfollowUser(user)}>
                    Unfollow
                  </button>
                ) : (
                  <button type="button" onClick={(event) => followUser(user)}>
                    Follow
                  </button>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </>
        ))}
      </div>
    </>
    // <div className="users">
    //   {console.log(users)}
    //   <h1>Users</h1>
    //   <div className="item-grid friend-feed">
    //     {users.map((user) => (
    //       <>
    //         <div className="item-box">
    //           <h2 className="film-user">{user}</h2>
    //         </div>
    //       </>
    //     ))}
    //   </div>
    // </div>
  );
}

export default DisplayUsers;
