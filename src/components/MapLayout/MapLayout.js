import React from 'react';
// import NavBar from '../NavBar/NavBar';
import AltNavBar from '../AltNavBar/AltNavBar';
// import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import './MapLayout.css'
const MapLayout =({active, setActive, user, handleLogout}) =>{
    return(
        <div className = "mapLayout">
            <AltNavBar setActive ={setActive} active={active} user={user} handleLogout={handleLogout}/>
            <Outlet className="page-body"/>
            {/* <Sides/> */}
            {/* <Footer className="layout-footer"/> */}
        </div>
    )
}

export default MapLayout;