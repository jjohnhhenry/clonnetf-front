import { INFORMACION_PELICULA, 
    MOSTRAR_MILISTA,
    MOSTRAR_CREDITOS,
    //MOSTRAR_PELICULA,
    PELICULAS_LIKE,
    LIKES_PELICULAS,
    LIKE_REFERENCIA,
    PELI_REFERENCIA,
    LOGOUT_LIKE
 } from '../type'

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {

        case INFORMACION_PELICULA:
            return {
                ...state,
                informacion:action.payload
            }
        case MOSTRAR_MILISTA:
            return {
                ...state,
                miLista:action.payload,
            }
        case MOSTRAR_CREDITOS:
            return {
                ...state,
                movieCredits:action.payload
            }
        case PELICULAS_LIKE:
            return {
                ...state,
                peliculaLike:action.payload
            }
        case LIKES_PELICULAS:
            return {
                ...state,
                likesPeliculas:action.payload
            }
        case LIKE_REFERENCIA:
            return {
                ...state,
                likeReferencia:action.payload
            }
        case PELI_REFERENCIA:
            return {
                ...state,
                peliReferencia:action.payload
            }
        case LOGOUT_LIKE:
            return {
                ...state,
                likesPeliculas:null
            }
        default:
            return state;
    }
}