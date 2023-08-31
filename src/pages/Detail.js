import React, {useState, useEffect} from 'react';
import './Detail.css';
import { useParams } from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import SideBar from '../components/SideBar/SideBar';
const Detail = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    const [imageIndex, setIndex] = useState(0);

    useEffect(() => {
        id && getBlogDetail();
    }, [id])

    useEffect(() => {

    }, [imageIndex])

    const incrementIndex = () => {
        setIndex(imageIndex + 1);
    }

    const decrementIndex = () => {
        setIndex(imageIndex - 1);
    }

    const getBlogDetail = async() => {
        const docRef = doc(db, "blogs", id);
        const blogDetail = await getDoc(docRef);
        setBlog(blogDetail.data());
        // setActive(null);
    }



    return (
        <div className='single'>
            {/* <SideBar /> */}
            <div className='blog-title-box' style={{backgroundImage:`url('${blog?.imgUrls[imageIndex]}')`}}>
                <div className='overlay'>                
                </div>
                <div className='blog-title'>
                    <div className="left-arrow">
                    {imageIndex > 0 ? (
                        <FontAwesomeIcon onClick={decrementIndex} icon="fa-solid fa-angle-left" />
                    ) : (<></>)}
                    </div>
                    <div className='middle-part'>
                        <span style={{color: 'rgba(255,255,255,0.8)',fontWeight:'600' }}>{blog?.timestamp.toDate().toDateString()}</span>
                        <h2>{blog?.title}</h2>
                    </div>
                    <div className="right-arrow">
                        {imageIndex < blog?.imgUrls.length -1 ? (
                            <FontAwesomeIcon onClick={incrementIndex} icon="fa-solid fa-angle-right" />
                        ) : (<></>)}
                    </div>
                </div>
            </div>
            <div className='container-fluid pb-4 pt-4 padding blog-single-content'>
                <div className='container padding'>
                    <div className='row mx-0'>
                        <div className='col-md-8'>
                            <span className='meta-info text-start'>
                                By <p className='author'>{blog?.author}</p>&nbsp;&nbsp;
                                {blog?.timestamp.toDate().toDateString()}
                            </span>
                            <p className='text-start'>{blog?.description}</p>
                        </div>
                        <div className='col-md-3 right-column'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail