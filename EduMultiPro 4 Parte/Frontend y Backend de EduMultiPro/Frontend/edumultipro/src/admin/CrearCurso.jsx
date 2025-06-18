import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearCurso.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function CrearCurso(){
    
    return(
        <>
            <div className='contenedor'>

                {/*---Nav---*/}
                <Encabezado />

                {/*---Desplegable---*/}
                <Desplegable />

                {/*---Article---*/}
                <div className="container-fluid" id="centro1">

                    <div className="row" id='contenido'>

                        {/*---BarraLateral---*/}
                        <BarraLateral />

                        {/*---Tabla---*/}
                        <div className="col-10" id="contenidoTabla">

                            <div className="tituloCrearCurso">
                                <h1>Crear Curso</h1>
                                <Link to={"/Curso"}>
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoCrearCurso">
                    
                                <form method="POST" action="{{ url_for('admin_bp.guardar_curso') }}">
                                    <h3>Datos Curso</h3>
                                    <div class="f1">
                                        <input type="text" name="curso_nombre" placeholder="Nombre del Curso" required></input>
                                    </div>
                                    <div className="f1">
                                        <select nameName="grado_id" required>
                                            <option value="" disabled selected>Selecciona un Grado</option>
                                            {/*-- % for grado in grados % --*/}
                                                <option value="{{ grado.ID }}">grado.Grado_Nombre</option>
                                            {/*-- % endfor % --*/}
                                        </select>
                                        <select name="jornada_id" required>
                                            <option value="" disabled selected>Selecciona una Jornada</option>
                                            {/*-- % for jornada in jornadas % --*/}
                                                <option value="{{ jornada.ID }}">jornada.Jornada_Nombre </option>
                                            {/*-- % endfor % --*/}
                                        </select>
                                    </div>
                                
                                    <button type="submit">Guardar Curso</button>
                                </form>

                            </div>

                        </div>

                    </div>

                </div>

                {/*---Footer---*/}
                <Footer />

            </div>
        </>
    )
}

export default CrearCurso;