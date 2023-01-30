import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/icons/right-arrow.png';
import { API_KEY } from "../utils/constants";

const TrendingWeek = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastIndex = currentIndex + 6 >= data.length;
  const isFirstIndex = currentIndex <= 0;

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.results);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 6);
  }

  const handleClickBack = () => {
    setCurrentIndex(prevCurrentIndex => prevCurrentIndex - 6);
  }

  return (
    <div>
        <div className="text-white mb-4 mb-md-5 me-4 me-md-5 d-flex justify-content-end">
        <h2 className='trending-week'>TRENDING THIS WEEK</h2>
        <img src={arrow} className='small-arrow ms-2 ms-lg-3' alt='trending'/>
        </div>

        {/* Slider for larger screens */}
      <div className="trending-slider ms-5 me-0">
      {data.slice(currentIndex, currentIndex + 7).map(movie => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
          <img className='me-4' style={{width:'15vw'}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </Link>
          <p className='liked fw-bolder me-4 mt-2 mb-0 text-center' style={{width:'15vw'}}>{Math.round((movie.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
          <p className='movie-title me-4 text-white fw-bolder mt-1 text-center' style={{width:'15vw'}}>{movie.title}</p>
        </div>
      ))}
      <div>
      { !isFirstIndex && 
      <button style={{border: 'none', backgroundColor: 'transparent'}} onClick={handleClickBack}>
        <img src={arrow} className='arrow position-absolute me-3 me-md-5 p-3' style={{marginTop:'4.5%', rotate: '180deg'}} alt='slide back'/>
      </button>
}
      { !isLastIndex && 
        <button style={{border: 'none', backgroundColor: 'transparent'}} onClick={handleClick}>
        <img src={arrow} className='arrow position-absolute me-3 me-md-5 p-3' style={{marginTop:'10.5%'}} alt='slide next'/>
        </button>}
      </div>
      </div>

      {/* Slider for smaller screens */}
      <div className="trending-slider-sm ms-1 me-1">
      {data.map(movie => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
          <img className='me-3 ms-3' style={{width:'25vw'}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </Link>
          <p className='liked fw-bolder me-3 ms-3 mt-2 mb-0 text-center' style={{width:'25vw'}}>{Math.round((movie.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
          <p className='movie-title me-3 ms-3 text-white fw-bolder mt-1 text-center' style={{width:'25vw'}}>{movie.title}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default TrendingWeek;
