import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BlogPost from "../components/BlogPost";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

const capitalizeEachWord = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const SearchResult=({ user }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('query');


  useEffect(() => {
    if (searchTerm) {
      const handleSearch = async () => {
        if (searchTerm.trim() === "") {
          toast.error("Please enter a search term");
          return;
        }
    
        setLoading(true);
        searchTerm.toLowerCase();
        try {
          const blogRef = collection(db, "blogs");
          const queries = [
            query(blogRef, where("category", "==", capitalizeEachWord(searchTerm))),
            // query(blogRef, where("city", "==", searchTerm)),
            query(blogRef, where("city", "==", capitalizeEachWord(searchTerm))),
            // query(blogRef, where("country", "==", searchTerm)),
            query(blogRef, where("country", "==", capitalizeEachWord(searchTerm))),
            query(blogRef, where("author", "==", capitalizeEachWord(searchTerm))),
            query(blogRef, where("firstName", "==", capitalizeEachWord(searchTerm))),
            query(blogRef, where("lastName", "==", capitalizeEachWord(searchTerm))),

            // query(blogRef, where("description", "array-contains", searchTerm)),
            query(blogRef, where("tags", "array-contains", searchTerm)),
            query(blogRef, where("title", "==", searchTerm)) // For partial match in title
          ];
        //INCLUDE SEARCH BY DATE
    
        // Execute all queries in parallel
        const results = await Promise.all(queries.map(q => getDocs(q)));
    
        // Combine and deduplicate results
        const combinedResults = results.flatMap(snapshot =>
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ).filter((value, index, self) =>
          index === self.findIndex((t) => t.id === value.id) // Deduplicate
        );
    
        // if (combinedResults.length === 0) {
        //   toast.info("No blogs found matching your search criteria");
        // }
        setSearchResults(combinedResults);
        } catch (error) {
          console.error("Error searching blogs: ", error);
          toast.error("Error searching blogs. Please try again.");
        }
    
        setLoading(false);
      };
      handleSearch(searchTerm);
      console.log("search term is: " + searchTerm);
    }
  }, [searchTerm]);

  

  return (
    <div className="search-results">
      <h1 className="search-results-header">Search Blogs</h1>
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category, city, country, tags, or title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div> */}

      <div className="search-results">
        {loading ? (
          <div className="blocks-loading">
            <div className="block-loading orange"></div>
            <div className="block-loading blue"></div>
        </div>
        ) : searchResults.length > 0 ? (
          <BlogPost blogs={searchResults} user={user} />
        ) : (
          <>
            {/* <div style={{ color: "whitesmoke" }}>No results found</div> */}
            <img src="./server-trans-white.png" alt="No Results Found" className="mx-server"></img>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
