'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss';
import { Movie } from '@/types/movies';
import Moviecard from '../Moviecard';


export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(()=>{
    
        getMovies();

    },[]);

    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'b347189e00929df6a681ae311d287816',
                language: 'pt-BR'
            }
        }).then((response) => {
            console.log(response.data.results);
            setMovies(response.data.results);
            
            
        });
    };


    return (
        <ul className="movie-list">
            {movies.map((movie)=>
                 <Moviecard
                 key={movie.id}
                 movie={movie}
                 
                 />   
                )}
        </ul>
    );
}