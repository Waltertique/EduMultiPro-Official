import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/VerNoticiaProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProteccionRuta from '../ProteccionRuta.jsx';

function VerNoticiaProfesor(){

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

                <div className="contenerdo-VerNoticiaProfesor">    
                    <div className="contenerdorVerNoticiaProfesor">

                        {/*<!-- Título -->*/}
                        <div id="h0Titulo">
                            <h2> {noticia?.Titulo_Noticia} </h2>
                        </div>

                        {/*<!-- Descripción 1 -->*/}
                        <div className="text">
                            <p>{noticia?.Descripcion1}</p> 
                        </div>

                        {/*<!-- Imagen 2 -->*/}
                        {noticia?.Imagen2 && (
                            <div className="col-xl-12 imagen">
                                <img src={`http://localhost:3000/imagenes/${noticia.Imagen2}`} alt="Imagen 2" />
                            </div>
                        )}

                        {/*<!-- Descripción 2 -->*/}
                        <div className="text">
                            <p>{noticia?.Descripcion2}</p>
                        </div>

                        {/*<!-- Imagen 3 -->*/}
                        {noticia?.Imagen3 && (
                            <div className="col-xl-12 imagen">
                                <img src={`http://localhost:3000/imagenes/${noticia.Imagen3}`} alt="Imagen 3" />
                            </div>
                        )}

                        {/*<!-- Descripción 3 -->*/}
                        <div className="text">
                            <p>{noticia?.Descripcion3}</p>
                        </div>

                        {/*<!-- Fecha -->*/}
                        <div className="col-xl-12" id="h6Fecha">
                            <p><strong>Fecha:</strong> {new Date(noticia?.Fecha_Notica).toLocaleDateString()}</p>
                        </div>

                    </div>
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default VerNoticiaProfesor;