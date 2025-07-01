import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/NoticiaAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import Img1Noticia from '../assets/1.png';

function NoticiaAlumno(){
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
                
                <div class="contenedor-noticiaAlumno">
                    <h2>Noticias</h2>
                    {/*% for noticia in noticias %*/}
                        <div class="noticiaAlumno">
                            <div class="row">
                                {/*<!-- Imagen -->*/}
                                <div class="col-xl-4">
                                    {/*% if noticia['Imagen1'] %*/}
                                        <img src={Img1Noticia} alt="Imagen de noticia"/>
                                    {/*% else %}
                                        <img src="{{ url_for('static', filename='img/default.png') }}" alt="Sin imagen" />
                                    {/*% endif %*/}
                                </div>

                                {/*<!-- Título y encabezado -->*/}
                                <div class="col-xl-6">
                                    <h2>Titulo_Noticia</h2>
                                    <p>Encabezado</p>
                                </div>

                                {/*<!-- Botón Ver Más -->*/}
                                <div class="col-xl-2">
                                <form>
                                    <button>Ver Más</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    {/*% endfor %}

                    {% if noticias|length == 0 %}
                        <div class="alert alert-warning text-center">No hay noticias disponibles.</div>
                    {% endif %*/}
                
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default NoticiaAlumno;