import { useEffect, useContext } from 'react';
import peliculasContext from '../../context/peliculasContext';


export const PeliculasItems = ({result, setMovie}) => {

    //Obtener el state de mas información
	const peliculaContext = useContext (peliculasContext);
	const { mostrarCreditos } = peliculaContext;

    useEffect(() => {
       setMovie(result)
       // eslint-disable-next-line
    }, [result])

    const handleClick = () => {
        setMovie(result);
        mostrarCreditos(result);
        window.scrollTo(0, 3);
    }

    return (
        <div className="movieRow--item">
             <img src={`https://image.tmdb.org/t/p/w300${result.poster_path}`} alt={result.original_title} onClick={ handleClick }/>
        </div>
    )
}