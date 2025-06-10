import './Desplegable.css';

function Desplegable() {
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
                        <li><a><i className="fa-solid fa-user"><p>Usuario</p></i></a></li>
                        <li><a><i className="fa-solid fa-layer-group"><p>Cursos</p></i></a></li>
                        <li><a><i className="fa-solid fa-calendar-days"><p>Horarios</p></i></a></li>
                        <li><a><i className="fa-solid fa-users-rectangle"><p>Aulas</p></i></a></li>
                        <li><a><i className="fa-solid fa-radio"><p>Noticias</p></i></a></li>
                        <li><a><i className="fa-solid fa-right-to-bracket"><p>Salir</p></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Desplegable;