import React, {useState, useEffect, useRef} from "react";
import './Maps.css';
import { collection, deleteDoc, doc, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import  countryData  from '../assets/mapJson/countries.json';
import  cityData  from '../assets/mapJson/cities.json';
import { ComposableMap,ZoomableGroup,Geographies,Geography,Marker } from "react-simple-maps"
import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";
import BlogPost from "../components/BlogPost";
import { toast } from "react-toastify";
import useWindowSize from '../components/useWindowSize';
import rip4Image from '../assets/images/rip4.png';

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
  const [hoveredBlogId, setHoveredBlogId] = useState(null);

  const projection = () => {
    const dims = setMapDimensions();
    return geoTimes()
      .translate([dims.width / 2, dims.height / 2])
      .scale(Math.min(dims.width, dims.height) * 1.15);
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


  // const getCountryBlogs= useCallback(async () => {
  //   // setLoading(true);
  //   try {
  //     const first = query(collection(db, "blogs"),
  //                   where("country", "==", selectedCountry));
  //     const docSnapshot = await getDocs(first);
  //     setCountryBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //     // setCountryCount(docSnapshot.size);
  //     // setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
  //   } catch (error) {
  //     console.error("Error getting country blogs: ", error);
  //   }
  //   // setLoading(false);
  // }, [selectedCountry]);

  //ON COUNTRY CLICK, IF BLOGS EXIST LIST AND PUT CITY MARKERS
  const getCountryZoom = (geo) => {
    const path = geoPath().projection(projection());
    const bounds = path.bounds(geo);
    const width = bounds[1][0] - bounds[0][0];
    const height = bounds[1][1] - bounds[0][1];
    const mapWidth = setMapDimensions().width;
    const mapHeight = setMapDimensions().height;
    const estimatedZoom = Math.min(
      mapWidth / (width * 0.8 || 1),
      mapHeight / (height * 0.8 || 1)
    );

    return Math.min(18, Math.max(3.5, estimatedZoom * 1.5));
  };

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.name;
    const countryEntry = countryData.find((country) => country.name === countryName);
    setSelectedCountry(countryName);

    if (countryEntry) {
      setCenter([Number(countryEntry.longitude), Number(countryEntry.latitude)]);
    } else {
      setCenter([10, 30]);
    }

    const countryHasBlogs = markers.some((marker) => getCountryName(marker) === countryName);
    if (countryHasBlogs) {
      setZoom(getCountryZoom(geo));
    } else {
      setZoom(2);
    }
  };
  // Fetch the country list once when the component mounts
  useEffect(() => {
    setLoading(true);
    const getCountryList = async () => {
    try {
      const blogRef = collection(db, "blogs");
      const first = query(blogRef);
      const docSnapshot = await getDocs(first);
      // lat: latLong.find(c => c.name === doc.data().country).latitude,
      // long: latLong.find(c => c.name === doc.data().country).longitude
      
      setMarkers(docSnapshot.docs.map((doc) => {
        const blogData = doc.data();
        const countryName = blogData.country?.name || blogData.country;
        const country = countryData.find((entry) => entry.name === countryName);

        return {
          ...blogData,
          id: doc.id,
          country: blogData.country,
          size: 12,
          city: blogData.city,
          lat: country ? Number(country.latitude) : 0,
          long: country ? Number(country.longitude) : 0,
        };
      }));
      // setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error("Error getting country list: ", error);
      setLoading(false);
    }
  };
    getCountryList();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setCountryBlogs([]);
      return;
    }

    const blogsForCountry = markers
      .filter((marker) => getCountryName(marker) === selectedCountry)
      .map((marker) => ({
        ...marker,
        ...(marker.country?.name ? { country: { name: marker.country.name } } : {}),
      }));

    setCountryBlogs(blogsForCountry);
  }, [markers, selectedCountry]);

  const getCountryName = (marker) => marker.country?.name || marker.country || marker.countryName || "";

  const getSelectedCountryGeometry = (countryName) => {
    const geography = (window.__mapGeographies || []).find((geo) => geo.properties.name === countryName);
    return geography || null;
  };

  const getGeoArea = (geo) => {
    const path = geoPath().projection(projection());
    const bounds = path.bounds(geo);
    return (bounds[1][0] - bounds[0][0]) * (bounds[1][1] - bounds[0][1]);
  };

  const getCountryCoordinates = (countryName) => {
    const country = countryData.find((entry) => entry.name === countryName);
    if (!country) return { lat: 0, long: 0 };

    return {
      lat: Number(country.latitude),
      long: Number(country.longitude),
    };
  };

  const getMarkerCoordinates = (marker) => {
    const countryName = getCountryName(marker);
    const countryCoords = getCountryCoordinates(countryName);

    if (!marker.city) {
      return countryCoords;
    }

    const city = cityData.find((entry) =>
      entry.country_name === countryName && entry.name.toLowerCase() === marker.city.toLowerCase()
    );

    if (!city) {
      return countryCoords;
    }

    return {
      lat: Number(city.latitude),
      long: Number(city.longitude),
    };
  };

  const displayMarkers = (() => {
    const groupedByCountry = {};

    markers.forEach((marker) => {
      const countryName = getCountryName(marker);
      if (!groupedByCountry[countryName]) {
        groupedByCountry[countryName] = {
          ...marker,
          ...getCountryCoordinates(countryName),
          city: null,
          size: 5,
          countryName,
        };
      }
    });

    if (!selectedCountry) {
      return Object.values(groupedByCountry);
    }

    const selectedCountryMarkers = markers.filter((marker) => getCountryName(marker) === selectedCountry);
    if (selectedCountryMarkers.length === 0) {
      return Object.values(groupedByCountry);
    }

    const selectedCountryCityMarkers = {};
    const selectedCountryGeo = getSelectedCountryGeometry(selectedCountry);
    const selectedCountryArea = selectedCountryGeo ? getGeoArea(selectedCountryGeo) : 0;

    selectedCountryMarkers.forEach((marker) => {
      const cityKey = (marker.city || "default").trim().toLowerCase();
      if (!selectedCountryCityMarkers[cityKey]) {
        const baseSize = selectedCountryArea < 200000 ? 4 : 5;
        selectedCountryCityMarkers[cityKey] = {
          ...marker,
          ...getMarkerCoordinates(marker),
          size: baseSize,
          blogs: selectedCountryMarkers.filter((entry) => {
            const entryCityKey = (entry.city || "default").trim().toLowerCase();
            return entryCityKey === cityKey;
          }),
        };
      }
    });

    return [
      ...Object.values(groupedByCountry).filter((countryMarker) => getCountryName(countryMarker) !== selectedCountry),
      ...Object.values(selectedCountryCityMarkers),
    ];
  })();

  const hoveredBlog = selectedCountry && hoveredBlogId
    ? displayMarkers.find((marker) => {
        const markerCountry = getCountryName(marker);
        if (markerCountry !== selectedCountry) return false;
        const markerId = marker.id || marker.blogs?.[0]?.id || `${marker.country?.name || marker.country}-${marker.lat}-${marker.long}`;
        return markerId === hoveredBlogId;
      }) || null
    : null;

  // useEffect(() => {
  //   if (selectedCountry) {
  //     getCountryBlogs();
  //   }
  // }, [selectedCountry, getCountryBlogs]);

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
      <div className="blocks-loading" style={{transform: "scale(1.3)"}}>
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
          <ZoomableGroup zoom={defaultZoom} center={defaultCenter} onMoveEnd={handleMoveEnd} >
          {/* {position => ( */}
          {/* <> */}
          {/* console.log("POSITION "+ position.k);
          console.log("SCALE "+ 1/position.k); */}
        
              <Geographies geography="/worldMap.json">
            {({ geographies }) => {
              if (typeof window !== 'undefined') {
                window.__mapGeographies = geographies;
              }

              return geographies.map((geo) => (
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
              ));
            }}
          </Geographies>
          
            
          {displayMarkers.map(({ size, country, lat, long, id, blogs, countryName }, index) => {
            const markerId = id || (blogs && blogs[0]?.id) || `${country?.name || country}-${index}`;
            const isActive = hoveredBlogId === markerId;
            const isSelectedCountryMarker = selectedCountry && (getCountryName({ country, countryName }) === selectedCountry);

            return (
              <Marker key={`${country?.name || country}-${index}`} coordinates={[long, lat]}>
                <g transform={`translate(${-size / 2}, ${-size / 2})`}>
                  <image
                    href={"./star-yellow.png"}
                    width={size}
                    height={size}
                    onMouseEnter={() => {
                      if (selectedCountry && isSelectedCountryMarker) {
                        setHoveredBlogId(markerId);
                      } else {
                        setHoveredBlogId(null);
                      }
                    }}
                    onMouseLeave={() => setHoveredBlogId(null)}
                    onMouseMove={() => {
                      if (selectedCountry && isSelectedCountryMarker) {
                        setHoveredBlogId(markerId);
                      }
                    }}
                    style={{
                      cursor: "pointer",
                      opacity: hoveredBlogId && !isActive ? 0.45 : 1,
                      pointerEvents: "all",
                    }}
                  />
                </g>
              </Marker>
            );
          })}
          {/* </> */}
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
    {hoveredBlog && selectedCountry && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: "24px",
            transform: "translateX(-50%)",
            width: "min(420px, 82vw)",
            zIndex: 30,
            color: "#1d1d1d",
            pointerEvents: "none",
            fontFamily: "standard",
            filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.12))",
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundImage: `url(${rip4Image})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "0px",
              overflow: "visible",
              minHeight: "120px",
              width: "115%",
              maxWidth: "115%",
              padding: "0",
            }}
          >
            <div style={{ display: "flex", minHeight: "120px", position: "relative", zIndex: 1, height: "100%", alignItems: "center" }}>
              {hoveredBlog.imgUrls && hoveredBlog.imgUrls[0] && (
                <img
                  src={hoveredBlog.imgUrls[0]}
                  alt={hoveredBlog.title}
                  style={{ width: "140px", height: "100%", objectFit: "cover", flexShrink: 0 }}
                />
              )}
              <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "12px 14px 10px", maxWidth: "calc(100% - 140px)", justifyContent: "center", width: "100%", minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "6px", width: "90%", maxWidth: "900%" }}>
                  <div style={{ fontFamily: "cutout", fontSize: "1.05rem", textTransform: "uppercase", lineHeight: 1.2, maxWidth: "calc(100% - 90px)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{hoveredBlog.title}</div>
                  <div style={{ fontSize: "0.7rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "90px" }}>{hoveredBlog.category}</div>
                </div>
                <div style={{ fontSize: "0.72rem", opacity: 0.8, marginBottom: "8px", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
                  {hoveredBlog.city || selectedCountry}
                </div>
                <div style={{ fontSize: "0.72rem", opacity: 0.75, marginBottom: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
                  {hoveredBlog.timestamp && hoveredBlog.timestamp.toDate ? hoveredBlog.timestamp.toDate().toDateString().substring(4) : "Recent trip"}
                </div>
                {hoveredBlog.tags && hoveredBlog.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto", maxWidth: "100%", overflow: "hidden" }}>
                    {hoveredBlog.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={`${tag}-${idx}`}
                        style={{
                          background: "rgba(0,0,0,0.08)",
                          padding: "4px 7px",
                          fontSize: "0.62rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          borderRadius: "12px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    
    </>
  );
}

export default Maps;