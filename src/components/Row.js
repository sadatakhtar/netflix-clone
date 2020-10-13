import React, { useEffect, useState } from 'react';
import axios from '../axios';
import requests from '../requests';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}){
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");


    useEffect(() => {
        async function fetchData(){
            const requests = await axios.get(fetchUrl);
            setMovies(requests.data.results);
            
            return requests;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            
            autoplay: 1
        },
    }

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");

        }else{
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams( new URL(url).search);
               setTrailerUrl(urlParams.get('v'));

            })
            .catch(error => console.log(error));
        }

    }

   
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => {
                  return  <img 
                            onClick={() => handleClick(movie)}
                            className={`row_poster ${isLargeRow && "row_posterLarge" }`}
                            key={movie.id} 
                            src={`${baseUrl}${isLargeRow ?  movie.poster_path : movie.backdrop_path}`} 
                            alt={movie.name}
                            
                            />
                })}
               
                
            </div>
            {trailerUrl && <YouTube videoId="https://youtu.be/t7VIuNqehls" opts={opts} />}
        </div>
    )
}

export default Row;