import Layout from "../components/Layout/Layout"
import batman from '../assets/batman.jpg'
import React, { useCallback, useEffect, useState } from "react"
import { GetMovies, GetSearch } from "../service/api"
import { FaRegHeart } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import Search from "../components/Search/Search";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext";
import Loading from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import EyeModal from "../components/Modal/EyeModal";
import MovieCard from "../components/MovieCard/MovieCard";

const CardActions = React.memo(({ movie, addMovie, isInMovie, handleShowModal, navigate }) => (
  <div className="absolute flex space-x-11 md:space-x-8 -bottom-3 group-hover:-bottom-2 group-hover:opacity-100 opacity-0 duration-500">
    <button className='text-red-700' onClick={() => addMovie(movie.imdbID)}>
      {isInMovie(movie.imdbID) ? <FaHeart className="text-4xl cursor-pointer" /> : <FaRegHeart className="text-4xl cursor-pointer" />}
    </button>
    <button className="text-[#1581BF]" onClick={() => handleShowModal(movie.imdbID)}>
      <IoEyeOutline className="text-[45px] cursor-pointer" />
    </button>
    <button className="text-[#1581BF]" onClick={() => navigate(`/moviedetail/${movie.imdbID}`)}>
      <FaCircleChevronRight className="text-4xl cursor-pointer" />
    </button>
  </div>
))
const Home = () => {
  const { movies, setMovies, addMovie, isInMovie, handleShowModal, handleCloseModal, selectedMovie, showModal } = useGlobalContext()

  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await GetMovies()
      console.log(data.Search);
      setMovies(data.Search)
    }
    catch (err) {
      console.log("Movie Fetch Error", err);
    } finally {
      setLoading(false)
    }
  }, [setMovies])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSearch = useCallback(async (term) => {
    setLoading(true)
    if (!term) {
      fetchData()
      return;
    }
    try {
      const data = await GetSearch(term)
      setMovies(data.Search || [])
    }
    catch (err) {
      console.log("Error search movie", err);
    } finally {
      setLoading(false)
    }
  }, [fetchData, setMovies])

  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm])


  return (
    <Layout>
      <article className="relative group h-[400px] md:h-[550px]">
        <img src={batman} alt="batman" className="h-full w-full object-cover" />
        <div className="absolute bottom-0 bg-gradient-to-b from-transparent to-[#ba264e] dark:to-[#2d478f] w-full">
          <div className="px-4 lg:pl-48 md:pl-0 mb-10 group-hover:mb-20 trasnition-all duration-1000 md:w-[700px] lg:w-[910px] w-full">
            <p className="text-[#dbeafe] text-sm md:text-[17px] dark:text-[#bbf7d0]">Romantic , Drama , Action , Thriller , Horror</p>
            <p className="md:text-5xl text-2xl text-[#fecdd3] mb-2 dark:text-[#bfdbfe]">Join Us</p>
            <p className="text-[#fecdd3] text-xs md:text-sm lg:text-base dark:text-[#bfdbfe]">  Movies have the power to transport us to new worlds, to make us feel, dream, and imagine beyond the ordinary.
              Every story on the screen holds a piece of humanity, a glimpse into different lives, and a spark of inspiration.
              Through laughter, tears, and suspense, films connect us and remind us of the beauty, challenges, and magic of life.
              Join us on this cinematic journey, where every frame tells a story, and every character leaves a lasting impression on your heart.</p>
          </div>
        </div>
      </article>

      <section className="px-3 pt-16 flex flex-col items-center justify-center gap-y-12 bg-white dark:bg-black">
        <Search searchQuery={searchTerm} setSearchQuery={setSearchTerm} />
        {loading ? (
          <Loading />
        ) : (
          <div className=" grid place-items-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 ">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID}>
                  <CardActions
                    handleShowModal={handleShowModal}
                    movie={movie}
                    addMovie={addMovie}
                    isInMovie={isInMovie}
                    navigate={navigate}
                  />
                </MovieCard>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <p className="text-4xl font-bold text-gray-300 mb-4">Not Found</p>
                <p className="text-gray-400 text-lg">Movie not found.Please try different keyword</p>
              </div>
            )}

          </div>
        )}
      </section>
      {showModal && <EyeModal onHandleClose={handleCloseModal} movieDetail={selectedMovie} />}
    </Layout>
  )
}

export default Home