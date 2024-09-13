import React from 'react'

const PlaceCounter = ({ countryCount, cityCount, loading  }) => {
  if (loading) {
    return <div className="blocks-loading">
        <div className="block-loading orange"></div>
        <div className="block-loading blue"></div>
      </div>
  }

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", width:"37vw"}}>
      <div className= "flex-across-counter">
        <div className="counter-unit">
        <h1 className='placecounter-label'>Countries Visited:</h1> 
          <p className='placecounter-number'>{countryCount}</p>
          {/* <br/> */}
        </div>
        <div className="counter-unit">
        <h1 className='placecounter-label'>Cities Visited:</h1>
          <p className='placecounter-number'>{cityCount}</p>
          {/* <br/> */}
        </div>
      </div>
      <div className= "flex-across-counter">
        <div className="counter-unit">
          <h1 className='placecounter-label'>Days on the Road:</h1> 
            <p className='placecounter-number'>453</p>
        </div> 
        <div className="counter-unit">
          <h1 className='placecounter-label'>Current Country:</h1> 
            <p className='placecounter-number'>USA</p>
        </div> 
      </div>     
    </div>
  )
}

export default PlaceCounter