import { Movie } from "@/types/movies";
import StarRating from "../starRatting";
import './index.scss'

export interface Props{
    movie:Movie,
}

export default function Moviecard(props:Props){
    const movie=props.movie;
    return(
          <li key={movie.id} className='movie-card' >
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                >
                </img>
            </div>

                <div className="movie-infos">

                    <p className="movie-title"> 
                    {movie.title}   
                    </p>

                    <StarRating

                        rating={movie.vote_average}
                    
                    />

                <div className="hidden-content">
              
                  <p className="description">
                        {movie.overview.length > 100
                            ? `${movie.overview.substring(0, 100)}...`
                            : movie.overview}
</p>

                    <button className="btn-default">ver mais</button>

                </div>

                </div>

                <p>
                    {movie.vote_average}
                </p>
            </li>
    )
}