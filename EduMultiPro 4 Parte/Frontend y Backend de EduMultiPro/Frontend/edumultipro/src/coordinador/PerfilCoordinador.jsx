import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/PerfilCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProteccionRuta from '../ProteccionRuta.jsx';

function PerfilCoordinador(){

    const [usuario, setUsuario] = useState(null);
    
        useEffect(() => {
            const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));
            if (!usuarioLocal) return;
    
            fetch(`http://localhost:3000/api/edumultipro/verUsuario/${usuarioLocal.id}`)
            .then(res => res.json())
            .then(data => {
                setUsuario(data.usuario); // ✅ solo los datos del usuario, no roles ni documentos
            })
            .catch(err => {
                console.error('❌ Error al cargar el perfil:', err);
            });
        }, []);
    
        if (!usuario) {
            return <p className="text-center mt-5">Cargando datos del perfil...</p>;
        }

    return(
        <>
            <ProteccionRuta rolRequerido="R003" />
            <div className='contenedor'>

                {/*---Nav---*/}
                <Encabezado />

                {/*---Desplegable---*/}
                <DesplegableCoordinador />

                {/*---Article---*/}
                <div className="container-fluid" id="centro1">

                    <div className="row" id='contenido'>

                        {/*---BarraLateral---*/}
                        <BarraLateralCoordinador />

                        {/*---Tabla---*/}
                        <div className="col-10" id="contenidoTabla">

                            <div className="tituloPerfilCoordinador">
                                <h1>Mi Infromacion</h1>
                            </div>
                            <div className="contenidoTablaCoordinador2">
                                <table id='PerfilUsuario'>
                                <tr>
                                    <th>Foto</th>
                                    <th>Identificación</th>
                                    <td>{usuario.ID}</td>
                                    <th>Documento</th>
                                    <td>{usuario.Documento}</td>
                                </tr>
                                <tr>
                                    <td rowspan="5" id='espaciofoto'>
                                        {usuario.RutaFoto ? (
                                            <img src={`http://localhost:3000/imagenes/${usuario.RutaFoto}`} alt="Foto de perfil" />
                                            ) : (
                                            <img src="" alt="Sin Foto" />
                                        )}
                                    </td>
                                    <th>Primer Nombre</th>
                                    <td>{usuario.Primer_Nombre}</td>
                                    <th>Segundo Nombre</th>
                                    <td>{usuario.Segundo_Nombre}</td>
                                </tr>
                                <tr>
                                    <th>Primer Apellido</th>
                                    <td>{usuario.Primer_Apellido}</td>
                                    <th>Segundo Apellido</th>
                                    <td>{usuario.Segundo_Apellido}</td>
                                </tr>
                                <tr>
                                    <th>Correo1</th>
                                    <td>{usuario.Correo1}</td>
                                    <th>Correo 2</th>
                                    <td>{usuario.Correo2}</td>
                                </tr>
                                <tr>
                                    <th>Contacto 1</th>
                                    <td>{usuario.Contacto1}</td>
                                    <th>Contacto 2</th>
                                    <td>{usuario.Contacto2}</td>
                                </tr>
                                <tr>
                                    <th>Fecha de Nacimiento</th>
                                    <td>{usuario.Fecha_Nacimiento}</td>
                                    <th>Rol</th>
                                    <td>{usuario.Rol}</td>
                                </tr>
                                </table>
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
export default PerfilCoordinador;