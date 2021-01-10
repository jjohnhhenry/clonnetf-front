import { MOSTRAR_ALERTA,
    MOSTRAR_ALERTA_NOMBRE,
    MOSTRAR_ALERTA_EMAIL,
    MOSTRAR_ALERTA_PASSWORD,
    MOSTRAR_ALERTA_CONFIRMAR,
    OCULTAR_ALERTA
} from '../../type';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type){
        case MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            }
        case MOSTRAR_ALERTA_NOMBRE:
                return {
                    ...state,
                    alertaNombre: action.payload
                }
        case MOSTRAR_ALERTA_EMAIL:
            return {
                ...state,
                alertaEmail: action.payload
            }
            case MOSTRAR_ALERTA_PASSWORD:
                return {
                    ...state,
                    alertaPassword: action.payload
                }
            case MOSTRAR_ALERTA_CONFIRMAR:
                    return {
                        ...state,
                        alertaConfirmar: action.payload
                    }
        case OCULTAR_ALERTA:
            return {
                alerta:null,
                alertaEmail:null,
                alertaPassword: null,
                alertaConfirmar:null
            }

        default:
            return state;
    }
}