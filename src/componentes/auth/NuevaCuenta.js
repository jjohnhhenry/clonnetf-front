import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContex';
import authContext from '../../context/auth/authContext';

import mainLogo from '../../assets/netflix.svg';


export const NuevaCuenta = props => {

    //extraer los valores del context Alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, alertaNombre, alertaEmail, alertaPassword, alertaConfirmar, mostrarAlerta, mostrarAlertaNombre, mostrarAlertaEmail, mostrarAlertaPassword, mostrarAlertaConfirmar} = alertaContext;

    //extraer valores del context auth
    const authcontext = useContext(authContext);
    const { mensaje, autenticado, registrarUsuario } = authcontext;

    //UseEffect: Usuario registrado o error en registro, como registro duplicado

    useEffect(() => {
        if(autenticado){
            props.history.push("/");
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg)
        }
      // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //state para inciar sesión
    const [usuario, setUsuario] = useState({
        nombre:"",
        email:"",
        password:"",
        confirmar:""
    });

    const {nombre, email, password, confirmar} = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesión
    const handleLogin = e => {
        e.preventDefault();

        //Validar campos vacíos
        //nombre
        if(nombre.trim() ===""){
            mostrarAlertaNombre("El nombre es obligatorio", "alerta");
        }
        //email
        if(email.trim() ===""){
            mostrarAlertaEmail("El e-mail es obligatorio", "alerta");
        }
        //contraseña
        if(password.trim() ===""){
            mostrarAlertaPassword("La contraseña es obligatorio", "alerta");
        }
        //confirmar
        if(confirmar.trim() ===""){
            mostrarAlertaConfirmar("Confirmar contraseña es obligatorio", "alerta");
        }
        //validar password con mínimo 6 caracteres
        if(password.length > 1 && password.length < 6) {
            mostrarAlertaPassword("La contraseña debe tener al menos 6 caracteres", "alerta");
        }
        //Validar la igualdad de los password
        if(password.length > 1 && password !== confirmar){
            mostrarAlertaConfirmar("Las contraseñas son diferentes", "alerta");
            return;
        }

        //pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }




    return (
        
            <div className="page-login create">
                <div className="section-logo sesionlogo">
                    <Link to={"/login"} className="logo">
                        <img src={mainLogo} className="logo-img" alt="logo"/>
                    </Link>
                    <p className="login-login">Iniciar sesión</p>
                </div>
                <div className="section-login">
                    <div className="login-wrap loginwrap">
                        <div className="login-form"> 
                            <h1>Crea una contraseña para que comiences tu membresía.</h1>
                            <p>Unos pasos más y listo!<br/> Tampoco nos gustan los trámites.</p>
                            {alerta ? <p id="alerta-p-alerta">{alerta.msg}</p> : null}
                            <form onSubmit={handleLogin} className="form">
                                <div className="section-input loginput">                     
                                    <input
                                        className={alertaNombre ? `${alertaNombre.categoria}` : null}
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        placeholder="Tu nombre"
                                        autocomplete="off"
                                        value={nombre}
                                        onChange={handleChange}
                                    />
                                    {alertaNombre ? <p className="alerta-p">{alertaNombre.msg}</p> : null}
                                </div>
                                <div className="section-input loginput">                     
                                    <input
                                        className={alertaEmail ? `${alertaEmail.categoria}` : null}
                                        type="text"
                                        name="email"
                                        id="name"
                                        placeholder="Email"
                                        autocomplete="off"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    {alertaEmail ? <p className="alerta-p">{alertaEmail.msg}</p> : null}
                                </div>
                                <div className="section-input loginput">                 
                                    <input
                                        className={alertaPassword ? `${alertaPassword.categoria}` : null}
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        autocomplete="off"
                                        value={password}  
                                        onChange={handleChange} 
                                    />
                                    {alertaPassword ? <p className="alerta-p">{alertaPassword.msg}</p> : null}
                                </div>
                                <div className="section-input loginput">               
                                    <input
                                        className={alertaConfirmar ? `${alertaConfirmar.categoria}` : null}
                                        type="password"
                                        name="confirmar"
                                        placeholder="Confirma tu contraseña"
                                        autocomplete="off"
                                        value={confirmar}  
                                        onChange={handleChange} 
                                    />
                                    {alertaConfirmar ? <p className="alerta-p">{alertaConfirmar.msg}</p> : null}
                                </div>
                                <button
                                    className="btn-login"
                                    type="submit"
                                >Registrarse</button>
                            </form>
                        </div>
                    </div>
                </div>    
            </div>     
    )
}