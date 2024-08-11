import {Routes,Route} from "react-router-dom"
import {ROUTER} from "./constant/router"
import Home from "./components/Home"
import WatchList from "./components/WatchList"
import Year1950 from "./components/Year1950"
import Year1975 from "./components/Year1975"
import Year2000 from "./components/Year2000"
import GoDetailsPage from './components/GoDetailsPage'
import NavBar from "./pages/NavBar"
import Year19501975 from "./components/Year19501975"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <>
      <Routes>
        <Route path={ROUTER.Home} element={<Home/>}/>
        <Route path={ROUTER.WatchList} element={<WatchList/>}/>
        <Route path={ROUTER.Year19501975} element={<Year19501975/>}/>
        <Route path={ROUTER.Year1950} element={<Year1950/>}/>
        <Route path={ROUTER.Year1975} element={<Year1975/>}/>
        <Route path={ROUTER.Year2000} element={<Year2000/>}/>
        <Route path={`${ROUTER.GoDetailsPage}/:imdbID`} element={<GoDetailsPage />} />
        <Route path={ROUTER.NavBar} element={<NavBar/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
