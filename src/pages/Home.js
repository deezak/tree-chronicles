import React, { useState, useEffect } from 'react'; 
import BigTitle from '../components/BigTitle/BigTitle';
import "./Home.css";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import PlaceCounter from '../components/PlaceCounter/PlaceCounter';

const Home = () => {
  const [uniqueCountryCount, setUniqueCountryCount] = useState(0);
  const [uniqueCityCount, setUniqueCityCount] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getUniqueCounts = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch all documents from the collection
        const blogRef = collection(db, "blogs");
        const querySnapshot = await getDocs(blogRef);

        // Create sets to store unique countries and cities
        const uniqueCountries = new Set();
        const uniqueCities = new Set();

        // Loop through each document and add the country and city to the respective sets
        querySnapshot.forEach((doc) => {
          const country = doc.data().country;
          const city = doc.data().city;
          if (country) {
            uniqueCountries.add(country);
          }
          if (city) {
            uniqueCities.add(city);
          }
        });

        // Update the states with the count of unique countries and cities
        setUniqueCountryCount(uniqueCountries.size);
        setUniqueCityCount(uniqueCities.size);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    getUniqueCounts();
  }, []);

  return (
    <div className="Home-Page" style={{  width:"100vw", display: "flex", flexDirection: "row", textAlign: "left", justifyContent: "space-evenly" }}>
      <BigTitle />
      <PlaceCounter 
        loading={loading} // Pass loading state
        countryCount={uniqueCountryCount} 
        cityCount={uniqueCityCount} 
      />
    </div>
  );
};

export default Home;
