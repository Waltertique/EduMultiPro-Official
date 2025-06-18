import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearUsuario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function CrearUsuario(){
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

                            <div className="tituloCrearUsuario">
                                <h1>Crear Usuarios</h1>
                                <Link to="/Usuario">
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Salir</button>
                                </Link> 
                            </div>
                            <div className="contenidoCrearUsuario">
                                
                                <form method="POST" action="{{ url_for('admin_bp.guardar_usuario') }}" enctype="multipart/form-data">
                                    <h3>Datos Usuario</h3>
                                    <div className="f1">
                                        <input type="number" name="id" placeholder="N.O Identificacion" required></input>                                        
                                        <input type="text" name="primer_nombre" placeholder="Primer Nombre" required></input>
                                        <input type="text" name="segundo_nombre" placeholder="Segundo Nombre"></input>   
                                    </div>
                                    <div className="f1">
                                        <input type="text" name="primer_apellido" placeholder="Primer Apellido" required></input>   
                                        <input type="text" name="segundo_apellido" placeholder="Segundo Apellido"></input>   
                                        <input type="email" name="correo1" placeholder="Correo" required></input>   
                                    </div>
                                    <div className="f1">
                                        <input type="password" name="contraseña" placeholder="Contraseña" required></input>   
                                        <select name="rol_id" required>
                                            <option value="" disabled selected>Selecciona un Rol</option>
                                            {/*-- % for rol in roles % --*/}
                                                <option value="{{ rol.ID }}">rol.Nombre_Rol</option>
                                            {/*-- % endfor % --*/}
                                        </select>
                                        <select name="documento_id" required>
                                            <option value="" disabled selected>Tipo De Documento</option>
                                            {/*-- % for doc in documentos % --*/}
                                                <option value="{{ doc.ID }}">doc.Tipo_Documento</option>
                                            {/*-- % endfor % --*/}
                                        </select>
                                    </div>

                                    <h3>Otros Datos</h3>
                                    <input type="email" name="correo2" placeholder="Correo Alternativo"></input>
                                    <input type="number" name="contacto1" placeholder="Contacto Principal" required></input>
                                    <input type="number" name="contacto2" placeholder="Contacto Secundario"></input>
                                    <input type="date" name="fecha_nacimiento" required></input>
                                    <input type="file" name="foto" accept="image/*"></input>

                                    <button type="submit">Guardar Usuario</button>
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
export default CrearUsuario;