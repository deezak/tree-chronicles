import React, {useState, useEffect} from 'react'
import BlogPost from '../components/BlogPost';
import { collection, limit, deleteDoc, onSnapshot, doc, orderBy, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from "react-toastify";

const Blogs = ({setActive, user, active}) => {
const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [noOfPages, setNoOfPages] = useState(null);

  // useEffect(() => {
    // const unsub = onSnapshot(
    //   collection(db, "blogs"),
    //   // orderBy('timestamp'),
    //   (snapshot) => {
    //     let list = [];
    //     snapshot.docs.forEach((doc) => {
    //       list.push({id: doc.id, ...doc.data()})
    //     });
    //     // console.log("LIST: " + list[0].timestamp.toDate());
    //     setBlogs(list);
    //   }, (error) =>{
    //     console.log(error)
    //   }
    // );
    // return () => {
    //   unsub();
    // }
    
  // }, [setActive, active]);

  useEffect(() => {
    getBlogsData();
    getTotalBlogs();
    setActive("blogs");
  }, [setActive]);

  const getBlogsData = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const first = query(blogRef, orderBy("timestamp", "desc")); //, limit(4));
    const docSnapshot = await getDocs(first);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setCount(docSnapshot.size);
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const getTotalBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const docSnapshot = await getDocs(blogRef);
    const totalBlogs = docSnapshot.size;
    const totalPage = Math.ceil(totalBlogs / 4);
    setNoOfPages(totalPage);
  };

  const handleDelete = async(id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  //   if(window.RTCEncodedVideoFrame("Are you sure you want to delete this post?")){
  //     try{
  //       setLoading(true);
  //       await deleteDoc(doc(db, "blogs", id));
  //       setLoading(false);
  //     } catch(err){
  //       console.log(err);
  //     }
  //   }
  // };

  console.log("blogs", blogs);
  console.log("USER ON BLOGS " + user?.uid);
  return (
    <div style={{flex: "1"}}>
      <h2 className='latest-posts'>Latest Posts</h2>
      <BlogPost className="blogs-flex"
      isMap={false} 
      blogs={blogs} 
      user={user} 
      handleDelete={handleDelete}></BlogPost>
      
    </div>
  )
}

export default Blogs;