const API_KEY = '73097bdebe8f71e33eb75198e674a8d5';
const API_BASE = 'https://api.themoviedb.org/3';


const basicFecth = async (endpoint) =>{
    return (await fetch(`${API_BASE}${endpoint}`)).json();
}
     // eslint-disable-next-line
export default {
     getHomeList : async () =>{
        return [
            {
                title : "Originales de Netflix",
                items : await basicFecth(`/discover/tv/?with_network=213&api_key=${API_KEY}&language=es`)
            },
            {
                title : "Tendencias",
                items : await basicFecth(`/trending/all/week?language=es&api_key=${API_KEY}`)
            },
            {
                title : "Más populares",
                items : await basicFecth(`/movie/top_rated?&language=es&api_key=${API_KEY}`)
            },
            {
                title : "Acción",
                items : await basicFecth(`/discover/movie?with_genres=28&language=es&api_key=${API_KEY}`)
            },
            {
                title : "Comedia",
                items : await basicFecth(`/discover/movie?with_genres=35&language=es&api_key=${API_KEY}`)
            },
            {
                title : "Terror",
                items : await basicFecth(`/discover/movie?with_genres=27&language=es&api_key=${API_KEY}`)
            },
            {
                title : "Romance",
                items : await basicFecth(`/discover/movie?with_genres=10749&language=es&api_key=${API_KEY}`)
            },            
            {
                title : "Películas de TV",
                items : await basicFecth(`/discover/movie?with_genres=10770&language=es&api_key=${API_KEY}`)
            },
            {
                title : "Animación",
                items : await basicFecth(`/discover/movie?with_genres=16&language=es&api_key=${API_KEY}`)
            },
            {
                title : "Documentales",
                items : await basicFecth(`/discover/movie?with_genres=99&language=es&api_key=${API_KEY}`)
            },
        ]
     },
     getGenres: async () => {
         return (await fetch(`${API_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`)).json();
     },
     getVideo: async (id) => {
        return (await fetch(`${API_BASE}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)).json();
     },
     getSimilars: async (id) => {
         return (await fetch(`${API_BASE}/movie/${id}/similar?api_key=${API_KEY}&language=en-US`)).json();
     },
     getCasting: async (id) => {
         return (await fetch(`${API_BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`)).json();
     }
}