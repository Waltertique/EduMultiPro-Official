import './css/NavAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavAlumno() {

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');   // 🧹 Elimina los datos del usuario
    navigate('/');                        // 🔁 Redirige al login
    window.location.reload();             // 🔃 Recarga toda la app (evita "atrás")
  };

  return (
    <>  
        <div className="row d-none d-xl-flex" id="navegadorAlumno">
                
                <div className="col-xl-4"></div>
                <div className="col-xl-1"><Link to={"/PrincipalAlumno"}><button>INICIO</button></Link></div>
                <div className="col-xl-1"><Link to={"/NoticiaAlumno"}><button>NOTICIAS</button></Link></div>
                <div className="col-xl-1"><Link to={"/HorarioAlumno"}><button>HORARIOS</button></Link></div>
                <div className="col-xl-1"><Link to={"/ClaseAlumno"}><button>CLASES</button></Link></div>
                <div className="col-xl-1"><Link to={"/PerfilAlumno"}><button>USUARIO</button></Link></div>
                <div className="col-xl-1"><button onClick={cerrarSesion}>Salir</button></div>

        </div>
    </>
  );
}

export default NavAlumno;