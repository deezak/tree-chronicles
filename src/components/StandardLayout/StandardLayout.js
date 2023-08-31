import React from 'react';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import './StandardLayout.css';
import NavBar from '../NavBar/NavBar';

const StandardLayout =({active, setActive, user, handleLogout}) =>{
    // const userId = user?.uid;

    // const [active, setActive, user] = useState("home");
    return(
        <>
        <div className = "standardLayout">
            <NavBar setActive ={setActive} active={active} user={user} handleLogout={handleLogout}/>
            <Outlet className="page-body"/>
            {/* <Sides/> */}
            <Footer className="layout-footer"/>
        </div>
        {/* <main>{children}</main> */}
        </>
    )
}

export default StandardLayout;