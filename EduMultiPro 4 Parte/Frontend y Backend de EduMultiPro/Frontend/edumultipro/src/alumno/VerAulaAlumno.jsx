import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/VerAulaAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import Imgusuario from '../assets/usuario.png';

function VerAulaAlumno(){
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
                
                <div class="col-10" id="contenidoTablaAulaAlumno">

                    <div class="row" id="navAulaAlumno">

                    <div class="col-12 col-md-2 col-xl-2"><Link to={"/VerAulaAlumno"}><button id="principal">Pricipal</button></Link></div>
                    <div class="col-12 col-md-2 col-xl-2"><Link to={"/TrabajoAlumno"}><button id="trabajo">Trabajos</button></Link></div>
                    <div class="col-12 col-md-2 col-xl-2"><Link to={"/PersonaAlumno"}><button id="persona">Personas</button></Link></div>
                    <div class="col-12 col-md-4 col-xl-4"></div>

                    </div>
                    
                    <div class="row" id="banerAulaAlumno">
                        <div class="row" id="tituloAulaAlumno">
                            <h2> aula'Aula_Nombre'</h2>
                        </div>
                        <div class="row" id="codigoAulaAlumno">
                            <h4> aula'Profesor'</h4>
                        </div>
                    </div>

                    <div class="row" id="novedadAulaAlumno">
                        <div class="col-md-6 col-xl-6"><h2>Novedades</h2></div>
                    </div>

                    {/*% for anuncio in anuncios %*/}
                        <div class="anuncioAulaAlumno">

                            <div class="infoAulaAlumno">
                                <div class="info1">
                                    <div class="foto">
                                        <img class="img-fluid" src={Imgusuario} alt="" id="img1"/>
                                        <h1> anuncio.Profesor </h1>
                                    </div>
                                    <h2> anuncio.Fecha_Anuncio </h2>
                                </div>
                            </div>

                            <div class="descripcionAulaAlumno">
                                <h2> anuncio.Titulo_Anuncio </h2>
                                <p> anuncio.Descripcion_Anuncio </p>
                            </div>
                            {/*% if anuncio.Enlace_Anuncio %*/}
                            {/*% for enlace in anuncio.Enlace_Anuncio.split(';') %*/}
                                <a href="" target="_blank">Ver archivo</a><br/>
                            {/*% endfor %*/}
                            {/*% endif %*/}
                            <div class="botonesAulaAlumno">
                                    <input type="text" name="comentario" placeholder="Comentar" required/>
                                    <button type="submit" id="principal">Enviar</button>
                            </div>

                            {/*<!--comentarios----------------------------------------->*/}

                            {/*% for comentario in comentarios_por_anuncio.get(anuncio.ID, []) %*/}
                            <div class="comentarioAulaAlumno">
                                <div class="info1AulaAlumno">
                                    <div class="fotoComentario">
                                        <img src={Imgusuario} alt=""/>
                                        <h1> comentario.Comentador </h1>
                                    </div>
                                    <h2> comentario.fecha_comentario </h2>
                                </div>
                                <div class="desc">
                                    <p> comentario.comentario </p>
                                </div>
                                {/*% if comentario.usuario_id == session['usuario_id'] %*/}
                                    <form>
                                        <button class="btn-icon eliminar" type="submit">Eliminar</button>
                                    </form>
                                {/*% endif %*/}
                            </div>
                            {/*% endfor %*/}

                        </div>
                    {/*% endfor %*/}

                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default VerAulaAlumno;