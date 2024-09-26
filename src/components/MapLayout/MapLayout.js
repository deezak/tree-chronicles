import React from 'react';
// import NavBar from '../NavBar/NavBar';
import NavBar from '../NavBar/NavBar';
// import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import './MapLayout.css'
const MapLayout =({active, setActive, user, handleLogout}) =>{
    return(
        <div className = "mapLayout">
            <NavBar setActive ={setActive} active={active} user={user} handleLogout={handleLogout} isDetail={false}/>
            <Outlet className="page-body"/>
            {/* <Sides/> */}
            {/* <Footer className="layout-footer"/> */}
        </div>
    )
}

export default MapLayout;