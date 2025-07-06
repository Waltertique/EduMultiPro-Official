import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/NoticiaCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function NoticiaCoordinador(){

    const [noticias, setNoticias] = useState([]);

  // Obtener Noticias
  const obtenerNoticias = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/edumultipro/Noticias");
      const data = await res.json();
      setNoticias(data);
    } catch (err) {
      console.error("Error al obtener Noticias:", err);
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

  // Eliminar Noticia
  const eliminarNoticia = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta Noticia?");
    if (!confirmacion) return;

    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
      $('#tablaUsuarios').DataTable().destroy();
    }

    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/Noticias/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.mensaje);

      const nuevasNoticias = noticias.filter((noticia) => noticia.ID !== id);
      setNoticias(nuevasNoticias);
    } catch (error) {
      console.error("Error al eliminar la Noticia:", error);
      alert("Hubo un error al intentar eliminar la Noticias.");
    }
  };

  useEffect(() => {
    obtenerNoticias();
  }, []);

  useEffect(() => {
    if (noticias.length > 0) {
      setTimeout(() => {
        inicializarDataTable();
      }, 100);
    }
  }, [noticias]);

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
                            <div className="titulo4">
                                <h1>Gestion de Noticias</h1>
                                <Link to={"/CrearNoticiaCoordinador"}>
                                <button className="crear" id="btnAgregarNoticia"> <i className="fas fa-user-plus"></i>Crear Noticia</button>
                                </Link>
                            </div>
                            <div className="contenedor-tabla">
                                <table className="tablaUsuarios" id="tablaUsuarios">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Tipo</th>
                                        <th>Noticia</th>
                                        <th>Modificar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {noticias.map((noticia) => (
                                        <tr key={noticia.ID}>
                                            <td>{noticia.ID}</td>
                                            <td>{noticia.Titulo_Noticia}</td>
                                            <td>{noticia.Tipo}</td>
                                            <td>
                                            <Link to={`/VerNoticiaCoordinador/${noticia.ID}`}>
                                                <button type="button" className="informacion" id="btninformacion">
                                                <i className="fa-solid fa-circle-info"></i>
                                                </button>
                                            </Link>
                                            </td>
                                            <td>
                                            <Link to={`/ActualizarNoticiaCoordinador/${noticia.ID}`}>
                                              <button className="modificar">
                                                  <i className="fa-solid fa-gear"></i>
                                              </button>
                                            </Link>
                                            </td>
                                            <td>
                                            <button className="btn-icon eliminar" type="button" onClick={() => eliminarNoticia(noticia.ID)}>
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
export default NoticiaCoordinador;