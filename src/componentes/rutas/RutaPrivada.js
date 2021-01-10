import { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

export const RutaPrivada = ({ component: Component, ...props }) => {

    const authcontext = useContext(authContext);
    const { autenticado, cargando, usuarioAutenticado }= authcontext;

    useEffect(() => {
      usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return (
        <Route { ...props } render={ props => !autenticado && !cargando ? (
            <Redirect to="/login" />
        ) : (
            <Component {...props} />
        )} />
            
    );
}
