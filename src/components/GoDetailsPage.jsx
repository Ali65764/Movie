import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetSingleMovie } from '../api/Request';
import NavBar from '../pages/NavBar';
import "../index.css";
import { Helmet } from 'react-helmet-async';

function GoDetailsPage() {
  const { imdbID } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieDetails = await GetSingleMovie(imdbID);
        setMovie(movieDetails);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMovie();
  }, [imdbID]);

  if (!movie) {
    return <p className='text-4xl text-red-600 text-center mt-12'>Loading...</p>;
  }

  return (
    <>
  <Helmet>
    <title>Movie Details</title>
  </Helmet>
      <NavBar />
      <div className='bgimage2 '>
        <div className='maindetails'>
          <img src={movie.Poster} alt={movie.Title} className='detailimg' />
          <div className='detaildata'>
            <p className='text-4xl text-red-600 font-semibold'>{movie.Title}</p>
            <p className='mt-1'>Year: {movie.Year}</p>
            <p>Rated: {movie.Rated}</p>
            <p>Released: {movie.Released}</p>
            <p>Runtime: {movie.Runtime}</p>
            <p className='text-yellow-500'>Rating: {movie.imdbRating}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Director: {movie.Director}</p>
            <p>Plot: {movie.Plot.slice(0,100)}...</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GoDetailsPage;
