import { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../type';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem("token"),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando:true
    }

    const [ state, dispatch ] = useReducer(authReducer, initialState);

    //Funciones
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post("/api/usuarios", datos);
            console.log(respuesta.data);

            dispatch({
                type:REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            //Obtener el usuario
            usuarioAutenticado();

        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta"
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem("token");
        if(token) {
            //console.log("este es el token: "+token);
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get("/api/auth");
            //console.log(respuesta);
            dispatch({
                type:OBTENER_USUARIO,
                payload:respuesta.data.usuario
            })
            
        } catch (error) {
            console.log(error.response);
            dispatch({
                type:LOGIN_ERROR
            })

        }
    }

    //Cuando el usuario inicie sesión
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post("/api/auth", datos);
            dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data
            })
            
            //Obtener usuario
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta"
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION,
        })
    }

    return (
        <authContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                cargando:state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;