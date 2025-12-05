import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import WatchList from './pages/WatchList'
import MovieDetail from './pages/MovieDetail'
import NotFound from './pages/NotFound'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/moviedetail/:id" element={<MovieDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer/>
    </div >
  );
}
