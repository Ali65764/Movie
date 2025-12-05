import { useCallback, useEffect, useState } from "react"
import { GetSingleMovie } from "../service/api"
import { useParams } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import { useGlobalContext } from "../context/GlobalContext";
import Loading from '../components/Loading/Loading'
import Error from '../components/Error/Error'
import { useNavigate } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(null)
  const { loading, setLoading, error, setError } = useGlobalContext()
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchSingleData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await GetSingleMovie(id)
      setMovieDetail(data)
      console.log(data);
    }
    catch (err) {
      console.log(err);
      setError("Failed to fetch moive!")
    } finally {
      setLoading(false)
    }
  }, [id, setError, setLoading])

  useEffect(() => {
    fetchSingleData()
  }, [fetchSingleData])

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Error />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-black flex justify-center items-center h-auto pt-7">
        {movieDetail && (
          <div className="max-w-xs md:max-w-3xl w-full md:flex-row flex-col h-auto flex h-[80vh] mx-auto">
            <img src={movieDetail.Poster} alt={movieDetail.Title} className="h-full w-full md:w-1/2 object-cover" />
            <div className="text-[#daf2fe] dark:text-[#1f2937] bg-[#1f2937] dark:bg-[#e0f2fe] text-center text-xl w-full md:w-1/2 py-2 text-xl">
              <p className="text-[#fee2e2] md:text-3xl text-2xl dark:text-[#bc1a45]">{movieDetail.Title}</p>
              <p className="md:my-6 my-3">Year: {movieDetail.Year}</p>
              <p className="md:my-6 my-3">Rated: {movieDetail.Rated}</p>
              <p>Released: {movieDetail.Released}</p>
              <p className="md:my-6 my-3 text-[#86efac] dark:text-[#158249]">Imdb: {movieDetail.imdbRating}</p>
              <p>Runtime: {movieDetail.Runtime}</p>
              <p className="md:my-6 my-3">Genre: {movieDetail.Genre}</p>
              <p>Director: {movieDetail.Director}</p>
              <p className="md:my-6 my-3">Plot: {movieDetail.Plot.slice(0, 20)}...</p>
              <button onClick={() => navigate('/')} className='cursor-pointer flex items-center mx-auto'>
                <FaChevronCircleLeft className="text-3xl hover:text-blue-500 transition duration-500" />
                <span className="ml-3">Go Back</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MovieDetail