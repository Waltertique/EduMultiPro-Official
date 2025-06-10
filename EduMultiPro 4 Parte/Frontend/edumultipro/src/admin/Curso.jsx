import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Curso.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos

function Curso(){

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
                        <div class="col-10" id="contenidoTabla">

                            <div class="card">

                                <a href="{{ url_for('admin_bp.materia') }}"><div class="targeta"><i class="fa-solid fa-book"></i><h1>Materia</h1></div></a>
                                
                                <a href="{{ url_for('admin_bp.grado') }}"><div class="targeta"><i class="fa-solid fa-temperature-low"></i><h1>Grado</h1></div></a>

                                <a href="{{ url_for('admin_bp.jornada') }}"><div class="targeta"><i class="fa-solid fa-clock"></i><h1>Jornada</h1></div></a>

                            </div>

                            <div class="titulo">
                                <h1>Cursos Actuales</h1>
                                <a href="{{ url_for('admin_bp.crearCurso') }}">
                                    <button class="crear" id="btnAgregarUsuario"> <i class="fas fa-user-plus"></i>Crear Curso</button>
                                </a>
                            </div>

                            {/*---Modificar Curso---*/}
                  
                            <div class="modificarCurso" id="modificarCurso">
                                <h1>Modificar Curso</h1>
                                <form>
                                    
                                    <select name="grado" id="editarGrado" required>
                                    {/*---% for grado in grados %---*/}
                                        <option value="{{ grado['ID'] }}">grado['Grado_Nombre']</option>
                                    {/*---% endfor %---*/}
                                    </select>

                                    <select name="jornada" id="editarJornada" required>
                                    {/*---% for jornada in jornadas %---*/}
                                        <option value="{{ jornada['ID'] }}">jornada['Jornada_Nombre']</option>
                                    {/*---% endfor %---*/}
                                    </select>

                                    <button type="submit" class="btn-guardar">Guardar cambios</button>
                                    <button type="button" class="btn-cancelar">Cancelar</button>
                                </form>
                            </div>

                            <div class="contenedor-tabla">
                                <table class="tablaUsuarios" id="tablaUsuarios">
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
                                        {/*-- % if cursos % --*/}
                                        {/*-- % for curso in cursos % --*/}
                                            <tr>
                                                <td>1</td>
                                                <td>101</td>
                                                <td>primero</td>
                                                <td>tarde</td>
                                                <td>
                                                    <form action="{{ url_for('admin_bp.verCurso') }}" method="GET">
                                                    <input type="hidden" name="curso_id" value="{{ curso['ID'] }}"></input>
                                                    <button type="submit" class="informacion" id="btninformacion">
                                                        <i class="fa-solid fa-circle-info"></i>
                                                    </button>
                                                    </form>
                                                </td>
                                                <td><button class="modificar"><i class="fa-solid fa-gear"></i></button></td>
                                                <td>
                                                    <form action="{{ url_for('admin_bp.eliminar_curso', id=curso['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                    <button class="btn-icon eliminar" type="submit">
                                                        <i class="fa-solid fa-trash"></i> Eliminar
                                                    </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        {/*-- % endfor % --*/}
                                        {/*-- % endif % --*/}
                                            <tr>
                                                <td>1</td>
                                                <td>101</td>
                                                <td>primero</td>
                                                <td>tarde</td>
                                                <td>
                                                    <form action="{{ url_for('admin_bp.verCurso') }}" method="GET">
                                                    <input type="hidden" name="curso_id" value="{{ curso['ID'] }}"></input>
                                                    <button type="submit" class="informacion" id="btninformacion">
                                                        <i class="fa-solid fa-circle-info"></i>
                                                    </button>
                                                    </form>
                                                </td>
                                                <td><button class="modificar"><i class="fa-solid fa-gear"></i></button></td>
                                                <td>
                                                    <form action="{{ url_for('admin_bp.eliminar_curso', id=curso['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                    <button class="btn-icon eliminar" type="submit">
                                                        <i class="fa-solid fa-trash"></i> Eliminar
                                                    </button>
                                                    </form>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>101</td>
                                                <td>primero</td>
                                                <td>tarde</td>
                                                <td>
                                                    <form action="{{ url_for('admin_bp.verCurso') }}" method="GET">
                                                    <input type="hidden" name="curso_id" value="{{ curso['ID'] }}"></input>
                                                    <button type="submit" class="informacion" id="btninformacion">
                                                        <i class="fa-solid fa-circle-info"></i>
                                                    </button>
                                                    </form>
                                                </td>
                                                <td><button class="modificar"><i class="fa-solid fa-gear"></i></button></td>
                                                <td>
                                                    <form action="{{ url_for('admin_bp.eliminar_curso', id=curso['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                    <button class="btn-icon eliminar" type="submit">
                                                        <i class="fa-solid fa-trash"></i> Eliminar
                                                    </button>
                                                    </form>
                                                </td>
                                            </tr>
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
export default Curso;