import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerCurso.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function VerCurso(){

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

                            <div class="tituloVerCurso">
                                <h1>Integrantes Del Curso</h1>
                                <Link to={"/Curso"}>
                                    <button class="crear" id="btnAgregarUsuario"> <i class="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div class="agregar-usuario">
                                <form action="{{ url_for('admin_bp.agregar_usuario_a_curso', curso_id=curso_id) }}" method="POST">
                                    <label for="usuario_id">Agregar Usuario:</label>
                                    <input type="text" id="usuario_id" name="usuario_id" required placeholder="ID Usuario"></input>
                                    <button type="submit">Agregar</button>
                                </form>
                            </div>

                            <div class="contenedor-tabla">
                                <table class="tablaUsuarios" id="tablaUsuarios">
                                    <thead>
                                        <tr>
                                            <th>Identificación</th>
                                            <th>P Nombre</th>
                                            <th>S Nombre</th>
                                            <th>P Apellido</th>
                                            <th>S Apellido</th>
                                            <th>Eliminar del curso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/*-- % if usuarios % --*/}
                                            {/*-- % for usuario in usuarios % --*/}
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Primer_Nombre</td>
                                                    <td>Segundo_Nombre</td>
                                                    <td>Primer_Apellido</td>
                                                    <td>Segundo_Apellido</td>
                                                    <td>
                                                        <form action="{{ url_for('admin_bp.eliminar_integrante_curso') }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                            <input type="hidden" name="usuario_id" value="{{ usuario['ID'] }}"></input>
                                                            <input type="hidden" name="curso_id" value="{{ curso_id }}"></input>
                                                            <button class="btn-icon eliminar" type="submit">
                                                                <i class="fa-solid fa-user-minus"></i> Eliminar
                                                            </button>
                                                        </form>
                                                    </td>
                                                </tr>
                                        {/*-- % endfor % --*/}
                                        {/*-- % endif % --*/}
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
export default VerCurso;