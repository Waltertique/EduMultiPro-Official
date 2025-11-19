import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearUsuario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

function CrearUsuario(){

    const [roles, setRoles] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [formulario, setFormulario] = useState({
    id: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    correo1: '',
    contrasena: '',
    correo2: '',
    contacto1: '',
    contacto2: '',
    fecha_nacimiento: '',
    rol_id: '',
    documento_id: '',
    foto: null
  });

  const navigate = useNavigate();

  // Obtener roles y documentos al cargar
  useEffect(() => {
    fetch('http://localhost:3000/api/edumultipro/roles')
      .then(res => res.json())
      .then(data => setRoles(data));

    fetch('http://localhost:3000/api/edumultipro/documentos')
      .then(res => res.json())
      .then(data => setDocumentos(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormulario({ ...formulario, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = new FormData();
    for (let campo in formulario) {
      datos.append(campo, formulario[campo]);
    }

    try {
      const res = await fetch('http://localhost:3000/api/edumultipro/crearUsuario', {
        method: 'POST',
        body: datos
      });

      const resultado = await res.json();
      if (res.ok) {
        alert('✅ Usuario creado correctamente');
        navigate('/Usuario');
      } else {
        alert('❌ Error: ' + resultado.mensaje);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('❌ Error al crear el usuario');
    }
  };

    return(
        <>
          <ProteccionRuta rolRequerido="R004" />
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
                                
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <h3>Datos Usuario</h3>
                                    <div className="f1">
                                        <input type="number" name="id" placeholder="N.O Identificacion" required onChange={handleChange} />
                                        <input type="text" name="primer_nombre" placeholder="Primer Nombre" maxLength="50" required onChange={handleChange} />
                                        <input type="text" name="segundo_nombre" placeholder="Segundo Nombre" maxLength="50" onChange={handleChange} />
                                    </div>
                                    <div className="f1">
                                        <input type="text" name="primer_apellido" placeholder="Primer Apellido" maxLength="50" required onChange={handleChange} />
                                        <input type="text" name="segundo_apellido" placeholder="Segundo Apellido" maxLength="50" onChange={handleChange} />
                                        <input type="email" name="correo1" placeholder="Correo" maxLength="50" required onChange={handleChange} />
                                    </div>
                                    <div className="f1">
                                        <input type="password" name="contrasena" placeholder="Contraseña" required onChange={handleChange} />
                                        <select name="rol_id" required onChange={handleChange} defaultValue="">
                                        <option value="" disabled>Selecciona un Rol</option>
                                        {roles.map((rol) => (
                                            <option key={rol.ID} value={rol.ID}>{rol.Nombre_Rol}</option>
                                        ))}
                                        </select>
                                        <select name="documento_id" required onChange={handleChange} defaultValue="">
                                        <option value="" disabled>Tipo De Documento</option>
                                        {documentos.map((doc) => (
                                            <option key={doc.ID} value={doc.ID}>{doc.Tipo_Documento}</option>
                                        ))}
                                        </select>
                                    </div>

                                    <h3>Otros Datos</h3>
                                    <input type="email" name="correo2" placeholder="Correo Alternativo" maxLength="50" onChange={handleChange} />
                                    <input type="number" name="contacto1" placeholder="Contacto Principal" required onChange={handleChange} />
                                    <input type="number" name="contacto2" placeholder="Contacto Secundario" onChange={handleChange} />
                                    <input type="date" name="fecha_nacimiento" required onChange={handleChange} />
                                    <input type="file" name="foto" accept="image/*" onChange={handleFileChange} />

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