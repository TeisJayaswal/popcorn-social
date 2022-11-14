import React, { useEffect, useState } from "react";

function upcoming() {
  const apiKey = `0452af7a26b17e3bde1121a0ca08fb46`;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setUpcoming(result.results);
          console.log(upcoming);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div> Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="item-grid">
        {upcoming.map((film) => (
          <>
            <div className="item-box">
              <h2>{film.title}</h2>
              <img
                key={film.id}
                className="item-image"
                src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${film.poster_path}`}
                alt={film.title}
              />
            </div>
          </>
        ))}
      </div>
    );
  }
}

export default upcoming;
