import { useEffect } from "react";
const MovieDetailItem = ({label,value}) => (
  <p>
    <span className="text-[#DE1A58] dark:text-[#bae6fd]">{label}: </span>{value}
  </p>
)
const EyeModal = ({ onHandleClose, movieDetail }) => {
  if (!movieDetail) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const movieDetails = [
    { label: "Year", value: movieDetail.Year },
    { label: "Imdb", value: movieDetail.imdbRating },
    { label: "Released", value: movieDetail.Released },
    { label: "Runtime", value: movieDetail.Runtime },
    { label: "Genre", value: movieDetail.Genre },
    { label: "Director", value: movieDetail.Director },
    { label: "Plot", value: movieDetail.Plot }
  ]
  return (
    <div className="w-full h-full bg-[rgba(0,0,0,0.6)] fixed inset-0 flex justify-center items-center z-50 p-5" onClick={onHandleClose}>
      <div className="bg-white dark:bg-black max-w-md w-full mx-auto  max-h-[95vh] overflow-y-auto pl-4 pr-2 py-4 rounded-lg custom-scroll animate-modal"
        onClick={(e) => e.stopPropagation()}>
        <img src={movieDetail.Poster} alt={movieDetail.Title} className="w-full object-cover h-[380px] rounded-lg" />
        <div className="text-md text-[#1d1d1d] dark:text-[#F9F8F6] font-medium mt-1">
          <p className="text-red-600 dark:text-[#bae6fd] font-semibold">{movieDetail.Title}</p>
          {movieDetails.map((movie,index)=>(
            <MovieDetailItem key={index} label={movie.label} value={movie.value}/>
          ))}
        </div>
        <div>
          <button onClick={onHandleClose} className="bg-red-600 dark:bg-[#0284c7] text-white rounded-md py-1 w-full mt-3">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default EyeModal
