import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/ActualizarNoticia.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function ActualizarNoticia(){
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

                            <div className="tituloModificarNoticia">
                                <h1>Modificar Noticia</h1>
                                <Link to={"/Noticia"}>
                                    <button className="crear" id="btnAgregarUsuario">Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoModificarNoticia">
                    
                                <form action="{{ url_for('admin2_bp.guardar_noticia_editada', id=noticia.ID) }}" method="POST" enctype="multipart/form-data">
                                    <label for="titulo">Título:</label>
                                    <input type="text" id="titulo" name="titulo" value="{{ noticia.Titulo_Noticia }}" />
                                
                                    <label for="encabezado">Encabezado:</label>
                                    <textarea id="encabezado" name="encabezado">noticia.Encabezado</textarea>
                                
                                    <label for="descripcion1">Descripción 1:</label>
                                    <textarea id="descripcion1" name="descripcion1">noticia.Descripcion1 </textarea>
                                
                                    <label for="descripcion2">Descripción 2:</label>
                                    <textarea id="descripcion2" name="descripcion2"> noticia.Descripcion2 </textarea>
                                
                                    <label for="descripcion3">Descripción 3:</label>
                                    <textarea id="descripcion3" name="descripcion3"> noticia.Descripcion3 </textarea>
                                
                                    <label for="fecha">Fecha:</label>
                                    <input type="date" id="fecha" name="fecha" value="{{ noticia.Fecha_Notica }}" />
                                
                                    <label for="tipo_noticia_id">Tipo de Noticia:</label>
                                    <select name="tipo_noticia_id">
                                                 tipo.Tipo 
                                    </select>
                                
                                    <label for="imagen1">Imagen 1:</label>
                                    <input type="file" name="imagen1" />
                                    {/*-- % if noticia['Imagen1'] and noticia['Imagen1']|length > 0 % --*/}
                                        <p>Imagen actual:</p>
                                        <img src="{{ '/' + noticia['Imagen1'].replace('\\', '/') }}" alt="Imagen actual" width="200"></img>
                                    {/*-- % else % --*/}
                                        <p>No hay imagen actual.</p>
                                    {/*-- % endif % --*/}

                                    <label for="imagen2">Imagen 2:</label>
                                    <input type="file" name="imagen2" />
                                    {/*-- % if noticia['Imagen2'] and noticia['Imagen2']|length > 0 % --*/}
                                        <p>Imagen actual:</p>
                                        <img src="{{ '/' + noticia['Imagen2'].replace('\\', '/') }}" alt="Imagen actual" width="200"></img>
                                    {/*-- % else % --*/}
                                        <p>No hay imagen actual.</p>
                                    {/*-- % endif % --*/}

                                    <label for="imagen3">Imagen 3:</label>
                                    <input type="file" name="imagen3" />
                                    {/*-- % if noticia['Imagen3'] and noticia['Imagen3']|length > 0 % --*/}
                                        <p>Imagen actual:</p>
                                        <img src="{{ '/' + noticia['Imagen3'].replace('\\', '/') }}" alt="Imagen actual" width="200"></img>
                                    {/*-- % else % --*/}
                                        <p>No hay imagen actual.</p>
                                    {/*-- % endif % --*/} 
                                
                                    <button type="submit">Guardar cambios</button>
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
export default ActualizarNoticia;