import React from 'react';
import { Link } from 'react-router-dom';
// import { excerpt } from '../utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BlogPost.css';
const BlogPost = ({isMap, blogs, user, id, handleDelete}) => {
  const userId = user?.uid;
  // console.log("USER ID " + userId);
  
  return (
    <div className={isMap ? 'blog-heading-map' : 'blog-heading-reg'}>
      {blogs?.map((item) =>(
       
      <div key={item.id} className={isMap ? 'blog-card-map blog-card spring-fever' : 'blog-card spring-fever'} style={{ backgroundImage: `url(${item?.imgUrls[0]})`, backgroundRepeat: "no-repeat",
      backgroundSize: "cover"}}>
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
              
              <Link to={`/detail/${item.id}`}>
                <h3>{item.title}</h3>
              </Link>
            </div>
            <div className="card-info short-description">
            {item.description}
          <Link to={`/detail/${item.id}`}>
            {/* <a href="#">Read Article<FontAwesomeIcon icon="fa-solid fa-angle-right" style={{marginLeft:"5px"}}/></a> */}
            <button >
              <span>Read Article</span>
              <FontAwesomeIcon icon="fa-solid fa-angle-right" style={{marginLeft:"5px"}}/>
            </button>

          </Link>
            </div>
        </div>

        
        <div className="utility-info">
          <ul className="utility-list">
            {/* <li><span class="licon icon-like"></span><a href="#">2</a></li>
            <li><span class="licon icon-com"></span><a href="#">12</a></li> */}
            {/* <li><span class="licon icon-dat"></span>{item.timestamp.toDate().toDateString()}</li> */}
            <li>
              {/* <FontAwesomeIcon icon="fa-regular fa-calendar" style={{marginRight:"7px"}}/> */}
              <img src="./212.png" alt="box" style={{width:"20px", height:"20px", marginRight:"5px", paddingBottom:"5px",filter:"invert(1)"}}/>
              {item.timestamp.toDate().toDateString().substring(4)}
              </li>

            {/* <li className='category bg-light text-primary opacity-50'><span className="licon"></span><a href="#">{item.category}</a></li> */}
            {/* <li><FontAwesomeIcon icon="fa-solid fa-rectangle-list" style={{marginRight:"7px", marginLeft:"20px"}} />{item.category}</li> */}
            <li>
              {/* <FontAwesomeIcon icon="fa-solid fa-clipboard-list"style={{marginRight:"7px", marginLeft:"20px"}} /> */}
              <img src="./214.png" alt="box" style={{width:"20px", height:"20px",marginRight:"5px",  paddingBottom:"5px",filter:"invert(1)"}}/>
              {item.category}
              </li>
          </ul>
        </div>
        <div className="gradient-overlay"></div>
        
    </div>
    
    
      
      
      
      ))}
    </div>


    


  )
}

export default BlogPost;