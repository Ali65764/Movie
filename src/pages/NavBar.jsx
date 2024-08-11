import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { ROUTER } from "../constant/router";
import "../index.css";
import { useGlobalContext } from '../contexts/GlobalContext';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function NavBar() {

    const { pathname } = useLocation();
    const { quantity } = useGlobalContext();
    
    return (
        <Navbar collapseOnSelect={false} expand="lg" className="bg-zinc-800 mainnavbar  ">
                <div className='leftnavbar'>
                <Link to={ROUTER.Home}>
                    Full Film Izle
                </Link>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mr-4 toggle" />
                <Navbar.Collapse id="responsive-navbar-nav ">
                    
                    <Nav className='text-[17px] text-center mr-5'>
                        <Link to={ROUTER.Home} className={`element mr-3 ${pathname === ROUTER.Home ? "activeLink" : "Link"}`}>
                           All Movies
                        </Link>
                        <Link to={ROUTER.WatchList} className={`element mr-3 ${pathname === ROUTER.WatchList ? "activeLink" : "Link"}`}>
                            WatchList
                            <span className="relative bottom-4 bg-red-500 text-white h-5 w-5 rounded-full px-2 py-[2px]">
                                <span className="text-sm">{quantity}</span>
                            </span>
                        </Link>
                        <Link to={ROUTER.Year19501975} className={`element mr-3 ${pathname === ROUTER.Year19501975 ? "activeLink" : "Link"}`}>
                            1950-2000
                        </Link>
                        <Link to={ROUTER.Year2000} className={`element mr-3 ${pathname === ROUTER.Year2000 ? "activeLink" : "Link"}`}>
                            2000-2024
                        </Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
