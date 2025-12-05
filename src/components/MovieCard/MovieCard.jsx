const MovieCard = ({ movie, children }) => {
    return (
        <div key={movie.imdbID} className="max-w-[275px] md:max-w-[255px] w-full">
            <div className="group relative cursor-pointer overflow-hidden transition-all duration-500">
                <img src={movie.Poster} alt={movie.Title}
                    className="rounded-md h-96 w-72 object-fill group-hover:scale-110 group-hover:opacity-60 transition-all duration-500" />
                <div className="absolute px-8 bottom-8">
                    <p className="text-[#dddddd] font-semibold text-xl group-hover:text-[#F5C857] duration-500">{movie.Title} <span className="group-hover:text-green-600">{movie.Year}</span></p>
                    <div className="group-hover:mb-14  duration-500"></div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MovieCard