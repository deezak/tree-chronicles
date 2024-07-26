import React from 'react'
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <div className="layer"></div>
        <div className="from-to">
          <div className='from-location'>JAX</div> 
          <FontAwesomeIcon icon="fa-solid fa-plane" /> 
          <div className='to-location'>ANY</div>
          </div>
      </div>
      <div className="ticket-body">
        <div className="passenger">
          <p>passenger</p>
          <h4>Dina Zakaria</h4>
        </div>
        <div className="flight-info row" style={{position:"relative", top: "71px"}}>
          <div className="">
            <p>flight</p>
            <h4>ANYWHERE</h4>
          </div>
          <div className="">
            <p>seat</p>
            <h4>8A</h4>
          </div>
          <div className="">
            <p>Flight Time</p>
            <h4>ASAP</h4>
          </div>
        </div>
        {/* <div className="flight-date">Flight Time: ASAP</div> */}
      {/* <div className="barcode"> */}
        <img className="barcode" src='./qr.png' alt="qr code" />
        {/* </div> */}
      </div>
      <div className="footer">
        <div className="disclaimer">
          <h3>aBouT Me</h3>
        Welcome to an insight into my year away from home.
After finishing my bachelor’s degree in Engineering and finding myself burnt out after spending years listening to everyone but myself, I decided to take a year off to do practice freedom of movement and finally ask myself what do I *want* to do, not what do I *have* to do.          </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default About