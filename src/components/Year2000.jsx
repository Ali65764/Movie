import React, { useState, useEffect } from 'react'
import NavBar from '../pages/NavBar';
import { Link } from 'react-router-dom';
import { ROUTER } from "../constant/router"
import "../index.css"
import { GetMovies } from '../api/Request';
import { Helmet } from 'react-helmet-async';
function Year2000() {
  const [year, setYear] = useState([]);


  const fetchMovie = async () => {
    const response = await GetMovies()
    const movie = response ? response.Search : [];

    const moviesYear = movie.filter(
      (movie) => parseInt(movie.Year) >= 2000 && parseInt(movie.Year) <= 2024
    );
    setYear(moviesYear)
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <>
      <Helmet>
        <title>2000-2024</title>
      </Helmet>
      <NavBar />
      <div className='bgimage'>
        <div>
          {year.length === 0 && (
            <h2 className="text-red-800 text-5xl margin text-center">Not Found</h2>
          )}
          <div className=" flex flex-wrap justify-center gap-5 mt-5">
            {year.length > 0 && year.map((movie, index) => (
              <div key={index} className='cards2'>
                <img
                  className='h-[510px] w-[315px]'
                  src={movie.Poster}
                  alt={movie.Title}
                />
                <div className='mt-3'>
                  <h2 className='text-[20px]'>{movie.Title}</h2>
                  <p className='text-[17px] mt-2'>Year: {movie.Year}</p>
                </div>
                <Link to={`${ROUTER.GoDetailsPage}/${movie.imdbID}`} className='text-[17px] button'>
                  Go Detail Page
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}



export default Year2000