import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Grado.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function Grado(){

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

                            <div className="carda">

                                <Link to="/materia"><div className="targeta"><i className="fa-solid fa-book"></i><h1>Materia</h1></div></Link>
                                
                                <Link to="/grado"><div className="targeta"><i className="fa-solid fa-temperature-low"></i><h1>Grado</h1></div></Link>

                                <Link to="/jornada"><div className="targeta"><i className="fa-solid fa-clock"></i><h1>Jornada</h1></div></Link>

                            </div>

                            <div className="titulo7">
                                <h1>Grados Actuales</h1>
                            </div>

                            <div className="contenedor-fromularioGrado">
                                <form method="POST" action="{{ url_for('admin_bp.guardar_grado') }}">
                                    <h3>Datos Grado</h3>
                                        <input type="text" name="grado_Nombre" placeholder="Nombre del grado" required></input>
                                        <input type="text" name="descripcion_Grado" placeholder="Descripcion" required></input>
                                        <button type="submit">Guardar Grado</button>
                                </form>

                                <div id="formEditarGrado" className="formulario-editar" >
                                    <h3>Modificar Grado</h3>
                                    <form action="{{ url_for('admin2_bp.modificar_grado') }}" method="POST">
                                    <input type="hidden" name="id" id="editarGradoID"></input>
                                    
                                    <label for="editarGradoNombre">Nombre del grado:</label>
                                    <input type="text" name="nombre" id="editarGradoNombre" required></input>

                                    <label for="editarDescripcion">Descripción:</label>
                                    <input name="descripcion" id="editarDescripcion" rows="3" required></input>
                                    
                                    <button type="submit" className="btn-guardar4">Guardar cambios</button>
                                    <button type="button" className="btn-cancelar" onclick="ocultarFormularioGrado()">Cancelar</button>
                                    </form>
                                </div>

                            </div>

                            <div className="contenedor-tabla">
                                    <table className="tablaUsuarios" id="tablaUsuarios">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Modificar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/*-- % if grados % --*/}
                                        {/*-- % for grado in grados % --*/}
                                            <tr>
                                                <td>ID</td>
                                                <td>Grado_Nombre</td>
                                                <td>Descripcion_Grado</td>
                                                <td><button className="modificar"><i className="fa-solid fa-gear"></i></button></td>
                                                <td>
                                                    <form action="{{ url_for('admin_bp.eliminar_grado', id=grado['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
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
export default Grado;