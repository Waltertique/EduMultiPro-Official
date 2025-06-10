import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Usuario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos

function Usuario() {

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

  return (
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
                      <div class="titulo">
                          <h1>Gestion de Usuarios</h1>
                          <a href="{{ url_for('admin_bp.crearUsuario') }}">
                            <button class="crear" id="btnAgregarUsuario"> <i class="fas fa-user-plus"></i>Crear Usuario</button>
                          </a>
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
                                      <th>Informacion</th>
                                      <th>Eliminar</th>
                                  </tr>
                              </thead>
                              <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>juan</td>
                                            <td>pedro</td>
                                            <td>zapata</td>
                                            <td>ortiz</td>
                                            <td>
                                              <form action="{{ url_for('admin_bp.informacion_usuario') }}" method="GET">
                                                <input type="hidden" name="usuario_id" value="{{ usuario['ID'] }}"></input>
                                                <button type="submit" class="informacion" id="btninformacion">
                                                  <i class="fa-solid fa-circle-info"></i>
                                                </button>
                                              </form>
                                            </td>
                                            <td>
                                              <form action="{{ url_for('admin_bp.eliminar_usuario', id=usuario['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                <button class="btn-icon eliminar" type="submit">
                                                    <i class="fa-solid fa-trash"></i> Eliminar
                                                </button>
                                              </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>juan</td>
                                            <td>pedro</td>
                                            <td>zapata</td>
                                            <td>ortiz</td>
                                            <td>
                                              <form action="{{ url_for('admin_bp.informacion_usuario') }}" method="GET">
                                                <input type="hidden" name="usuario_id" value="{{ usuario['ID'] }}"></input>
                                                <button type="submit" class="informacion" id="btninformacion">
                                                  <i class="fa-solid fa-circle-info"></i>
                                                </button>
                                              </form>
                                            </td>
                                            <td>
                                              <form action="{{ url_for('admin_bp.eliminar_usuario', id=usuario['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                <button class="btn-icon eliminar" type="submit">
                                                    <i class="fa-solid fa-trash"></i> Eliminar
                                                </button>
                                              </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>juan</td>
                                            <td>pedro</td>
                                            <td>zapata</td>
                                            <td>ortiz</td>
                                            <td>
                                              <form action="{{ url_for('admin_bp.informacion_usuario') }}" method="GET">
                                                <input type="hidden" name="usuario_id" value="{{ usuario['ID'] }}"></input>
                                                <button type="submit" class="informacion" id="btninformacion">
                                                  <i class="fa-solid fa-circle-info"></i>
                                                </button>
                                              </form>
                                            </td>
                                            <td>
                                              <form action="{{ url_for('admin_bp.eliminar_usuario', id=usuario['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
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
  );
}

export default Usuario;