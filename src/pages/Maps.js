import React, {useState, useEffect, useCallback, useRef} from "react";
import './Maps.css';
import { collection, deleteDoc, doc, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import latLong from '../assets/mapJson/latLong.json';
import { ComposableMap,ZoomableGroup,Geographies,Geography,Marker } from "react-simple-maps"
import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";
import BlogPost from "../components/BlogPost";
import { toast } from "react-toastify";
import useWindowSize from '../components/useWindowSize';

function Maps({setActive, user, active}) {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [toolTipPosition, setToolTipPosition] = useState({ x: 0, y: 0 });
  const [toolTipContent, setToolTipContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [defaultZoom, setZoom] = useState(2);
  const [defaultCenter, setCenter] = useState([10, 30]);
  const [countryBlogs, setCountryBlogs] = useState([]);

  const projection = () => {
    return geoTimes()
      .translate([setMapDimensions().width / 2, setMapDimensions().height / 2])
      .scale(1);
  };
  const containerRef = useRef();

  const handleDelete = async(id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log("markers", markers);
  // console.log("USER ON BLOGS " + user?.uid);
  // console.log("number of country's visited: " + countryCount);

  const setMapDimensions = () => {
    if (isDesktop) {
      return { width: 980, height: 400 };
    } else if (isTablet) {
      return { width: 650, height: 400 };
    } else if (isMobile) {
      return { width: 420, height: 400 };
    }
    return { width: 1024, height: 600 };  // Fallback/default dimensions
  };


  const getCountryBlogs= useCallback(async () => {
    // setLoading(true);
    try {
      const first = query(collection(db, "blogs"),
                    where("country", "==", selectedCountry));
      const docSnapshot = await getDocs(first);
      setCountryBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      // setCountryCount(docSnapshot.size);
      // setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error getting country blogs: ", error);
    }
    // setLoading(false);
  }, [selectedCountry]);

  //ON COUNTRY CLICK, IF BLOGS EXIST LIST AND PUT CITY MARKERS
  const handleCountryClick = (geo) => {
    setSelectedCountry(geo.properties.name);
    console.log("GEO CUNT " + geo.properties.name);
    
    
    const path = geoPath().projection(projection());
    const centroid = projection().invert(path.centroid(geo));
    setCenter(centroid);
    
  };
  // Fetch the country list once when the component mounts
  useEffect(() => {
    setLoading(true);
    const getCountryList = async () => {
    try {
      const blogRef = collection(db, "blogs");
      const first = query(blogRef);
      const docSnapshot = await getDocs(first);
      setMarkers(docSnapshot.docs.map((doc) => ({
        id: doc.id,
        country: doc.data().country,
        lat: latLong.find(c => c.name === doc.data().country).latitude,
        long: latLong.find(c => c.name === doc.data().country).longitude
      })));
      // setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error("Error getting country list: ", error);
      setLoading(false);
    }
  };
    getCountryList();
  }, []);

  useEffect(() =>{
    console.log("BLOG LENGTH: " + markers.length);
    console.log("FIND BLOG: " + markers.find(m => m.country === selectedCountry));
    const zoomLevel = markers.find(marker => marker.country === selectedCountry) ? 8 : 2;
    setZoom(zoomLevel);
  },[markers, selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      getCountryBlogs();
    }
  }, [selectedCountry, getCountryBlogs]);

  //HANDLE IF ZOOM < 8, GO BACK TO REGULAR VIEW
  const handleMoveEnd = (position) => {
    // console.log("ZOOM LEVEL : " +position.zoom);
    // if(position.zoom < 4){
      // setZoom(position.zoom); // Update the zoom state with the current zoom level
    // }
    // setCenter(position.center);
    
  };
  const handleMouseMove = (e) => {
    setToolTipPosition({
      x: e.pageX,
      y: e.pageY,
    });
  };


  return (
    <>
    {loading ? (
      <div className="blocks-loading">
        <div className="block-loading orange"></div>
        <div className="block-loading blue"></div>
      </div>
    ) : (
      <ComposableMap className="map-container" width={setMapDimensions().width}
        height={setMapDimensions().height}
        style={{
          
            // background-image: "url('./assets/images/fairyforest.jpg')",
            // fill: "url('./fairyforest.jpg')",
            width: "100%",
            height: "100%",
        }}>
          <ZoomableGroup zoom={defaultZoom} transitionduration={100} center={defaultCenter} onMoveEnd={handleMoveEnd} >
          {/* {position => ( */}
          <>
          {/* console.log("POSITION "+ position.k);
          console.log("SCALE "+ 1/position.k); */}
        
              <Geographies geography="/worldMap.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} 
                
                onClick={() =>{
                  handleCountryClick(geo);
                  // console.log("SELECTED CUNT: " + selectedCountry + " has " + countryBlogs.length + " BLOGS");
                  
                  
                  ;}}
                onMouseEnter={() =>{
                  
                  const NAME = geo.properties.name;
                  // console.log("GEO: ", NAME);
                  setToolTipContent(NAME);
                }}
                onMouseLeave={() =>{
                  setToolTipContent("");
                }}
                onMouseMove={handleMouseMove}
                style={{
                  
                  hover:{
                    fill: selectedCountry === geo.properties.name ? "var(--yellow-dark)" : "#f3f3f330",
                    outline: "none",
                    stroke:"#e2e2e2fa",
                    strokeWidth:"1.1"
                    // boxShadow: "2px 2px 10px var(--magic-yellow)"
                  },
                  default: { 
                    outline: "#ff",
                    transitionDuration: "0.2s", 
                    fill: "#1f1f1f",//"var(--dark-complement)",
                    // fill: `url('../assets/images/textures/texture.svg')`,
                    stroke:"#fafafa50",
                    strokeWidth:"0.6"
                  },
                  pressed: { outline: "none" },
                }}
                data-tip="" // This enables the tooltip on hover
                />
              ))
            }
          </Geographies>
          
            
          {markers.map(({ country, lat, long }, index) => (
            <Marker key={`${country}-${index}`} coordinates={[long, lat]}>
              {/* <g
                  fill="none"
                  stroke="var(--yellow-dark)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform={`translate(-6,-12) scale(${Math.pow(0.65, 2)})`}//"translate(-10, -20) scale(0.75)"//{`translate(${( - 12 / position.k)}, ${ - 24 / position.k}) scale(${1 / position.k})`}
                  className="scaleM"
                  style={{boxShadow: "2px 2px 8px var(--magic-yellow)"}}
                >
                  <circle fill ="var(--yellow-dark)" cx="12" cy="10" r={3} />
                  <path 
                  d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g> */}
                <image
                  href={"./215.png"} // Use 'href' to link the image
                  width="9" // Set the width of the image
                  height="9" // Set the height of the image
                  transform="translate(-4,-6)" // Adjust positioning
                  style={{ boxShadow: '2px 2px 8px var(--magic-yellow)',
                    filter: 'invert(0.77) sepia(1.4) saturate(3.5) hue-rotate(-9deg)',
                    pointerEvents: "none",
                   }}
                />
              {/* <text
                textAnchor="middle"
                y={10}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
              </text> */}
            </Marker>
            
          ))}
          </>
          </ ZoomableGroup>

    </ComposableMap>

    
      
    )}
    
    {toolTipContent && (
        <div
          style={{
            position: "absolute",
            top: toolTipPosition.y + 10,
            left: toolTipPosition.x + 10,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            fontFamily:"standard",
            color: "#fff",
            padding: "5px",
            borderRadius: "0px",
            pointerEvents: "none", // Prevents blocking interactions
          }}
        >
          {toolTipContent}
        </div>
      )}
    {countryBlogs.length > 0 && !loading && (
        <div className="blog-overlay" ref={containerRef} >
          <div style={{flex: "1"}}>
          <h2 className='blog-header'>{selectedCountry}</h2>
          <BlogPost className="blogs-flex"
            isMap={true} 
            blogs={countryBlogs} 
            user={user} 
            handleDelete={handleDelete}
          />
          </div>
              
        </div>
        
      )}
    
    </>
  );
}

export default Maps;