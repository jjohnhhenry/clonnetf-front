

export const ListaItem = ({mov}) => {
    console.log(mov);
    return (
            <div className="movie--info-list">
                <img src={`https://image.tmdb.org/t/p/w300${mov.url}`} className="movieRow--lis-middle" alt="lista"/>
            </div>
    )
}
