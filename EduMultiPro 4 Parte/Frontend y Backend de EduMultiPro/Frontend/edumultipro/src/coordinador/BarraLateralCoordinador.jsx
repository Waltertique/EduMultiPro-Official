import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BarraLateralCoordinador() {

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');   // 🧹 Elimina los datos del usuario
    navigate('/');                        // 🔁 Redirige al login
    window.location.reload();             // 🔃 Recarga toda la app (evita "atrás")
  };

  return (
    <>
        <div className="col-2 d-none d-xl-block" id="barraLateral">
            <div className="opciones">
                <div className="menu">
                    <Link to="/PrincipalCoordinador"><i className="fa-solid fa-layer-group"><p>Cursos</p></i></Link>
                    <Link to="/HorarioCoordinador"><i className="fa-solid fa-calendar-days"><p>Horarios</p></i></Link>
                    <Link to="/NoticiaCoordinador"><i className="fa-solid fa-newspaper"><p>Noticias</p></i></Link>
                    <Link to="/PerfilCoordinador"><i className="fa-solid fa-user-group"><p>Perfil</p></i></Link>
                    <button onClick={cerrarSesion} className="btn btn-link salir-link">
                      <i className="fa-solid fa-right-to-bracket"><p>Salir</p></i>
                    </button>
                </div>
            </div>
        </div>
    </>
  );
}

export default BarraLateralCoordinador;