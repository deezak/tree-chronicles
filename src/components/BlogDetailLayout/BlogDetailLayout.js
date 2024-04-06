import React from 'react';
// import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
// import './BasicLayout.css';
// import AltNavBar from '../AltNavBar/AltNavBar';
import SideBar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const BlogDetailLayout =({active, setActive, user, handleLogout}) =>{
    // const userId = user?.uid;

    // const [active, setActive, user] = useState("home");
    return(
        <>
        <div className = "basicLayout">
            {/* <AltNavBar setActive ={setActive} active={active} user={user} handleLogout={handleLogout}/> */}
            <SideBar user={user} setActive={setActive}>
                {/* <div className="side-menu-button">
                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                </div> */}
            </SideBar>
            <Outlet className="page-body"/>
            {/* <Sides/> */}
            <Footer className="layout-footer"/>
        </div>
        {/* <main>{children}</main> */}
        </>
    )
}

export default BlogDetailLayout;