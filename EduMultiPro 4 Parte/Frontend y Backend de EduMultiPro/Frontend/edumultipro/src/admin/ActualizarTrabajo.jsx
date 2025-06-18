import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/ActualizarTrabajo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function ActualizarTrabajo(){

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
                        <div className="col-10" id="contenidoModificarTabla">

                            <Link to={"/Trabajos"}>
                                <button id="salirModificarTabla">Salir</button>
                            </Link>
                            <div className="parte1ModificarTabla">
                                <h1>Modificar Trabajo</h1>
                                <form action="{{ url_for('admin2_bp.guardarCambiosTrabajo') }}" method="POST" enctype="multipart/form-data">
                                <input type="hidden" name="trabajo_id" value="{{ trabajo.ID }}" />
                                <input type="hidden" name="aula_id" value="{{ trabajo.aula_id }}" />

                                <label for="titulo">Título:</label>
                                <input type="text" id="titulo" name="titulo" value="{{ trabajo.Titulo_Trabajo }}" required />

                                <label for="descripcion">Descripción:</label>
                                <textarea id="descripcion" name="descripcion" required> trabajo.Descripcion_Trabajo </textarea>

                                <label for="fecha">Fecha de entrega:</label>
                                <input type="date" id="fecha" name="fecha" value="{{ trabajo.Fecha_Trabajo.strftime('%Y-%m-%d') }}" required />

                                <label>Archivos actuales:</label>

                                {/** 
                                <ul>
                                    {% for archivo in archivos_actuales %}
                                    <li>
                                        <a href="{{ url_for('static', filename=archivo.ruta_archivo) }}" target="_blank">{{ archivo.nombre_original }}</a>
                                        <label>
                                        <input id="check" type="checkbox" name="eliminar_archivos[]" value="{{ archivo.id }}">
                                        Eliminar
                                        </label>
                                    </li>
                                    {% else %}
                                    <li>No hay archivos.</li>
                                    {% endfor %}
                                </ul>
                                */}

                                <label for="archivo">Agregar archivo(s):</label>
                                <input type="file" id="archivoModificarTabla" name="archivo[]" multiple />

                                <button type="submit">Modificar</button>
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
export default ActualizarTrabajo;