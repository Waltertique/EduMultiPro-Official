import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/ActualizarTrabajoProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import ProteccionRuta from '../ProteccionRuta.jsx';


function ActualizarTrabajoProfesor(){ 

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
            navigate(`/TrabajoProfesor/${trabajo.aula_id}`);
        } else {
            alert("Error al actualizar");
        }
    };

    const handleEliminarArchivo = (archivoId) => {
        setArchivosEliminar(prev => [...prev, archivoId]);
    };

    return (
    <>
        <ProteccionRuta rolRequerido="R002" />
        <div className='contenedor'>

            {/*---Nav---*/}
            <Encabezado />

            {/*---Desplegable---*/}
            <DesplegableProfesor />

            {/*---Article---*/}
            <div className="container-fluid" id="centroProfesor">

                {/*---navegador Profesor---*/}
                <NavProfesor />

                <div className='todoprofesor'>

                    <div className="col-10" id="contenidoModificarTablaProfesor">

                        <Link to={`/TrabajoProfesor/${trabajo.aula_id}`}>
                            <button id="salirModificarTabla">Salir</button>
                        </Link>
                        <div className="parte1ModificarTabla">
                            <h1>Modificar Trabajo</h1>
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
                    </div>

                </div>
            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default ActualizarTrabajoProfesor;