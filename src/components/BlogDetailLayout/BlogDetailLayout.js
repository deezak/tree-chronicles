import React from 'react';
import { Outlet } from 'react-router-dom';
// import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
const BlogDetailLayout =({setActive,active, user, handleLogout}) =>{

    return(
        <>
        <div className = "basicLayout">
            {/* <SideBar user={user} setActive={setActive} handleLogout={handleLogout}></SideBar> */}
            <NavBar setActive ={setActive} active={active} user={user} handleLogout={handleLogout} isDetail ={true} />
            <Outlet className="page-body"/>
        </div>
        </>
    )
}

export default BlogDetailLayout;