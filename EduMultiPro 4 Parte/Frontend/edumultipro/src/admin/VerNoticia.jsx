import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerNoticia.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function VerNoticia(){
    return(
        <>
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

                            <div class="row" id="tituloVerNoticia">
                                <div class="col-12 col-lg-9 col-xl-9">
                                <h2>Informacion De La Noticia</h2>
                                </div>
                                <div class="col-12 col-lg-3 col-xl-3" id="ttbtn2">
                                <Link to={"/Noticia"}>
                                    <button class="crear" id="btnAgregarUsuario"> <i class="fas fa-user-plus"></i>Salir</button>
                                </Link>
                                </div>
                            </div>

                            <div class="row" id="cont1a">
                                <div class="cont2a">
                                <div class="row">
                            
                                    {/*-- Título -->*/}
                                    <div class="col-xl-12" id="h0">
                                    <h2> noticia['Titulo_Noticia'] </h2>
                                    </div>
                            
                                    {/*-- Descripción 1 -->*/}
                                    {/*-- % if noticia['Descripcion1'] % --*/}
                                    <div class="col-xl-12 text">
                                    <p>
                                         noticia['Descripcion1'] 
                                    </p>
                                    </div>
                                    {/*-- % endif % --*/}
                            
                                    {/*-- Imagen 2 -->*/}
                                    {/*-- % if noticia['Imagen2'] % --*/}
                                    <div class="col-xl-12 imagen">
                                    <img src="{{ '/' + noticia['Imagen2'].replace('\\', '/') }}" alt=""></img>
                                    </div>
                                    {/*-- % endif % --*/}
                            
                                    {/*-- Descripción 2 -->*/}
                                    {/*-- % if noticia['Descripcion2'] % --*/}
                                    <div class="col-xl-12 text">
                                    <p>
                                         noticia['Descripcion2'] 
                                    </p>
                                    </div>
                                    {/*-- % endif % --*/}
                            
                                    {/*-- Imagen 3 -->*/}
                                    {/*-- % if noticia['Imagen3'] % --*/}
                                    <div class="col-xl-12 imagen">
                                    <img src="{{ '/' + noticia['Imagen3'].replace('\\', '/') }}" alt=""></img>
                                    </div>
                                    {/*-- % endif % --*/}
                            
                                    {/*-- Descripción 3 -->*/}
                                    {/*-- % if noticia['Descripcion3'] % --*/}
                                    <div class="col-xl-12 text">
                                    <p>
                                         noticia['Descripcion3'] 
                                    </p>
                                    </div>
                                    {/*-- % endif % --*/}
                            
                                    {/*-- Fecha -->*/}
                                    <div class="col-xl-12" id="h6">
                                    <p><strong>Fecha:</strong> 'Fecha_Notica'</p>
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
export default VerNoticia;