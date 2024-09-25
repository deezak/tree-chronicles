import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { NavLink } from 'react-router-dom';
import { Container, Offcanvas } from 'react-bootstrap';  
import {useState} from 'react'  ;
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({setActive, user, handleLogout}) => {
  const [show, setShow] = useState(false);  
  const closeSidebar = () => setShow(false);  
  const showSidebar = () => setShow(true); 
  const userId = user?.uid;
  console.log("userId", userId);
  console.log("name", user?.displayName); 
  return (
    <>  
    {/* <Container>   */}
      {/* <Button variant="primary" onClick={showSidebar}>  
        Launch Sidebar  
      </Button> */}
      <div className="side-menu-button" variant="primary" onClick={showSidebar}>
        <img src="../eye-open.png" alt="eye-open" className='eye-menu-bar' style={{transform:"scale(0.8)", filter:"invert(0.85)"}}/>
        {/* <svg className='menu-bar' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" fill="var(--grey-accent)">
          <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
        </svg> */}
     </div>  
      <Offcanvas show={show} onHide={closeSidebar} style={{backgroundColor:"var(--dark-complement)", width:"auto", fontFamily:"feelings"}}>  
        <Offcanvas.Header >  
          <Offcanvas.Title className='side-bar-title'></Offcanvas.Title>  
        </Offcanvas.Header>  
        <Offcanvas.Body>  
          {/* Some dummy text, we can have any text or element at at this place.   */}
          <ul className='side-bar-list-down'>
          
            <li className='side-bar-list' onClick={() => setActive("home") }><Link to="/">Home</Link></li>
            <li className='side-bar-list' onClick={() => setActive("blogs")}><Link to="/blogs">Blog</Link></li>
            <li className='side-bar-list' onClick={() => setActive("maps")}><Link to="/maps">Maps</Link></li>
            <li className='side-bar-list' onClick={() => setActive("about")}><Link to="/about">About</Link></li>
            {userId ?(
              <>
                <li className='side-bar-list' onClick={() => setActive("create")}><Link to="/create">Create</Link></li>
                <li className='side-bar-list' onClick={() => setActive("create")}><Link style={{textDecoration: "none"}} onClick={handleLogout}>Logout</Link></li>
              </>
            ):(
              <>
                <li className='side-bar-list' onClick={() => setActive("login")}><Link to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </Offcanvas.Body>  
      </Offcanvas>  
      {/* </Container>   */}
    </>  
  )
}

export default SideBar