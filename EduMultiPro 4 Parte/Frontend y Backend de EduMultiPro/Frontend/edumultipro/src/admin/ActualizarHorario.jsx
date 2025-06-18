import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/ActualizarHorario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function ActualizarHorario(){
    
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

                            <div className="tituloActualizarHorario">
                                <h1>Modificar Horario</h1>
                                <Link to={"/Horario"}>
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoActualizarHorario">
                    
                                <form method="POST" action="{{ url_for('admin2_bp.guardarHorarioEditado', id=horario['ID']) }}" enctype="multipart/form-data">
                                    <input type="text" name="titulo" value="{{ horario['Titulo_Horario'] }}" required></input>
                                    <textarea name="descripcion" required>'Descripcion_Horario</textarea>

                                    {/*-- % if horario['Imagen_Horario'] % --*/}
                                        <p>Imagen actual:</p>
                                        <img src="{{ '/' + horario['Imagen_Horario'] }}" alt="Imagen actual" width="200"></img>
                                    {/*-- % endif % --*/}
                                
                                    <input type="file" name="imagen" accept="image/*"></input>
                                
                                    <select name="profesor_id">
                                        <option value="">-- Sin profesor --</option>
                                    </select>
                                
                                    <select name="curso_id" id="selecCurso">
                                        <option value="">-- Sin curso --</option>
                                        {/*-- % for curso in cursos % --*/}
                                        {/*-- % endfor % --*/}
                                    </select>
                                
                                    <button type="submit">Guardar cambios</button>
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

export default ActualizarHorario;