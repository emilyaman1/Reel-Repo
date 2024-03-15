import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import theMovieDb from '../Utils/themoviedb';
import './Details.css';
import Button from 'react-bootstrap/Button';

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
                          
                           <div className="movie-details-container">
                <h1>{mediaDetails.original_title}</h1>
                <div className='movie-grid'>
                <img className='poster' src={`https://image.tmdb.org/t/p/w300${mediaDetails.poster_path}`} alt="Movie Poster" />
                <div>
                <Button variant="success">I Watched This!</Button>{' '}
                <Button variant="secondary">Watch Later</Button>
                    <div className='overviewDetails'>{mediaDetails.overview}</div>
                    <div className='details-grid'>
                    <div className='releaseYear'>Release year
                        <p className='releaseYearP'>{mediaDetails.release_date.substring(0, 4)}</p>
                    </div>
                    <div className='rating'>Average Rating
                        <p className='averageVote'>{mediaDetails.vote_average}</p>
                    </div>
                    <div className='genres'>Genres
                        <p className='genresP'>{mediaDetails.genres.slice(0, 3).map(genre => genre.name).join(', ')}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
                        </>
                    ) : (
                        <>
                            <div className="tv-details-container">
    <h1>{mediaDetails.name}</h1>
    <div className="tv-grid">
      <img src={`https://image.tmdb.org/t/p/w200${mediaDetails.poster_path}`} alt="TV Show Poster" />
      <div>
                <Button variant="success">I Watched an Episode!</Button>{' '}
                <Button variant="secondary">Watch Later</Button>
        <div className='tv-overviewDetails'>{mediaDetails.overview}</div>
        <div className='tv-details-grid'>
          <div className='tv-seasonsBox'>Number of seasons
            <p className='tv-seasons'>{mediaDetails.number_of_seasons}</p>
          </div>
         
          <div className='tv-ratingBox'>Average Rating
            <p className='tv-tvRating'>{mediaDetails.vote_average}</p>
          </div>
          <div className='tv-episodesBox'>Episodes
            <p className='tv-episodes'>{mediaDetails.number_of_episodes}</p>
          </div>
          <div className='tv-genresBox'>Genres
            <p className='tv-tvGenres'>{mediaDetails.genres.slice(0, 3).map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Details;
