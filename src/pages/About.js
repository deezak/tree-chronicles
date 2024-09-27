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
        <img className="squiggle" src="./squiggle.png" style={{filter:"invert(0.85)"}}alt="marker line"/>

        {/* <div className="flight-date">Flight Time: ASAP</div> */}
        {/* <div className="barcode"> */}
        
        {/* </div> */}
      </div>
        <div className="disclaimer">
          <h3>aBouT Me</h3>
          When people ask what I’ve learned while traveling, I’m at a loss of words because every era has taught me something new. I can’t say something cliche about “independence” and “finding myself” because that’s honestly not why I left in the first place, and almost the opposite of what I’ve learned. Every friend I’ve made has impacted me significantly in one way or another. I found myself putting aside my radical independence and have softened to accept the help of people around me. I’ve found that I don’t know myself at all, because it changes in every place and mindset I fall in — and I love it. I’m always changing and I’m excited to keep growing.         </div>
    </div>
  </div>
</div>
  )
}

export default About