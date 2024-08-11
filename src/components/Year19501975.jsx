import React, { useEffect, useState } from 'react'
import NavBar from '../pages/NavBar'
import { GetMovies } from '../api/Request'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { ROUTER } from "../constant/router"
import "../index.css"
function Year19501975() {
    const [year, setYear] = useState([]);
    const { pathname } = useLocation();


    const fetchMovie = async () => {
        const response = await GetMovies()
        const movie = response ? response.Search : [];

        const moviesYear = movie.filter(
            (movie) => parseInt(movie.Year) >= 1950 && parseInt(movie.Year) < 2000
        );
        setYear(moviesYear)
    };

    useEffect(() => {
        fetchMovie();
    }, []);


    return (
        <>
        <Helmet>
            <title>1950-2000</title>
        </Helmet>
            <NavBar />
            <div className='bgimage'>
                <div className='yearnavbar '>
                    <Link to={ROUTER.Year1950} className={` ${pathname === ROUTER.Year1950 ? "activeLink" : "Link"}`}>1950-1975</Link>
                    <Link to={ROUTER.Year1975} className={`ml-12  ${pathname === ROUTER.Year1975 ? "activeLink" : "Link"}`}>1975-2000</Link>
                </div>
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




export default Year19501975