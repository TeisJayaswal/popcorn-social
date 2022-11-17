/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebase.config";
import PropTypes from "prop-types";

Profile.propTypes = {
  fetchUserData: PropTypes.func.isRequired,
};

function Profile({ fetchUserData }) {
  const [data, setData] = useState();
  const params = useParams();
  console.log(params.userId);
  const user = params.userId;
  fetchUserData(user).then((result) => setData(result));
  console.log("logging data for user");
  useEffect(() => {
    console.log("inside fetch userdata");
    fetchUserData(user).then((result) => setData(result));
  }, []);
  console.log(data);
  const following = data.following;
  // const recentlyWatched = [];
  // const posts = data[1];
  // console.log(posts);
  // posts.forEach((post) => {
  //   recentlyWatched.push(post.filmTitle);
  // });

  // console.log(recentlyWatched);
  // const following = data[0][2];
  // console.log(data[0][2]);
  // const posts = data[0][0];
  // // const imagesArray = posts.map((post) => {
  // //   imagesArray.concat(post.imgSrc);
  // // });
  // // console.log(imagesArray);

  return (
    <div>
      <h1>{user}</h1>
      <h4>Following: {following.length}</h4>
      {/* <h4>
        Recently Watched: {recentlyWatched[0]}, {recentlyWatched[1]}
      </h4> */}
    </div>
  );
}

export default Profile;
