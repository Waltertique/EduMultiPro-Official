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
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProteccionRuta from '../ProteccionRuta.jsx';

function VerHorario(){

    const { id } = useParams();
const [horario, setHorario] = useState(null);

useEffect(() => {
  const obtenerHorario = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/Horarios/${id}`);
      const data = await res.json();
      setHorario(data);
    } catch (error) {
      console.error("Error al obtener el horario:", error);
    }
  };

  obtenerHorario();
}, [id]);
    
    return(
        <>
            <ProteccionRuta rolRequerido="R004" />
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
                                    <h2>{horario?.Titulo_Horario || "Horario sin título"}</h2>
                                </div>

                                <div className="row" id="imghorario">
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
                            
                                <div className="row" id="descripcion">
                                    <h3>Descripcion:</h3>
                                    <p>{horario?.Descripcion_Horario || "Sin descripción"}</p>
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