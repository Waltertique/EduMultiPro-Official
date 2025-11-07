import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos

function DesplegableCoordinador() {
  return (
    <>
        <div className="container-fluid" id="btn1">
            <div className="row" id="rbtn">
                <div className="btn-group d-block d-xl-none" role="group" aria-label="Button group with nested dropdown">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="abtn">
                        Opciones
                        </button>
                        <ul className="dropdown-menu">
                        <li><Link to="/PrincipalCoordinador"><i className="fa-solid fa-layer-group"><p>Cursos</p></i></Link></li>
                        <li><Link to="/HorarioCoordinador"><i className="fa-solid fa-calendar-days"><p>Horarios</p></i></Link></li>
                        <li><Link to="/NoticiaCoordinador"><i className="fa-solid fa-newspaper"><p>Noticias</p></i></Link></li>
                        <li><Link to="/ReportesCoor"><i className="fa-regular fa-folder-open"><p>Reportes</p></i></Link></li>
                        <li><Link to="/PerfilCoordinador"><i className="fa-solid fa-user-group"><p>Perfil</p></i></Link></li>
                        <li><Link to="/"><i className="fa-solid fa-right-to-bracket"><p>Salir</p></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default DesplegableCoordinador;