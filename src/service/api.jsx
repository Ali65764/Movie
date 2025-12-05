import axios from "axios";

const apiKey = import.meta.env.VITE_APIKEY

const Api = axios.create({
    baseURL: "https://www.omdbapi.com",
    params: {
        apikey: `${apiKey}`
    }
})

const request = async (promise) => {
    try {
        const { data } = await promise
        return data
    }
    catch (err) {
        console.log(err);
    }
}


export const GetMovies = () => request(Api.get("/?s=all&page=4"))

export const GetSingleMovie = (id) => request(Api.get(`/?i=${id}&plot=full`))

export const GetSearch = (movie) => request(Api.get(`/?s=${movie}`))