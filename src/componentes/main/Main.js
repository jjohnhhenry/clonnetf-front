import { useContext, useEffect, useState } from 'react';
import solicitud from '../../solicitud';
import { Nav } from '../layout/Nav';
import { ListasPeliculas } from '../pelicula/ListasPeliculas';
import { PeliculaMain } from '../pelicula/PeliculaMain';

import peliculasContext from '../../context/peliculasContext';

export const Main = () => {

    //Obtener el state de mas información
	const peliculaContext = useContext (peliculasContext);
	const { informacion } = peliculaContext;

    const [dataMovie, setDataMovie] = useState([]);
    
    const [movie, setMovie] = useState({});
    //estado de géneros que llegan de la api
    const [datosGeneros, setDatosGeneros] = useState([]);

   
    

    useEffect(() => {
        const cargaTodo = async () => {
            let list = await solicitud.getHomeList();
            setDataMovie(list);
            setMovie(list[0].items.results[1]);
        }
        cargaTodo();

        const generos = async () => {
            let genero = [];
            let info =  await solicitud.getGenres();
            genero.push(info);
            setDatosGeneros(genero);
         }
         generos();

    }, [])


    return (
            <>
			    <Nav />

                <PeliculaMain
                    movie={movie}
                    datosGeneros={datosGeneros}
                />

                {
                    informacion
                        ?
                            <div className="page">
                                <div className="lists">
                                    {dataMovie.map((categoria, key)=>(
                                            <ListasPeliculas
                                                key={key}
                                                categoria={categoria}
                                                setMovie={setMovie}
                                            />
                                    ))}
                                </div>
                            </div>
                        :null
                }
                
                
            </>
    )
}
