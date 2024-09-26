import React, {useState, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useWindowSize from '../../components/useWindowSize';
import SideBar from '../SideBar/SideBar';
import { useLocation } from 'react-router-dom';
import SmallTitle from '../SmallTitle/SmallTitle';

const NavBar = ({setActive, user, handleLogout, isDetail}) => {
  const location = useLocation(); // Get the current route
  const resetButtonRef = useRef(null);
  // const [active, setActive] = useState("home");
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;
  // console.log("NAV WIDTH: " + width);
  const [placeholder, setPlaceholder] = useState(" ");

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

  const handleFocus = () => {
    setPlaceholder("search categories, cities, tags..." );
  };

  const handleBlur = () => {
    setPlaceholder(' ');
  };
  
  
  return (
    <>
      {(isMobile || isDetail ) && <div className="std-nav-bar-wrapper">
        <nav style={{display:"flex", flexDirection:"row", justifyContent:"space-between",height:"100%", width:"100%", alignItems:"center"}}>
          
          <SideBar className="list-left" user={user} setActive={setActive} handleLogout = {handleLogout}style={{position:"relative"}}></SideBar>
          
        </nav>
        <ul className="list-right" style={{paddingLeft:"0rem"}}>
            <form className="search-box" onSubmit={handleSearchSubmit}>
              <input type="text" placeholder=" "
                value={searchQuery} // Bind input to state
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              />
              <button type="reset" ref={resetButtonRef} onClick={() => {
                                        setSearchQuery('');
                                        resetButtonRef.current.blur();
                                        }}></button>
            </form>
          </ul>         
    </div>}
     {isTablet && <div className="std-nav-bar-wrapper">
      <nav style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"100%",width:"100%", alignItems:"center"}}>
          
          <SideBar className="list-left" user={user} setActive = {setActive}style={{position:"relative"}}></SideBar>
          
        </nav>
        <ul className="list-right">
             <form className="search-box" onSubmit={handleSearchSubmit}>
              <input type="text" placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchQuery} // Bind input to state
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              />
              <button type="reset" ref={resetButtonRef} onClick={() => {
                                        setSearchQuery('');
                                        resetButtonRef.current.blur();
                                        }}></button>
            </form>
            {userId ?(
              <>
                <Link className="nav-item nav-link log-out" style={{textDecoration: "none"}} onClick={handleLogout} >
                  <img src="../logout.png" alt="login" className="log-out" style={{width:"70px", height:"50px", filter:"invert(0.15)", marginBottom:"0.5em", marginLeft:"1em"}}/>
                </Link>
              </>
            ):(
              <>
                <Link className="nav-item nav-link log-out"  to="/login" style={{textDecoration: "none"}} onClick={() => setActive("login")} >
                  <img src="../login.png" alt="login" className="log-out" style={{width:"70px", height:"50px", filter:"invert(0.15)", marginBottom:"0.5em", marginLeft:"1em"}}/>
                </Link>
              </>
            )}
            
          </ul>             
    </div>} 
    {(isDesktop && !isDetail)&& <div className="std-nav-bar-wrapper">
        <nav style={{display:"flex", justifyContent:"space-between", width:"100%", height:"100%", alignItems:"center"}}>
          <ul className ="list-left"> 	

          {(location.pathname === '/blogs' || location.pathname === '/maps'
          || location.pathname === '/about' || location.pathname === '/login') && <SmallTitle />}

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
              <Link to="/maps">Map</Link>
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
              <input type="text" id="search"  placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchQuery} // Bind input to state
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              />
              <button type="reset" ref={resetButtonRef} onClick={() => {
                                        setSearchQuery('');
                                        resetButtonRef.current.blur();
                                        }}></button>
            </form>
            {userId ?(
              <>
                {/* <li className="nav-item nav-link log-out" onClick={handleLogout} style ={{padding: "14px 20px"}}>Logout</li> */}
                <Link className="nav-item nav-link log-out" style={{textDecoration: "none"}} onClick={handleLogout} >
                  <img src="../logout.png" alt="login" className="log-out" style={{width:"70px", height:"50px", filter:"invert(0.15)", marginBottom:"0.5em", marginLeft:"1em"}}/>
                </Link>
                  </>
                ):(
                  <>
                    <Link className="nav-item nav-link log-out"  to="/login" style={{textDecoration: "none"}} onClick={() => setActive("login")} >
                      
                      <img src="../login.png" alt="login" className="log-out" style={{width:"70px", height:"50px", filter:"invert(0.15)", marginBottom:"0.5em", marginLeft:"1em"}}/>
                    </Link>
                  </>
                )}
            
          </ul>
        </nav>         
    </div>}
   
</>
    
  )
}

export default NavBar;