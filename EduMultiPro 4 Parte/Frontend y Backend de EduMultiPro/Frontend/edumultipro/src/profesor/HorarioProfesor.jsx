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
import ProteccionRuta from '../ProteccionRuta.jsx';

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
        <ProteccionRuta rolRequerido="R002" />
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
                                {horario?.Imagen_Horario ? (
                                    <>
                                    {/* Detectar tipo de archivo según extensión */}
                                    {horario.Imagen_Horario.toLowerCase().endsWith(".pdf") ? (
                                        <iframe
                                        src={`http://localhost:3000/imagenes/${horario.Imagen_Horario}`}
                                        title="Horario PDF"
                                        width="100%"
                                        height="600px"
                                        style={{
                                            border: "2px solid #ccc",
                                            borderRadius: "10px",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                        }}
                                        />
                                    ) : (
                                        <img
                                            src={`http://localhost:3000/imagenes/${horario.Imagen_Horario}`}
                                            alt="Imagen del Horario"
                                            id="imagenPequena"
                                        />
                                    )}
                                    </>
                                ) : (
                                    <p>No se ha subido un archivo para este horario.</p>
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