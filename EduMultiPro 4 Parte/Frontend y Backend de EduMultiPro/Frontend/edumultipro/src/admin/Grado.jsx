import { useEffect, useState } from 'react'; // datatables
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

    const [grados, setGrados] = useState([]);

  // Obtener Grados
  const obtenerGrados = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/edumultipro/Grados");
      const data = await res.json();
      setGrados(data);
    } catch (err) {
      console.error("Error al obtener Grados:", err);
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

  // Eliminar Grados
  const eliminarGrado = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este Grado?");
    if (!confirmacion) return;

    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
      $('#tablaUsuarios').DataTable().destroy();
    }

    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/Grados/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.mensaje);

      const nuevosGrados = grados.filter((grado) => grado.ID !== id);
      setGrados(nuevosGrados);
    } catch (error) {
      console.error("Error al eliminar el Grado:", error);
      alert("Hubo un error al intentar eliminar el Grado.");
    }
  };

  useEffect(() => {
    obtenerGrados();
  }, []);

  useEffect(() => {
    if (grados.length > 0) {
      setTimeout(() => {
        inicializarDataTable();
      }, 100);
    }
  }, [grados]);

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
                                            {grados.map((grado) => (
                                            <tr key={grado.ID}>
                                                <td>{grado.ID}</td>
                                                <td>{grado.Grado_Nombre}</td>
                                                <td>{grado.Descripcion_Grado}</td>
                                                <td>
                                                <button className="modificar">
                                                    <i className="fa-solid fa-gear"></i>
                                                </button>
                                                </td>
                                                <td>
                                                <button className="btn-icon eliminar" type="button" onClick={() => eliminarGrado(grado.ID)}>
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
export default Grado;