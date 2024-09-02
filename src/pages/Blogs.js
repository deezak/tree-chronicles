import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import { collection, deleteDoc, doc, limit, startAfter, orderBy, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from "react-toastify";
import PaginationControls from '../components/PaginationControls/PaginationControls'; // Ensure correct import path

const Blogs = ({ setActive, user, active }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [count, setCount] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [noOfPages, setNoOfPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [perPage, setPerPage] = useState(6); // Number of blogs per page

    const getBlogsData = async (page = 1) => {
        setLoading(true);
        const blogRef = collection(db, "blogs");
        let q = query(blogRef, orderBy("timestamp", "desc"), limit(perPage));

        if (page > 1) {
            q = query(q, startAfter(lastVisible));
        }

        const docSnapshot = await getDocs(q);
        setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setCount(docSnapshot.size);
        setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1] || null);
        setLoading(false);
    };

    useEffect(() => {
        getBlogsData(currentPage);
        getTotalBlogs();
        setActive("blogs");
        setPerPage(6);
        if(count >0)
          console.log("COUNT:" + count);
    }, [setActive, currentPage]);

    const getTotalBlogs = async () => {
        const blogRef = collection(db, "blogs");
        const docSnapshot = await getDocs(blogRef);
        const totalBlogs = docSnapshot.size;
        const totalPage = Math.ceil(totalBlogs / perPage);
        setNoOfPages(totalPage);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                setLoading(true);
                await deleteDoc(doc(db, "blogs", id));
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

    return (
        <div>
            <h2 className='latest-posts'>Latest Posts</h2>
            {loading ? (
                <div class="blocks-loading">
                    <div class="block-loading orange"></div>
                    <div class="block-loading blue"></div>
                </div>
            ) : (
                <div style={{ flex: "1" }}>
                    
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
