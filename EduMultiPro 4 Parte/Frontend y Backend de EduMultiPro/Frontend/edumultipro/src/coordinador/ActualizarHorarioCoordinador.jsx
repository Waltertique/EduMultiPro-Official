import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/ActualizarHorarioCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos

import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function ActualizarHorarioCoordinador(){

    const { id } = useParams();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    imagen: null,
    profesor_id: "",
    curso_id: "",
    imagenActual: ""
  });
  const [profesores, setProfesores] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const [hp, hs, cps] = await Promise.all([
        fetch(`http://localhost:3000/api/edumultipro/Horarios/${id}`).then(r => r.json()),
        fetch("http://localhost:3000/api/edumultipro/Profesores").then(r => r.json()),
        fetch("http://localhost:3000/api/edumultipro/Cursos-jornada").then(r => r.json()),
      ]);

      setFormulario({
        titulo: hp.Titulo_Horario,
        descripcion: hp.Descripcion_Horario,
        imagen: null,
        profesor_id: hp.profesor_id || "",
        curso_id: hp.curso_id || "",
        imagenActual: hp.Imagen_Horario || ""
      });
      setProfesores(hs);
      setCursos(cps);
    };
    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: name === "imagen" ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { titulo, descripcion, profesor_id, curso_id, imagen } = formulario;
    const profSel = profesor_id !== "";
    const curSel = curso_id !== "";
    if ((profSel && curSel) || (!profSel && !curSel)) {
      return alert("Selecciona solo profesor o solo curso");
    }
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("profesor_id", profesor_id);
    formData.append("curso_id", curso_id);
    if (imagen) formData.append("imagen", imagen);

    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/Horarios/${id}`, {
        method: "PUT",
        body: formData
      });
      const datos = await res.json();
      if (!res.ok) {
        return alert(datos.error || "Error al actualizar");
      }
      alert(datos.mensaje || "Actualizado correctamente");
      navigate("/HorarioCoordinador");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };
    
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

                            <div className="tituloActualizarHorario">
                                <h1>Modificar Horario</h1>
                                <Link to={"/HorarioCoordinador"}>
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoActualizarHorario">
                    
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <input type="text" name="titulo" value={formulario.titulo} onChange={handleChange} required />
                                    <textarea name="descripcion" value={formulario.descripcion} onChange={handleChange} required />
                                    {formulario.imagenActual && (
                                      <>
                                        <p>Horario actual:</p>
                                        {formulario.imagenActual.toLowerCase().endsWith(".pdf") ? (
                                          <iframe
                                            src={`http://localhost:3000/imagenes/${formulario.imagenActual}`}
                                            title="Horario PDF actual"
                                            width="100%"
                                            height="300px"
                                            style={{
                                              border: "2px solid #ccc",
                                              borderRadius: "10px",
                                              marginBottom: "15px"
                                            }}
                                          />
                                        ) : (
                                          <img
                                            src={`http://localhost:3000/imagenes/${formulario.imagenActual}`}
                                            width="200"
                                            alt="Horario actual"
                                            style={{ borderRadius: "10px", marginBottom: "15px" }}
                                          />
                                        )}
                                      </>
                                    )}
                                    <input type="file" name="imagen" accept="image/png, image/jpeg, application/pdf" onChange={handleChange} />
                                    <select name="profesor_id" value={formulario.profesor_id} onChange={handleChange}>
                                    <option value="">-- Sin profesor --</option>
                                    {profesores.map(p => <option key={p.ID} value={p.ID}>{p.Nombre_Completo}</option>)}
                                    </select>
                                    <select name="curso_id" value={formulario.curso_id} onChange={handleChange}>
                                    <option value="">-- Sin curso --</option>
                                    {cursos.map(c => <option key={c.ID} value={c.ID}>{c.Curso_Con_Jornada}</option>)}
                                    </select>
                                    <button type="submit">Guardar cambios</button>
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

export default ActualizarHorarioCoordinador;