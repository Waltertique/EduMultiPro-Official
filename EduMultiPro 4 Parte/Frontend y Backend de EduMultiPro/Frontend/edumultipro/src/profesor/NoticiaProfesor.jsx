import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/NoticiaProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import Img1Noticia from '../assets/1.png';

function NoticiaProfesor(){
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
                
                <div className="contenedor-noticiaProfesor">
                    <h2>Noticias</h2>
                    {/*% for noticia in noticias %*/}
                        <div className="noticiaProfesor">
                            <div className="row">
                                {/*<!-- Imagen -->*/}
                                <div className="col-xl-4">
                                    {/*% if noticia['Imagen1'] %*/}
                                        <img src={Img1Noticia} alt="Imagen de noticia"/>
                                    {/*% else %}
                                        <img src="{{ url_for('static', filename='img/default.png') }}" alt="Sin imagen" />
                                    {/*% endif %*/}
                                </div>

                                {/*<!-- Título y encabezado -->*/}
                                <div className="col-xl-6">
                                    <h2>Titulo_Noticia</h2>
                                    <p>Encabezado</p>
                                </div>

                                {/*<!-- Botón Ver Más -->*/}
                                <div className="col-xl-2">
                                <Link to={"/VerNoticiaProfesor"}>
                                    <button>Ver Más</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    {/*% endfor %}

                    {% if noticias|length == 0 %}
                        <div className="alert alert-warning text-center">No hay noticias disponibles.</div>
                    {% endif %*/}
                
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default NoticiaProfesor;