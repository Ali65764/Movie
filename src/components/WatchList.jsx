import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'
import NavBar from '../pages/NavBar';
import EyeModal from '../Modal/EyeModal';
import { FiEye, FiTrash } from 'react-icons/fi';
import { ROUTER } from "../constant/router"
import { Link } from "react-router-dom"
import "../index.css"
import { GetSingleMovie } from '../api/Request';
import { Helmet } from 'react-helmet-async';
import "../index.css"

function WatchList() {
  const {
    watchMovie,
    setWatchMovie,
    removeMovie,
  } = useGlobalContext();

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedMovie = JSON.parse(localStorage.getItem("movieArray") || "[]");
    setWatchMovie(savedMovie);
  }, [setWatchMovie]);

  const handleShowModal = async (movie) => {
    try {
      const movieDetails = await GetSingleMovie(movie.imdbID);
      setSelectedMovie(movieDetails);
      setShowModal(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm('');
  };

  const filteredMovies = watchMovie.filter(movie =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Watch List</title>
      </Helmet>
      <NavBar />
      <div className='bgimage'>
        <div className="flex-col justify-center w-[230px] flex m-auto mt-4 ">
          <input 
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className="search-input p-1 border-2 rounded border-blue-500"
          />
          <button onClick={handleReset} className="resetbutton mt-3">
            Reset
          </button>
        </div>
        {filteredMovies.length === 0 && (
          <h2 className="text-green-600 text-4xl margin text-center">Not Found!!!</h2>
        )}
        <div className=" flex flex-wrap justify-center gap-5 mt-5">
          {filteredMovies.length > 0 && filteredMovies.map((movie, index) => (
            <div key={index} className='cards'>
              <img
                className='h-[510px] w-[315px]'
                src={movie.Poster}
                alt={movie.Title}
              />
              <div className='mt-3'>
                <h2 className='text-[20px]'>{movie.Title}</h2>
                <p className='text-[17px]'>Year: {movie.Year}</p>
              </div>
              <div className='text-[30px]'>
                <button className='button' onClick={() => handleShowModal(movie)}>
                  <FiEye />
                </button>
                <button
                  className='button text-[27px] ml-1'
                  onClick={() => removeMovie(movie.imdbID)}
                >
                  <FiTrash />
                </button>
              </div>
              <Link to={`${ROUTER.GoDetailsPage}/${movie.imdbID}`} className='text-[17px] button'>
                Go Detail Page
              </Link>
            </div>
          ))}
        </div>
      </div>
      <EyeModal
        show={showModal}
        handleClose={handleCloseModal}
        movie={selectedMovie}
      />
    </>
  )
}

export default WatchList
