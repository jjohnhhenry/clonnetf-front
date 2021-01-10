import { ListaItem } from "./ListaItem"
import { Nav } from "./Nav";
import peliculasContext from '../../context/peliculasContext';
import authContext from '../../context/auth/authContext'
import { useContext, useEffect } from "react";


export const MiList = () => {

    //extraer valores del context auth
    const authcontext = useContext(authContext);
	const { usuarioAutenticado } = authcontext;

    //Obtener el state de mi Lista
	const peliculaContext = useContext (peliculasContext);
    const { miLista, peliReferencia, obtienePelis } = peliculaContext;

    useEffect(() => {
        usuarioAutenticado();
        obtienePelis();
        // eslint-disable-next-line
	}, [peliReferencia])
    

    return (
        <>
            <Nav />
            <div className="pelicula-principal">
			    <div className="contenedor">
                    <h3 className="titulo">Mi Lista</h3>
                    <div className="movieRow--listarea">
                        {miLista.map(mov=>(
                            <ListaItem 
                                key={mov._id}
                                mov={mov}
                            />
                        ))}
			         </div>
                </div>
            </div>
        </>
    )
}
