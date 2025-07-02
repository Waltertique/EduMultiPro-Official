import './css/DesplegableProfesor.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos

function DesplegableProfesor() {
  return (
    <>
        <div className="container-fluid" id="btn1Profesor">
            <div className="row" id="rbtnProfesor">
                <div className="btn-group d-block d-xl-none" role="group" aria-label="Button group with nested dropdown">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="abtn">
                        Opciones
                        </button>
                        <ul className="dropdown-menu">
                        <li><Link to={"/PrincipalProfesor"}><i className="fa-solid fa-user"><p>Inicio</p></i></Link></li>
                        <li><Link to={"/NoticiaProfesor"}><i className="fa-solid fa-layer-group"><p>Noticias</p></i></Link></li>
                        <li><Link to={"/HorarioProfesor"}><i className="fa-solid fa-calendar-days"><p>Horarios</p></i></Link></li>
                        <li><Link to={"/ClaseProfesor"}><i className="fa-solid fa-user-group"><p>Aulas</p></i></Link></li>
                        <li><Link to={"/PerfilProfesor"}><i className="fa-solid fa-newspaper"><p>Usuario</p></i></Link></li>
                        <li><Link to="/"><i className="fa-solid fa-right-to-bracket"><p>Salir</p></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default DesplegableProfesor;