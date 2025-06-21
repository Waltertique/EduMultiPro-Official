import { useEffect, useState } from 'react'; // datatables
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

    const [aulas, setAulas] = useState([]);

    // Obtener Aulas
    const obtenerAulas = async () => {
        try {
        const res = await fetch("http://localhost:3000/api/edumultipro/Aulas");
        const data = await res.json();
        setAulas(data);
        } catch (err) {
        console.error("Error al obtener Aulas:", err);
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

    // Eliminar Aulas
    const eliminarAula = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este Aula?");
        if (!confirmacion) return;

        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
        $('#tablaUsuarios').DataTable().destroy();
        }

        try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Aulas/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();
        alert(data.mensaje);

        const nuevosAulas = aulas.filter((aula) => aula.ID !== id);
        setAulas(nuevosAulas);
        } catch (error) {
        console.error("Error al eliminar el Aula:", error);
        alert("Hubo un error al intentar eliminar el Aula.");
        }
    };

    useEffect(() => {
        obtenerAulas();
    }, []);

    useEffect(() => {
        if (aulas.length > 0) {
        setTimeout(() => {
            inicializarDataTable();
        }, 100);
        }
    }, [aulas]);

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
                                        {aulas.map((aula) => (
                                        <tr key={aula.ID}>
                                            <td>{aula.ID}</td>
                                            <td>{aula.Aula_Nombre}</td>
                                            <td>{aula.Materia_Nombre}</td>
                                            <td>{aula.Curso_Jornada}</td>
                                            <td>{aula.Profesor}</td>
                                            <td>
                                            <Link to={"/VerCurso"}>
                                                <button type="button" className="informacion" id="btninformacion">
                                                <i className="fa-solid fa-circle-info"></i>
                                                </button>
                                            </Link>
                                            </td>
                                            <td>
                                            <button className="modificar">
                                                <i className="fa-solid fa-gear"></i>
                                            </button>
                                            </td>
                                            <td>
                                            <button className="btn-icon eliminar" type="button" onClick={() => eliminarAula(aula.ID)}>
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
export default Aula;