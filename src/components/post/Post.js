/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostSearch from "./PostSearch";
import { getAuth } from "firebase/auth";

Post.propTypes = {
  feed: PropTypes.array.isRequired,
  selectedMovie: PropTypes.array.isRequired,
  addPostToFeed: PropTypes.func.isRequired,
  addFilmToPost: PropTypes.func.isRequired,
  setSelectedMovie: PropTypes.func.isRequired,
};

function Post({
  feed,
  addPostToFeed,
  addFilmToPost,
  selectedMovie,
  setSelectedMovie,
}) {
  // const apiKey = `0452af7a26b17e3bde1121a0ca08fb46`;
  const [post, setPost] = useState({
    user: `${getAuth().currentUser.displayName}`,
    userEmail: `${getAuth().currentUser.email}`,
    userPic: `${getAuth().currentUser.photoURL}`,
    filmTitle: "",
    filmId: "",
    filmObject: "",
    recommend: "10/10 Recommend",
    file: "",
    imgSrc: "",
    comment: "",
  });

  const newPost = { ...post };
  console.log(newPost);
  console.log(selectedMovie);

  useEffect(() => {
    if (selectedMovie.length > 0) {
      const filmPost = selectedMovie[0];
      console.log(filmPost[0].title);
      const title = filmPost[0].title || filmPost[0].name;
      const filmid = filmPost[0].id;
      newPost.filmId = filmid;
      newPost.filmTitle = title;
      newPost.filmObject = filmPost;
      newPost.imgSrc = `https://www.themoviedb.org/t/p/w440_and_h660_face/${filmPost[0].poster_path}`;
      setPost(newPost);
    }
  }, [selectedMovie]);

  const handleChange = (event) => {
    console.log(event);
    const { target } = event;
    console.log(target);
    const { value } = target;
    console.log(value);
    const { name } = target;
    console.log(name);
    newPost[name] = value;

    setPost(newPost);
    console.log(newPost);
  };

  const handleSubmission = (post) => {
    addPostToFeed(post);
    setPost({
      user: `${getAuth().currentUser.displayName}`,
      userEmail: `${getAuth().currentUser.email}`,
      userPic: `${getAuth().currentUser.photoURL}`,
      filmTitle: "",
      filmId: "",
      filmObject: "",
      recommend: "10/10 Recommend",
      file: "",
      imgSrc: "",
      comment: "",
    });
    setSelectedMovie([]);
  };
  //   const newFeed = [];
  //   feed.forEach((element) => {
  //     newFeed.push(element);
  //   });
  //   newFeed.push(post);
  //   setFeed(newFeed);
  // setFeed([...feed, post]);
  //   console.log(feed);
  // };

  // const singlePost = () => {
  //   <div className="post-section">
  //     <form name="single-post">
  //       <label>
  //         Film Title:
  //         <input
  //           type="text"
  //           name="filmTitle"
  //           value={item.filmTitle}
  //           onChange={(event) => handleChange(event, index)}
  //         />
  //       </label>
  //       <label>
  //         Date Watched:
  //         <input
  //           type="date"
  //           name="startDate"
  //           value={item.dateWatched}
  //           onChange={(event) => handleChange(event, index)}
  //         />
  //       </label>
  //       <label>
  //         Fun Picture?
  //         <input
  //           type="file"
  //           name="file"
  //           value={item.file}
  //           onChange={(event) => handleChange(event, index)}
  //         />
  //       </label>
  //     </form>
  //   </div>;
  // };

  return (
    <div className="post-section">
      <form className="single-post" name="single-post">
        <label>
          <PostSearch
            selectedMovie={selectedMovie}
            addFilmToPost={addFilmToPost}
          />
          Film Title:
          <input
            type="text"
            name="filmTitle"
            className="searcharea filmtitlearea"
            value={post.filmTitle}
            onChange={(event) => handleChange(event)}
          />
        </label>
        <label>
          Recommend?
          <select
            onChange={(event) => handleChange(event)}
            id="recommend"
            name="recommend"
            className="searcharea recommend"
          >
            <option value="10/10 Recommend">10/10 Recommend</option>
            <option value="Don't Bother">Don't Bother</option>
          </select>
        </label>
        {/* <h4>Film Poster: </h4> */}
        <img className="item-image film-image" src={post.imgSrc} />
        {/* <label>
          Fun Picture?
          <input
            type="file"
            name="file"
            value={post.file}
            onChange={(event) => handleChange(event)}
          />
        </label> */}
        <textarea
          name="comment"
          form="usrform"
          placeholder="Describe your reaction here..."
          value={post.comment}
          onChange={(event) => handleChange(event)}
        >
          Film Comments...
        </textarea>
      </form>

      <button type="button" onClick={(event) => handleSubmission(post)}>
        Post
      </button>
    </div>
  );
}

export default Post;
