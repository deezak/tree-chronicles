import React from 'react'
import useWindowSize from '../../components/useWindowSize';

const PlaceCounter = ({ countryCount, cityCount, loading  }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;
  if (loading) {
    return <div className="blocks-loading">
        <div className="block-loading orange"></div>
        <div className="block-loading blue"></div>
      </div>
  }

  return (
    <div className="place" >
      <div className= "flex-across-counter">
        <div className="counter-unit">
        {isDesktop && <h1 className='placecounter-label'>Countries Visited:</h1>}
        {(isMobile || isTablet) && <h1 className='placecounter-label'>Countries<br/>Visited:</h1>} 
          <p className='placecounter-number'>{countryCount}</p>
          {/* <br/> */}
        </div>
        <div className="counter-unit">
        {isDesktop && <h1 className='placecounter-label'>Cities Visited:</h1>}
        {(isMobile || isTablet) && <h1 className='placecounter-label'>Cities<br/>Visited:</h1>} 
          <p className='placecounter-number'>{cityCount}</p>
          {/* <br/> */}
        </div>
      </div>
      <div className= "flex-across-counter">
        <div className="counter-unit">
        {isDesktop && <h1 className='placecounter-label'>Days on the Road:</h1>}
        {(isMobile || isTablet) && <h1 className='placecounter-label'>Days on<br/>the Road:</h1>} 
            <p className='placecounter-number'>453</p>
        </div> 
        <div className="counter-unit">
          {isDesktop && <h1 className='placecounter-label'>Current Country:</h1>}
        {(isMobile || isTablet) && <h1 className='placecounter-label'>Current<br/>Country:</h1>} 
            <p className='placecounter-number'>USA</p>
        </div> 
      </div>     
    </div>
  )
}

export default PlaceCounter