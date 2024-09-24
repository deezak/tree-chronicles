import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
const BlogDetailLayout =({setActive, user, handleLogout}) =>{

    return(
        <>
        <div className = "basicLayout">
            <SideBar user={user} setActive={setActive} handleLogout={handleLogout}></SideBar>
            <Outlet className="page-body"/>
        </div>
        </>
    )
}

export default BlogDetailLayout;