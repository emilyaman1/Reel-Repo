// Populates certain details of a movie by taking the id from search and accessing the API

import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import theMovieDb from '../Utils/themoviedb';

function Details() {
    // Uses useState() to change the state of movieDetails to be equal to the parsed data
    const [movieDetails, setMovieDetails] = useState(null);
    // Gets URL
    const location = useLocation();

    //useEffect performs side operations like fetching data
    //Knows only to be used when location.pathname changes
    useEffect(() => {
        // Isolates id number
        const movieId = location.pathname.split('/').pop();
        // Calls API
        theMovieDb.movies.getById({"id": movieId}, detailsSuccess, errorCB);
      }, [location.pathname]);
    

    function detailsSuccess(details) {
        // Passes in the retrieved details to be parsed, uses setMovieDetails to be parsedDetails
        // Now when movieDetails is referenced, it references this JSON data
        const parsedDetails = JSON.parse(details);
        setMovieDetails(parsedDetails);
    }
    function errorCB(error) {
        console.error('Error fetching data:', error);
    } 

    return (
        // movieDetails.original_title: References the JSON file (movieDetails) and finds the entry original_title and retrieves
        <div>
            { movieDetails && (
                <>
                    <h1>{movieDetails.original_title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt="Movie Poster" />
                    <div>{movieDetails.overview}</div>
                </>
            )}
        </div>
    );
}




export default Details;