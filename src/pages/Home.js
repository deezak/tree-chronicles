import React, {useState, useEffect} from 'react'
import BigTitle from '../components/BigTitle/BigTitle'
import "./Home.css"
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import PlaceCounter from '../components/PlaceCounter/PlaceCounter';
const Home = () => {
  // const [loading, setLoading] = useState(true);
  // const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   const unsub = onSnapshot(
  //     collection(db, "blogs"),
  //     (snapshot) => {
  //       let list = [];
  //       snapshot.docs.forEach((doc) => {
  //         list.push({id: doc.id, ...doc.data()})
  //       });
  //       setBlogPost(list);
  //     }, (error) =>{
  //       console.log(error)
  //     }
  //   );
  //   return () => {
  //     unsub();
  //   }
  // }, []);

  // console.log("blogs", blogs);

  return (
    <div className = "Home-Page" style={{flex: "1"}}>
        {/* <div>Home</div> */}
        <BigTitle />
        <PlaceCounter />
    </div>
    
  )
}

export default Home