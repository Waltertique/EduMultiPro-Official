import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/PrincipalCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function PrincipalCoordinador(){

    const [cursos, setCursos] = useState([]);

  // Obtener cursos
  const obtenerCursos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/edumultipro/Cursos");
      const data = await res.json();
      setCursos(data);
    } catch (err) {
      console.error("Error al obtener cursos:", err);
    }
  };

  // Inicializar DataTable
  const inicializarDataTable = () => {
    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
      $('#tablaUsuarios').DataTable().destroy();
    }

    $('#tablaUsuarios').DataTable({
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 a 0 de 0 registros",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        loadingRecords: "Cargando...",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "No hay datos en la tabla",
        paginate: {
          previous: "Anterior",
          next: "Siguiente"
        },
        aria: {
          sortAscending: ": activar para ordenar la columna ascendente",
          sortDescending: ": activar para ordenar la columna descendente"
        }
      }
    });
  };

  // Eliminar curso
  const eliminarCurso = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este curso?");
    if (!confirmacion) return;

    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
      $('#tablaUsuarios').DataTable().destroy();
    }

    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/Cursos/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.mensaje);

      const nuevosCursos = cursos.filter((curso) => curso.ID !== id);
      setCursos(nuevosCursos);
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      alert("Hubo un error al intentar eliminar el curso.");
    }
  };

  // Modificar curso
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [grados, setGrados] = useState([]);
  const [jornadas, setJornadas] = useState([]);

  const obtenerGrados = async () => {
  const res = await fetch("http://localhost:3000/api/edumultipro/Grados");
  const data = await res.json();
  setGrados(data);
  };

  const obtenerJornadas = async () => {
  const res = await fetch("http://localhost:3000/api/edumultipro/Jornadas");
  const data = await res.json();
  setJornadas(data);
  };

  useEffect(() => {
    obtenerCursos();
  }, []);

  useEffect(() => {
    if (cursos.length > 0) {
      setTimeout(() => {
        inicializarDataTable();
      }, 100);
    }
  }, [cursos]);

  useEffect(() => {
  obtenerCursos();
  obtenerGrados();
  obtenerJornadas();
  }, []);

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

                            <div className="carda">

                                <Link to="/materiaCoordinador" ><div className="targeta"><i className="fa-solid fa-book"></i><h1>Materia</h1></div></Link>
                                
                                <Link to="/gradoCoordinador" ><div className="targeta"><i className="fa-solid fa-temperature-low"></i><h1>Grado</h1></div></Link>

                                <Link to="/jornadaCoordinador" ><div className="targeta"><i className="fa-solid fa-clock"></i><h1>Jornada</h1></div></Link>

                            </div>

                            <div className="titulo5">
                                <h1>Cursos Actuales</h1>
                                <Link to={"/CrearCursoCoordinador"}>
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Crear Curso</button>
                                </Link>
                            </div>

                            {/*---Modificar Curso---*/}

                            {mostrarFormulario && cursoSeleccionado && (
                            <div className="modificarCurso" id="modificarCurso">
                                <h1>Modificar Curso</h1>
                                <form onSubmit={async (e) => {
                                  e.preventDefault();
                                  const res = await fetch(`http://localhost:3000/api/edumultipro/Cursos/${cursoSeleccionado.ID}`, {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      Curso_Nombre: cursoSeleccionado.Curso_Nombre,
                                      grado_id: cursoSeleccionado.grado_id,
                                      jornada_id: cursoSeleccionado.jornada_id,
                                    }),
                                  });
                                  const data = await res.json();
                                  alert(data.mensaje || "Curso actualizado");

                                  setMostrarFormulario(false);
                                  obtenerCursos(); // actualizar tabla
                                }}> 

                                    <input
                                      type="text"
                                      id="editarNombre"
                                      name="Curso_Nombre"
                                      maxLength="50"
                                      placeholder="Nombre del curso"
                                      value={cursoSeleccionado.Curso_Nombre}
                                      onChange={(e) =>
                                        setCursoSeleccionado({ ...cursoSeleccionado, Curso_Nombre: e.target.value })
                                      }
                                      required
                                    />
                                    
                                    <select
                                      id='editarGrado'
                                      name="grado"
                                      value={cursoSeleccionado.grado_id}
                                      onChange={(e) =>
                                        setCursoSeleccionado({ ...cursoSeleccionado, grado_id: parseInt(e.target.value) })
                                      }
                                      required
                                    >
                                      <option value="">Seleccione grado</option>
                                      {grados.map((grado) => (
                                        <option key={grado.ID} value={grado.ID}>
                                          {grado.Grado_Nombre}
                                        </option>
                                      ))}
                                    </select>

                                    <select
                                    id='editarJornada'
                                      name="jornada"
                                      value={cursoSeleccionado.jornada_id}
                                      onChange={(e) =>
                                        setCursoSeleccionado({ ...cursoSeleccionado, jornada_id: parseInt(e.target.value) })
                                      }
                                      required
                                    >
                                      <option value="">Seleccione jornada</option>
                                      {jornadas.map((jornada) => (
                                        <option key={jornada.ID} value={jornada.ID}>
                                          {jornada.Jornada_Nombre}
                                        </option>
                                      ))}
                                    </select>

                                    <button type="submit" className="btn-guardar1">Guardar cambios</button>
                                    <button type="button" className="btn-cancelar1" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                                </form>
                            </div>
                            )}

                            <div className="contenedor-tabla">
                                <table className="tablaUsuarios" id="tablaUsuarios">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Curso</th>
                                            <th>Grado</th>
                                            <th>Jornada</th>
                                            <th>Información</th>
                                            <th>Modificar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cursos.map((curso) => (
                                        <tr key={curso.ID}>
                                            <td>{curso.ID}</td>
                                            <td>{curso.Curso_Nombre}</td>
                                            <td>{curso.Grado_Nombre}</td>
                                            <td>{curso.Jornada_Nombre}</td>
                                            <td>
                                            <Link to={`/VerCursoCoordinador/${curso.ID}`}>
                                                <button type="button" className="informacion" id="btninformacion">
                                                <i className="fa-solid fa-circle-info"></i>
                                                </button>
                                            </Link>
                                            </td>
                                            <td>
                                            <button className="modificar" onClick={() => {setCursoSeleccionado(curso); setMostrarFormulario(true);}}>
                                                <i className="fa-solid fa-gear"></i>
                                            </button>
                                            </td>
                                            <td>
                                            <button className="btn-icon eliminar" type="button" onClick={() => eliminarCurso(curso.ID)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
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
export default PrincipalCoordinador;