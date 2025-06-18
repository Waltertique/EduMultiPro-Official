import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerUsuario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function VerUsuario(){
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

                            <div className="tituloVer">
                                <h1>Informacion del Usuario</h1>
                                <div className="botones">
                                    <button id="btnMostrarModificar"><i className="fa-solid fa-gear"></i>Modificar</button>
                                    <Link to="/Usuario">
                                        <button className="crear" id="btnAgregarUsuario"> <i class="fas fa-user-plus"></i>Salir</button>
                                    </Link>
                                </div>
                            </div>

                            <div className="contenidoTablaVerUsuario">
                                <table className='infor'>
                                    <tr>
                                        <th>Identificación</th>
                                        <td>ID</td>
                                        <th>Documento</th>
                                        <td>usuario.Documento</td>
                                    </tr>
                                    <tr>
                                        <th>Primer Nombre</th>
                                        <td>usuario Primer_Nombre</td>
                                        <th>Segundo Nombre</th>
                                        <td>usuario Segundo_Nombre</td>
                                    </tr>
                                    <tr>
                                        <th>Primer Apellido</th>
                                        <td>usuario Primer_Apellido</td>
                                        <th>Segundo Apellido</th>
                                        <td>usuario Segundo_Apellido</td>
                                    </tr>
                                    <tr>
                                        <th>Correo1</th>
                                        <td>usuario.Correo1</td>
                                        <th>Correo 2</th>
                                        <td>usuario Correo2</td>
                                    </tr>
                                    <tr>
                                        <th>Contacto 1</th>
                                        <td>usuario Contacto1</td>
                                        <th>Contacto 2</th>
                                        <td>usuario Contacto2 </td>
                                    </tr>
                                    <tr>
                                        <th>Fecha de Nacimiento</th>
                                        <td>usuario Fecha_Nacimiento</td>
                                        <th>Rol</th>
                                        <td>usuario.Rol </td>
                                    </tr>
                                    <tr>
                                        <th>Foto</th>
                                        <td>imagen foto</td>
                                    </tr>
                                </table>
                            </div>

                            <div className="contenidoFormularioVerUsuario" id="contenidoFormulario">
                                <button id="btnCancelarVer">Cancelar</button>
                                <div className="formularioInterno">
                                    <form method="POST" enctype="multipart/form-data" action="{{ url_for('admin_bp.actualizar_usuario') }}" id="formulario">
                                        <input type="hidden" name="usuario_id" value="{{ usuario.ID }}"></input>
                                        <div className="f1">
                                            <select name="documento_id" required>
                                                <option value="">Documento</option>
                                                {/*-- % for doc in documentos % --*/}
                                                    <option value="{{ doc.ID }}">
                                                         doc.Tipo_Documento
                                                    </option>
                                                {/*-- % endfor % --*/}
                                            </select>
                                            <input type="text" name="Primer_Nombre" value="{{ usuario.Primer_Nombre }}" required placeholder="Primer Nombre"></input>
                                            <input type="text" name="Segundo_Nombre" value="{{ usuario.Segundo_Nombre }}" placeholder="Segundo Nombre"></input>
                                        </div>
                                        <div className="f1">
                                            <input type="text" name="Primer_Apellido" value="{{ usuario.Primer_Apellido }}" required placeholder="Primer Apellido"></input>
                                            <input type="text" name="Segundo_Apellido" value="{{ usuario.Segundo_Apellido }}" placeholder="Segundo Apellido"></input>
                                            <input type="email" name="Correo1" value="{{ usuario.Correo1 }}" required placeholder="Correo 1"></input>
                                        </div>
                                        <div className="f1">
                                            <input type="password" name="Contraseña" placeholder="Contraseña"></input>
                                            <select name="rol_id" required>
                                                <option value="">Selecciona un rol</option>
                                                {/*-- % for rol in roles % --*/}
                                                    <option value="{{ rol.ID }}">
                                                        Nombre_Rol
                                                    </option>
                                                {/*-- % endfor % --*/}
                                            </select>
                                            <input type="email" name="Correo2" value="{{ usuario.Correo2 }}" placeholder="Correo 2"></input>
                                        </div>

                                        <h3>Otros Datos</h3>
                                        <input type="text" name="Contacto1" value="{{ usuario.Contacto1 }}" required placeholder="Contacto 1"></input>
                                        <input type="text" name="Contacto2" value="{{ usuario.Contacto2 }}" placeholder="Contacto 2"></input>
                                        <input type="date" name="Fecha_Nacimiento" value="{{ usuario.Fecha_Nacimiento }}" required placeholder="Fecha Nacimiento"></input>
                                        <input type="file" name="RutaFoto" id='PedirFoto'></input>
                                            {/*-- % if usuario.RutaFoto % --*/}
                                                <img src="{{ url_for('static', filename='fotos/' + usuario.RutaFoto) }}" width="100"></img>
                                            {/*-- % endif % --*/}

                                        <button type="submit">Actualizar</button>
                                    </form>
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
export default VerUsuario;