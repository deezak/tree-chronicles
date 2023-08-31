import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
// import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = ({active, setActive, user, handleLogout}) => {
  // const [active, setActive] = useState("home");
  const userId = user?.uid;
  console.log("userId", userId);
  console.log("name", user?.displayName);
  
  
  return (
    <div className="std-nav-bar-wrapper">
        <nav>
          <ul className ="list-left">
            <li onClick={() => setActive("home") }><Link to="/">Home</Link></li>
            <li onClick={() => setActive("blogs")}><Link to="/blogs">Blog</Link></li>
            <li onClick={() => setActive("maps")}><Link to="/maps">Maps</Link></li>
            <li onClick={() => setActive("about")}><Link to="/about">About Me</Link></li>
            {userId ?(
              <>
                <li onClick={() => setActive("create")}><Link to="/create">Create</Link></li>
              </>
            ):(
              <></>
            )}
          </ul>
          <div className='list-middle'></div>
          <ul className="list-right">
            <li style ={{marginTop:"2px", marginRight: "15px"}} onClick={() => setActive("search")}><Link to="/search" className='font-icon' style={{transition:"0.5s"}}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></Link></li>
            {userId ?(
              <>
                <p className="user-name" style ={{marginTop:"15px", marginRight:"15px"}} >
                  {user?.displayName}
                </p>
                <li style ={{marginTop:"2px", marginRight:"15px"}} onClick={() => setActive("login")}><Link to="/login" className='font-icon'style={{transition:"0.5s"}}><FontAwesomeIcon icon="fa-solid fa-user" /></Link></li>

                <li className="nav-item nav-link log-out" onClick={handleLogout} style ={{marginTop:"15px", marginRight: "20px" }}>Logout</li>
              </>
            ):(
              <>
                <Link to="/login" style={{textDecoration: "none"}}>
                  <li className="nav-item nav-link log-out"onClick={() => setActive("login")} style ={{marginTop:"15px", marginRight: "20px" }}>
                    Login
                  </li>
                </Link>
              </>
            )}
            {userId ?(
              <>

              </>
            ):(
              <></>
            )}
          </ul>
          {/* <li>
            <FontAwesomeIcon icon="fa-kit fa-solid fa-magnifying-glass" />
          </li> */}
        </nav>         
    </div>
  )
}

export default NavBar;