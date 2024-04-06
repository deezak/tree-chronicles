import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Button, Container, Offcanvas } from 'react-bootstrap';  
import {useState} from 'react'  ;
import { Link } from 'react-router-dom';

const SideBar = ({setActive, user}) => {
  const [show, setShow] = useState(false);  
  const closeSidebar = () => setShow(false);  
  const showSidebar = () => setShow(true); 
  const userId = user?.uid;
  console.log("userId", userId);
  console.log("name", user?.displayName); 
  return (
    
    <>  
    <Container >  
      {/* <Button variant="primary" onClick={showSidebar}>  
        Launch Sidebar  
      </Button> */}
      <div className="side-menu-button" variant="primary" onClick={showSidebar}>
         {/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}

        <svg className='menu-bar' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" fill="var(--grey-accent)">
          <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
        </svg>
     </div>  
      <Offcanvas show={show} onHide={closeSidebar} style={{backgroundColor:"var(--grey-accent)", width:"auto"}}>  
        <Offcanvas.Header closeButton>  
          <Offcanvas.Title className='side-bar-title'></Offcanvas.Title>  
        </Offcanvas.Header>  
        <Offcanvas.Body>  
          {/* Some dummy text, we can have any text or element at at this place.   */}
          <ul className ="side-bar-list-down">
          
            <li className='side-bar-list' onClick={() => setActive("home") }><img className="side-bar-icon" width="30" height="30" src="https://img.icons8.com/pulsar-line/48/home-page.png" alt="home-page"/><Link to="/">Home</Link></li>
            <li className='side-bar-list' onClick={() => setActive("blogs")}><img className="side-bar-icon" width="30" height="30" src="https://img.icons8.com/pulsar-line/48/blog.png" alt="blog"/><Link to="/blogs">Blog</Link></li>
            <li className='side-bar-list' onClick={() => setActive("maps")}><img className="side-bar-icon" width="30" height="30" src="https://img.icons8.com/pulsar-line/48/globe-asia.png" alt="globe-asia"/><Link to="/maps">Map</Link></li>
            <li className='side-bar-list' onClick={() => setActive("about")}><img className="side-bar-icon" width="30" height="30" src="https://img.icons8.com/pulsar-line/48/information.png" alt="information"/><Link to="/about">About Me</Link></li>
            {userId ?(
              <>
                <li className='side-bar-list' onClick={() => setActive("create")}><img className="side-bar-icon" width="30" height="30" src="https://img.icons8.com/pulsar-line/48/create-new.png" alt="create-new"/><Link to="/create">Create</Link></li>
              </>
            ):(
              <></>
            )}
          </ul>
        </Offcanvas.Body>  
      </Offcanvas>  
      </Container>  
    </>  
  )
}

export default SideBar