import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerTrabajoEntregado.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function VerTrabajoEntregado(){

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
                        <div className="col-10" id="contenidoTrabajoEntregado">

                            <div class="botonesVerTrabajo">
                                <div className='btn'>
                                    <Link to={"/VerTrabajo"}><button>Instrucciones</button></Link>
                                    <Link to={"/VerTrabajoEntregado"}><button>Ver Subidos</button></Link>
                                </div>
                                <Link to={"/Trabajos"}><button id="equix"><i class="fa-solid fa-x"></i></button></Link>
                            </div>

                            <div class="cont1TrabajoEntregado">

                                <div class="contenedorTrabajoEntregado">
                                    <table class="tablaUsuarios" id="tablaUsuarios">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Ver</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/*-- % for alumno in alumnos_entregados % --*/}
                                            <tr>
                                                <td> alumno.nombre_completo </td>
                                                <td>
                                                    <button class="mostrarEntregado"
                                                            data-id="{{ alumno.trabajo_entregado_id }}"
                                                            data-nombre="{{ alumno.nombre_completo }}"
                                                            data-nota="{{ alumno.Nota }}"
                                                            data-fecha="{{ alumno.Fecha_Trabajo }}"
                                                            data-archivos='{{ alumno.archivos | tojson }}'>
                                                    Ver entrega
                                                    </button>
                                                </td>
                                            </tr>
                                            {/*-- % endfor % --*/}
                                        </tbody>
                                    </table>
                                </div>

                                <div class="trabajosTrabajoEntregado" id="trabajosEntregados">
                                    <div class="autorTrabajoEntregado">
                                        <h3 id="nombreAlumno">primer trabajo</h3>
                                        <div>
                                            <p>Nota:</p>
                                            <p id="notaAlumno">3.4</p>
                                        </div>
                                    </div>
                                    <div class="archivosTrabajoEntregado" id="listaArchivos">
                                        <div className='archivo1'>
                                            <a href="">PrimerTrabajo</a>
                                        </div>
                                    </div>
                                    <div class="notaTrabajoEntregado">
                                        <div class="fechaTrabajoEntregado">
                                            <h5>Fecha de Entrega:</h5>
                                            <p id="fechaEntregaTrabajoEntregado">23/45/45</p>
                                        </div>
                                        <div class="form1TrabajoEntregado">
                                            <form action="{{ url_for('admin2_bp.asignar_nota') }}" method="post">
                                                <input type="hidden" name="trabajo_entregado_id" id="trabajoEntregadoId" value="" />
                                                <input type="number" name="nuevaNota" placeholder="Nota" step="0.01" id="inputNota" required />
                                                <button type="submit">Asignar Nota</button>
                                            </form>
                                            <button id="salirTrabajoEntregado"><i class="fa-solid fa-x"></i></button>
                                        </div>
                                    </div>
                                </div>

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
export default VerTrabajoEntregado;