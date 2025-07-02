import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/PrincipalAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

import Img1Carrucel from '../assets/f1.png';
import Img2Carrucel from '../assets/f2.png';
import Img3Carrucel from '../assets/f3.png';
import Img1Noticia from '../assets/1.png';
import Img2Noticia from '../assets/2.png';
import Img3Noticia from '../assets/3.png';

function PrincipalAlumno(){
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

                <div className="noticiasAlumno">
                    <div className="tituloAlumno">
                        <h2>Noticias</h2>
                    </div>
                    <div className="row">

                        {/*<!-- Noticia principal 1-->*/}
                        {/*% if noticia1 and 'Imagen1' in noticia1 %*/}
                            <div className="col-xl-4">
                                <div className="imagen">
                                    <Link to={"/VerNoticiaAlumno"}>
                                    <img src={Img1Noticia} alt="Imagen de noticia"/>
                                    </Link>
                                </div>
                                <div className="encabezado">
                                    <h2>Titulo_Noticia</h2>
                                    <p>Encabezado</p>
                                </div>
                            </div>
                        {/*% else %
                            <div className="col-xl-4">
                            <div className="imagen"><img src="{{ url_for('static', filename='img/error.png') }}" alt="Imagen de noticia"></div>
                            <div className="encabezado">
                                <h2>No hay Noticias Disponibles</h2>
                            </div>
                            </div>
                        {% endif %*/}

                        {/*<!-- Noticia principal 2-->*/}
                        {/*% if noticia2 and 'Imagen1' in noticia2 %*/}
                            <div className="col-xl-4">
                                <div className="imagen">
                                    <Link to={"/VerNoticiaAlumno"}>
                                    <img src={Img2Noticia} alt="Imagen de noticia"/>
                                    </Link>
                                </div>
                                <div className="encabezado">
                                    <h2>Titulo_Noticia</h2>
                                    <p>Encabezado</p>
                                </div>
                            </div>
                        {/*% else %*
                            <div className="col-xl-4">
                            <div className="imagen"><img src="{{ url_for('static', filename='img/error.png') }}" alt="Imagen de noticia"></div>
                            <div className="encabezado">
                                <h2>No hay Noticias Disponibles</h2>
                            </div>
                            </div>
                        {% endif %*/}

                        {/*<!-- Noticia principal 3-->*/}
                        {/*% if noticia3 and 'Imagen1' in noticia3 %*/}
                            <div className="col-xl-4">
                                <div className="imagen">
                                    <Link to={"/VerNoticiaAlumno"}>
                                    <img src={Img3Noticia} alt="Imagen de noticia"/>
                                    </Link>
                                </div>
                                <div className="encabezado">
                                    <h2>Titulo_Noticia</h2>
                                    <p>Encabezado</p>
                                </div>
                            </div>
                        {/*% else %*
                            <div className="col-xl-4">
                            <div className="imagen"><img src="{{ url_for('static', filename='img/error.png') }}" alt="Imagen de noticia"></div>
                            <div className="encabezado">
                                <h2>No hay Noticias Disponibles</h2>
                            </div>
                            </div>
                        {% endif %*/}

                    </div>
                </div>


            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default PrincipalAlumno;