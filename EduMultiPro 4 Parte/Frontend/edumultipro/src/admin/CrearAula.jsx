import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearAula.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function CrearAula(){
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

                            <div class="tituloCrearAula">
                                <h1>Crear Aula</h1>
                                <Link to={"/Aula"}>
                                    <button class="crear" id="btnAgregarUsuario"> <i class="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div class="contenidoCrearAula">
                    
                                <form method="POST" action="{{ url_for('admin_bp.guardar_aula') }}">
                                    <input type="text" name="aula_nombre" placeholder="Nombre del Aula" required />
                                
                                    <select name="materia_id" required>
                                        <option value="" disabled selected>Seleccione una Materia</option>
                                        {/*-- % for materia in materias % --*/}
                                            <option value="{{ materia.ID }}">materia.Materia_Nombre </option>
                                        {/*-- % endfor % --*/}
                                    </select>
                                
                                    <select name="curso_id" required>
                                        <option value="" disabled selected>Seleccione un Curso</option>
                                        {/*-- % for curso in cursos % --*/}
                                            <option value="{{ curso.ID }}">curso.Curso_Nombre </option>
                                        {/*-- % endfor % --*/}
                                    </select>
                                
                                    <select name="usuario_id" required>
                                        <option value="" disabled selected>Seleccione un Profesor</option>
                                        {/*-- % for profe in profesores % --*/}
                                            <option value="{{ profe.ID }}">profe.Nombre_Completo</option>
                                        {/*-- % endfor % --*/}
                                    </select>
                                
                                    <button type="submit">Guardar Aula</button>
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
export default CrearAula;