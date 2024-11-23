import {useEffect, useState} from 'react';
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import './App.css';

// API Key: 76474c30

const API_URL = "http://www.omdbapi.com?apikey=76474c30";
const App = () =>{

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { 
    searchMovies('Batman');
  }, []);

  const searchMovies = async (title) => {
    console.log("Searching for:", title);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      console.log("API response:", data);
      setMovies(data.Search || []); // Set to an empty array if no results are found
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };
  

  

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
