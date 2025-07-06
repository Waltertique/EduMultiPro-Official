import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/PrincipalProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import ErrorImg from '../assets/error.png'; // Imagen por defecto
import ProteccionRuta from '../ProteccionRuta.jsx';

import Img1Carrucel from '../assets/f1.png';
import Img2Carrucel from '../assets/f2.png';
import Img3Carrucel from '../assets/f3.png';

function PrincipalProfesor(){

    const [noticias, setNoticias] = useState({
        noticia1: null,
        noticia2: null,
        noticia3: null,
    });

    useEffect(() => {
    fetch("http://localhost:3000/api/edumultipro/NoticiasPrincipales")
        .then(res => res.json())
        .then(data => setNoticias(data))
        .catch(error => console.error("Error al cargar noticias:", error));
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

                {/*---navegador alumno---*/}
                <NavProfesor />
                
                {/*caricel*/}
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Img1Carrucel} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Img2Carrucel} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Img3Carrucel} className="d-block w-100" alt="..." />
                    </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div className="noticiasProfesor">
                    <div className="tituloProfesor">
                        <h2>Noticias</h2>
                    </div>
                    <div className="row">

                        {[noticias.noticia1, noticias.noticia2, noticias.noticia3].map((noticia, index) => (
                            <div key={index} className="col-xl-4">
                            <div className="imagen">
                                {noticia && noticia.Imagen1 ? (
                                <Link to={`/VerNoticiaProfesor/${noticia.ID}`}>
                                    <img src={`http://localhost:3000/imagenes/${noticia.Imagen1}`} alt="Imagen de noticia" />
                                </Link>
                                ) : (
                                <img src={ErrorImg} alt="No hay imagen" />
                                )}
                            </div>
                            <div className="encabezado">
                                {noticia ? (
                                <>
                                    <h2>{noticia.Titulo_Noticia}</h2>
                                    <p>{noticia.Encabezado}</p>
                                </>
                                ) : (
                                <p>No hay Noticia</p>
                                )}
                            </div>
                            </div>
                        ))}

                    </div>
                </div>


            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default PrincipalProfesor;