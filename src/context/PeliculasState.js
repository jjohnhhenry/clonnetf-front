
import { useReducer } from 'react';
import peliculasContext from './peliculasContext';
import peliculasReducer from './peliculasReducer';

import clienteAxios from '../config/axios';

import { INFORMACION_PELICULA, 
    MOSTRAR_MILISTA,
    MOSTRAR_CREDITOS,
    //MOSTRAR_PELICULA,
    //PELICULAS_LIKE,
    LIKES_PELICULAS,
    LIKE_REFERENCIA,
    PELI_REFERENCIA,
    LOGOUT_LIKE 
} from '../type'

const PeliculasState = props => {

    const initialState = {
        informacion:true,
        miLista : [],
        movieCredits:{},
        peliculaLike:null,
        likesPeliculas:null,
        likeReferencia:null,
        peliReferencia:null
    }


    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(peliculasReducer, initialState);

    const informacionPelicula = estado => {
        dispatch ({
            type:INFORMACION_PELICULA,
            payload:estado
        })
    }

    const mostrarCreditos = movie => {
        dispatch({
        type:MOSTRAR_CREDITOS,
        payload:movie
        })
    }

    //const peliculasLike = movieId => {
      //  dispatch({
        //    type:PELICULAS_LIKE,
          //  payload:movieId
       // })
    //}

    //guarda el like de la pelicula
    const guardaLike = async movieId => {
        try {
            const respuesta = await clienteAxios.post("api/peliculas",movieId);
            dispatch({
                type:LIKE_REFERENCIA,
                payload:movieId
            })
            console.log(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    }

     //obtiene los likes de la peliculas
     const obtieneLikePelis = async () => {
         try {
             const respuesta = await clienteAxios.get("api/peliculas");
             dispatch({
                 type:LIKES_PELICULAS,
                 payload:respuesta.data.peliculaslike
             })
             
         } catch (error) {
             console.log(error);
         }
     }

     //actualiza los likes de las peliculas
     const actualizaLike = async datos => {
        try {
            const respuesta = await clienteAxios.put("api/peliculas",datos);
            dispatch({
                type:LIKE_REFERENCIA,
                payload:datos
            })
            console.log(respuesta);
        } catch (error) {
            console.log(error.response);
        }
     }

     //guarda la pelicula en mi lista
     const peliculaLista = async datos => {
         try {
             const respuesta = await clienteAxios.post("/api/listas", datos);
             dispatch({
                 type:PELI_REFERENCIA,
                 payload:datos
             })
         } catch (error) {
             console.log(error.response);
         }
     }

     //Obtener las peliculas de Mi Lista
     const obtienePelis = async () => {
         try {
            const respuesta = await clienteAxios.get("/api/listas");
            dispatch({
                type:MOSTRAR_MILISTA,
                payload:respuesta.data.listas
            })
         } catch (error) {
             console.log(error.response);
         }
     }

     //Elimina peli de lista
     const eliminaPelis = async movieId => {
         try {
             const respuesta = await clienteAxios.delete(`/api/listas/${movieId}`);
             dispatch({
                type:PELI_REFERENCIA,
                payload:movieId
            })
             console.log(respuesta);
         } catch (error) {
             console.log(error.response);
         }
     }

     //cerrar sesión
     const logoutLike = () => {
        dispatch({
            type: LOGOUT_LIKE,
        })
    }

    return (
        <peliculasContext.Provider
                value={{
                    informacion:state.informacion,
                    miLista:state.miLista,
                    movieCredits:state.movieCredits,
                    peliculaLike:state.peliculaLike,
                    likesPeliculas:state.likesPeliculas,
                    likeReferencia:state.likeReferencia,
                    peliReferencia: state.peliReferencia,
                    informacionPelicula,
                    mostrarCreditos,
                    guardaLike,
                    obtieneLikePelis,
                    actualizaLike,
                    peliculaLista,
                    obtienePelis,
                    eliminaPelis,
                    logoutLike
                }}
        >
            {props.children}
        </peliculasContext.Provider>
    )
}

export default PeliculasState;
