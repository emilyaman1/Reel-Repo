// Dynamically searches movies as user types, clickable to take to further details
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import theMovieDb from '../Utils/themoviedb';

function Search() {
    const navigate = useNavigate();
    // searchResults is the current state and setSearchResults allows it to update
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType ] = useState('movie');

    // Event is the onKeyUp, function is called in return part
    function getSearch(event) {
        const query = event.target.value;
    // API call only if the query is not empty
    if (query.trim() !== '') {
        if (searchType === 'movie') {
            theMovieDb.search.getMovie({ "query": encodeURIComponent(query) }, successCB, errorCB);
        } else if (searchType === 'tv') {
            theMovieDb.search.getTv({ "query": encodeURIComponent(query) }, successCB, errorCB);
        } else if (searchType === 'person') {
            theMovieDb.search.getPerson({ "query": encodeURIComponent(query) }, successCB, errorCB);
        }
    } else {
        // If the query is empty, clear the search results
        setSearchResults([]);
    }
    }
    
    function handleSearchType(event) {
        setSearchType(event.target.value);
    }

    function successCB(data) {
        // on successful retrieval, data is parsed and searchResults is updated
        const parsedData = JSON.parse(data);
        // Shows max of 5 results
        if (parsedData.results && parsedData.results.length > 0) {
            if (searchType == 'person') {
                setSearchResults(parsedData.results[0].known_for.slice(0,5));
            }
            else{
                setSearchResults(parsedData.results.slice(0,5));
            }
        }
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
            <select value={searchType} onChange={handleSearchType}>
                <option value="movie">Movie</option>
                <option value="tv">TV Show</option>
                <option value="person">Person</option>
            </select>
            <ul>
                {searchResults.map(result => (
                    searchType === 'person' ? (
                    <li key={result.id} onClick={()=>navigate(`/details/${result.media_type}/${result.id}`)}>
                        {result.media_type === 'tv' ? result.name : result.title }
                    </li>
                    ) : (
                        <li key={result.id} onClick={()=>navigate(`/details/${searchType}/${result.id}`)}>
                            {searchType === 'tv' ? result.name : result.title }
                    </li>
                    )
            ))}
                 
            </ul>
        </div>
    );
}

export default Search;