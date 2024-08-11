import axios from "axios";


export const Api = axios.create({
    baseURL: "http://www.omdbapi.com",
    params: {
        apikey: "fc1fef96",
    },
});


export const GetMovies = async () => {
    try {
        const response = await Api.get("/?s=all&page=3")
        if (response.status !== 200) {
            throw new Error("Error")
        }
        else {
            return response.data
        }

    }
    catch (error) {
        console.log(error.message);

    }
}



export const GetSingleMovie = async (movie) => {
    try {
      const response = await Api.get(`/?i=${movie}&plot=full`);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };



export const GetSearch = async(search)=>{
    try{
        const response = await Api.get(`/?s=${search}`);
        if(response.status !==200){
            throw new Error("error")
        }
        else{
            return response.data;
        }
    }
    catch(error){
        console.log(error.message);
        
    }
}

