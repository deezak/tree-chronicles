import React from 'react';
// import NavBar from '../NavBar/NavBar';
// import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import './BasicLayout.css';
import NavBar from '../NavBar/NavBar';
const BasicLayout =({active, setActive, user, handleLogout}) =>{
    // const userId = user?.uid;

    // const [active, setActive, user] = useState("home");
    return(
        <>
        <div className = "basicLayout">
            <NavBar setActive ={setActive} active={active} user={user} handleLogout={handleLogout} isDetail={false}/>
            <Outlet className="page-body"/>
            {/* <Sides/> */}
            {/* <Footer className="layout-footer"/> */}
        </div>
        {/* <main>{children}</main> */}
        </>
    )
}

export default BasicLayout;
