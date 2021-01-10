import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Login } from './componentes/auth/Login';
import { NuevaCuenta } from './componentes/auth/NuevaCuenta';
import { MiList } from './componentes/layout/MiList';
import { Main } from './componentes/main/Main';
import { TitulosSimilares } from './componentes/pelicula/TitulosSimilares';

import AlertaState from './context/alertas/alertaState';
import PeliculasState from './context/PeliculasState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/tokenAuth';
import { RutaPrivada } from './componentes/rutas/RutaPrivada';
//import { RutaLogin } from './componentes/rutas/RutaLogin';



//Revisar si tenemos un token
const token = localStorage.getItem("token");
if(token){
  tokenAuth(token);
}


function App() {

  return (
        <PeliculasState>
          <AlertaState>
          <AuthState>
              <Router>
                <Switch>
                  <Route exact path="/login" component = { Login } />
                  <Route exact path="/nueva-cuenta" component = { NuevaCuenta } />
                  <RutaPrivada exact path="/" component = { Main } />
                  <RutaPrivada exact path="/mi-lista" component = { MiList } />
                  <RutaPrivada exact path="/similares" component = { TitulosSimilares } />
                </Switch>
              </Router>
              </AuthState>
            </AlertaState>
        </PeliculasState>
  );
}

export default App;
