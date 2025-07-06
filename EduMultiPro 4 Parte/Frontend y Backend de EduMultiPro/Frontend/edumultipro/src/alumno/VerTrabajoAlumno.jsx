import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/VerTrabajoAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Imgtrabajo from '../assets/f9.png';
import Imgtrabajo2 from '../assets/f8.png';
import ProteccionRuta from '../ProteccionRuta.jsx';

function VerTrabajoAlumno(){

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
    const usuarioId = usuarioLogueado?.id;

    const [comentarios, setComentarios] = useState([]);
    const { trabajoId, aulaId } = useParams();

    const [trabajo, setTrabajo] = useState(null);
    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
        const obtenerTrabajo = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/edumultipro/Trabajo/${trabajoId}`);
            const data = await res.json();
            setTrabajo(data.trabajo);
            setArchivos(data.archivos);
        } catch (error) {
            console.error("Error al cargar trabajo:", error);
        }
        };

        obtenerTrabajo();
    }, [trabajoId]);


    //Hook para obtener entrega y archivos entregados
    const [entrega, setEntrega] = useState(null);
    const [archivosEntregados, setArchivosEntregados] = useState([]);

    useEffect(() => {
    const obtenerEntrega = async () => {
        try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/TrabajoEntregado/${trabajoId}/${usuarioId}`);
        const data = await res.json();
        setEntrega(data.entrega);
        setArchivosEntregados(data.archivos);
        } catch (error) {
        console.error("Error al obtener entrega:", error);
        }
    };

    if (trabajoId && usuarioId) obtenerEntrega();
    }, [trabajoId, usuarioId]);

    //Funciones para subir y cancelar entrega
    const [archivosEntrega, setArchivosEntrega] = useState(null);

    const handleSubirArchivo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("trabajo_id", trabajoId);
    formData.append("usuario_id", usuarioId);

    for (let i = 0; i < archivosEntrega.length; i++) {
        formData.append("archivo", archivosEntrega[i]);
    }

    try {
        const res = await fetch("http://localhost:3000/api/edumultipro/TrabajoEntregado", {
        method: "POST",
        body: formData,
        });
        const data = await res.json();
        alert(data.mensaje);
        window.location.reload();
    } catch (error) {
        console.error("Error al subir trabajo:", error);
        alert("Error al entregar trabajo");
    }
    };

    const handleCancelarEntrega = async (e) => {
    e.preventDefault();
    if (!window.confirm("¿Estás seguro de cancelar la entrega?")) return;

    try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/TrabajoEntregado/${trabajoId}/${usuarioId}`, {
        method: "DELETE",
        });
        const data = await res.json();
        alert(data.mensaje);
        window.location.reload();
    } catch (error) {
        console.error("Error al cancelar entrega:", error);
        alert("No se pudo cancelar la entrega");
    }
    };

    const obtenerComentarios = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/ComentariosAlum/Trabajo/${trabajoId}`);
        const data = await res.json();
        setComentarios(data);
    } catch (error) {
        console.error("Error al cargar comentarios:", error);
    }
    };

    obtenerComentarios();

    if (!trabajo) return <p>Cargando trabajo...</p>;

    return (
    <>
        <ProteccionRuta rolRequerido="R001" />
        <div className='contenedor'>

            {/*---Nav---*/}
            <Encabezado />

            {/*---Desplegable---*/}
            <DesplegableAlumno />

            {/*---Article---*/}
            <div className="container-fluid" id="centroAlumno">

                {/*---navegador alumno---*/}
                <NavAlumno />

                <div className="col-10" id="contenidoTablaVerTrabajoAlumno">
                    <div className="contenido1VerTrabajoAlumno">
                            <div className="ti">
                                <img src={Imgtrabajo} alt=""/> 
                                <h2>{trabajo.Titulo_Trabajo}</h2>
                            </div>
                            <div className="fecha">
                                <div>
                                    <p>Fecha de Entrega:</p><p>{new Date(trabajo.Fecha_Trabajo).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p>Nota:</p>
                                    <p>{entrega?.Nota != null ? entrega.Nota : "Sin Nota"}</p>
                                </div>
                            </div>
                            <div className="descripcion">
                                <h2 id="desc">Descripcion:</h2>
                                <p>{trabajo.Descripcion_Trabajo}</p>
                            </div>
                            <div className="adjunto">
                                {archivos.map((archivo) => (
                                    <div className="material1" key={archivo.ID}>
                                        <a
                                        href={`http://localhost:3000/imagenes/${archivo.ruta_archivo}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        >
                                        {archivo.nombre_original}
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <div className="mensaje">
                                <img src={Imgtrabajo2}/>
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const descripcion = e.target.comentario.value;
                                    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
                                    const usuarioId = usuarioLogueado?.id;
                                    const fecha = new Date().toISOString().split("T")[0];

                                    try {
                                        const res = await fetch("http://localhost:3000/api/edumultipro/Comentarios", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            descripcion,
                                            trabajo_id: trabajoId,
                                            usuario_id: usuarioId,
                                            fecha
                                        })
                                        });

                                        const data = await res.json();
                                        alert(data.mensaje);
                                        e.target.reset();

                                        // recargar comentarios
                                        const resComentarios = await fetch(`http://localhost:3000/api/edumultipro/ComentariosAlum/Trabajo/${trabajoId}`);
                                        const nuevosComentarios = await resComentarios.json();
                                        setComentarios(nuevosComentarios);

                                    } catch (error) {
                                        console.error("Error al comentar:", error);
                                        alert("Error al crear comentario");
                                    }
                                    }}>
                                    <input name="comentario" placeholder="Escribe tu comentario" required/>
                                    <button type="submit">Comentar</button>
                                </form>
                            </div>
                            {comentarios.map((comentario) => (
                                <div className="comentarioVerTrabajoAlumno" key={comentario.ID}>
                                    <div className="info1">
                                    <div className="foto">
                                        <img
                                        src={`http://localhost:3000/imagenes/${comentario.RutaFoto || 'usuario.png'}`}
                                        alt="Foto"
                                        width="40"
                                        />
                                        <h1>{comentario.Nombre_Usuario}</h1>
                                    </div>
                                    <h2>{new Date(comentario.Fecha).toLocaleDateString()}</h2>
                                    </div>
                                    <div className="desc">
                                    <p>{comentario.Descripcion}</p>
                                    </div>

                                    {comentario.usuario_id === usuarioId && (
                                    <button
                                        onClick={async () => {
                                        if (!window.confirm("¿Estás seguro de eliminar este comentario?")) return;
                                        try {
                                            const res = await fetch(`http://localhost:3000/api/edumultipro/ComentariosAlum/${comentario.ID}?usuario_id=${usuarioId}`, {
                                                method: "DELETE"
                                            });
                                            const data = await res.json();
                                            alert(data.mensaje);
                                            const resComentarios = await fetch(`http://localhost:3000/api/edumultipro/ComentariosAlum/Trabajo/${trabajoId}`);
                                            const nuevosComentarios = await resComentarios.json();
                                            setComentarios(nuevosComentarios);
                                        } catch (error) {
                                            console.error("Error al eliminar comentario:", error);
                                            alert("Error al eliminar comentario");
                                        }
                                        }}
                                        id="eliminarVerTrabajo"
                                    >
                                        Eliminar
                                    </button>
                                    )}
                                </div>
                            ))}
                    </div>
                        <div className="contenido2VerTrabajoAlumno">
                            <div className="subirtr">
                                <h2>Tu trabajo</h2>

                                {entrega ? (
                                <>
                                    <p>Entregado: {new Date(entrega.Fecha_Trabajo).toLocaleDateString()}</p>

                                    {archivosEntregados.map((archivo) => (
                                    <div className="mitrabajo" key={archivo.ID}>
                                        <a href={`http://localhost:3000/imagenes/${archivo.ruta_archivo}`} target="_blank" rel="noreferrer">
                                        {archivo.nombre_original}
                                        </a>
                                    </div>
                                    ))}

                                    <form onSubmit={handleCancelarEntrega}>
                                    <button id="cancelar_entrega" type="submit">Cancelar entrega</button>
                                    </form>
                                </>
                                ) : (
                                <form onSubmit={handleSubirArchivo} encType="multipart/form-data">
                                    <p>Entregado: No entregado</p>
                                    <input id="subVerTrabajoAlumno" type="file" name="archivo" required multiple onChange={(e) => setArchivosEntrega(e.target.files)} />
                                    <button type="submit">Subir Archivo</button>
                                </form>
                                )}
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

export default VerTrabajoAlumno;