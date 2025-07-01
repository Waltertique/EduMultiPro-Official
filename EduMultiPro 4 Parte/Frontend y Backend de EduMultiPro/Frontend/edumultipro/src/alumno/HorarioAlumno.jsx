import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/HorarioAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ImgHorario from '../assets/imgHorario.png';

function HorarioAlumno(){
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
                
                <div class="horarioAlumno">
                    {/*% if horario %*/}
                        <div class="tituAlumno">
                            <h2>horario.Titulo_Horario </h2>
                        </div>
                    
                        <div class="imghorarioAlumno">
                        {/*% if horario['Imagen_Horario'] %*/}
                                <img 
                                    src={ImgHorario} alt="Imagen Horario" id="imagenPequena"  />
                                {/*% else %}
                                <p>No se ha subido una imagen para este horario.</p>
                        {/*% endif %*/}
                        </div>
                    
                        {/*<!-- Modal para mostrar imagen grande -->*/}
                        <div id="modalImagen" class="modal">
                        <span class="cerrar">&times;</span>
                        <img class="contenido-modal" id="imagenGrande"/>
                        </div>
                    
                        <div class="descripcion">
                            <h3>Descripción:</h3>
                            <p>
                                horario.Descripcion_Horario
                            </p>
                        </div>
                    {/*% else %}
                        <div class="no-horario">
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

export default HorarioAlumno;