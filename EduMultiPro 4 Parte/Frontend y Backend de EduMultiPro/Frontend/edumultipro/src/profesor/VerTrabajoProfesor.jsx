import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt'; // JS
import imgTrabajo from '../assets/f9.png';

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/VerTrabajoProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import ProteccionRuta from '../ProteccionRuta.jsx';


function VerTrabajoProfesor(){ 

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

                    <div class="botonesVerTrabajo">
                        <div className='btn'>
                            <Link><button>Instrucciones</button></Link>
                            <Link to={`/VerTrabajoEntregadoProfesor/${trabajoId}/${aulaId}`}><button>Ver Subidos</button></Link>
                        </div>
                        <Link to={`/TrabajoProfesor/${aulaId}`}><button id="equix"><i className="fa-solid fa-x"></i></button></Link>
                    </div>
                
                    <div className="tituloVerTrabajo">
                        <div>
                            <img src={imgTrabajo} alt=""></img>
                            <h1>{trabajo.Titulo_Trabajo}</h1>
                        </div>
                        <div>
                            <h4>Fecha de entrega</h4>
                            <h4>{new Date(trabajo.Fecha_Trabajo).toLocaleDateString()}</h4>
                        </div>
                    </div>
                
                    <div className="descripcionVerTrabajo">
                        <h3>Descripcion:</h3>
                        <p>{trabajo.Descripcion_Trabajo}</p>
                
                        {archivos.map((archivo) => (
                            <div className="enlace" key={archivo.ID}>
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
                
                    <div className="comentariosVerTrabajo">
                        <p id="titu">Agregar comentarios</p>
                
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
                            <input name="comentario" placeholder="Escribe tu comentario" required />
                            <button type="submit">Comentar</button>
                        </form>
                
                        {comentarios.map((comentario) => (
                        <div className="comentarioVerTrabajo" key={comentario.ID}>
                            <div className="info1">
                                <div className="foto">
                                    <img src={`http://localhost:3000/imagenes/${comentario.RutaFoto || 'usuario.png'}`} alt="Foto" width="40" />
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

                </div>
            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default VerTrabajoProfesor;