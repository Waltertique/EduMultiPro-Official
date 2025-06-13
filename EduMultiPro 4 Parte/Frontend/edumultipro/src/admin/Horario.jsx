import { useEffect } from 'react'; // datatables
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

function Horario(){

    useEffect(() => {
    const table = $('#tablaUsuarios').DataTable();

    // Verifica si ya está inicializado
    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
        table.destroy(); // Destruye la instancia anterior
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
    }, []);

    return(
        <>
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
                                <button className="crear" id="btnAgregarHorario"> <i className="fas fa-user-plus"></i>Crear Horario</button>
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
                                    {/*-- % if horarios % --*/}
                                        {/*--% for horario in horarios % --*/}
                                            <tr>
                                                <td>ID</td>
                                                <td>Titulo_Horario</td>
                                                <td>Curso_Nombre</td>
                                                <td>Jornada_Nombre</td>
                                                <td>
                                                    profesor
                                                </td>
                                                <td>
                                                    <Link to={"/VerHorario"}>
                                                    <button type="submit" className="informacion" id="btninformacion">
                                                        <i className="fa-solid fa-circle-info"></i>
                                                    </button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={"/ActualizarHorario"}>
                                                    <button type="submit" class="modificar" id="btnmodificar">
                                                        <i className="fa-solid fa-gear"></i>
                                                    </button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form action="{{ url_for('admin_bp.eliminar_horario', id=horario['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                        <button className="btn-icon eliminar" type="submit">
                                                            <i className="fa-solid fa-trash"></i> Eliminar
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        { /*--% endfor % --*/}
                                    { /*--% endif % --*/}
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