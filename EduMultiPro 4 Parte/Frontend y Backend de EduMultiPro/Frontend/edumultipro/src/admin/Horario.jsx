import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Horario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function Horario(){

    const [horarios, setHorarios] = useState([]);

    // Obtener Horarios
    const obtenerHorarios = async () => {
        try {
        const res = await fetch("http://localhost:3000/api/edumultipro/Horarios");
        const data = await res.json();
        setHorarios(data);
        } catch (err) {
        console.error("Error al obtener Horarios:", err);
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

    // Eliminar Horario
    const eliminarHorario = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este Horario?");
        if (!confirmacion) return;

        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
        $('#tablaUsuarios').DataTable().destroy();
        }

        try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Horarios/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();
        alert(data.mensaje);

        const nuevosHorarios = horarios.filter((horario) => horario.ID !== id);
        setHorarios(nuevosHorarios);
        } catch (error) {
        console.error("Error al eliminar el Horario:", error);
        alert("Hubo un error al intentar eliminar el Horario.");
        }
    };

    useEffect(() => {
        obtenerHorarios();
    }, []);

    useEffect(() => {
        if (horarios.length > 0) {
        setTimeout(() => {
            inicializarDataTable();
        }, 100);
        }
    }, [horarios]);

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
                            <div className="titulo2">
                                <h1>Horarios Actuales</h1>
                                <Link to={"/CrearHorario"}>
                                <button className="crear" id="btnAgregarHorario"> <i className="fas fa-user-plus"></i>Subir Horario</button>
                                </Link>
                            </div>
                            <div className="contenedor-tabla">
                            <table className="tablaUsuarios" id="tablaUsuarios">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Horario</th>
                                        <th>Curso</th>
                                        <th>Jornada</th>
                                        <th>Profesor</th>
                                        <th>Informacion</th>
                                        <th>Modificar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {horarios.map((horario) => (
                                        <tr key={horario.ID}>
                                            <td>{horario.ID}</td>
                                            <td>{horario.Titulo_Horario}</td>
                                            <td>{horario.Curso_Nombre || "Sin Asignar"}</td>
                                            <td>{horario.Jornada_Nombre || "Sin Asignar"}</td>
                                            <td>{horario.Profesor_Nombre || "Sin Asignar"}</td>
                                            <td>
                                            <Link to={`/VerHorario/${horario.ID}`}>
                                                <button type="button" className="informacion" id="btninformacion">
                                                <i className="fa-solid fa-circle-info"></i>
                                                </button>
                                            </Link>
                                            </td>
                                            <td>
                                            <Link to={`/ActualizarHorario/${horario.ID}`}>
                                                <button className="modificar">
                                                    <i className="fa-solid fa-gear"></i>
                                                </button>
                                            </Link>
                                            </td>
                                            <td>
                                            <button className="btn-icon eliminar" type="button" onClick={() => eliminarHorario(horario.ID)}>
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
export default Horario;