import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/JornadaCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function JornadaCoordinador(){

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

  // Modificar Jornada
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState({
  ID: "",
  Jornada_Nombre: "",
  Descripcion_Jornada: ""
  });

  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);

  const abrirFormularioEditar = (jornada) => {
  setJornadaSeleccionada(jornada);
  setMostrarFormularioEditar(true);
};

const cancelarEdicion = () => {
  setMostrarFormularioEditar(false);
  setJornadaSeleccionada({
    ID: "",
    Jornada_Nombre: "",
    Descripcion_Jornada: ""
  });
};

  const manejarCambio = (e) => {
  const { name, value } = e.target;
  setJornadaSeleccionada((prev) => ({
    ...prev,
    [name === "nombre" ? "Jornada_Nombre" : "Descripcion_Jornada"]: value,
  }));
};

  // Crear jornada
  const [nuevaJornada, setNuevaJornada] = useState({
    jornada_nombre: "",
    jornada_descripcion: "",
  });
  const manejarCambioNueva = (e) => {
    const { name, value } = e.target;
    setNuevaJornada((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const guardarJornada = async (e) => {
  e.preventDefault();

  // ⚠️ Destruir DataTable antes de cambiar datos
  if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
    $('#tablaUsuarios').DataTable().destroy();
  }

  try {
    const res = await fetch("http://localhost:3000/api/edumultipro/Jornadas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Jornada_Nombre: nuevaJornada.jornada_nombre,
        Descripcion_Jornada: nuevaJornada.jornada_descripcion,
      }),
    });

    const data = await res.json();
    alert(data.mensaje);

    // Limpiar el formulario
    setNuevaJornada({ jornada_nombre: "", jornada_descripcion: "" });

    // ⚠️ Esperar a que el DOM actualice antes de volver a inicializar la tabla
    await obtenerJornadas(); // Actualizar lista
  } catch (error) {
    console.error("Error al crear la jornada:", error);
    alert("Hubo un error al crear la jornada.");
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
          <ProteccionRuta rolRequerido="R003" />
            <div className='contenedor'>

                {/*---Nav---*/}
                <Encabezado />

                {/*---Desplegable---*/}
                <DesplegableCoordinador />

                {/*---Article---*/}
                <div className="container-fluid" id="centro1">

                    <div className="row" id='contenido'>

                        {/*---BarraLateral---*/}
                        <BarraLateralCoordinador />

                        {/*---Tabla---*/}
                        <div className="col-10" id="contenidoTabla">
                            
                            <div className="carda">

                                <Link to="/materiaCoordinador"><div className="targeta"><i className="fa-solid fa-book"></i><h1>Materia</h1></div></Link>
                                
                                <Link to="/gradoCoordinador"><div className="targeta"><i className="fa-solid fa-temperature-low"></i><h1>Grado</h1></div></Link>

                                <Link to="/jornadaCoordinador"><div className="targeta"><i className="fa-solid fa-clock"></i><h1>Jornada</h1></div></Link>

                            </div>

                            <div className="titulo8">
                                <h1>Jornadas Actuales</h1>
                            </div>
                            
                            <div className="contenedor-fromularioJornada">

                                <form onSubmit={guardarJornada}>
                                    <h3>Datos Jornada</h3>
                                        <input type="text" name="jornada_nombre" placeholder="Nombre de la jornada" value={nuevaJornada.jornada_nombre} onChange={manejarCambioNueva} required></input>
                                        <input type="text" name="jornada_descripcion" placeholder="Descripcion" value={nuevaJornada.jornada_descripcion} onChange={manejarCambioNueva} required></input>
                                        <button type="submit">Guardar Jornada</button>
                                </form>

                              {mostrarFormularioEditar && (
                                <div id="formEditarJornada" className="formulario-editar">
                                    <h3>Modificar Jornada</h3>
                                    <form onSubmit={async (e) => {
                                      e.preventDefault();
                                      try {
                                        const res = await fetch(`http://localhost:3000/api/edumultipro/Jornadas/${jornadaSeleccionada.ID}`, {
                                          method: "PUT",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            Jornada_Nombre: jornadaSeleccionada.Jornada_Nombre,
                                            Descripcion_Jornada: jornadaSeleccionada.Descripcion_Jornada,
                                          }),
                                        });

                                        const data = await res.json();
                                        alert(data.mensaje);
                                        setMostrarFormularioEditar(false);
                                        obtenerJornadas(); // recargar la lista
                                      } catch (error) {
                                        console.error("Error al actualizar la jornada:", error);
                                        alert("Hubo un error al actualizar la jornada.");
                                      }
                                    }}>
                                        <input type="hidden" name="id" id="editarJornadaID"></input>
                                        
                                        <label for="editarJornadaNombre">Nombre:</label>
                                        <input type="text" name="nombre" id="editarJornadaNombre" value={jornadaSeleccionada.Jornada_Nombre} onChange={manejarCambio} required></input>

                                        <label for="editarDescripcion">Descripción:</label>
                                        <input name="descripcion" id="editarDescripcion" rows="3" value={jornadaSeleccionada.Descripcion_Jornada} onChange={manejarCambio} required></input>

                                        <button type="submit" className="btn-guardar5">Guardar cambios</button>
                                        <button type="button" className="btn-cancelar" onClick={cancelarEdicion}>Cancelar</button>
                                    </form>
                                </div>
                              )}

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
                                            <button className="modificar" onClick={() => abrirFormularioEditar(jornada)}>
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
export default JornadaCoordinador;