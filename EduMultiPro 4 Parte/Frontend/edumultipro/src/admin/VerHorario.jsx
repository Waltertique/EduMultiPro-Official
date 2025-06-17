import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerHorario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import imghorario from '../assets/imghorario.png';
import { Link } from 'react-router-dom';

function VerHorario(){
    
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

                            <div className="row" id="tituloVerHorario">
                                <div className="col-12 col-lg-9 col-xl-9">
                                <h2>Informacion Del Horario</h2>
                                </div>
                                <div className="col-12 col-lg-3 col-xl-3" id="ttbtn">
                                <Link to={"/Horario"}>
                                    <button className="crear" id="btnAgregarUsuario">Salir</button>
                                </Link>
                                </div>
                            </div>

                            <div className="row" id="cont1Horario">
                                <div className="row" id="tituloho">
                                <h2>Mi Horario:</h2>
                                </div>
                            
                                <div className="row" id="imghorario">
                                {/*-- % if horario['Imagen_Horario'] % --*/}
                                    <img src={imghorario} alt="Imagen Horario" id="imagenPequena"></img>
                                {/*-- % else % --*/}
                                    <p>No se ha subido una imagen para este horario.</p>
                                {/*-- % endif % --*/}
                                </div>
                            
                            
                                <div className="row" id="descripcion">
                                    <h3>Descripcion:</h3>
                                    <p>
                                        'Descripcion_Horario
                                    </p>
                                </div>
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

export default VerHorario;