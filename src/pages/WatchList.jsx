import Layout from "../components/Layout/Layout"
import Search from "../components/Search/Search";
import { useGlobalContext } from "../context/GlobalContext"
import { MdHeartBroken } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import React, { useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { useNavigate } from "react-router-dom";
import EyeModal from "../components/Modal/EyeModal";
import { IoEyeOutline } from "react-icons/io5";
import { FaCircleChevronRight } from "react-icons/fa6";

const ActionCard = React.memo(({ deleteMovie, handleShowModal, navigate, movie }) => (
  <div className="absolute flex space-x-11 md:space-x-8 -bottom-3 group-hover:-bottom-2 group-hover:opacity-100 opacity-0 duration-500">
    <button className="rounded-md cursor-pointer" onClick={() => deleteMovie(movie.imdbID)}>
      <FiTrash2 className=" text-4xl text-red-600" />
    </button>
    <button className="text-[#1581BF]" onClick={() => handleShowModal(movie.imdbID)}>
      <IoEyeOutline className="text-[45px] cursor-pointer" />
    </button>
    <button className="text-[#1581BF]" onClick={() => navigate(`/moviedetail/${movie.imdbID}`)}>
      <FaCircleChevronRight className="text-4xl cursor-pointer" />
    </button>
  </div>
))
const WatchList = () => {
  const { watchList, deleteMovie, handleShowModal, showModal, handleCloseModal, selectedMovie } = useGlobalContext()
  const [inputValue, setInputValue] = useState('')

  const navigate = useNavigate()

  const searchMovie = watchList.filter((movie) =>
    movie.Title.toLowerCase().includes(inputValue.toLowerCase()))

  return (
    <Layout>
      <div className="bg-white dark:bg-black flex flex-col items-center justify-center pt-10">
        <Search searchQuery={inputValue} setSearchQuery={setInputValue} />
        <div className="grid place-items-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10 gap-8">
          {searchMovie.length > 0 ? (
            searchMovie.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie}>
                <ActionCard movie={movie}
                  deleteMovie={deleteMovie}
                  handleShowModal={handleShowModal}
                  navigate={navigate}
                />
              </MovieCard>
            ))
          ) : (
            <div className="col-span-full flex justify-center py-10 text-center">
              <MdHeartBroken className="text-[300px] text-red-600 dark:text-[#67e8f9]" />
            </div>
          )}
        </div>
      </div>
      {showModal && <EyeModal onHandleClose={handleCloseModal} movieDetail={selectedMovie} />}
    </Layout>
  )
}

export default WatchList