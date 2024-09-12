import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AltNavBar.css';
import SmallTitle from '../SmallTitle/SmallTitle';
// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AltNavBar = ({active, setActive, user, handleLogout}) => {
  // const [active, setActive] = useState("home");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const userId = user?.uid;
  const navigate = useNavigate(); // React Router's navigation hook
  console.log("userId", userId);
  console.log("name", user?.displayName);
  
   // Handle the form submission
   const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents default form behavior
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Redirects to the search page with the query
    }
  };
  
  return (
    <div className="alt-nav-bar-wrapper">
        <nav style={{display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center"}}>
          <SmallTitle />
          <ul className ="alt-list-left">
            <li onClick={() => setActive("home") }><Link to="/">Home</Link></li>
            <li onClick={() => setActive("blogs")}><Link to="/blogs">Blog</Link></li>
            <li onClick={() => setActive("maps")}><Link to="/maps">Maps</Link></li>
            <li onClick={() => setActive("about")}><Link to="/about">About</Link></li>
            {userId ?(
              <>
                <li onClick={() => setActive("create")}><Link to="/create">Create</Link></li>
              </>
            ):(
              <></>
            )}
          </ul>
          <ul className="alt-list-right">
            {/* <li style ={{}} onClick={() => setActive("search")}>
              <Link to="/search" className='alt-font-icon' style={{transition:"0.5s"}}>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </Link>
            </li> */}
            <form className="search-box" onSubmit={handleSearchSubmit}>
              <input type="text" placeholder=" " 
                value={searchQuery} // Bind input to state
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              />
              <button type="reset"></button>
            </form>
            {userId ?(
              <>
                {/* <li className="nav-item nav-link log-out" onClick={handleLogout} style ={{padding: "14px 20px"}}>Logout</li> */}
              </>
            ):(
              <>
                {/* <Link to="/login" style={{textDecoration: "none"}}>
                  <li className="nav-item nav-link log-out"onClick={() => setActive("login")} style ={{padding: "14px 20px"}}>
                    Login
                  </li>
                </Link> */}
              </>
            )}
          </ul>
          {/* <li>
            <FontAwesomeIcon icon="fa-kit fa-solid fa-magnifying-glass" />
          </li> */}
        </nav>         
    </div>
  )
}

export default AltNavBar