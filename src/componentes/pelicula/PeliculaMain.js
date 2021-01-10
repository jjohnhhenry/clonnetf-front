import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import solicitud from '../../solicitud';
import peliculasContext from '../../context/peliculasContext';

import authContext from '../../context/auth/authContext';



export const PeliculaMain = ({movie, datosGeneros}) => {

	//state del video de la pelicula
	const [video, setVideo] = useState({});
	//state para reproducir video
	const [reproducir, setReproducir] = useState(false);
	//state de generos de peliculas
	const [infoGene, setInfoGene] = useState([]);

	const [elenco, setElenco] = useState([]);

	const [like, setLike] = useState(true);

	const [likeChange, setLikeChange] = useState(false);

	//const [likeDslike, setLikeDslike] = useState(null);

	//Guarda el like de la pelicula
	const [menuLike, setMenuLike] = useState(null);

	const [agregada, setAgregada ] = useState(false);

	const [listaMovie, setListaMovie] = useState({});

	//Obtener el state de mas información
	const peliculaContext = useContext (peliculasContext);
	const { informacion, miLista, likesPeliculas, informacionPelicula, likeReferencia, peliReferencia, guardaLike, obtieneLikePelis, actualizaLike, peliculaLista, obtienePelis, eliminaPelis } = peliculaContext;

	//extraer valores del context auth
    const authcontext = useContext(authContext);
	const { usuarioAutenticado} = authcontext;
	
	useEffect(() => {
		usuarioAutenticado();
		// eslint-disable-next-line
	}, [])

	//Definiendo la fecha
	let date = movie.first_air_date ? movie.first_air_date : movie.release_date;
	let d = new Date(date);
	let year = d.getFullYear();


	useEffect(() => {
		//comprobando si regresa el objeto vacío
		if (JSON.stringify(movie)==="{}"){
			return null;
		}else{
			//Obteniendo los géneros de cada pélicula
			let nuevGeneros = datosGeneros[0].genres.filter(genero=>{
				for(let gen of movie.genre_ids){
					if(genero.id === gen){
						return genero.name;
					};
				};
			});

		let infoGene = nuevGeneros.map(item=>item.name);
		setInfoGene(infoGene);
		
		//cargar el trailer
		const cargaVideo = async () => {
				let video = await solicitud.getVideo(movie.id);
				setVideo(video);
			}
		cargaVideo();
		
		//cargar y filrar el elenco
		const cargaCasting = async () => {
			let {credits} = await solicitud.getCasting(movie.id);
			if (!credits) return null;
			let elenco = credits.cast.map(ele=>(ele.name));
			//console.log(elenco);

			if(elenco.length >= 3){
                elenco.splice(3,elenco.length - 3)
                
                setElenco(elenco);
            }
			setElenco(elenco);
			}

			cargaCasting();

	}	
	// eslint-disable-next-line
	}, [movie])

	useEffect(() => {
		if (likesPeliculas){
		let pelis = likesPeliculas.filter(likes=>parseInt(likes.id) === movie.id);
		setMenuLike(pelis[0]);
		}
		
	}, [movie,likesPeliculas])

	useEffect(() => {
	  obtieneLikePelis();
	  // eslint-disable-next-line
    }, [likeReferencia])

	useEffect(() => {
		obtienePelis();
		// eslint-disable-next-line
	}, [peliReferencia])

	useEffect(() => {
		if(miLista){
			let MiLista = miLista.filter(list => parseInt(list.id) === movie.id);
			//console.log(MiLista);
			if(Object.entries(MiLista).length === 0){
				setAgregada(false);
			}else{
				setAgregada(true);
				setListaMovie(MiLista[0]);
			}
		}
	}, [movie, miLista])


	const handleClickInformacion = () => {
		if(informacion){
			informacionPelicula(false);
		}else{
			informacionPelicula(true);
		}
	}

	const handleClickVideo = () => {
		setReproducir(true);
	}

	const handleClickLista = () => {
		if(!agregada){
			peliculaLista({
				id:movie.id,
				url:movie.poster_path
			})
		}else{
			eliminaPelis(listaMovie._id)
		}
	}

	const handleClickLike = () => {
		setLike(false);
		setLikeChange(true);
	}

	const handleClickCambia1 = () => {
		setLikeChange(false);
		//setLikeDslike(true);
		if(!menuLike){
			guardaLike({
				id:movie.id,
				accion:"up"
			});
		}else{
			actualizaLike({
				id:movie.id,
				accion:"up"
			})
		}
	}
	
	const handleClickCambia2 = () => {
		setLikeChange(false);
		//setLikeDslike(false);
		if(!menuLike){
			guardaLike({
				id:movie.id,
				accion:"down"
			});
		}else{
			actualizaLike({
				id:movie.id,
				accion:"down"
			})
		}
	}

	const handleClickRetur = () => {
		setLikeChange(true);
	}


	
    return (
        <div className="pelicula-principal" style={{
			backgroundImage:`linear-gradient(to top, #000 10%, transparent 90%),
							 linear-gradient(to right, #000 10%, transparent 70%),
							 url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
		}}>
			<div className="contenedor">
				<h3 className="titulo">{movie.name?movie.name:movie.title}</h3>
				<div className="movie--info">
				{ menuLike && <i className={`fas fa-thumbs-${menuLike.accion}`}></i>}
					<div className="movie--coincidencia">95% de coincidencia</div>
					<div className="movie--años">{year}</div>
					<div className="movie--hd">4k Ultra HD</div>
					<div className="movie--puntos">{movie.vote_average}</div>
				</div>
				<p className="descripcion">{movie.overview}</p>
				
				{informacion
					?
					<>
						<button 
							className="boton--uno" 
							onClick={handleClickVideo}
						>
							<i className="fas fa-play"></i>Reproducir
						</button>
						<button 
							className="boton" 
							onClick={handleClickInformacion}
						>
							<i className="fas fa-info-circle"></i>Más información
						</button>
					</>
					:null
				}
				{informacion
					?null
					
					:
						<>
							<div className="casting">
								<h4><span>Elenco:</span> {elenco.join(", ")}</h4>
							 	<h4><span>Género:</span> {infoGene.join(", ")}</h4>
							</div>
							<div className="information">
									<p className="information-p" onClick={handleClickLista}><i className={`fas fa-folder-${agregada?"minus":"plus"}`}></i>{agregada?"Quitar de Mi Lista":"Añadir a Mi Lista"}</p>
								{like && !menuLike
									?
									<p className="information-p" onClick={handleClickLike}><i className="fas fa-thumbs-up"></i>Calificar este título</p>
									:
									<div className="like-dslike">
										{likeChange || !menuLike
											?
											<>
												<button className="information-like" onClick={handleClickCambia1}><i className="fas fa-thumbs-up"></i></button>
												<button className="information-dslike" onClick={handleClickCambia2}><i className="fas fa-thumbs-down"></i></button>
											</>
											:
											<p className="information-p" onClick={handleClickRetur}><i className={`fas fa-thumbs-${menuLike.accion}`}></i>Cambiar esta calificación</p>
										}
										
									</div>
								}
								<p className="information-p"><i className="fas fa-play"></i>Reproducir</p>
								<p className="information-p" onClick={()=>informacionPelicula(true)} ><Link
																to={{
																pathname:"/similares",
																state:{movie}
																	}}
															><i class="fas fa-th-large"></i>Más títulos similares</Link></p>
								<p className="information-p"><i class="fas fa-user-friends"></i>Créditos y más info</p>
							</div>
							<div className="return-undo" onClick={handleClickInformacion}><p><i className="fas fa-undo"/> Volver </p></div>
						</>
				}
			</div>
			<div className="desvanecer"></div>
			
		</div>
    )
}
