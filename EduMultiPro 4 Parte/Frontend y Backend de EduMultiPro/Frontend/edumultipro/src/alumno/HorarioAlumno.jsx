import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/HorarioAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProteccionRuta from '../ProteccionRuta.jsx';

function HorarioAlumno(){

    const [horario, setHorario] = useState(null);
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        if (usuario) {
        fetch(`http://localhost:3000/api/edumultipro/HorarioUsuario/${usuario.id}`)
            .then(res => res.json())
            .then(data => {
            if (!data.mensaje) {
                setHorario(data);
            } else {
                setHorario(null);
            }
            })
            .catch(err => {
            console.error("Error al cargar el horario:", err);
            });
        }
    }, []);

    return (
    <>
        <ProteccionRuta rolRequerido="R001" />
        <div className='contenedor'>

            {/*---Nav---*/}
            <Encabezado />

            {/*---Desplegable---*/}
            <DesplegableAlumno />

            {/*---Article---*/}
            <div className="container-fluid" id="centroAlumno">

                {/*---navegador alumno---*/}
                <NavAlumno />
                
                <div className="horarioAlumno">
                    {horario ? (
                        <>
                            <div className="tituAlumno">
                            <h2>{horario.Titulo_Horario}</h2>
                            </div>

                            <div className="imghorarioAlumno">
                            {horario.Imagen_Horario ? (
                                <img
                                src={`http://localhost:3000/imagenes/${horario.Imagen_Horario}`}
                                alt="Imagen Horario"
                                id="imagenPequena"
                                />
                            ) : (
                                <img src="" alt="Sin Imagen" id="imagenPequena" />
                            )}
                            </div>

                            <div className="descripcion">
                            <h3>Descripción:</h3>
                            <p>{horario.Descripcion_Horario}</p>
                            </div>
                        </>
                        ) : (
                        <div className="no-horario">
                            <h2>No hay horarios creados para ti aún.</h2>
                        </div>
                    )}
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default HorarioAlumno;