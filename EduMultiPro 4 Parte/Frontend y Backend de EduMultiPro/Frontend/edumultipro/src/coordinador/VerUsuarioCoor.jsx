import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/VerUsuarioCoor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProteccionRuta from '../ProteccionRuta.jsx';

function VerUsuarioCoor(){

const { id } = useParams(); // URL: /VerUsuario/:id

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
  fetch(`http://localhost:3000/api/edumultipro/verUsuario/${id}`)
    .then(res => res.json())
    .then(data => {
      setUsuario(data.usuario);       // 👈 CORREGIR ESTO
      setDocumentos(data.documentos); // 👈
      setRoles(data.roles);           // 👈
    });
}, [id]);

  if (!usuario) return <p>Cargando usuario...</p>;

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

                            <div className="tituloVer">
                                <h1>Informacion del Usuario</h1>
                            </div>

                            <div className="contenidoTablaVerUsuario">
                                <table className='infor'>
                                    <tbody>
                                    <tr><th>Identificación</th><td>{usuario.ID}</td><th>Documento</th><td>{usuario.Documento}</td></tr>
                                    <tr><th>Primer Nombre</th><td>{usuario.Primer_Nombre}</td><th>Segundo Nombre</th><td>{usuario.Segundo_Nombre}</td></tr>
                                    <tr><th>Primer Apellido</th><td>{usuario.Primer_Apellido}</td><th>Segundo Apellido</th><td>{usuario.Segundo_Apellido}</td></tr>
                                    <tr><th>Correo1</th><td>{usuario.Correo1}</td><th>Correo 2</th><td>{usuario.Correo2}</td></tr>
                                    <tr><th>Contacto 1</th><td>{usuario.Contacto1}</td><th>Contacto 2</th><td>{usuario.Contacto2}</td></tr>
                                    <tr><th>Fecha de Nacimiento</th><td>{usuario.Fecha_Nacimiento}</td><th>Rol</th><td>{usuario.Rol}</td></tr>
                                    <tr><th>Foto</th><td><img src={`http://localhost:3000/imagenes/${usuario.RutaFoto}`} width="100" alt="Foto Usuario"/></td></tr>
                                    </tbody>
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
export default VerUsuarioCoor;