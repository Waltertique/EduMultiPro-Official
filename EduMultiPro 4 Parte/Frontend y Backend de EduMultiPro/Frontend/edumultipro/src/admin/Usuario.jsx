import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import ProteccionRuta from '../ProteccionRuta.jsx';
import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Usuario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function Usuario() {

  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/edumultipro/Usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  // ⚙️ Inicializa DataTable
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

  // ✅ Eliminar usuario sin recargar datos
  const eliminarUsuario = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmacion) return;

    // 🔴 1. Destruir DataTable antes de cambiar los datos
    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
      $('#tablaUsuarios').DataTable().destroy();
    }

    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/usuarios/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.mensaje);

      // 🟡 2. Actualizar usuarios SIN volver a hacer fetch
      const nuevosUsuarios = usuarios.filter((usuario) => usuario.ID !== id);
      setUsuarios(nuevosUsuarios); // Aquí React actualiza la tabla

    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Hubo un error al intentar eliminar el usuario.");
    }
  };

  // ⚡ Se ejecuta una vez al cargar el componente
  useEffect(() => {
    if (usuarios.length > 0) {
      setTimeout(() => {
        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
          $('#tablaUsuarios').DataTable().destroy();
        }
        inicializarDataTable();
      }, 100);
    }
  }, [usuarios]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
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
                      <div className="titulo1">
                          <h1>Gestion de Usuarios</h1>
                          <Link to="/CrearUsuario">
                            <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Crear Usuario</button>
                          </Link>
                      </div>
                      <div className="contenedor-tabla">
                          <table className="tablaUsuarios" id="tablaUsuarios">
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
                                {usuarios.map((usuario) => (
                                  <tr key={usuario.ID}>
                                    <td>{usuario.ID}</td>
                                    <td>{usuario.Primer_Nombre}</td>
                                    <td>{usuario.Segundo_Nombre}</td>
                                    <td>{usuario.Primer_Apellido}</td>
                                    <td>{usuario.Segundo_Apellido}</td>
                                    <td>
                                      <Link to={`/VerUsuario/${usuario.ID}`}>
                                        <button type="button" className="informacion" id="btninformacion">
                                          <i className="fa-solid fa-circle-info"></i>
                                        </button>
                                      </Link>
                                    </td>
                                    <td>
                                      <button className="btn-icon eliminar" type="button" onClick={() => eliminarUsuario(usuario.ID)}>
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
  );
}

export default Usuario;