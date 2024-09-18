import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useWindowSize from '../../components/useWindowSize';
import SideBar from '../SideBar/SideBar';
const NavBar = ({setActive, user, handleLogout}) => {
  // const [active, setActive] = useState("home");
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;
  // console.log("NAV WIDTH: " + width);

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
    <>
      {isMobile && <div className="std-nav-bar-wrapper">
        <nav style={{display:"flex", flexDirection:"row", justifyContent:"space-between",height:"100%", width:"100%", alignItems:"center"}}>
          
          <SideBar className="list-left" user={user} setActive={setActive} style={{position:"relative"}}></SideBar>
          
        </nav>
        <ul className="list-right">
            {/* <li style ={{marginTop:"0px", marginRight: "0px", fontSize:"24px", color:"var(--grey-accent)"}} onClick={() => setActive("search")}><Link to="/search" className='font-icon' style={{transition:"0.5s"}}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></Link></li> */}
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
    </div>}
    {isTablet && <div className="std-nav-bar-wrapper">
      <nav style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"100%",width:"100%", alignItems:"center"}}>
          
          <SideBar className="list-left" user={user} setActive = {setActive}style={{position:"relative"}}></SideBar>
          
        </nav>
        <ul className="list-right">
            {/* <li style ={{marginTop:"0px", marginRight: "0px", fontSize:"24px", color:"var(--grey-accent)"}} onClick={() => setActive("search")}><Link to="/search" className='font-icon' style={{transition:"0.5s"}}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></Link></li> */}
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
    </div>}
    {isDesktop && <div className="std-nav-bar-wrapper">
        <nav style={{display:"flex", justifyContent:"space-between", width:"100%", height:"100%", alignItems:"center"}}>
          <ul className ="list-left"> 	

            <li onClick={() => setActive("home") }>
              <Link to="/">Home</Link>
              <img class="overlay-markup" src="./220.png" alt="Overlay Circle" />
              </li>
            
            
            <li onClick={() => setActive("blogs")}>
              <Link to="/blogs">Blog</Link>
              <img class="overlay-markup" src="./220.png" alt="Overlay Circle" />
              </li>

            <li onClick={() => setActive("maps")}>
              <img class="overlay-markup" src="./220.png" alt="Overlay Circle" />
              <Link to="/maps">Maps</Link>
              </li>

            <li onClick={() => setActive("about")}>
              <Link to="/about">About</Link>
              <img class="overlay-markup" src="./220.png" alt="Overlay Circle" />

              </li>

            {userId ?(
              <>
                <li onClick={() => setActive("create")}>
                  
                  <Link to="/create">Create</Link>
                  <img class="overlay-markup" src="./220.png" alt="Overlay Circle" />
                  </li>

              </>
            ):(
              <></>
            )}
          </ul>
          {/* <div className='list-middle'></div> */}
          <ul className="list-right">
            {/* <li style ={{marginTop:"0px", marginRight: "0px", fontSize:"24px", color:"var(--grey-accent)"}} onClick={() => setActive("search")}><Link to="/search" className='font-icon' style={{transition:"0.5s"}}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></Link></li> */}
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
        </nav>         
    </div>}
</>
    
  )
}

export default NavBar;