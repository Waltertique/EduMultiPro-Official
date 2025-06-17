import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerTrabajo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import imgTrabajo from '../assets/f9.png';

function VerTrabajo(){

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
                        <div className="col-10" id="contenidoVerTrabajo">

                            <div class="botonesVerTrabajo">
                                <div className='btn'>
                                    <Link to={"/VerTrabajo"}><button>Instrucciones</button></Link>
                                    <Link to={"/VerTrabajoEntregado"}><button>Ver Subidos</button></Link>
                                </div>
                                <Link to={"/Trabajos"}><button id="equix"><i class="fa-solid fa-x"></i></button></Link>
                            </div>

                            <div class="tituloVerTrabajo">
                                <div>
                                    <img src={imgTrabajo} alt=""></img>
                                    <h1> trabajo.Titulo_Trabajo </h1>
                                </div>
                                <div>
                                    <h4>Fecha de entrega</h4>
                                    <h4>17/89/56</h4>
                                </div>
                            </div>

                            <div class="descripcionVerTrabajo">
                                <h3>Descripcion:</h3>
                                <p> trabajo.Descripcion_Trabajo </p>

                                {/*-- % for archivo in archivos % --*/}
                                <div class="enlace">
                                    <a href="{{ url_for('static', filename=archivo.ruta_archivo) }}" target="_blank"> archivo.nombre_original </a>
                                </div>
                                {/*-- % endfor % --*/}
                            </div>

                            <div class="comentariosVerTrabajo">
                                <p id="titu">Agregar comentarios</p>

                                <form action="{{ url_for('admin2_bp.comentar_trabajo', trabajo_id=trabajo_id, aula_id=aula_id) }}" method="POST">
                                <input name="comentario" placeholder="Escribe tu comentario" required />
                                <button type="submit">Comentar</button>
                                </form>

                                {/*-- % for comentario in comentarios_trabajo % --*/}
                                <div class="comentarioVerTrabajo">
                                    <div class="info1">
                                        <div class="foto">
                                            <img src={imgTrabajo} alt="Foto" width="40"></img>
                                            <h1> comentario.Comentador </h1>
                                        </div>
                                        <h2> 76/65/65 </h2>
                                    </div>
                                    <div class="desc">
                                    <p> comentario.comentario </p>
                                    </div>
                                    <form action="{{ url_for('admin2_bp.eliminar_comentario_trabajo', id=comentario.comentario_id, trabajo_id=trabajo_id, aula_id=aula_id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de eliminar este comentario?')">
                                    <button type="submit" id='eliminarVerTrabajo'>Eliminar</button>
                                    </form>
                                </div>
                                {/*-- % endfor % --*/}
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
export default VerTrabajo;