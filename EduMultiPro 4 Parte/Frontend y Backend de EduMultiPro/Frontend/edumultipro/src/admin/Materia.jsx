import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Materia.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function Materia(){

    const [materias, setMaterias] = useState([]);

  // Obtener Materias
  const obtenerMaterias = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/edumultipro/Materias");
      const data = await res.json();
      setMaterias(data);
    } catch (err) {
      console.error("Error al obtener Materias:", err);
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

  // Eliminar Materias
  const eliminarMateria = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta Materia?");
    if (!confirmacion) return;

    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
      $('#tablaUsuarios').DataTable().destroy();
    }

    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/Materias/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.mensaje);

      const nuevasMaterias = materias.filter((materia) => materia.ID !== id);
      setMaterias(nuevasMaterias);
    } catch (error) {
      console.error("Error al eliminar la Materia:", error);
      alert("Hubo un error al intentar eliminar la Materia.");
    }
  };

  // Modificar Materias
  const [materiaSeleccionada, setMateriaSeleccionada] = useState({
  ID: "",
  Materia_Nombre: "",
  Descripcion_Materia: ""
  });

  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);

  const abrirFormularioEditar = (materia) => {
  setMateriaSeleccionada(materia);
  setMostrarFormularioEditar(true);
};

const cancelarEdicion = () => {
  setMostrarFormularioEditar(false);
  setMateriaSeleccionada({
    ID: "",
    Materia_Nombre: "",
    Descripcion_Materia: ""
  });
};

  const manejarCambio = (e) => {
  const { name, value } = e.target;
  setMateriaSeleccionada((prev) => ({
    ...prev,
    [name === "nombre" ? "Materia_Nombre" : "Descripcion_Materia"]: value,
  }));
};

  // Crear Materias
  const [nuevaMateria, setNuevaMateria] = useState({
    materia_nombre: "",
    materia_descripcion: "",
  });
  const manejarCambioNueva = (e) => {
    const { name, value } = e.target;
    setNuevaMateria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const guardarMateria = async (e) => {
  e.preventDefault();

  // ⚠️ Destruir DataTable antes de cambiar datos
  if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
    $('#tablaUsuarios').DataTable().destroy();
  }

  try {
    const res = await fetch("http://localhost:3000/api/edumultipro/Materias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Materia_Nombre: nuevaMateria.materia_nombre,
        Descripcion_Materia: nuevaMateria.materia_descripcion,
      }),
    });

    const data = await res.json();
    alert(data.mensaje);

    // Limpiar el formulario
    setNuevaMateria({ materia_nombre: "", materia_descripcion: "" });

    // ⚠️ Esperar a que el DOM actualice antes de volver a inicializar la tabla
    await obtenerMaterias(); // Actualizar lista
  } catch (error) {
    console.error("Error al crear la materia:", error);
    alert("Hubo un error al crear la materia.");
  }
};

  useEffect(() => {
    obtenerMaterias();
  }, []);

  useEffect(() => {
    if (materias.length > 0) {
      setTimeout(() => {
        inicializarDataTable();
      }, 100);
    }
  }, [materias]);

    return(
        <>
          <ProteccionRuta rolRequerido="R004" />
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

                            <div className="titulo6">
                                <h1>Materias Actuales</h1>
                            </div>

                            <div className="contenedor-fromulario">

                                <form onSubmit={guardarMateria}>
                                    <h3>Datos Materia</h3>
                                        <input type="text" name="materia_nombre" maxLength="50" placeholder="Nombre de la Materia" value={nuevaMateria.materia_nombre} onChange={manejarCambioNueva} required></input>
                                        <input id="Descripcion" type="text" name="materia_descripcion" maxLength="300" placeholder="Descripcion de la Materia" value={nuevaMateria.materia_descripcion} onChange={manejarCambioNueva} required></input>
                                        <button type="submit">Guardar Materia</button>
                                </form>

                                {mostrarFormularioEditar && (
                                <div id="formEditarMateria" className="formulario-editar">
                                    <h3>Modificar Materia</h3>
                                    <form onSubmit={async (e) => {
                                      e.preventDefault();
                                      try {
                                        const res = await fetch(`http://localhost:3000/api/edumultipro/Materias/${materiaSeleccionada.ID}`, {
                                          method: "PUT",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            Materia_Nombre: materiaSeleccionada.Materia_Nombre,
                                            Descripcion_Materia: materiaSeleccionada.Descripcion_Materia,
                                          }),
                                        });

                                        const data = await res.json();
                                        alert(data.mensaje);
                                        setMostrarFormularioEditar(false);
                                        obtenerMaterias(); // recargar la lista
                                      } catch (error) {
                                        console.error("Error al actualizar la materia:", error);
                                        alert("Hubo un error al actualizar la materia.");
                                      }
                                    }}>
                                    <input type="hidden" name="id" value={materiaSeleccionada.ID} />
                                    
                                    <label for="editarNombre">Nombre:</label>
                                    <input type="text" name="nombre" id="editarNombre" maxLength="50" value={materiaSeleccionada.Materia_Nombre} onChange={manejarCambio} required></input>
                                    
                                    <label for="editarDescripcion">Descripción:</label>
                                    <input name="descripcion" id="editarDescripcion" maxLength="300" rows="3" value={materiaSeleccionada.Descripcion_Materia} onChange={manejarCambio} required></input>
                                    
                                    <button type="submit" className="btn-guardar2">Guardar cambios</button>
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
                                        {materias.map((materia) => (
                                        <tr key={materia.ID}>
                                            <td>{materia.ID}</td>
                                            <td>{materia.Materia_Nombre}</td>
                                            <td>{materia.Descripcion_Materia}</td>
                                            <td>
                                            <button className="modificar" onClick={() => abrirFormularioEditar(materia)}>
                                                <i className="fa-solid fa-gear"></i>
                                            </button>
                                            </td>
                                            <td>
                                            <button className="btn-icon eliminar" type="button" onClick={() => eliminarMateria(materia.ID)}>
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
export default Materia;