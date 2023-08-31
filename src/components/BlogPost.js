import React from 'react';
import { Link } from 'react-router-dom';
// import { excerpt } from '../utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BlogPost.css';
const BlogPost = ({blogs, user, id, handleDelete}) => {
  const userId = user?.uid;
  console.log("USER ID " + userId);
  
  return (
    <div className='blog-heading text-start py-2 mb-4'>
      {blogs?.map((item) =>(
        
        // <div className='blog row pb-4' key={item.id}>
        //   <div className='blog-pic'> 
        //     <div className='hover-blog-img'>
        //       <div className='blogs-img'>
        //         <img src={item.imgUrl} alt={item.title}/>
        //         <div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        //     <div className='blog-content'>
        //       <div className='text-start'>
        //           <h6 className='category bg-light text-primary opacity-50'>{item.category}</h6>

        //           <div className="edit-button" style ={{float:"right"}}>
        //             <FontAwesomeIcon icon="fa-regular fa-pen-to-square" style={{margin:"15px", cursor:"pointer"}}/>
        //           </div>

        //           <span className='title py-2'>{item.title}</span>
        //           <div className='short-description'>
        //             {excerpt(item.description, 120)}
        //           </div>
        //             {item?.description > 120 ?(
        //               console.log("MORE THAN 120 CHAR")
        //             ):(
        //               <div></div>
        //             )}
        //           <span className='meta-info'>
        //             <p className='author'>{item.author}</p>
        //             {item.timestamp.toDate().toDateString()}
        //           </span>
        //         </div>
              
        //       {/* <button className='btn btn-read'>Read More</button> */}
              
        //   </div>
        // </div>
      
      
      <div key={item.id} className="blog-card spring-fever" style={{ backgroundImage: `url(${item?.imgUrls[0]})` }}>
        <div className="color-overlay"></div>
        

        {user?.uid && userId === user.uid &&(
          <div className='edit-delete-blog'>
            <Link to={`/update/${item.id}`}>
              <FontAwesomeIcon icon="fa-regular fa-pen-to-square" className='edit-blog-button'/>
            </Link>
            <FontAwesomeIcon icon="fa-regular fa-trash-can" 
              className='delete-blog-button'
              onClick={() => handleDelete(item.id)}/>
          </div>
        )}
        <div className='blog-card-flex'>
            <div className="title-content">
              <h3><a href={`/detail/${item.id}`}>{item.title}</a></h3>
              {/* <div class="intro"> <a href="#">Inspiration</a> </div> */}
            </div>
            <div className="card-info short-description">
            {item.description}
          <Link to={`/detail/${item.id}`}>
            {/* <a href="#">Read Article<FontAwesomeIcon icon="fa-solid fa-angle-right" style={{marginLeft:"5px"}}/></a> */}
            <button >Read Article<FontAwesomeIcon icon="fa-solid fa-angle-right" style={{marginLeft:"5px"}}/></button>

          </Link>
            </div>
        </div>

        
        <div className="utility-info">
          <ul className="utility-list">
            {/* <li><span class="licon icon-like"></span><a href="#">2</a></li>
            <li><span class="licon icon-com"></span><a href="#">12</a></li> */}
            {/* <li><span class="licon icon-dat"></span>{item.timestamp.toDate().toDateString()}</li> */}
            <li><FontAwesomeIcon icon="fa-regular fa-calendar" style={{marginRight:"7px"}}/>{item.timestamp.toDate().toDateString()}</li>
            {/* <li className='category bg-light text-primary opacity-50'><span className="licon"></span><a href="#">{item.category}</a></li> */}
            {/* <li><FontAwesomeIcon icon="fa-solid fa-rectangle-list" style={{marginRight:"7px", marginLeft:"20px"}} />{item.category}</li> */}
            <li><FontAwesomeIcon icon="fa-solid fa-clipboard-list"style={{marginRight:"7px", marginLeft:"20px"}} />{item.category}</li>
          </ul>
        </div>
        <div className="gradient-overlay"></div>
        
    </div>
    
    
      
      
      
      ))}
    </div>


    


  )
}

export default BlogPost;