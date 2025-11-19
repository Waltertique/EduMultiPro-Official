import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/VerNoticiaCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function VerNoticiaCoordinador(){

    const [noticia, setNoticia] = useState(null);
    const { id } = useParams();

    useEffect(() => {
    const fetchNoticia = async () => {
        try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Noticias/${id}`);
        const data = await res.json();
        setNoticia(data);
        } catch (error) {
        console.error("Error al cargar la noticia", error);
        }
    };
    fetchNoticia();
    }, [id]);

    return(
        <>
            <ProteccionRuta rolRequerido="R003" />
            <div className='contenedor'>
                {/*---Nav---*/}
                <Encabezado />

                {/*---Desplegable---*/}
                <DesplegableCoordinador />

                {/*---Article---*/}
                <div className="container-fluid" id="centro1">

                    <div className="row" id='contenido'>

                        {/*---BarraLateral---*/}
                        <BarraLateralCoordinador />

                        {/*---Tabla---*/}
                        <div className="col-10" id="contenidoTabla">

                            <div className="row" id="tituloVerNoticia">
                                <div className="col-12 col-lg-9 col-xl-9">
                                <h2>Informacion De La Noticia</h2>
                                </div>
                                <div className="col-12 col-lg-3 col-xl-3" id="ttbtn2">
                                <Link to={"/NoticiaCoordinador"}>
                                    <button className="crear" id="btnAgregarUsuario">Salir</button>
                                </Link>
                                </div>
                            </div>

                            <div className="row" id="cont1a">
                                <div className="cont2a">
                                <div className="row">
                            
                                    {/*-- Título -->*/}
                                    <div className="col-xl-12" id="h0">
                                    <h2> {noticia?.Titulo_Noticia} </h2>
                                    </div>
                            
                                    {/*-- Descripción 1 -->*/}
                                    <div className="col-xl-12 text">
                                        <p>{noticia?.Descripcion1}</p> 
                                    </div>
                            
                                    {/*-- Imagen 2 -->*/}
                                    {noticia?.Imagen2 && (
                                        <div className="col-xl-12 imagen">
                                            <img src={`http://localhost:3000/imagenes/${noticia.Imagen2}`} alt="Imagen 2" />
                                        </div>
                                    )}
                            
                                    {/*-- Descripción 2 -->*/}
                                    <div className="col-xl-12 text">
                                        <p>{noticia?.Descripcion2}</p>
                                    </div>
                            
                                    {/*-- Imagen 3 -->*/}
                                    {noticia?.Imagen3 && (
                                        <div className="col-xl-12 imagen">
                                            <img src={`http://localhost:3000/imagenes/${noticia.Imagen3}`} alt="Imagen 3" />
                                        </div>
                                    )}
                            
                                    {/*-- Descripción 3 -->*/}
                                    <div className="col-xl-12 text">
                                        <p>{noticia?.Descripcion3}</p>
                                    </div>
                            
                                    {/*-- Fecha -->*/}
                                    <div className="col-xl-12" id="h6">
                                    <p><strong>Fecha:</strong> {new Date(noticia?.Fecha_Notica).toLocaleDateString()}</p>
                                    </div>
                            
                                </div>
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
export default VerNoticiaCoordinador;