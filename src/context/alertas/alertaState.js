import { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContex'
import { MOSTRAR_ALERTA,
    MOSTRAR_ALERTA_NOMBRE,
    MOSTRAR_ALERTA_EMAIL,
    MOSTRAR_ALERTA_PASSWORD,
    MOSTRAR_ALERTA_CONFIRMAR,
    OCULTAR_ALERTA
} from '../../type';

const AlertaState = props => {

    const initialState = {
        alerta:null,
        alertaNombre:null,
        alertaEmail:null,
        alertaPassword:null,
        alertaConfirmar:null
    }

    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    //Funciones
    const mostrarAlerta = (msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg
            }
        });

        setTimeout(()=>{
            dispatch({
                type:OCULTAR_ALERTA
            })

        },5000);
    }

    const mostrarAlertaNombre = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA_NOMBRE,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(()=>{
            dispatch({
                type:OCULTAR_ALERTA
            })

        },5000);
    }

    const mostrarAlertaEmail = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA_EMAIL,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(()=>{
            dispatch({
                type:OCULTAR_ALERTA
            })

        },5000);
    }

    const mostrarAlertaPassword = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA_PASSWORD,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(()=>{
            dispatch({
                type:OCULTAR_ALERTA
            })

        },5000);
    }

    const mostrarAlertaConfirmar = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA_CONFIRMAR,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(()=>{
            dispatch({
                type:OCULTAR_ALERTA
            })

        },5000);
    }

    return (
        <alertaContext.Provider
                value={{
                    alerta:state.alerta,
                    alertaNombre:state.alertaNombre,
                    alertaEmail:state.alertaEmail,
                    alertaPassword:state.alertaPassword,
                    alertaConfirmar: state.alertaConfirmar,
                    mostrarAlerta,
                    mostrarAlertaNombre,
                    mostrarAlertaEmail,
                    mostrarAlertaPassword,
                    mostrarAlertaConfirmar
                }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;