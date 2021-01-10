import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import peliculasContext from '../../context/peliculasContext'; 
import mainLogo from '../../assets/netflix.svg'

export const Nav = () => {

	//extraer valores del context auth
    const authcontext = useContext(authContext);
	const { usuario, usuarioAutenticado, cerrarSesion} = authcontext;

	//Obtener el state de peliculas context
	const peliculaContext = useContext (peliculasContext);
	const {logoutLike, informacionPelicula} = peliculaContext;

	const [divLogout, setDivLogout] = useState(false);


	useEffect(() => {
		usuarioAutenticado();
		// eslint-disable-next-line
	}, [])

	const muestraLogout = () => {
		setDivLogout(true)
		setTimeout(() => {
			setDivLogout(false);
		}, 2500);
	}

	const cierraSesion = () => {
		cerrarSesion();
		logoutLike();
		setDivLogout(false);
		window.location.reload();
	}

    return (
        <header>
			<div className="contenedor">
	            <div className="header-logo">
					<Link to="/">
						<img src={mainLogo} className="logo" alt="netflix"/>
					</Link>
				</div>
				<div className="header-nav">
			        <nav>
						<Link to="/" onClick={()=>informacionPelicula(true)} className="menu activo" >Inicio</Link>
						<Link to="/" className="menu">Series</Link>
						<Link to="/" className="menu">Películas</Link>
						<Link to="/" className="menu">Novedades Populares</Link>
						<Link to="/mi-lista" className="menu">Mi Lista</Link>
					</nav>
				</div>
				<div className="header-user"onMouseOver={muestraLogout}>
					{usuario ? <p className="header-user-p" >Hola {usuario.nombre}<i className="fas fa-angle-down"></i></p> : null}
				</div>
				{divLogout ?
					<>
					<i className="fas fa-caret-up"></i>
					<div className="header-user-logout">
						<p onClick={cierraSesion} >Cerrar sesión en Netflix</p>
					</div>
					</>
					:null
				}
			</div>
	    </header>
    )
}
