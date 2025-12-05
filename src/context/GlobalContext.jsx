import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetSingleMovie } from "../service/api";

const GlobalContext = createContext()

const STORAGE_KEY = 'watchList'

const GlobalContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([])
    const [watchList, setWatchList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)

    const handleShowModal = async (movie) => {
        try {
            const data = await GetSingleMovie(movie)
            setSelectedMovie(data)
            setShowModal(true)
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleCloseModal = () => {
        setSelectedMovie(null)
        setShowModal(false)
    }

    const saveToStorage = useCallback((items) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    },[])

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            setWatchList(JSON.parse(stored))
        }
    }, [])

    const addMovie = useCallback((movieId) => {
        const movie = movies.find((movie) => movie.imdbID === movieId)
        const movieInWatchList = watchList.find((movie) => movie.imdbID === movieId)

        if (movieInWatchList) {
            toast.warning("Movie already added watchlist!", { autoClose: 1500 })
            return;
        }
        const updatedWatchList = [...watchList, movie]
        setWatchList(updatedWatchList)
        toast.success("Movie added successfully", { autoClose: 1500 })
        saveToStorage(updatedWatchList)
    },[movies,watchList,saveToStorage])

    const deleteMovie = useCallback((movieId) => {
        const updatedWatchList = watchList.filter((movie) => movie.imdbID !== movieId)
        setWatchList(updatedWatchList)
        toast.success("Movie deleted successfully!", { autoClose: 1500 })
        saveToStorage(updatedWatchList)
    }, [saveToStorage, setWatchList])

    const isInMovie = useCallback((movieId) => {
        return watchList.find((movie) => movie.imdbID === movieId)
    }, [watchList])

    const contextValue = {
        movies, setMovies, addMovie, isInMovie, watchList, deleteMovie, loading, setLoading, error, setError, handleShowModal,
        handleCloseModal, selectedMovie, showModal
    }

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext)
export { useGlobalContext, GlobalContextProvider }