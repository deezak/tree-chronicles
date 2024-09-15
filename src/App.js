import React from 'react';
import './App.css';
import AddEditBlog from './pages/AddEditBlog';
import BasicLayout from "./components/BasicLayout/BasicLayout";
import { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
// import BlogPost from './components/BlogPost';
import Maps from './pages/Maps';
import NotFound from './pages/NotFound';
import { useEffect } from "react";
import MapLayout from './components/MapLayout/MapLayout';
import Auth from './pages/Auth';
import SearchResult from './pages/SearchResult';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import StandardLayout from './components/StandardLayout/StandardLayout';
import Detail from './pages/Detail';
import BlogDetailLayout from './components/BlogDetailLayout/BlogDetailLayout';
import { ThemeProvider } from 'react-bootstrap';
import theme from './theme';
function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const [countryCount, setCountryCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/login");
    });
  };

  return (
    <ThemeProvider theme={theme}>
        <div className="App">
        
        <ToastContainer position='top-center'></ToastContainer>
        <Routes>

        <Route element={<StandardLayout setActive={setActive} active ={active} user={user} handleLogout={handleLogout}/>}>
          <Route exact path='/' element={< Home setActive={setActive} active ={active} user={user} handleLogout={handleLogout} countryCount={countryCount}/>}></Route>
        </Route>

        <Route element={<BlogDetailLayout setActive={setActive} active ={active} user={user} handleLogout={handleLogout}/>}>
        <Route path="/detail/:id" element={<Detail setActive={setActive} user={user} />}/>
        </Route>

        <Route element={<BasicLayout setActive={setActive} active ={active} user={user} handleLogout={handleLogout}/>}>
          {/* <Route exact path='/' element={< Home setActive={setActive}/>}></Route> */}
          <Route path='/about' element={< About setActive={setActive} active={active}/>}></Route>
          <Route path='/update/:id' element={
            user?.uid ? (
                  <AddEditBlog user={user} setActive={setActive} active={active}/>
                ) : (
                  <Navigate to="/" />
                )
              }></Route>
          {/* <Route path="/detail/:id" element={<Detail setActive={setActive} user={user} />}/> */}
          <Route path='/create' element={
            user?.uid ? (
                  <AddEditBlog user={user} setActive={setActive} active={active}/>
                ) : (
                  <Navigate to="/" />
                )}></Route>
          <Route path='/blogs' element={< Blogs setActive={setActive} user={user} active ={active}/>}></Route>
          <Route path='/login' element={<Auth setActive={setActive} setUser={setUser} active={active}/>}></Route>
          <Route path='/search' element={<SearchResult user={user} setActive={setActive} active={active}/>} />
          <Route path='*' element={< NotFound />}></Route>
        </Route>

        <Route element={<MapLayout setActive={setActive} active ={active} user={user} handleLogout={handleLogout} setCount={setCountryCount}/>}>
          <Route exact path='/maps' element={< Maps user={user} setActive={setActive} active={active}/>}></Route>
        </Route>

        </Routes>
    </div>
    </ThemeProvider>
    
  );

  // return (     
  // <BrowserRouter>         
  // <div className="App" >             
  //   <Routes>              
  //     <Route exact path="/" component={()=> (                   
  //       <div className="App" style={{ backgroundmage: `url('./assets/images/greenoutlineworld.svg')` }}>                     
  //         <Home />                   
  //       </div>)                } />               
  //     <Route path="/maps" component={<Maps />}/>             
  //   </Routes>         
  // </div>        
  //   </BrowserRouter>    ); 
}

export default App;
