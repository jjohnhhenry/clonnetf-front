import { useState } from "react";
import { PeliculasItems } from "./PeliculasItems";



export const ListasPeliculas = ({categoria, setMovie}) => {

    const {title, items} = categoria;
    //console.log(categoria);

    const [scroll, setScroll] = useState(0);

    const handleIzquierda = () => {

        let dato = scroll + 200;
        if(dato > 0){
            dato = 0;
        }
        setScroll(dato);
    }

    const handleDerecha = () => {
        let dato = scroll - 200;
        let anchoCarrusel = items.results.length*150;
        if((window.innerWidth - anchoCarrusel)>dato){
            dato = (window.innerWidth - anchoCarrusel)-60
        }
        setScroll(dato);
    
    }
    
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft:scroll,
                    width:items.results.length*150
                }}>
                <button className="flecha-izquierda" onClick={handleIzquierda}><i className="fas fa-angle-left"></i></button>
                    {items.results.length > 0 && items.results.map((result,key)=>(
                        <PeliculasItems
                            key={key}
                            result={result}
                            setMovie={setMovie}
                        />
                    )) }
                    <button className="flecha-derecha" onClick={handleDerecha}><i className="fas fa-angle-right"></i></button>
                </div>
            </div>
        </div>
    )
}
