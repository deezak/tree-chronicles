import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import './AltNavBar.css';
import SmallTitle from '../SmallTitle/SmallTitle';
// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useWindowSize from '../../components/useWindowSize';
import NavBar from '../NavBar/NavBar';
const AltNavBar = ({active, setActive, user, handleLogout}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;
  // const [active, setActive] = useState("home");
  // const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const userId = user?.uid;
  // const navigate = useNavigate(); // React Router's navigation hook
  // console.log("userId", userId);
  // console.log("name", user?.displayName);
  
   // Handle the form submission
  //  const handleSearchSubmit = (e) => {
  //   e.preventDefault(); // Prevents default form behavior
  //   if (searchQuery.trim()) {
  //     navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Redirects to the search page with the query
  //   }
  // };
  
  return (
    <div>
      {isMobile && <div style={{display:"flex", flexDirection:"row"}}>
       <NavBar setActive={setActive} user={user} handleLogout={handleLogout}></NavBar ></div>}
      {isTablet && <div style={{display:"flex", flexDirection:"row"}}>
        <NavBar setActive={setActive} user={user} handleLogout={handleLogout}></NavBar></div>}
      {isDesktop && <div style={{display:"flex", flexDirection:"row"}}>
        <SmallTitle /><NavBar setActive={setActive} user={user} handleLogout={handleLogout}></NavBar></div>}
    </div>
    
  )
}

export default AltNavBar