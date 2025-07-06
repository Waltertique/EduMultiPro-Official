import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/ClaseProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function ClaseProfesor(){ 

    const [aulas, setAulas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [aulaSeleccionada, setAulaSeleccionada] = useState(null);
    const [materias, setMaterias] = useState([]);

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
    const usuarioId = usuarioLogueado?.id;

    // Obtener Aulas del usuario
    const obtenerAulas = async () => {
        try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Aulas/usuario/${usuarioId}`);
        const data = await res.json();
        setAulas(data);
        } catch (err) {
        console.error("Error al obtener Aulas del usuario:", err);
        }
    };

    const obtenerMaterias = async () => {
        try {
        const res = await fetch("http://localhost:3000/api/edumultipro/Materias");
        const data = await res.json();
        setMaterias(data);
        } catch (err) {
        console.error("Error al obtener materias:", err);
        }
    };

    const inicializarDataTable = () => {
        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
        $('#tablaUsuarios').DataTable().destroy();
        }

        $('#tablaUsuarios').DataTable({
        language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 a 0 de 0 registros",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "No hay datos en la tabla",
            paginate: {
            previous: "Anterior",
            next: "Siguiente"
            },
        }
        });
    };

    const eliminarAula = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este Aula?");
        if (!confirmacion) return;

        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
        $('#tablaUsuarios').DataTable().destroy();
        }

        try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Aulas/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();
        alert(data.mensaje);

        const nuevasAulas = aulas.filter((aula) => aula.ID !== id);
        setAulas(nuevasAulas);
        } catch (error) {
        console.error("Error al eliminar el Aula:", error);
        alert("Hubo un error al intentar eliminar el Aula.");
        }
    };

    const handleModificarClick = (aula) => {
        setAulaSeleccionada(aula);
        setMostrarFormulario(true);
    };

    const cancelarEdicionAula = () => {
        setMostrarFormulario(false);
        setAulaSeleccionada(null);
    };

    const guardarCambios = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Aulas/${aulaSeleccionada.ID}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(aulaSeleccionada)
        });

        const data = await res.json();
        alert(data.mensaje || "Aula modificada con éxito");

        obtenerAulas(); // Actualizar la lista
        setMostrarFormulario(false); // Cerrar el formulario
        } catch (err) {
        console.error("Error al modificar aula:", err);
        alert("Error al modificar aula.");
        }
    };

    useEffect(() => {
        obtenerAulas();
        obtenerMaterias();
    }, []);

    useEffect(() => {
        if (aulas.length > 0) {
        setTimeout(() => {
            inicializarDataTable();
        }, 100);
        }
    }, [aulas]);


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
                
                <div className="tituloAulaProfesor">
                    <h1>Mis Aulas</h1>
                    <Link to={"/CrearAulaProfesor"}>
                        <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Crear Aula</button>
                    </Link>
                </div>

                {mostrarFormulario && aulaSeleccionada && (
                    <div className="modificarAulaProfesor" id="modificarAulaProfesor">
                        <h1>Modificar Aula</h1>
                        <form onSubmit={guardarCambios}>
                            <input type="hidden" value={aulaSeleccionada.ID} />

                            <input
                                type="text"
                                name="nombre"
                                id='editarAulaNombre'
                                value={aulaSeleccionada.Aula_Nombre}
                                placeholder="Nombre del Aula"
                                required
                                onChange={(e) => setAulaSeleccionada({ ...aulaSeleccionada, Aula_Nombre: e.target.value })}
                            />

                            <select
                                name="materia_id"
                                required
                                id='editarMateria'
                                value={aulaSeleccionada.materia_id || ''}
                                onChange={(e) => setAulaSeleccionada({ ...aulaSeleccionada, materia_id: e.target.value })}
                            >
                                <option value="" disabled>Seleccione una Materia</option>
                                {materias.map((materia) => (
                                <option key={materia.ID} value={materia.ID}>{materia.Materia_Nombre}</option>
                                ))}
                            </select>

                            <button type="submit" className="btn-guardar">Guardar cambios</button>
                            <button type="button" className="btn-cancelar" onClick={cancelarEdicionAula}>Cancelar</button>
                        </form>
                    </div>
                )}

                <div className="contenedor-tablaAulaProfesor">
                    <table className="tablaUsuarios" id="tablaUsuarios">
                        <thead>
                            <tr>
                                <th>Nombre Aula</th>
                                <th>Materia</th>
                                <th>Curso</th>
                                <th>Profesor</th>
                                <th>Ver Aula</th>
                                <th>Modificar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aulas.map((aula) => (
                            <tr key={aula.ID}>
                                <td>{aula.Aula_Nombre}</td>
                                <td>{aula.Materia_Nombre}</td>
                                <td>{aula.Curso_Nombre}</td>
                                <td>{aula.Profesor}</td>
                                <td>
                                <Link to={`/VerAulaProfesor/${aula.ID}`}>
                                    <button className="informacion">
                                    <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                </Link>
                                </td>
                                <td>
                                    {aula.usuario_id === usuarioId && (
                                    <button className="modificar" onClick={() => handleModificarClick(aula)}>
                                        <i className="fa-solid fa-gear"></i>
                                    </button>
                                    )}
                                </td>
                                <td>
                                    {aula.usuario_id === usuarioId && (
                                    <button className="btn-icon eliminar" type="button" onClick={() => eliminarAula(aula.ID)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default ClaseProfesor;