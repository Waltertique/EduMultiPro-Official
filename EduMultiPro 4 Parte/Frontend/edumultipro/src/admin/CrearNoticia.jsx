import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearNoticia.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function CrearNoticia(){
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

                            <div class="tituloCrearNoticia">
                                <h1>Crear Noticia</h1>
                                <Link to={"/Noticia"}>
                                    <button class="crear" id="btnAgregarUsuario"> <i class="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div class="contenidoCrearNoticia">
                    
                                <form method="POST" action="{{ url_for('admin2_bp.guardar_noticia') }}" enctype="multipart/form-data">
                                    <input type="text" name="titulo" placeholder="Título de la Noticia" required />
                                    <textarea name="encabezado" placeholder="Encabezado" required id="encabezado"></textarea>
                                    <textarea name="descripcion1" placeholder="Descripción 1" required></textarea>
                                    <textarea name="descripcion2" placeholder="Descripción 2 (opcional)"></textarea>
                                    <textarea name="descripcion3" placeholder="Descripción 3 (opcional)"></textarea>
                                    <input type="date" name="fecha" required />
                                
                                    <label>Imagen 1:</label>
                                    <input type="file" name="imagen1" accept="image/*" required />
                                    
                                    <label>Imagen 2:</label>
                                    <input type="file" name="imagen2" accept="image/*" />
                                
                                    <label>Imagen 3:</label>
                                    <input type="file" name="imagen3" accept="image/*" />
                                
                                    <select name="tipo_noticia_id" required>
                                        <option value="" selected disabled>Selecciona el tipo de noticia</option>
                                        {/*-- % for tipo in tipos_noticia % --*/}
                                            <option value="{{ tipo.ID }}">tipo.Tipo</option>
                                        {/*-- % endfor % --*/}
                                    </select>
                                
                                    <button type="submit">Crear Noticia</button>
                                </form>
                            
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
export default CrearNoticia;