import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/VerAulaAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProteccionRuta from '../ProteccionRuta.jsx';

function VerAulaAlumno(){

    // obtener el usuario logueado del localStorage
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
    const usuarioId = usuarioLogueado?.id; // null si no existe
    const { id } = useParams();
    const [aula, setAula] = useState(null);
    const [anuncios, setAnuncios] = useState([]);

    //ver comentario
    const [comentarios, setComentarios] = useState({});
    

    useEffect(() => {
        const obtenerAula = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/edumultipro/Aulas/${id}`);
            const data = await res.json();
            setAula(data);
        } catch (err) {
            console.error("Error al obtener los datos del aula:", err);
        }
        };
        obtenerAula();
    }, [id]);

    useEffect(() => {
        const obtenerAulaYAnuncios = async () => {
            try {
                const resAula = await fetch(`http://localhost:3000/api/edumultipro/Aulas/${id}`);
                const dataAula = await resAula.json();
                setAula(dataAula);

                const resAnuncios = await fetch(`http://localhost:3000/api/edumultipro/Anuncios/Aula/${id}`);
                const dataAnuncios = await resAnuncios.json();
                setAnuncios(dataAnuncios);

                // Obtener comentarios por cada anuncio
                const comentariosPorAnuncio = {};
                for (const anuncio of dataAnuncios) {
                    const resComentarios = await fetch(`http://localhost:3000/api/edumultipro/ComentariosAlum/Anuncio/${anuncio.ID}`);
                    const dataComentarios = await resComentarios.json();
                    comentariosPorAnuncio[anuncio.ID] = dataComentarios;
                }
                setComentarios(comentariosPorAnuncio);
            } catch (err) {
                console.error("Error al obtener datos del aula o anuncios:", err);
            }
        };
        obtenerAulaYAnuncios();
    }, [id]);

    if (!aula) return <div className="cargando">Cargando aula...</div>;

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
                
                <div className="col-10" id="contenidoTablaAulaAlumno">

                    <div className="row" id="navAulaAlumno">

                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/VerAulaAlumno/${aula.ID}`}><button id="principal">Pricipal</button></Link></div>
                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/TrabajoAlumno/${aula.ID}`}><button id="trabajo">Trabajos</button></Link></div>
                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/PersonaAlumno/${aula.ID}`}><button id="persona">Personas</button></Link></div>
                    <div className="col-12 col-md-4 col-xl-4"></div>

                    </div>
                    
                    <div className="row" id="banerAulaAlumno">
                        <div className="row" id="tituloAulaAlumno">
                            <h2>{aula.Aula_Nombre}</h2>
                        </div>
                        <div className="row" id="codigoAulaAlumno">
                            <h4>Profesor: {aula.Profesor}</h4>
                        </div>
                    </div>

                    <div className="row" id="novedadAulaAlumno">
                        <div className="col-md-6 col-xl-6"><h2>Novedades</h2></div>
                    </div>

                    {anuncios.map((anuncio) => (
                        <div className="anuncioAulaAlumno" key={anuncio.ID}>

                            <div className="infoAulaAlumno">
                                <div className="info1">
                                    <div className="foto">
                                        <img className="img-fluid" src={`http://localhost:3000/imagenes/${anuncio.RutaFoto || 'usuario.png'}`} alt="" id="img1" />
                                        <h1>{anuncio.Profesor}</h1>
                                    </div>
                                    <h2>{new Date(anuncio.Fecha_Anuncio).toLocaleDateString()}</h2>
                                </div>
                            </div>

                            <div className="descripcionAulaAlumno">
                                <h2>{anuncio.Titulo_Anuncio}</h2>
                                <p>{anuncio.Descripcion_Anuncio}</p>
                            </div>

                            {anuncio.Enlace_Anuncio && anuncio.Enlace_Anuncio.split(";").map((enlace, i) => (
                                <a key={i} href={`http://localhost:3000/imagenes/${enlace}`} target="_blank" rel="noreferrer" id='enlaceAnuncio2'>Ver archivo</a>
                            ))}

                            <div className="botonesAulaAlumno">

                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const input = e.target.comentario;
                                    const descripcion = input.value;                            
                                    try {
                                    const res = await fetch("http://localhost:3000/api/edumultipro/Comentarios", {
                                        method: "POST",
                                        headers: {
                                        "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                        descripcion,
                                        anuncio_id: anuncio.ID,
                                        usuario_id: usuarioId
                                        })
                                    });                         
                                    const data = await res.json();
                                    alert(data.mensaje);                            
                                    // Recargar los comentarios solo para ese anuncio
                                    const resComentarios = await fetch(`http://localhost:3000/api/edumultipro/ComentariosAlum/Anuncio/${anuncio.ID}`);
                                    const nuevosComentarios = await resComentarios.json();
                                    setComentarios(prev => ({
                                        ...prev,
                                        [anuncio.ID]: nuevosComentarios
                                    }));                            
                                    input.value = "";
                                    } catch (err) {
                                    console.error("Error al comentar:", err);
                                    alert("Error al crear comentario");
                                    }
                                }}>
                                    <input type="text" name="comentario" placeholder="Comentar" required/>
                                    <button type="submit" id="principal">Enviar</button>
                                </form>
                            </div>

                            {/*<!--comentarios----------------------------------------->*/}

                            {comentarios[anuncio.ID] && comentarios[anuncio.ID].map((comentario) => (
                            <div className="comentarioAulaAlumno">
                                <div className="info1AulaAlumno">
                                    <div className="fotoComentario">
                                        <img src={`http://localhost:3000/imagenes/${comentario.RutaFoto || 'usuario.png'}`} alt="" />
                                        <h1>{comentario.Nombre_Usuario}</h1>
                                    </div>
                                    <h2>{new Date(comentario.Fecha).toLocaleDateString()}</h2>
                                </div>
                                <div className="desc">
                                    <p>{comentario.Descripcion}</p>
                                </div>
                                {comentario.usuario_id === usuarioId && (
                                <button
                                    className="btn-icon eliminar"
                                    onClick={async () => {
                                        if (!window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) return;
                                        try {
                                        const res = await fetch(`http://localhost:3000/api/edumultipro/ComentariosAlumAnuncio/${comentario.ID}?usuario_id=${usuarioId}`, {
                                            method: "DELETE"
                                        });
                                        const data = await res.json();
                                        alert(data.mensaje);

                                        // 👇 Cambiar esto a la nueva ruta
                                        const resComentarios = await fetch(`http://localhost:3000/api/edumultipro/ComentariosAlum/Anuncio/${anuncio.ID}`);
                                        const nuevosComentarios = await resComentarios.json();
                                        setComentarios(prev => ({
                                            ...prev,
                                            [anuncio.ID]: nuevosComentarios
                                        }));
                                        } catch (error) {
                                        console.error("Error al eliminar el comentario:", error);
                                        alert("No se pudo eliminar el comentario.");
                                        }
                                    }}
                                    >
                                    Eliminar
                                </button>
                                )}
                            </div>
                            ))}

                        </div>
                    ))}

                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default VerAulaAlumno;