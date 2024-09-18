import React from 'react'
import './About.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const About = () => {
  return (
    // <div className="ticket">
    //   <div className="header">
    //     <h1>About Me</h1>
    //   </div>
    //   <div className="content">
    //     <div className="photo">
    //       <img src="./meme.jpg" alt="Your Photo" />
    //     </div>
    //     <div className="about">
    //       <h2>Hi, I'm [Your Name]</h2>
    //       <p>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum convallis lacus, ac fermentum ligula varius at. Nulla facilisi. Cras lacinia malesuada quam non laoreet.
    //       </p>
    //     </div>
    //   </div>
    // </div>
    
<div className="container-fluid-about">

  <div className="ticket-container">
    <div className="ticket dark">

      <div className="ticket-head" style={{backgroundImage: `url("./meme.jpg")`}}>
        <img src="./frame.png" alt="frame"/> 
        <div className="layer"></div>
        {/* <div className="from-to">
          <div className='from-location'>JAX</div> 
          <FontAwesomeIcon icon="fa-solid fa-plane" /> 
          <div className='to-location'>ANY</div>
          </div> */}
      </div>
      <div className="ticket-body">
        <div style={{display:"flex", alignItems:"center"}}>
          <div className="passenger">
            <p>passenger</p>
            <h4>Dina<br/>Zakaria</h4>
            <img className="barcode" src='./qr.png' alt="qr code" />
          </div>
          
        </div>
        
        <div className = "all-flight-info">
          <div className="flight-info row">
            <div className="info">
              <p>origin</p>
              <h4>JAX</h4>
            </div>
            <div className="info">
              <p>seat</p>
              <h4>8A</h4>
            </div>
            <div className="info">
              <p>Flight Time</p>
              <h4>ASAP</h4>
            </div>
          </div>
          <div className="flight-info row f-right" >
            <div className="info">
              <p>destination</p>
              <h4>ANYWHERE</h4>
            </div>
            <div className="info">
              <p>class</p>
              <h4>A</h4>
            </div>
            <div className="info">
              <p>Boarding</p>
              <h4>SOON</h4>
            </div>
          </div>
        </div>
        {/* <div className="flight-date">Flight Time: ASAP</div> */}
        {/* <div className="barcode"> */}
        
        {/* </div> */}
      </div>
        <div className="disclaimer">
          <h3>aBouT Me</h3>
        Welcome to an insight into my year away from home.
After finishing my bachelor’s degree in Computer Engineering and finding myself burnt out after spending years listening to everyone but myself, I decided to take a year off to practice freedom of movement and finally ask myself what do I *want* to do, not what do I *have* to do.          </div>
    </div>
  </div>
</div>
  )
}

export default About