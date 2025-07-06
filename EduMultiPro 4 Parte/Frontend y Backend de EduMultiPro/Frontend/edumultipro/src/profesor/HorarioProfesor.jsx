import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/HorarioProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HorarioProfesor(){

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
                    {horario ? (
                        <>
                            <div className="tituProfesor">
                            <h2>{horario.Titulo_Horario}</h2>
                            </div>

                            <div className="imghorarioProfesor">
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

export default HorarioProfesor;