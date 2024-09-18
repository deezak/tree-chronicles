import React from 'react';
import './BigTitle.css';
import '../../../src/'
import useWindowSize from '../../components/useWindowSize';

const BigTitle = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;
  return (
    <div>
       {isMobile && <div className="big-title">
          
          <div className="tree-chronicles">
          <div className="the">the</div>
            <span>TRee</span> <span>ChRoNiCLeS</span>
            </div>
          {/* <div className= "by-dina"> by Dina</div> */}
        </div>}
        {isTablet && <div className="big-title">
          <div className="the">the</div>
          <div className="tree-chronicles"><span>TRee</span> <span>ChRoNiCLeS</span></div>
          {/* <div className= "by-dina"> by Dina</div> */}
        </div>}
        {isDesktop && <div className="big-title">
          <div className="the">the</div>
          <div className="tree-chronicles"><span>TRee</span> <span>ChRoNiCLeS</span></div>
          {/* <div className= "by-dina"> by Dina</div> */}
        </div>}
    </div>
   
  )
}

export default BigTitle