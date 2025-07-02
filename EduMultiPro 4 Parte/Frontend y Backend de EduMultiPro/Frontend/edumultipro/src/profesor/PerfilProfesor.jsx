import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/PerfilProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import FotoUsuario from '../assets/foto.jpg';

function PerfilProfesor(){
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
                
                <div className="tituloPerfilProfesor">
                    <h1>Mi Infromacion</h1>
                </div>
                <div className="contenidoTablaProfesor2">
                    <table id='PerfilUsuario'>
                    <tr>
                        <th>Foto</th>
                        <th>Identificación</th>
                        <td>usuario.ID</td>
                        <th>Documento</th>
                        <td>usuario.Documento</td>
                    </tr>
                    <tr>
                        <td rowspan="5" id='espaciofoto'>
                            <img src={FotoUsuario} alt="Foto de perfil"/>
                        </td>
                        <th>Primer Nombre</th>
                        <td>usuario.Primer_Nombre</td>
                        <th>Segundo Nombre</th>
                        <td>usuario.Segundo_Nombre</td>
                    </tr>
                    <tr>
                        <th>Primer Apellido</th>
                        <td>usuario.Primer_Apellido</td>
                        <th>Segundo Apellido</th>
                        <td>usuario.Segundo_Apellido </td>
                    </tr>
                    <tr>
                        <th>Correo1</th>
                        <td>usuario.Correo1</td>
                        <th>Correo 2</th>
                        <td>usuario.Correo2</td>
                    </tr>
                    <tr>
                        <th>Contacto 1</th>
                        <td>usuario.Contacto1</td>
                        <th>Contacto 2</th>
                        <td>usuario.Contacto2</td>
                    </tr>
                    <tr>
                        <th>Fecha de Nacimiento</th>
                        <td>usuario.Fecha_Nacimiento</td>
                        <th>Rol</th>
                        <td>usuario.Rol</td>
                    </tr>
                    </table>
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default PerfilProfesor;