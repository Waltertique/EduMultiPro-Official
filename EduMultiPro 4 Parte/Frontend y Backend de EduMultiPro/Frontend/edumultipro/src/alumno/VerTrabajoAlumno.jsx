import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/VerTrabajoAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import Imgtrabajo from '../assets/f9.png';
import Imgtrabajo2 from '../assets/f8.png';

function VerTrabajoAlumno(){
    return (
    <>
        <div className='contenedor'>

            {/*---Nav---*/}
            <Encabezado />

            {/*---Desplegable---*/}
            <DesplegableAlumno />

            {/*---Article---*/}
            <div className="container-fluid" id="centroAlumno">

                {/*---navegador alumno---*/}
                <NavAlumno />

                <div class="col-10" id="contenidoTablaVerTrabajoAlumno">
                    <div class="contenido1VerTrabajoAlumno">
                            <div class="ti">
                                <img src={Imgtrabajo} alt=""/> 
                                <h2> trabajo.Titulo_Trabajo</h2>
                            </div>
                            <div class="fecha">
                                <div>
                                    <p>Fecha de Entrega:</p><p> 34/435/454</p>
                                </div>
                                <div>
                                    <p>Nota:</p><p>Sin Nota</p>
                                </div>
                            </div>
                            <div class="descripcion">
                                <h2 id="desc">Descripcion:</h2>
                                <p> trabajo.Descripcion_Trabajo Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quaerat tempora natus at obcaecati beatae fugit enim animi, alias ipsam perferendis aliquam! Fuga assumenda sapiente ut dignissimos voluptatibus animi eius!</p>
                            </div>
                            <div class="adjunto">
                                {/*% for archivo in archivos %*/}
                                <div class="material1">
                                    <a href="{{ url_for('static', filename=archivo.ruta_archivo) }}" target="_blank"> archivo.nombre_original </a>
                                </div>
                                {/*% endfor %*/}
                            </div>
                            <div class="mensaje">
                                <img src={Imgtrabajo2}/>
                                    <input name="comentario" placeholder="Escribe tu comentario" required/>
                                    <button type="submit">Comentar</button>
                            </div>
                            {/*% for comentario in comentarios_trabajo %*/}
                            <div class="comentarioVerTrabajoAlumno">
                                <div class="info1">
                                    <div class="foto">
                                        <img src={Imgtrabajo2} alt="Foto" width="40"/>
                                        <h1> comentario.Comentador </h1>
                                    </div>
                                    <h2> comentario.fecha_comentario </h2>
                                </div>
                                <div class="desc">
                                    <p> comentario.comentario </p>
                                </div>
                                {/*% if comentario.usuario_id == session['usuario_id'] %*/}
                                <form >
                                    <button type="submit">Eliminar</button>
                                </form>
                                {/*% endif %*/}
                            </div>
                            {/*% endfor %*/}
                    </div>
                        <div class="contenido2VerTrabajoAlumno">
                            <div class="subirtr">
                                <h2>Tu trabajo</h2>

                                {/*% if fecha_entrega %*/}
                                    <p>Entregado:fecha_entrega</p>
                                {/*% else %*/}
                                    <p>Entregado: No entregado</p>
                                {/*% endif %*/}
                                
                                {/*% for archivo in archivos_entregados %*/}
                                <div class="mitrabajo">
                                    <a href="" target="_blank">
                                         archivo.nombre_original 
                                    </a>
                                </div>
                                {/*% endfor %*/}
                                
                                {/*% if archivos_entregados %*/}
                                <form>
                                    <button id="cancelar_entrega" type="submit">Cancelar entrega</button>
                                </form>
                                {/*% endif %*/}

                                <form>
                                    <input id="subVerTrabajoAlumno" type="file" name="archivo" required/>
                                    <button type="submit">Subir Archivo</button>
                                </form>
                                
                            </div>
                        </div>
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default VerTrabajoAlumno;