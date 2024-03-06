import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import theMovieDb from '../Utils/themoviedb';

function Details() {
    const [mediaDetails, setMediaDetails] = useState(null);
    const [mediaType, setMediaType] = useState(""); // Add state to keep track of media type
    const location = useLocation();

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const type = pathParts[pathParts.length - 2]; 
        const mediaId = pathParts.pop(); 
        setMediaType(type); 

        if (type === 'movie') {
            theMovieDb.movies.getById({ "id": mediaId }, detailsSuccess, errorCB);
        } else {
            theMovieDb.tv.getById({ "id": mediaId }, detailsSuccess, errorCB);
        }
    }, [location.pathname]);

    function detailsSuccess(details) {
        const parsedDetails = JSON.parse(details);
        setMediaDetails(parsedDetails);
    }

    function errorCB(error) {
        console.error('Error fetching data:', error);
    }

    return (
        <div>
            {mediaDetails && (
                <>
                    {mediaType === 'movie' ? (
                        <>
                            <h1>{mediaDetails.original_title}</h1>
                            <img src={`https://image.tmdb.org/t/p/w200${mediaDetails.poster_path}`} alt="Movie Poster" />
                            <div>{mediaDetails.overview}</div>
                            <div>Release year: {mediaDetails.release_date.substring(0, 4)}</div>
                            <div>Average Rating: {mediaDetails.vote_average}</div>
                            <div>Genres: {mediaDetails.genres.slice(0, 3).map(genre => genre.name).join(', ')}</div>
                        </>
                    ) : (
                        <>
                            <h1>{mediaDetails.name}</h1>
                            <img src={`https://image.tmdb.org/t/p/w200${mediaDetails.poster_path}`} alt="TV Show Poster" />
                            <div>{mediaDetails.overview}</div>
                            <div>Number of seasons: {mediaDetails.number_of_seasons}</div>
                            <div>Episodes: {mediaDetails.number_of_episodes}</div>
                            <div>Average Rating: {mediaDetails.vote_average}</div>
                            <div>Genres: {mediaDetails.genres.slice(0, 3).map(genre => genre.name).join(', ')}</div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Details;
