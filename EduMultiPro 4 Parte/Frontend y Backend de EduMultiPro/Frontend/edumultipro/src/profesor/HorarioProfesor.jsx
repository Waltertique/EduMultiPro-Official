import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/HorarioProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ImgHorario from '../assets/imgHorario.png';

function HorarioProfesor(){
    return (
    <>
        <div className='contenedor'>

            {/*---Nav---*/}
            <Encabezado />

            {/*---Desplegable---*/}
            <DesplegableProfesor />

            {/*---Article---*/}
            <div className="container-fluid" id="centroProfesor">

                {/*---navegador Profesor---*/}
                <NavProfesor />
                
                <div className="horarioProfesor">
                    {/*% if horario %*/}
                        <div className="tituProfesor">
                            <h2>horario.Titulo_Horario </h2>
                        </div>
                    
                        <div className="imghorarioProfesor">
                        {/*% if horario['Imagen_Horario'] %*/}
                                <img 
                                    src={ImgHorario} alt="Imagen Horario" id="imagenPequena"  />
                                {/*% else %}
                                <p>No se ha subido una imagen para este horario.</p>
                        {/*% endif %*/}
                        </div>
                    
                        {/*<!-- Modal para mostrar imagen grande -->*/}
                        <div id="modalImagen" className="modal">
                        <span className="cerrar">&times;</span>
                        <img className="contenido-modal" id="imagenGrande"/>
                        </div>
                    
                        <div className="descripcion">
                            <h3>Descripción:</h3>
                            <p>
                                horario.Descripcion_Horario
                            </p>
                        </div>
                    {/*% else %}
                        <div className="no-horario">
                        <h2>No hay horarios creados para tu curso aún.</h2>
                        </div>
                    {/*% endif %*/}
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default HorarioProfesor;