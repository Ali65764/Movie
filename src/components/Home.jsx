import React, { useState, useEffect } from 'react';
import NavBar from '../pages/NavBar';
import "../index.css";
import { GetMovies, GetSearch, GetSingleMovie } from '../api/Request';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/router";
import EyeModal from '../Modal/EyeModal';
import Search from "../search/search";
import { useGlobalContext } from '../contexts/GlobalContext';
import { Helmet } from 'react-helmet-async';

function Home() {
  const {
    addWatchMovie,
    isInMovie,
    setMovies,
  } = useGlobalContext();
  const [movies, setLocalMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notFound, setNotFound] = useState(false);

  const fetchData = async () => {
    try {
      const response = await GetMovies();
      if (response && response.Search) {
        setLocalMovies(response.Search);
        setMovies(response.Search);
        setNotFound(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = async (term) => {
    try {
      const response = await GetSearch(term);
      if (response && response.Search) {
        setLocalMovies(response.Search);
        setMovies(response.Search);
        setNotFound(false);
      } else {
        setLocalMovies([]);
        setNotFound(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      fetchData();
    }
  }, [searchTerm]);

  const handleOpenModal = async (movie) => {
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
  
  return (
    <>
      <Helmet>
        <title>All Movies</title>
      </Helmet>
      <NavBar />
      <div className='bg-black'>
        <div className='bgimage '>
          <div className='maindiv'>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className='flex flex-wrap justify-center gap-12 mt-12 maincards'>
            {notFound ? (
              <p className='text-red-600 text-5xl mt-12'>Not Found...</p>
            ) : (
              movies.map((movie, index) => (
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
                    <button onClick={() => handleOpenModal(movie)} className='button'><FiEye /></button>
                    <button onClick={() => addWatchMovie(movie.imdbID)} className='ml-1 button'>
                      {isInMovie(movie.imdbID) ? (
                        <FaHeart className="text-[28px] text-red-600" />
                      ) : (
                        <CiHeart className="text-3xl " />
                      )}
                    </button>
                  </div>
                  <Link to={`${ROUTER.GoDetailsPage}/${movie.imdbID}`} className='text-[17px] button'>
                    Go Detail Page
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <EyeModal show={showModal} handleClose={handleCloseModal} movie={selectedMovie} />
    </>
  );
}

export default Home;
