import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import solicitud from '../../solicitud';

export const TitulosSimilares = ({location}) => {

    const {state} = location;

    const [similares, setSimilares] = useState([]);

  

    //Definiendo la fecha
	//let date = similares.release_date;
	//let d = new Date(date);
	//let year = d.getFullYear();

    useEffect(() => {
     const cargaSimilares = async () => {
        let {results} = await solicitud.getSimilars(state.movie.id);
        setSimilares(results);
     }
     cargaSimilares();

     // eslint-disable-next-line 
    }, [])

   

    //console.log(similares);
    return (
        <div className="row-s">
            <div className="columna1">
                <div className="central">
                    <h3>{state.movie.original_title}</h3>
                        <div className="movie--info">
                            <div className="movie--coincidencia">95% de coincidencia</div>
                            <div className="movie--años">{new Date(state.movie.release_date).getFullYear()}</div>
                            <div className="movie--hd">4k Ultra HD</div>
                            <div className="movie--puntos">{state.movie.vote_average}</div>
                        </div>
                        <div className="similares-length">
                            <p>Más Similares:</p>
                            <p>{similares.length} títulos</p>
                        </div>
                        <div className="return-undo-s">
                            <Link to="/" className="return-undo-a"><i className="fas fa-undo"/> Volver </Link>
                        </div>
                </div>
            </div>
            <div className="columna2">
               
                    
                        {similares.length > 0 && similares.map((result,key)=>(
                            
                            result.backdrop_path &&
                            <div className="container-general" >
                                <div className="container-movie" >
                                    <div className="container-img" key={key}>
                                        <img src={`https://image.tmdb.org/t/p/w400${result.backdrop_path}`} alt={result.original_title} />
                                    </div>
                                    <div className="container-movie-description" >
                                        <h3 className="titulo-movie">{result.title}</h3>
                                        <p className="similar-anios">{new Date(result.release_date).getFullYear()}</p>
                                        <p className="movie--p">{result.vote_average}</p>
                                        <div className="movie--ove-div" >
                                            <p className="movie--ove">{(result.overview).substring(0,200)}...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    
                
            </div>
            
        </div>
    )
}
