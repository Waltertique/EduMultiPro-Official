import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerUsuario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function VerUsuario(){

const { id } = useParams(); // URL: /VerUsuario/:id
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [nuevaContraseña, setNuevaContraseña] = useState('');

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  setUsuario((prev) => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
};

  useEffect(() => {
  fetch(`http://localhost:3000/api/edumultipro/verUsuario/${id}`)
    .then(res => res.json())
    .then(data => {
      setUsuario(data.usuario);       // 👈 CORREGIR ESTO
      setDocumentos(data.documentos); // 👈
      setRoles(data.roles);           // 👈
    });
}, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("usuario_id", id);

  for (let key in usuario) {
    if (key === "RutaFoto") continue; // Foto la tratamos aparte
    formData.append(key, usuario[key] || '');
  }

  if (usuario.RutaFoto instanceof File) {
    formData.append("RutaFoto", usuario.RutaFoto);
  }

  if (nuevaContraseña.trim() !== "") {
  formData.append("contrasena", nuevaContraseña); // ✅ En minúsculas, igual que en el backend
  }

  try {
    const res = await fetch("http://localhost:3000/api/edumultipro/actualizarUsuario", {
      method: 'POST',
      body: formData
    });

    const result = await res.json();

    if (res.ok) {
      alert('✅ Usuario actualizado correctamente');
      navigate('/Usuario');
    } else {
      alert(result.mensaje || '❌ Error al actualizar');
    }

  } catch (error) {
    console.error("❌ Error en la petición:", error);
    alert('❌ Error al actualizar usuario');
  }
};

  if (!usuario) return <p>Cargando usuario...</p>;

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

                            <div className="contenidoFormularioVerUsuario" id="contenidoFormulario">
                                <button id="btnCancelarVer">Cancelar</button>
                                <div className="formularioInterno">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <input type="hidden" name="ID" value={usuario.ID} />
                                        <div className="f1">
                                            <select name="documento_id" value={usuario.documento_id} onChange={handleChange} required>
                                            <option value="">Documento</option>
                                            {documentos.map(doc => (
                                                <option key={doc.ID} value={doc.ID}>{doc.Tipo_Documento}</option>
                                            ))}
                                            </select>
                                            <input type="text" name="Primer_Nombre" value={usuario.Primer_Nombre} onChange={handleChange} required placeholder="Primer Nombre" />
                                            <input type="text" name="Segundo_Nombre" value={usuario.Segundo_Nombre || ''} onChange={handleChange} placeholder="Segundo Nombre" />
                                        </div>
                                        <div className="f1">
                                            <input type="text" name="Primer_Apellido" value={usuario.Primer_Apellido} onChange={handleChange} required placeholder="Primer Apellido" />
                                            <input type="text" name="Segundo_Apellido" value={usuario.Segundo_Apellido || ''} onChange={handleChange} placeholder="Segundo Apellido" />
                                            <input type="email" name="Correo1" value={usuario.Correo1} onChange={handleChange} required placeholder="Correo 1" />
                                        </div>
                                        <div className="f1">
                                            <input type="password" name="Contraseña" value={nuevaContraseña} onChange={(e) => setNuevaContraseña(e.target.value)} placeholder="Nueva contraseña"/>
                                            <select name="rol_id" value={usuario.rol_id} onChange={handleChange} required>
                                            <option value="">Selecciona un rol</option>
                                            {roles.map(rol => (
                                                <option key={rol.ID} value={rol.ID}>{rol.Nombre_Rol}</option>
                                            ))}
                                            </select>
                                            <input type="email" name="Correo2" value={usuario.Correo2 || ''} onChange={handleChange} placeholder="Correo 2" />
                                        </div>

                                        <h3>Otros Datos</h3>
                                        <input type="text" name="Contacto1" value={usuario.Contacto1} onChange={handleChange} required placeholder="Contacto 1" />
                                        <input type="text" name="Contacto2" value={usuario.Contacto2 || ''} onChange={handleChange} placeholder="Contacto 2" />
                                        <input type="date" name="Fecha_Nacimiento" value={usuario.Fecha_Nacimiento} onChange={handleChange} required />
                                        <input type="file" name="RutaFoto" onChange={handleChange} />
                                        {usuario.RutaFoto && <img src={`http://localhost:3000/imagenes/${usuario.RutaFoto}`} width="100" alt="Foto actual" />}

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