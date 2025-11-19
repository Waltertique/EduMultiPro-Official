import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/ActualizarTrabajo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
<<<<<<< HEAD
import { Link } from 'react-router-dom';

function ActualizarTrabajo(){

=======
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ActualizarTrabajo(){

    const { id } = useParams(); // ID del trabajo
    const navigate = useNavigate();

    const [trabajo, setTrabajo] = useState({});
    const [archivosActuales, setArchivosActuales] = useState([]);
    const [archivosNuevos, setArchivosNuevos] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [archivosEliminar, setArchivosEliminar] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/edumultipro/Trabajo/${id}`)
            .then(res => res.json())
            .then(data => {
                setTrabajo(data.trabajo);
                setTitulo(data.trabajo.Titulo_Trabajo);
                setDescripcion(data.trabajo.Descripcion_Trabajo);
                setFecha(data.trabajo.Fecha_Trabajo.split('T')[0]);
                setArchivosActuales(data.archivos);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("trabajo_id", id);
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);
        formData.append("fecha", fecha);
        formData.append("aula_id", trabajo.aula_id);

        archivosNuevos.forEach(file => {
            formData.append("archivos", file);
        });

        archivosEliminar.forEach(id => {
            formData.append("eliminar_archivos", id);
        });

        const res = await fetch("http://localhost:3000/api/edumultipro/ActualizarTrabajo", {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            alert("Trabajo actualizado");
            navigate(`/Trabajos/${trabajo.aula_id}`);
        } else {
            alert("Error al actualizar");
        }
    };

    const handleEliminarArchivo = (archivoId) => {
        setArchivosEliminar(prev => [...prev, archivoId]);
    };

>>>>>>> origin/ramajohan
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
                        <div className="col-10" id="contenidoModificarTabla">

<<<<<<< HEAD
                            <Link to={"/Trabajos"}>
=======
                            <Link to={`/Trabajos/${trabajo.aula_id}`}>
>>>>>>> origin/ramajohan
                                <button id="salirModificarTabla">Salir</button>
                            </Link>
                            <div className="parte1ModificarTabla">
                                <h1>Modificar Trabajo</h1>
<<<<<<< HEAD
                                <form action="{{ url_for('admin2_bp.guardarCambiosTrabajo') }}" method="POST" enctype="multipart/form-data">
                                <input type="hidden" name="trabajo_id" value="{{ trabajo.ID }}" />
                                <input type="hidden" name="aula_id" value="{{ trabajo.aula_id }}" />

                                <label for="titulo">Título:</label>
                                <input type="text" id="titulo" name="titulo" value="{{ trabajo.Titulo_Trabajo }}" required />

                                <label for="descripcion">Descripción:</label>
                                <textarea id="descripcion" name="descripcion" required> trabajo.Descripcion_Trabajo </textarea>

                                <label for="fecha">Fecha de entrega:</label>
                                <input type="date" id="fecha" name="fecha" value="{{ trabajo.Fecha_Trabajo.strftime('%Y-%m-%d') }}" required />

                                <label>Archivos actuales:</label>

                                {/** 
                                <ul>
                                    {% for archivo in archivos_actuales %}
                                    <li>
                                        <a href="{{ url_for('static', filename=archivo.ruta_archivo) }}" target="_blank">{{ archivo.nombre_original }}</a>
                                        <label>
                                        <input id="check" type="checkbox" name="eliminar_archivos[]" value="{{ archivo.id }}">
                                        Eliminar
                                        </label>
                                    </li>
                                    {% else %}
                                    <li>No hay archivos.</li>
                                    {% endfor %}
                                </ul>
                                */}

                                <label for="archivo">Agregar archivo(s):</label>
                                <input type="file" id="archivoModificarTabla" name="archivo[]" multiple />

                                <button type="submit">Modificar</button>
                                </form>
                            </div>

=======
                                <form onSubmit={handleSubmit}>
                                    <label>Título:</label>
                                    <input id="titulo" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

                                    <label>Descripción:</label>
                                    <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>

                                    <label>Fecha:</label>
                                    <input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

                                    <label id='TA'>Archivos actuales:</label>
                                    <ul>
                                        {archivosActuales.length > 0 ? archivosActuales.map((archivo) => (
                                            <li key={archivo.ID}>
                                            <label>
                                                <input
                                                id="check" type="checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                    setArchivosEliminar(prev => [...prev, archivo.ID]);
                                                    } else {
                                                    setArchivosEliminar(prev => prev.filter(id => id !== archivo.ID));
                                                    }
                                                }}
                                                />
                                                <span>Eliminar archivo</span>
                                                <a
                                                href={`http://localhost:3000/${archivo.ruta_archivo}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ marginLeft: '8px' }}
                                                >
                                                {archivo.nombre_original}
                                                </a>
                                            </label>
                                            </li>
                                        )) : <li>No hay archivos</li>}
                                    </ul>

                                    <label>Agregar archivos nuevos:</label>
                                    <input type="file" id="archivoModificarTabla" multiple onChange={(e) => setArchivosNuevos([...e.target.files])} />

                                    <button type="submit">Modificar</button>
                                </form>
                            </div>
>>>>>>> origin/ramajohan
                        </div>
                    </div>        
                </div>

                {/*---Footer---*/}
                <Footer />

            </div>
        </>
    )
}
export default ActualizarTrabajo;