//import Home from './components/home';
//import PaginaInicio2 from './components/home2';
//import Registro from './components/registro';
//import Login from './components/inicio_sesion';
//import ConfigurarUsuario from './components/configurar_perfil';
//import Reseña from './components/reseña';
//import ReservaEntrenamiento from './components/reserva_entrenamiento';
//import RecuperarContrasena from './components/recuperar_contraseña';


//function App() {
  //return (
   // <>
      //<Home />
      //<Registro />
      //<Login />
      //<PaginaInicio2 />
      //<ConfigurarUsuario />
      //<Reseña />
      //<ReservaEntrenamiento />
     // <RecuperarContrasena />
    //</>
 // );
//}

//export default App;





import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './components/registro';
import Login from './components/inicio_sesion';
import ConfiguracionPerfil from './components/configurar_perfil';
import Reseña from './components/reseña';
import ReservaEntrenamiento from './components/reserva_entrenamiento';
import RecuperarContrasena from './components/recuperar_contraseña';
import Home from './components/home';
import PaginaInicio2 from './components/home2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home2" element={<PaginaInicio2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/configurar" element={<ConfiguracionPerfil />} />
        <Route path="/reseña" element={<Reseña />} />
        <Route path="/entrenamientos" element={<ReservaEntrenamiento />} />
        <Route path="/recuperar" element={<RecuperarContrasena />} />
      </Routes>
    </Router>
  );
}

export default App;
