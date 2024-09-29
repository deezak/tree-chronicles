import React, { useState, useEffect, useRef } from 'react';
import BlogPost from '../components/BlogPost';
import { ref, deleteObject } from "firebase/storage"; // Import for Firebase Storage
import { collection, deleteDoc, doc, limit, startAfter, orderBy, query, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { toast } from "react-toastify";
import PaginationControls from '../components/PaginationControls/PaginationControls'; // Ensure correct import path

const Blogs = ({ setActive, user, active }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    // const [count, setCount] = useState(null);
    const lastVisible = useRef(null);
    const [noOfPages, setNoOfPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [perPage, setPerPage] = useState(6); // Number of blogs per page

    // const getBlogsData = async (page = 1) => {
    //     setLoading(true);
    //     const blogRef = collection(db, "blogs");
    //     let q = query(blogRef, orderBy("timestamp", "desc"), limit(perPage));

    //     if (page > 1) {
    //         q = query(q, startAfter(lastVisible));
    //     }

    //     const docSnapshot = await getDocs(q);
    //     setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    //     setCount(docSnapshot.size);
    //     setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1] || null);
    //     setLoading(false);
    // };

    useEffect(() => {
        const getBlogsData = async (page = 1) => {
            setLoading(true);
            const blogRef = collection(db, "blogs");
            let q = query(blogRef, orderBy("timestamp", "desc"), limit(perPage));
    
            if (page > 1 && lastVisible.current) {
                // q = query(q, startAfter(lastVisible));
                q = query(blogRef, orderBy("timestamp", "desc"), startAfter(lastVisible.current), limit(perPage));
            }
    
            const docSnapshot = await getDocs(q);
            setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            // setCount(docSnapshot.size);
            // setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1] || null);
            lastVisible.current = docSnapshot.docs[docSnapshot.docs.length - 1] || null;
            setLoading(false);
        };
        
        const getTotalBlogs = async () => {
            const blogRef = collection(db, "blogs");
            const docSnapshot = await getDocs(blogRef);
            const totalBlogs = docSnapshot.size;
            const totalPage = Math.ceil(totalBlogs / perPage);
            setNoOfPages(totalPage);
        };
        getBlogsData(currentPage);
        getTotalBlogs();
        setActive("blogs");
        
        // if(count >0)
        //   console.log("COUNT:" + count);
    }, [setActive, currentPage, perPage, lastVisible]);

    useEffect(() => {
        setPerPage(6);
    },[setPerPage]);

    // const getTotalBlogs = async () => {
    //     const blogRef = collection(db, "blogs");
    //     const docSnapshot = await getDocs(blogRef);
    //     const totalBlogs = docSnapshot.size;
    //     const totalPage = Math.ceil(totalBlogs / perPage);
    //     setNoOfPages(totalPage);
    // };

    const handleDelete = async (id, imgUrls) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                setLoading(true);
                await deleteDoc(doc(db, "blogs", id));
                // Delete all images from Firebase Storage
                const deleteImagesPromises = imgUrls.map(async (imageUrl) => {
                    const imageRef = ref(storage, imageUrl);
                    await deleteObject(imageRef);
                });
                await Promise.all(deleteImagesPromises);
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
                toast.success("Blog deleted successfully");
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= noOfPages) {
            setCurrentPage(newPage);
        }
    };
    console.log(blogs);

    return (
        <div>
            <h2 className='latest-posts'>Latest Posts</h2>
            {loading ? (
                <div className="blocks-loading" style={{padding: "13vh 0 0 0"}}>
                    <div className="block-loading orange"></div>
                    <div className="block-loading blue"></div>
                </div>
            ) : (
                <div style={{ display: "block" }}>
                    
                    <BlogPost
                        className="blogs-flex"
                        isMap={false}
                        blogs={blogs}
                        user={user}
                        handleDelete={handleDelete}
                    />
                    <PaginationControls
                        currentPage={currentPage}
                        noOfPages={noOfPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Blogs;
