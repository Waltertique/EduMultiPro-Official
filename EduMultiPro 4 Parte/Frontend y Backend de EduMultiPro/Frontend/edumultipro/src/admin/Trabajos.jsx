import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Trabajos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function Trabajos(){

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
                        <div className="col-10" id="contenidoTablaAula">

                            <div className="row" id="navAula">

                                <div className="col-12 col-md-2 col-xl-2"><Link to={"/VerAula"}><button id="principal">Pricipal</button></Link></div>
                                <div className="col-12 col-md-2 col-xl-2"><Link to={"/Trabajos"}><button id="trabajo">Trabajos</button></Link></div>
                                <div className="col-12 col-md-2 col-xl-2"><Link to={"/Notas"}><button id="persona">Notas</button></Link></div>
                                <div className="col-12 col-md-2 col-xl-2"><Link to={"/Personas"}><button id="persona">Personas</button></Link></div>
                                <div className="col-12 col-md-4 col-xl-4"></div>

                            </div>

                            <div className="tituloTrabajo">
                                <h1>Trabajos</h1>
                                <Link to={"/CrearTrabajo"}>
                                    <button className="crear" id="btnAgregarUsuario">Crear Trabajo</button>
                                </Link>
                            </div>

                            <div className="contenedor-tablaTrabajo">
                                <table className="tablaUsuarios" id="tablaUsuarios">
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Fecha Entrega</th>
                                            <th>Información</th>
                                            <th>Modificar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/*-- % for trabajo in trabajos % --*/}
                                            <tr>
                                                <td>trabajo.Titulo_Trabajo</td>
                                                <td>trabajo.Fecha_Trabajo.strftime('%d/%m/%Y')</td>
                                                <td>
                                                    <Link to={"/VerTrabajo"}>
                                                        <input type="hidden" name="trabajo_id" value="{{ trabajo.ID }}" />
                                                        <input type="hidden" name="aula_id" value="{{ aula_id }}" />
                                                        <button type="submit" className="informacion" id="btninformacion">
                                                            <i className="fa-solid fa-circle-info"></i>
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={"/ActualizarTrabajo"}>
                                                        <input type="hidden" name="aula_id" value="{{ aula_id }}" />
                                                        <input type="hidden" name="trabajo_id" value="{{ trabajo.ID }}" />
                                                        <button type="submit" className="crear" id="btnAgregarUsuario"><i class="fa-solid fa-gear"></i></button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form action="{{ url_for('admin2_bp.eliminar_trabajo', id=trabajo.ID) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                        <button className="btn-icon eliminar" type="submit">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        {/*-- % endfor % --*/}
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
export default Trabajos;