import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/VerNoticiaAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import Img1Carrucel from '../assets/f1.png';
import Img1Noticia from '../assets/1.png';

function VerNoticiaAlumno(){
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

                <div class="contenerdo-VerNoticiaAlumno">    
                    <div class="contenerdorVerNoticiaAlumno">

                        {/*<!-- Título -->*/}
                        <div id="h0Titulo">
                            <h2> noticia.Titulo_Noticia </h2>
                        </div>

                        {/*<!-- Descripción 1 -->*/}
                        <div class="text">
                            <p>
                            noticia.Descripcion1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum quis ipsam, eveniet quidem praesentium! Minima, officiis omnis? Fuga repellat rem ad architecto aliquam! Ut quis id autem suscipit illo.
                            </p>
                        </div>

                        {/*<!-- Imagen 2 -->*/}
                        <div class="imagen">
                            {/*% if noticia.Imagen2 %*/}
                            <img src={Img1Carrucel} alt="Imagen 2"/>
                            {/*% endif %*/}
                        </div>

                        {/*<!-- Descripción 2 -->*/}
                        <div class="text">
                            <p>
                            noticia.Descripcion2: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae in distinctio labore exercitationem numquam odio quia ipsam molestias mollitia hic ab nobis, alias qui officia iusto placeat earum minus sunt.
                            </p>
                        </div>

                        {/*<!-- Imagen 3 -->*/}
                        <div class="imagen">
                            {/*% if noticia.Imagen3 %*/}
                            <img src={Img1Noticia} alt="Imagen 3"/>
                            {/*% endif %*/}
                        </div>

                        {/*<!-- Descripción 3 -->*/}
                        <div class="text">
                            <p>
                            noticia.Descripcion3: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero atque repudiandae earum dicta ipsam possimus nulla ratione unde debitis. Eum porro tempore saepe minima qui doloribus fugiat ipsa, magnam consequatur?
                            </p>
                        </div>

                        {/*<!-- Fecha -->*/}
                        <div class="col-xl-12" id="h6Fecha">
                            <p><strong>Fecha:</strong>noticia.Fecha_Notica</p>
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

export default VerNoticiaAlumno;