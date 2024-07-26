import React from 'react'

const PlaceCounter = () => {
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center"}}>
      <div className= "flex-across-counter">
        <div className="counter-unit">
        <h1 className='placecounter-label'>Countries Visited:</h1> 
          <br/>
          <p className='placecounter-number'>15</p>
          {/* <br/> */}
        </div>
        <div className="counter-unit">
        <h1 className='placecounter-label'>Cities Visited:</h1>
          <br/>
          <p className='placecounter-number'>36</p>
          {/* <br/> */}
        </div>
      </div>
      <div className= "flex-across-counter">
        <div className="counter-unit">
          <h1 className='placecounter-label'>Days on the Road:</h1> 
            <br/>
            <p className='placecounter-number'>453</p>
        </div> 
        <div className="counter-unit">
          <h1 className='placecounter-label'>Current Country:</h1> 
            <br/>
            <p className='placecounter-number'>USA</p>
        </div> 
      </div>     
    </div>
  )
}

export default PlaceCounter