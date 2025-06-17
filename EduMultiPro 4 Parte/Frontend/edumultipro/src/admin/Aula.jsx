import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Aula.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function Aula(){

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
                            <div className="titulo3">
                                <h1>Aulas Actuales</h1>
                                <Link to={"/CrearAula"}>
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Crear Aula</button>
                                </Link>
                            </div>

                            <div className="modificarAula" id="modificarAula">
                                <h1>Modificar Aula</h1>
                                <form action="{{ url_for('admin_bp.modificar_aula') }}" method="POST">
                                    <input type="hidden" name="id" id="editarAulaID"></input>

                                    <input type="text" name="nombre" id="editarAulaNombre" placeholder="Nombre del Aula" required></input>

                                    <select name="materia_id" id="editarMateria" required>
                                    {/*-- % for materia in materias % --*/}
                                        <option value="{{ materia['ID'] }}">materia['Materia_Nombre']</option>
                                    {/*-- % endfor % --*/}
                                    </select>

                                    <button type="submit" className="btn-guardar">Guardar cambios</button>
                                    <button type="button" className="btn-cancelar" onclick="cancelarEdicionAula()">Cancelar</button>
                                </form>
                            </div>

                            <div className="contenedor-tabla">
                                <table className="tablaUsuarios" id="tablaUsuarios">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
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
                                        {/*-- % if aulas % --*/}
                                            {/*-- % for aula in aulas % --*/}
                                                <tr>
                                                    <td>'ID'</td>
                                                    <td>'Aula_Nombre'</td>
                                                    <td>Materia_Nombre'</td>
                                                    <td>Curso_Jornada'</td>
                                                    <td>Profesor'</td>
                                                    <td>
                                                    <Link to={"/VerAula"}>
                                                        <input type="hidden" name="aula_id" value="{{ aula['ID'] }}"></input>
                                                        <button type="submit" className="informacion" id="btninformacion">
                                                        <i className="fa-solid fa-circle-info"></i>
                                                        </button>
                                                    </Link>
                                                    </td>
                                                    <td><button className="modificar"><i className="fa-solid fa-gear"></i></button></td>
                                                    <td>
                                                    <form action="{{ url_for('admin_bp.eliminar_aula', id=aula['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                    <button className="btn-icon eliminar" type="submit">
                                                        <i className="fa-solid fa-trash"></i>
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
export default Aula;