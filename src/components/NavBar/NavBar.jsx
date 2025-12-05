import { Link, useLocation } from "react-router-dom"
import { FaHeart } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { useThemeContext } from "../../context/ThemeContext";
import { GoMoon } from "react-icons/go";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";

const NavLinkItem = ({ to, label, active, extra = "" }) => {
    const activeStyle = active ? "text-[#c21a45] hover:text-[#0284c7] dark:text-[#86efac] hover:dark:text-[#bae6fd]"
        : "text-[#0284c7] dark:text-[#bae6fd] hover:text-[#c21a45] hover:dark:text-[#86efac]"
    return (
        <Link to={to} className={`${extra} transition duration-500 ${activeStyle}`}>
            {label}
        </Link>
    )
}

const NavBar = () => {
    const { pathname } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const { toggleTheme } = useThemeContext()

    const toggleMenu = () => setMenuOpen((prev) => !prev)

    const routers = [
        { id: 1, to: "/", label: "MOVIES" },
        { id: 2, to: "/watchlist", label: <FaHeart className="text-4xl" /> }
    ]

    return (
        <nav className=" py-2 bg-white dark:bg-black">
            <div className="flex justify-between md:px-0 px-3 md:justify-around items-center p-1">
                <Link to='/'
                    className="text-2xl md:text-4xl text-transparent bg-clip-text font-bold bg-gradient-to-r from-blue-600 to-red-700 dark:from-[#3d83f5] dark:to-[#d1d6df]">
                    MOVIE APP
                </Link>
                <div className="hidden space-x-8 mr-6 md:flex">
                    {routers.map((router) => (
                        <NavLinkItem key={router.id} to={router.to} label={router.label} active={pathname === router.to} extra="text-2xl" />
                    ))}
                </div>

                <button onClick={toggleMenu} className="md:hidden flex">
                    <GiHamburgerMenu className="text-4xl text-red-600" />
                </button>

                <div className="text-red-600" onClick={toggleTheme}>
                    <IoSunnyOutline className="text-5xl cursor-pointer dark:hidden block" />
                    <GoMoon className="text-5xl cursor-pointer hidden dark:block text-[#bae6fd]" />
                </div>
            </div>
            {menuOpen && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex flex-col pt-24 items-center ">
                    <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-[#0285c7] text-4xl">
                        <FaXmark className="font-extrabold" />
                    </button>
                    {routers.map((router) => (
                        <NavLinkItem key={router.to} to={router.to} label={router.label} active={pathname === router.to} extra="text-3xl py-2" />
                    ))}
                </div>
            )}
        </nav>
    )
}

export default NavBar