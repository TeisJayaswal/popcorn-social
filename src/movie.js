// async function getMovieData() {
//   const apiKey = `0452af7a26b17e3bde1121a0ca08fb46`  
//   let movieDataArray = []
//   const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`, {mode: 'cors'});
//   const movieData = await response.json();
//   const movieResults = movieData.results

//   return movieResults
// }

// export default getMovieData