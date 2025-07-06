import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/GradoCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function GradoCoordinador(){

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

  // Modificar Grado
  const [gradoSeleccionada, setGradoSeleccionada] = useState({
  ID: "",
  Grado_Nombre: "",
  Descripcion_Grado: ""
  });

  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);

  const abrirFormularioEditar = (grado) => {
  setGradoSeleccionada(grado);
  setMostrarFormularioEditar(true);
};

const cancelarEdicion = () => {
  setMostrarFormularioEditar(false);
  setGradoSeleccionada({
    ID: "",
    Grado_Nombre: "",
    Descripcion_Grado: ""
  });
};

  const manejarCambio = (e) => {
  const { name, value } = e.target;
  setGradoSeleccionada((prev) => ({
    ...prev,
    [name === "nombre" ? "Grado_Nombre" : "Descripcion_Grado"]: value,
  }));
};

  // Crear grado
  const [nuevaGrado, setNuevaGrado] = useState({
    grado_nombre: "",
    grado_descripcion: "",
  });
  const manejarCambioNueva = (e) => {
    const { name, value } = e.target;
    setNuevaGrado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const guardarGrado = async (e) => {
  e.preventDefault();

  // ⚠️ Destruir DataTable antes de cambiar datos
  if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
    $('#tablaUsuarios').DataTable().destroy();
  }

  try {
    const res = await fetch("http://localhost:3000/api/edumultipro/Grados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Grado_Nombre: nuevaGrado.grado_nombre,
        Descripcion_Grado: nuevaGrado.grado_descripcion,
      }),
    });

    const data = await res.json();
    alert(data.mensaje);

    // Limpiar el formulario
    setNuevaGrado({ grado_nombre: "", grado_descripcion: "" });

    // ⚠️ Esperar a que el DOM actualice antes de volver a inicializar la tabla
    await obtenerGrados(); // Actualizar lista
  } catch (error) {
    console.error("Error al crear el grado:", error);
    alert("Hubo un error al crear el grado.");
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

                            <div className="titulo7">
                                <h1>Grados Actuales</h1>
                            </div>

                            <div className="contenedor-fromularioGrado">
                                <form onSubmit={guardarGrado}>
                                    <h3>Datos Grado</h3>
                                        <input type="text" name="grado_nombre" placeholder="Nombre del grado" value={nuevaGrado.grado_nombre} onChange={manejarCambioNueva} required></input>
                                        <input type="text" name="grado_descripcion" placeholder="Descripcion" value={nuevaGrado.grado_descripcion} onChange={manejarCambioNueva} required></input>
                                        <button type="submit">Guardar Grado</button>
                                </form>

                              {mostrarFormularioEditar && (
                                <div id="formEditarGrado" className="formulario-editar" >
                                    <h3>Modificar Grado</h3>
                                    <form onSubmit={async (e) => {
                                      e.preventDefault();
                                      try {
                                        const res = await fetch(`http://localhost:3000/api/edumultipro/Grados/${gradoSeleccionada.ID}`, {
                                          method: "PUT",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            Grado_Nombre: gradoSeleccionada.Grado_Nombre,
                                            Descripcion_Grado: gradoSeleccionada.Descripcion_Grado,
                                          }),
                                        });

                                        const data = await res.json();
                                        alert(data.mensaje);
                                        setMostrarFormularioEditar(false);
                                        obtenerGrados(); // recargar la lista
                                      } catch (error) {
                                        console.error("Error al actualizar el grado:", error);
                                        alert("Hubo un error al actualizar el grado.");
                                      }
                                    }}>
                                    <input type="hidden" name="id" value={gradoSeleccionada.ID} />
                                    
                                    <label for="editarGradoNombre">Nombre del grado:</label>
                                    <input type="text" name="nombre" id="editarGradoNombre" value={gradoSeleccionada.Grado_Nombre} onChange={manejarCambio} required></input>

                                    <label for="editarDescripcion">Descripción:</label>
                                    <input name="descripcion" id="editarDescripcion" rows="3" value={gradoSeleccionada.Descripcion_Grado} onChange={manejarCambio} required></input>
                                    
                                    <button type="submit" className="btn-guardar4">Guardar cambios</button>
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
                                            {grados.map((grado) => (
                                            <tr key={grado.ID}>
                                                <td>{grado.ID}</td>
                                                <td>{grado.Grado_Nombre}</td>
                                                <td>{grado.Descripcion_Grado}</td>
                                                <td>
                                                <button className="modificar" onClick={() => abrirFormularioEditar(grado)}>
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
export default GradoCoordinador;