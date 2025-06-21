import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Jornada.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function Jornada(){

    const [jornadas, setJornadas] = useState([]);

  // Obtener Jornadas
  const obtenerJornadas = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/edumultipro/Jornadas");
      const data = await res.json();
      setJornadas(data);
    } catch (err) {
      console.error("Error al obtener Jornadas:", err);
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

  // Eliminar Jornada
  const eliminarJornada = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta Jornada?");
    if (!confirmacion) return;

    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
      $('#tablaUsuarios').DataTable().destroy();
    }

    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/Jornadas/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.mensaje);

      const nuevasJornadas = jornadas.filter((jornada) => jornada.ID !== id);
      setJornadas(nuevasJornadas);
    } catch (error) {
      console.error("Error al eliminar la Jornadas:", error);
      alert("Hubo un error al intentar eliminar la Jornadas.");
    }
  };

  useEffect(() => {
    obtenerJornadas();
  }, []);

  useEffect(() => {
    if (jornadas.length > 0) {
      setTimeout(() => {
        inicializarDataTable();
      }, 100);
    }
  }, [jornadas]);

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

                            <div className="titulo8">
                                <h1>Jornadas Actuales</h1>
                            </div>
                            
                            <div className="contenedor-fromularioJornada">

                                <form method="POST" action="{{ url_for('admin_bp.guardar_jornada') }}">
                                    <h3>Datos Jornada</h3>
                                        <input type="text" name="jornada_Nombre" placeholder="Nombre de la jornada" required></input>
                                        <input type="text" name="descripcion_Jornada" placeholder="Descripcion" required></input>
                                        <button type="submit">Guardar Jornada</button>
                                </form>

                                <div id="formEditarJornada" className="formulario-editar">
                                    <h3>Modificar Jornada</h3>
                                    <form action="{{ url_for('admin2_bp.modificar_jornada') }}" method="POST">
                                        <input type="hidden" name="id" id="editarJornadaID"></input>
                                        
                                        <label for="editarJornadaNombre">Nombre:</label>
                                        <input type="text" name="nombre" id="editarJornadaNombre" required></input>

                                        <label for="editarDescripcion">Descripción:</label>
                                        <input name="descripcion" id="editarDescripcion" rows="3" required></input>

                                        <button type="submit" className="btn-guardar5">Guardar cambios</button>
                                        <button type="button" className="btn-cancelar" onclick="cancelarEdicionJornada()">Cancelar</button>
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
                                        {jornadas.map((jornada) => (
                                        <tr key={jornada.ID}>
                                            <td>{jornada.ID}</td>
                                            <td>{jornada.Jornada_Nombre}</td>
                                            <td>{jornada.Descripcion_Jornada}</td>
                                            <td>
                                            <button className="modificar">
                                                <i className="fa-solid fa-gear"></i>
                                            </button>
                                            </td>
                                            <td>
                                            <button className="btn-icon eliminar" type="button" onClick={() => eliminarJornada(jornada.ID)}>
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
export default Jornada;