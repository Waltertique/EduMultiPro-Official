import './BarraLateral.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos

function BarraLateral() {
  return (
    <>
        <div className="col-2 d-none d-xl-block" id="barraLateral">
            <div className="opciones">
                <div className="menu">
                    <a href="{{ url_for('admin_bp.usuario') }}"><i className="fa-solid fa-user"><p>Usuario</p></i></a>
                    <a href="{{ url_for('admin_bp.curso') }}"><i className="fa-solid fa-layer-group"><p>Cursos</p></i></a>
                    <a href="{{ url_for('admin_bp.horario') }}"><i className="fa-solid fa-calendar-days"><p>Horarios</p></i></a>
                    <a href="{{ url_for('admin_bp.aula') }}"><i className="fa-solid fa-user-group"><p>Aulas</p></i></a>
                    <a href="{{ url_for('admin_bp.noticia') }}"><i className="fa-solid fa-newspaper"><p>Noticias</p></i></a>
                    <a href="{{ url_for('admin_bp.login') }}"><i className="fa-solid fa-right-to-bracket"><p>Salir</p></i></a> 
                </div>
            </div>
        </div>
    </>
  );
}

export default BarraLateral;