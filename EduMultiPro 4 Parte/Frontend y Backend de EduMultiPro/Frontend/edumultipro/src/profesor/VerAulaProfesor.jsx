import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/VerAulaProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import ProteccionRuta from '../ProteccionRuta.jsx';


function VerAulaProfesor(){ 

    // obtener el usuario logueado del localStorage
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
    const usuarioId = usuarioLogueado?.id; // null si no existe
    const { id } = useParams();
    const [aula, setAula] = useState(null);
    const [anuncios, setAnuncios] = useState([]);
    const [mostrarFormularioAnuncio, setMostrarFormularioAnuncio] = useState(false);
    const [nuevoAnuncio, setNuevoAnuncio] = useState({
    titulo: '',
    descripcion: '',
    archivos: null,
    });

    const [anuncioEditandoId, setAnuncioEditandoId] = useState(null);
    const [anuncioEditado, setAnuncioEditado] = useState({
    titulo: '',
    descripcion: '',
    archivos: null,
    });
    const handleMostrarEditar = (anuncio) => {
    setAnuncioEditandoId(anuncio.ID);
    setAnuncioEditado({
        titulo: anuncio.Titulo_Anuncio,
        descripcion: anuncio.Descripcion_Anuncio,
        archivos: null
    });
    };

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

    //crear anuncio
    const handleCrearAnuncio = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", nuevoAnuncio.titulo);
    formData.append("descripcion", nuevoAnuncio.descripcion);
    formData.append("aula_id", aula.ID);
    formData.append("usuario_id", usuarioId); // puedes reemplazar con el ID del usuario logueado

    if (nuevoAnuncio.archivos) {
        for (let i = 0; i < nuevoAnuncio.archivos.length; i++) {
            formData.append("archivo", nuevoAnuncio.archivos[i]);
        }
    }

    try {
        const res = await fetch("http://localhost:3000/api/edumultipro/Anuncios", {
        method: "POST",
        body: formData,
        });

        const data = await res.json();
        alert(data.mensaje);
        setMostrarFormularioAnuncio(false);
        setNuevoAnuncio({ titulo: '', descripcion: '', archivos: null });
        // Recargar los anuncios
        const resAnuncios = await fetch(`http://localhost:3000/api/edumultipro/Anuncios/Aula/${id}`);
        const dataAnuncios = await resAnuncios.json();
        setAnuncios(dataAnuncios);
    } catch (error) {
        console.error("Error al crear el anuncio:", error);
        alert("Error al crear anuncio");
    }
    };

    //eliminar anuncio
    const handleEliminarAnuncio = async (idAnuncio) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este anuncio?")) return;

    try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Anuncios/${idAnuncio}`, {
        method: "DELETE",
        });

        const data = await res.json();
        alert(data.mensaje);

        // Recargar los anuncios actualizados
        const resAnuncios = await fetch(`http://localhost:3000/api/edumultipro/Anuncios/Aula/${id}`);
        const dataAnuncios = await resAnuncios.json();
        setAnuncios(dataAnuncios);
    } catch (error) {
        console.error("Error al eliminar el anuncio:", error);
        alert("No se pudo eliminar el anuncio.");
    }
    };
    //editar anuncio
    const handleModificarAnuncio = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", anuncioEditado.titulo);
    formData.append("descripcion", anuncioEditado.descripcion);
    if (anuncioEditado.archivos) {
        for (let i = 0; i < anuncioEditado.archivos.length; i++) {
        formData.append("archivo", anuncioEditado.archivos[i]);
        }
    }

    try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Anuncios/${anuncioEditandoId}`, {
        method: "PUT",
        body: formData,
        });
        const data = await res.json();
        alert(data.mensaje);
        setAnuncioEditandoId(null);
        
        // Recargar anuncios
        const resAnuncios = await fetch(`http://localhost:3000/api/edumultipro/Anuncios/Aula/${id}`);
        const dataAnuncios = await resAnuncios.json();
        setAnuncios(dataAnuncios);
    } catch (error) {
        console.error("Error al modificar el anuncio:", error);
        alert("No se pudo modificar el anuncio.");
    }
    };

    if (!aula) return <div className="cargando">Cargando aula...</div>;

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
                <div className="row" id="navAula">

                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/VerAulaProfesor/${aula.ID}`}><button id="principal">Principal</button></Link></div>
                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/TrabajoProfesor/${aula.ID}`}><button id="trabajo">Trabajos</button></Link></div>
                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/NotaProfesor/${aula.ID}`}><button id="nota">Notas</button></Link></div>
                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/PersonasProfesor/${aula.ID}`}><button id="persona">Personas</button></Link></div>
                    <div className="col-12 col-md-4 col-xl-4"></div>

                </div>

                <div className="row" id="banerAula">
                    <div className="row" id="tituloAula">
                        <h2>{aula.Aula_Nombre}</h2>
                    </div>
                    <div className="row" id="codigoAula">
                        <h4>Profesor: {aula.Profesor}</h4>
                    </div>  
                </div>

                <div className="row" id="novedadAula">
                    <div className="col-md-6 col-xl-6"><h2>Novedades</h2></div>
                    <div className="col-md-6 col-xl-6" id="canuncioAula"><button id="btn-crear" onClick={() => setMostrarFormularioAnuncio(true)}>Crear Anuncio</button></div>
                </div>

                {/*-- <!--Crear anuncio-----------------------------------------> --*/}

                {/*-- <!--Crear anuncio-----------------------------------------> --*/}
                            
                {mostrarFormularioAnuncio && (
                <div className="crearAnuncio" id="crearAnuncio">
                    <h1>Crear Anuncio</h1>
                    <form onSubmit={handleCrearAnuncio} encType="multipart/form-data">
                        <input type="hidden" name="aula_id" value={aula.ID} />

                        <input
                            type="text"
                            name="titulo"
                            placeholder="Título del anuncio"
                            required
                            value={nuevoAnuncio.titulo}
                            onChange={(e) => setNuevoAnuncio({ ...nuevoAnuncio, titulo: e.target.value })}
                        />

                        <textarea
                            name="descripcion"
                            placeholder="Descripción del anuncio"
                            rows="4"
                            required
                            value={nuevoAnuncio.descripcion}
                            onChange={(e) => setNuevoAnuncio({ ...nuevoAnuncio, descripcion: e.target.value })}
                        ></textarea>

                        <input
                            type="file"
                            name="archivo"
                            multiple
                            onChange={(e) => setNuevoAnuncio({ ...nuevoAnuncio, archivos: e.target.files })}
                        />

                        <button type="submit" className="btn-guardar" id="btn-guardar">Publicar anuncio</button>
                        <button type="button" className="btn-cancelarAnuncio" id="btn-cancelar" onClick={() => setMostrarFormularioAnuncio(false)}>Cancelar</button>
                    </form>
                </div>
                )}

                {anuncios.map((anuncio) => (
                    <div className="anuncioAula" key={anuncio.ID}>
                        <div className="info">

                            <div className="info1">
                                <div className="foto">
                                <img className="img-fluid" src={`http://localhost:3000/imagenes/${anuncio.RutaFoto || 'usuario.png'}`} alt="" id="img1" />
                                <h1>{anuncio.Profesor}</h1>
                                </div>
                                <h2>{new Date(anuncio.Fecha_Anuncio).toLocaleDateString()}</h2>
                            </div>

                            <div className="control">
                                <button className="b1" onClick={() => handleMostrarEditar(anuncio)}>Modificar</button>

                                <button
                                    className="btn-icon eliminar"
                                    onClick={() => handleEliminarAnuncio(anuncio.ID)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <div className="descripcion">
                            <h2>{anuncio.Titulo_Anuncio}</h2>
                            <p>{anuncio.Descripcion_Anuncio}</p>
                        </div>
                        
                        {anuncio.Enlace_Anuncio && anuncio.Enlace_Anuncio.split(";").map((enlace, i) => (
                            <a key={i} href={`http://localhost:3000/imagenes/${enlace}`} target="_blank" rel="noreferrer">Ver archivo</a>
                        ))}

                        <div className="botones">
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
                            <input type="text" name="comentario" placeholder="Comentar" required />
                            <button type="submit" id="principal">Enviar</button>
                            </form>
                        </div>

                        {/*-- <!--Modificar anuncio-----------------------------------------> --*/}
                        
                        {anuncioEditandoId === anuncio.ID && (
                        <div className="modificarAnuncio">
                            <h1>modificar Anuncio</h1>
                            <form onSubmit={handleModificarAnuncio} encType="multipart/form-data">
                                <input
                                    type="text"
                                    name="titulo"
                                    value={anuncioEditado.titulo}
                                    onChange={(e) => setAnuncioEditado({ ...anuncioEditado, titulo: e.target.value })}
                                    required
                                />
                                <textarea
                                    name="descripcion"
                                    value={anuncioEditado.descripcion}
                                    onChange={(e) => setAnuncioEditado({ ...anuncioEditado, descripcion: e.target.value })}
                                    required
                                />
                                <input
                                    type="file"
                                    name="archivo"
                                    multiple
                                    onChange={(e) => setAnuncioEditado({ ...anuncioEditado, archivos: e.target.files })}
                                />
                                <button type="submit">Guardar cambios</button>
                                <button type="button" className="btn-cancelarmod" onClick={() => setAnuncioEditandoId(null)}>Cancelar</button>
                            </form>
                        </div>
                        )}

                        {/*-- <!--comentarios-----------------------------------------> --*/}

                        {comentarios[anuncio.ID] && comentarios[anuncio.ID].map((comentario) => (
                        <div className="comentario">
                            <div className="info1">
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

export default VerAulaProfesor;