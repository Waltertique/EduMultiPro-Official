import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/NoticiaAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

import { useEffect, useState } from 'react';
import ErrorImg from '../assets/error.png';

function NoticiaAlumno(){

    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/edumultipro/NoticiasDatos")
        .then(res => res.json())
        .then(data => setNoticias(data))
        .catch(err => console.error("Error al cargar noticias:", err));
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
                
                <div className="contenedor-noticiaAlumno">
                    <h2>Noticias</h2>

                    {noticias.length === 0 ? (
                    <div className="alert alert-warning text-center">
                        No hay noticias disponibles.
                    </div>
                    ) : (
                    noticias.map(noticia => (
                        <div key={noticia.ID} className="noticiaAlumno">
                        <div className="row align-items-center">

                            {/* Imagen */}
                            <div className="col-xl-4">
                            {noticia.Imagen1 ? (
                                <img
                                src={`http://localhost:3000/imagenes/${noticia.Imagen1}`}
                                alt="Imagen de noticia"
                                className="img-fluid"
                                />
                            ) : (
                                <img src={ErrorImg} alt="Sin imagen" className="img-fluid" />
                            )}
                            </div>

                            {/* Título y Encabezado */}
                            <div className="col-xl-6">
                            <h2>{noticia.Titulo_Noticia}</h2>
                            <p>{noticia.Encabezado}</p>
                            </div>

                            {/* Botón Ver más */}
                            <div className="col-xl-2">
                            <Link to={`/VerNoticiaAlumno/${noticia.ID}`}>
                                <button className="btn btn-primary">Ver Más</button>
                            </Link>
                            </div>

                        </div>
                        </div>
                    ))
                    )}
                
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default NoticiaAlumno;