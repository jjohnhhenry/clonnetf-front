import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContex';
import authContext from '../../context/auth/authContext';

import mainLogo from '../../assets/netflix.svg';
import faceLogo from '../../assets/logo-fb.png';



export const Login = props => {

    //extraer los valores del context Alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, alertaEmail, alertaPassword, mostrarAlerta, mostrarAlertaEmail, mostrarAlertaPassword } = alertaContext;

    //extraer valores del context auth
    const authcontext = useContext(authContext);
    const { mensaje, autenticado, iniciarSesion, usuarioAutenticado } = authcontext;


    //Usuarios loguiandose, alertas y errores
    useEffect(() => {

        usuarioAutenticado()

        if(autenticado){
          props.history.push("/");
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg)
        }
        
        // eslint-disable-next-line
    }, [mensaje, autenticado]);

   

    //state para inciar sesión
    const [usuario, setUsuario] = useState({
        email:"",
        password:""
    });

    const {email, password} = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesión
    const handleLogin = e => {
        e.preventDefault();
        //Validar que no haya campos vacios
        //email
        if(email.trim() ===""){
            mostrarAlertaEmail("El e-mail es obligatorio", "alerta-log");
            return null;
        }
        //contraseña
        if(password.trim() ===""){
            mostrarAlertaPassword("La contraseña es obligatoria", "alerta-log");
            return null;
        }
        //Pasar a iniciar sesión
        iniciarSesion({email, password});
    }


    

    return (
        
            <div className="page-login">
                <div className="section-logo">
                    <Link to={"/login"} className="logo">
                        <img src={mainLogo} className="logo-img" alt="logo"/>
                    </Link>
                </div>
                <div className="section-login">
                    <div className="login-wrap">
                        <div className="login-form"> 
                            <h1>Iniciar sesión</h1>
                            {alerta ? <p id="alerta-p-log-error">{alerta.msg}</p> : null}
                            <form onSubmit={handleLogin} className="form">
                                <div className="section-input">                     
                                    <input
                                        id={alertaEmail ? `${alertaEmail.categoria}` : null}
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        autocomplete="off"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    {alertaEmail ? <p id="alerta-p-log">{alertaEmail.msg}</p> : null}
                                </div>
                                <div className="section-input">
                                                           
                                    <input
                                        id={alertaPassword ? `${alertaPassword.categoria}` : null}
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        autocomplete="off"
                                        value={password}  
                                        onChange={handleChange} 
                                    />
                                    {alertaPassword ? <p id="alerta-p-log">{alertaPassword.msg}</p> : null}
                                </div>
                                <button
                                    className="btn-login"
                                    type="submit"
                                >Iniciar sesión</button>
                                <div className="helper">
                                    <label className="remember">
                                        <input
                                            type="checkbox"
                                            name="recordar"
                                            id="remember"
                                        />Recuérdame
                                    </label>
                                    <p className="help">Necesitas Ayuda?</p>
                                </div>
                                <div className="login-fb">
                                    <img 
                                        src={faceLogo} 
                                        className="logo-fc" 
                                        alt="logo"
                                    />
                                    <p 
                                        className="signFc"
                                    >Iniciar sesión con Facebook</p>
                                </div>
                                <div className="first">
                                        <p>¿Primera vez en Netflix? <Link to={"/nueva-cuenta"} className="join">Suscríbete ya.</Link></p>
                                    <div className="captcha">
                                        <p>Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.<span className="recaptcha"> Más info.</span></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>    
            </div>     
    )
}
