import React, {useState, useEffect} from 'react';
import './Detail.css';
import { useParams } from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel } from 'react-bootstrap';

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



//     return (
//         <div className='single'>
//             {/* <SideBar /> */}
//             <div className='blog-title-box' style={{backgroundImage:`url('${blog?.imgUrls[imageIndex]}')`}}>
//                 <div className='overlay'>                
//                 </div>
//                 <div className='blog-title'>
//                     <div className="left-arrow">
//                     {imageIndex > 0 ? (
//                         <FontAwesomeIcon onClick={decrementIndex} icon="fa-solid fa-angle-left" />
//                     ) : (<></>)}
//                     </div>
//                     <div className='middle-part'>
//                         <span style={{color: 'rgba(255,255,255,0.8)',fontWeight:'600' }}>{blog?.timestamp.toDate().toDateString()}</span>
//                         <h2>{blog?.title}</h2>
//                     </div>
//                     <div className="right-arrow">
//                         {imageIndex < blog?.imgUrls.length -1 ? (
//                             <FontAwesomeIcon onClick={incrementIndex} icon="fa-solid fa-angle-right" />
//                         ) : (<></>)}
//                     </div>
//                 </div>
//             </div>
//             <div className='container-fluid pb-4 pt-4 padding blog-single-content'>
//                 <div className='container padding'>
//                     <div className='row mx-0'>
//                         <div className='col-md-8'>
//                             <span className='meta-info text-start'>
//                                 By <p className='author'>{blog?.author}</p>&nbsp;&nbsp;
//                                 {blog?.timestamp.toDate().toDateString()}
//                             </span>
//                             <p className='text-start'>{blog?.description}</p>
//                         </div>
//                         <div className='col-md-3 right-column'>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Detail


return (
    <div className='single'>
        <div className='blog-title-box'>
            <Carousel style={{ maxHeight: '100vh' }} activeIndex={imageIndex} onSelect={(selectedIndex) => setIndex(selectedIndex)}
            nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" style={{scale: "1.3", zIndex: "100"}}/>}
            prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" style={{scale: "1.3", zIndex: "100"}}/>}
            interval={null} > 
            {/* // Disable auto sliding */}
                {blog?.imgUrls.map((imageUrl, index) => (
                    <Carousel.Item key={index}>
                        <img src={imageUrl} className="d-block w-100" alt={`Slide ${index}`} style={{ maxHeight: '100.5vh',  margin: '0 auto', objectFit: 'cover',overflow: 'hidden', // Clip the image
                                    objectPosition:"center" }}/>
                        {/* <Carousel.Caption>
                            <h3>{blog?.title}</h3>
                            <p>{blog?.timestamp.toDate().toDateString()}</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className='blog-title'>
                {/* <div className="left-arrow">
                    {imageIndex > 0 ? (
                        <FontAwesomeIcon onClick={decrementIndex} icon="fa-solid fa-angle-left" />
                    ) : (<></>)}
                </div> */}
                <div className='middle-part'>
                    <h2>{blog?.title}</h2>
                    <span style={{ color: 'rgba(255,255,255,1)'}}>{blog?.timestamp.toDate().toDateString()}</span>
                </div>
                {/* <div className="right-arrow">
                    {imageIndex < blog?.imgUrls.length - 1 ? (
                        <FontAwesomeIcon onClick={incrementIndex} icon="fa-solid fa-angle-right" />
                    ) : (<></>)}
                </div> */}
            </div>
        </div>
        <div className='container-fluid pb-4 pt-4 padding blog-single-content'>
            <div className='padding'>
                <div className='row mx-0' style={{ justifyContent: "space-between"}}>
                    <div className='p-4 col-md-8'>
                        <span className='meta-info text-start' style={{fontFamily:"tropikal"}}>
                            By <p className='author'>{blog?.author}</p>&nbsp;&nbsp;
                            {blog?.timestamp.toDate().toDateString()}
                        </span>
                        <p className='text-start'>{blog?.description}</p>
                    </div>
                    <div className='col-md-3 right-column' style={{ height: '100%', display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "space-around" }}>
                        <h5 style={{ marginTop: '8px', marginBottom: '15px', fontSize: '20px', fontWeight: '600', color: '#8d8d8d', fontFamily:"poppins" }}>Tags</h5>
                        <ul style={{ listStyle: 'none', padding: 0 , display:"flex", flexWrap:"wrap", justifyContent:"center", fontFamily:"poppins"}}>
                            {blog?.tags.map((tag, index) => (
                                <li key={index} style={{ marginBottom: '0.5rem', fontSize: '0.9rem', backgroundColor: '#f2f2f2', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', display: 'inline-block', marginRight: '0.5rem', color: '#666' }}>{tag}</li>
                            ))}
                        </ul>
                    </div>
    
                </div>
            </div>
        </div>
    </div>
);
}

export default Detail;