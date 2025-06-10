import './BarraLateral.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function BarraLateral() {
  return (
    <>
        <div className="col-2 d-none d-xl-block" id="barraLateral">
            <div className="opciones">
                <div className="menu">
                    <Link to="/usuario"><i className="fa-solid fa-user"><p>Usuario</p></i></Link>
                    <Link to="/curso"><i className="fa-solid fa-layer-group"><p>Cursos</p></i></Link>
                    <Link to="/horario"><i className="fa-solid fa-calendar-days"><p>Horarios</p></i></Link>
                    <Link to="/aula"><i className="fa-solid fa-user-group"><p>Aulas</p></i></Link>
                    <Link to="/noticia"><i className="fa-solid fa-newspaper"><p>Noticias</p></i></Link>
                    <Link to="/"><i className="fa-solid fa-right-to-bracket"><p>Salir</p></i></Link>
                </div>
            </div>
        </div>
    </>
  );
}

export default BarraLateral;