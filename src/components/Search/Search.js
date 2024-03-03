// Dynamically searches movies as user types, clickable to take to further details
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import theMovieDb from '../Utils/themoviedb';

function Search() {
    const navigate = useNavigate();
    // searchResults is the current state and setSearchResults allows it to update
    const [searchResults, setSearchResults] = useState([]);

    // Event is the onKeyUp, function is called in return part
    function getSearch(event) {
        const query = event.target.value;
        // API call
        theMovieDb.search.getMovie({"query": encodeURIComponent(query)}, successCB, errorCB);
    }

    function successCB(data) {
        // on successful retrieval, data is parsed and searchResults is updated
        const parsedData = JSON.parse(data);
        // Shows max of 5 results
        setSearchResults(parsedData.results.slice(0,5));
    }

    function errorCB(error) {
        console.error('Error fetching data:', error);
    }
    
    // onKeyUp calls the function getSearch
    // Unordered list of search results
        // Takes each movie and on click, navigates to the details page for it
    return (
        <div>
            <input id="searchbar" onKeyUp={getSearch} type="text" name="search" placeholder="Search movies"/>
            <ul>
                {searchResults.map(movie => (
                    <li key={movie.id} onClick={()=>navigate(`/details/movieId/${movie.id}`)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;