import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { API_KEY } from "../utils/constants";
import { Link } from "react-router-dom";

const DiscoverMovies = () =>{
    const [movie, setMovie] = useState([]);
    const [index, setIndex] = useState(1);
    const [genre, setGenre] = useState();
    const [selectedGenre, setSelectedGenre] = useState("Genres");
    const [page, setPage] = useState();

// Use effect to fetch the data for movies
useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${index}&with_watch_monetization_types=flatrate&with_genres=${genre}`);
        setMovie(movieResponse.data.results);
        setPage(movieResponse.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [index, genre]); // Re-run the effect only when the id changes

  const handlePreviousPage = () => {
    if (index > 0) {
        setIndex(index - 1);
      }
  }
  
  const handleNextPage = () => {
    if (index < page) {
        setIndex(index + 1);
      }
  }

  const handleOnClick = (num, name) => {
    setGenre(num);
    setSelectedGenre(name);
  };

    return(
        <div>
            <Navbar/>
            <div className="d-flex mt-5 mb-4 ">
            <h2 className="ms-4 ms-md-5 trailer-link" style={{fontFamily:'Montserrat'}}>Discover Movies</h2>
            <div class="dropdown ms-auto me-4 me-md-5">
  <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  {selectedGenre}
  </button>
  <ul class="dropdown-menu">
  <li><a class="dropdown-item active" onClick={() => handleOnClick(null, "Genres")} href="/movies">All Movies</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(28, "Genre: Action")} href="/movies">Action</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(12, "Genre: Adventure")} href="/movies">Adventure</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(16, "Genre: Animation")} href="/movies">Animation</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(35, "Genre: Comedy")} href="/movies">Comedy</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(80, "Genre: Crime")} href="/movies">Crime</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(99, "Genre: Documentary")} href="/movies">Documentry</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(18, "Genre: Drama")} href="/movies">Drama</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(10751, "Genre: Family")} href="/movies">Family</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(14, "Genre: Fantasy")} href="/movies">Fantasy</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(36, "Genre: History")} href="/movies">History</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(27, "Genre: Horror")} href="/movies">Horror</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(10402, "Genre: Music")} href="/movies">Music</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(9648, "Genre: Mystery")}href="/movies">Mystery</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(10749, "Genre: Romance")} href="/movies">Romance</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(878, "Genre: Sci-fi")} href="/movies">Sci-fi</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(10770, "Genre: TV Movie")}href="/movies">TV Movie</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(53, "Genre: Thriller")} href="/movies">Thriller</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(10752, "Genre: War")} href="/movies">War</a></li>
    <li><a class="dropdown-item" onClick={() => handleOnClick(37, "Genre: Western")} href="/movies">Western</a></li>
  </ul>
</div>
            </div>
            <div className="d-flex justify-content-center ms-4 ms-md-5 me-md-5 me-4 flex-wrap">
            {movie.map(movies => (
        <div key={movies.id}>
          <Link to={`/movie/${movies.id}`}>
          <img className='me-4 mt-4' style={{width:'220px', height: '320px'}} src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt={movies.title} />
          </Link>
          <p className='liked fw-bolder me-4 mt-2 mb-0 text-center' style={{width:'220px'}}>{Math.round((movies.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
          <p className='movie-title me-4 text-white fw-bolder mt-1 text-center' style={{width:'220px', fontFamily:"Poppins"}}>{movies.title}</p>
        </div>
      ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 mb-5">
  <button className="ms-4 ms-md-5 btn btn-dark" onClick={handlePreviousPage}>Previous</button>
  <p className="text-secondary mt-3">Page {index} / {page}</p>
  <button className="me-4 me-md-5 btn btn-dark" onClick={handleNextPage}>Next</button>
</div>
            <Footer/>
        </div>
    )
}

export default DiscoverMovies;