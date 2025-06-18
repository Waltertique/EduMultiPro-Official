import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearHorario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function CrearHorario(){
    
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

                            <div className="tituloCrearHorario">
                                <h1>Crear Horario</h1>
                                <Link to={"/Horario"}>
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoCrearHorario">
                    
                                <form method="POST" action="{{ url_for('admin2_bp.crear_horario') }}" enctype="multipart/form-data">
                                    <input type="text" name="titulo" placeholder="Título del Horario" required></input>
                                    <textarea name="descripcion" placeholder="Descripción del Horario" required></textarea>
                                    <input type="file" name="imagen" accept="image/*"></input>
                                    
                                    {/*-- Selección del Profesor --*/}
                                    <select name="profesor_id">
                                        <option value="" selected>Selecciona un profesor (opcional)</option>
                                        {/*-- % for profesor in profesores % --*/}
                                            <option value="{{ profesor.ID }}">profesor.Nombre_Completo </option>
                                        {/*-- % endfor % --*/}
                                    </select>
                                    
                                    {/*-- Selección del Curso --*/}
                                    <select name="curso_id" id="selecCurso">
                                        <option value="" selected>Selecciona un curso (opcional)</option>
                                        {/*-- % for curso in cursos % --*/}
                                            <option value="{{ curso.ID }}">curso.Curso_Con_Jornada </option>
                                        {/*-- % endfor % --*/}
                                    </select>
                                    
                                    <button type="submit">Crear horario</button>
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

export default CrearHorario;