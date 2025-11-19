import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerTrabajo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import imgTrabajo from '../assets/f9.png';

function VerTrabajo(){

    return(
        <>
=======
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imgTrabajo from '../assets/f9.png';
import ProteccionRuta from '../ProteccionRuta.jsx';

function VerTrabajo(){

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
        const res = await fetch(`http://localhost:3000/api/edumultipro/Comentarios/Trabajo/${trabajoId}`);
        const data = await res.json();
        setComentarios(data);
    } catch (error) {
        console.error("Error al cargar comentarios:", error);
    }
    };

    obtenerComentarios();

    if (!trabajo) return <p>Cargando trabajo...</p>;

    return(
        <>
            <ProteccionRuta rolRequerido="R004" />
>>>>>>> origin/ramajohan
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
                        <div className="col-10" id="contenidoVerTrabajo">

                            <div class="botonesVerTrabajo">
                                <div className='btn'>
<<<<<<< HEAD
                                    <Link to={"/VerTrabajo"}><button>Instrucciones</button></Link>
                                    <Link to={"/VerTrabajoEntregado"}><button>Ver Subidos</button></Link>
                                </div>
                                <Link to={"/Trabajos"}><button id="equix"><i className="fa-solid fa-x"></i></button></Link>
=======
                                    <Link><button>Instrucciones</button></Link>
                                    <Link to={`/VerTrabajoEntregado/${trabajoId}/${aulaId}`}><button>Ver Subidos</button></Link>
                                </div>
                                <Link to={`/Trabajos/${aulaId}`}><button id="equix"><i className="fa-solid fa-x"></i></button></Link>
>>>>>>> origin/ramajohan
                            </div>

                            <div className="tituloVerTrabajo">
                                <div>
                                    <img src={imgTrabajo} alt=""></img>
<<<<<<< HEAD
                                    <h1> trabajo.Titulo_Trabajo </h1>
                                </div>
                                <div>
                                    <h4>Fecha de entrega</h4>
                                    <h4>17/89/56</h4>
=======
                                    <h1>{trabajo.Titulo_Trabajo}</h1>
                                </div>
                                <div>
                                    <h4>Fecha de entrega</h4>
                                    <h4>{new Date(trabajo.Fecha_Trabajo).toLocaleDateString()}</h4>
>>>>>>> origin/ramajohan
                                </div>
                            </div>

                            <div className="descripcionVerTrabajo">
                                <h3>Descripcion:</h3>
<<<<<<< HEAD
                                <p> trabajo.Descripcion_Trabajo </p>

                                {/*-- % for archivo in archivos % --*/}
                                <div className="enlace">
                                    <a href="{{ url_for('static', filename=archivo.ruta_archivo) }}" target="_blank"> archivo.nombre_original </a>
                                </div>
                                {/*-- % endfor % --*/}
=======
                                <p>{trabajo.Descripcion_Trabajo}</p>

                                {archivos.map((archivo) => (
                                    <div className="enlace" key={archivo.ID}>
                                        <a
                                        href={`http://localhost:3000/imagenes//${archivo.ruta_archivo}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        >
                                        {archivo.nombre_original}
                                        </a>
                                    </div>
                                ))}
>>>>>>> origin/ramajohan
                            </div>

                            <div className="comentariosVerTrabajo">
                                <p id="titu">Agregar comentarios</p>

<<<<<<< HEAD
                                <form action="{{ url_for('admin2_bp.comentar_trabajo', trabajo_id=trabajo_id, aula_id=aula_id) }}" method="POST">
                                <input name="comentario" placeholder="Escribe tu comentario" required />
                                <button type="submit">Comentar</button>
                                </form>

                                {/*-- % for comentario in comentarios_trabajo % --*/}
                                <div className="comentarioVerTrabajo">
                                    <div className="info1">
                                        <div className="foto">
                                            <img src={imgTrabajo} alt="Foto" width="40"></img>
                                            <h1> comentario.Comentador </h1>
                                        </div>
                                        <h2> 76/65/65 </h2>
                                    </div>
                                    <div className="desc">
                                    <p> comentario.comentario </p>
                                    </div>
                                    <form action="{{ url_for('admin2_bp.eliminar_comentario_trabajo', id=comentario.comentario_id, trabajo_id=trabajo_id, aula_id=aula_id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de eliminar este comentario?')">
                                    <button type="submit" id='eliminarVerTrabajo'>Eliminar</button>
                                    </form>
                                </div>
                                {/*-- % endfor % --*/}
=======
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
                                        const resComentarios = await fetch(`http://localhost:3000/api/edumultipro/Comentarios/Trabajo/${trabajoId}`);
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
                                    <button
                                        onClick={async () => {
                                            if (!window.confirm("¿Estás seguro de eliminar este comentario?")) return;
                                            try {
                                            const res = await fetch(`http://localhost:3000/api/edumultipro/Comentarios/${comentario.ID}`, {
                                                method: "DELETE"
                                            });
                                            const data = await res.json();
                                            alert(data.mensaje);
                                            // Recargar comentarios
                                            const resComentarios = await fetch(`http://localhost:3000/api/edumultipro/Comentarios/Trabajo/${trabajoId}`);
                                            const nuevosComentarios = await resComentarios.json();
                                            setComentarios(nuevosComentarios);
                                            } catch (error) {
                                            console.error("Error al eliminar comentario:", error);
                                            alert("Error al eliminar comentario");
                                            }
                                        }}
                                        id='eliminarVerTrabajo'
                                        >
                                        Eliminar
                                    </button>
                                </div>
                                ))}
>>>>>>> origin/ramajohan
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
export default VerTrabajo;