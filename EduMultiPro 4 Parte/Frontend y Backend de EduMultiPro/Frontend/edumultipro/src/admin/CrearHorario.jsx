import { useEffect, useState } from 'react'; // datatables
import { useNavigate } from 'react-router-dom';

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearHorario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function CrearHorario(){

  const [profesores, setProfesores] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    imagen: null,
    profesor_id: "",
    curso_id: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      const resProfesores = await fetch("http://localhost:3000/api/edumultipro/Profesores");
      const profesoresData = await resProfesores.json();
      setProfesores(profesoresData);

      const resCursos = await fetch("http://localhost:3000/api/edumultipro/Cursos-jornada");
      const cursosData = await resCursos.json();
      setCursos(cursosData);
    };
    fetchDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setFormulario({ ...formulario, imagen: files[0] });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { titulo, descripcion, imagen, profesor_id, curso_id } = formulario;

    // Validación
    const profesorSeleccionado = profesor_id !== "";
    const cursoSeleccionado = curso_id !== "";
    if ((profesorSeleccionado && cursoSeleccionado) || (!profesorSeleccionado && !cursoSeleccionado)) {
      return alert("Debes seleccionar **solo un profesor** o **solo un curso**, pero no ambos.");
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);
    formData.append("profesor_id", profesor_id);
    formData.append("curso_id", curso_id);

    try {
    const res = await fetch("http://localhost:3000/api/edumultipro/Horarios", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      // Si hubo error, mostramos el mensaje del backend
      return alert(data.error || "Error desconocido al crear horario");
    }

    alert(data.mensaje || "Horario creado correctamente");
    navigate("/Horario");
  } catch (error) {
    console.error("Error al crear horario:", error);
    alert("Hubo un error al guardar el horario");
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

                            <div className="tituloCrearHorario">
                                <h1>Subir Horario</h1>
                                <Link to={"/Horario"}>
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoCrearHorario">
                    
                              <form onSubmit={handleSubmit}>
                                <input type="text" name="titulo" maxLength="100" placeholder="Título del Horario" required onChange={handleChange} />
                                <textarea name="descripcion" maxLength="500" placeholder="Descripción del Horario" required onChange={handleChange}></textarea>

                                <input type="file" name="imagen" accept="image/png, image/jpeg, application/pdf" onChange={handleChange} />

                                <select name="profesor_id" value={formulario.profesor_id} onChange={handleChange}>
                                  <option value="">Selecciona un profesor (opcional)</option>
                                  {profesores.map((profesor) => (
                                    <option key={profesor.ID} value={profesor.ID}>
                                      {profesor.Nombre_Completo}
                                    </option>
                                  ))}
                                </select>

                                <select id='selecCurso' name="curso_id" value={formulario.curso_id} onChange={handleChange}>
                                  <option value="">Selecciona un curso (opcional)</option>
                                  {cursos.map((curso) => (
                                    <option key={curso.ID} value={curso.ID}>
                                      {curso.Curso_Con_Jornada}
                                    </option>
                                  ))}
                                </select>

                                <button type="submit">Crear horario</button>
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

export default CrearHorario;