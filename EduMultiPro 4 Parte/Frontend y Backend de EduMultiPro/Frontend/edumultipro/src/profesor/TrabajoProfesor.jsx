import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/TrabajoProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import ProteccionRuta from '../ProteccionRuta.jsx';


function TrabajoProfesor(){ 

    const { id } = useParams(); // ID del aula
    const [trabajos, setTrabajos] = useState([]);

    const eliminarTrabajo = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este trabajo?");
        if (!confirmar) return;

        // 🔴 1. Destruye DataTable antes de eliminar
        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
            $('#tablaUsuarios').DataTable().destroy();
        }

        try {
            const res = await fetch(`http://localhost:3000/api/edumultipro/Trabajo/${id}`, {
            method: 'DELETE'
            });

            if (res.ok) {
            alert("Trabajo eliminado correctamente");
            // 🟡 2. Filtra localmente los datos
            const nuevosTrabajos = trabajos.filter(t => t.ID !== id);
            setTrabajos(nuevosTrabajos);
            } else {
            alert("Error al eliminar el trabajo");
            }
        } catch (err) {
            console.error("Error al eliminar trabajo:", err);
            alert("Error al conectar con el servidor");
        }
        };

        useEffect(() => {
            const obtenerTrabajos = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/api/edumultipro/Trabajos/Aula/${id}`);
                    const data = await res.json();
                    setTrabajos(data);
                } catch (err) {
                    console.error("Error al obtener trabajos:", err);
                }
            };

            obtenerTrabajos();
        }, [id]);

        useEffect(() => {
            setTimeout(() => {
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
            }, 300);
        }, [trabajos]);

        useEffect(() => {
    if (trabajos.length > 0) {
        setTimeout(() => {
        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
            $('#tablaUsuarios').DataTable().destroy();
        }
        inicializarDataTable(); // 👈 tu función con opciones de idioma
        }, 100);
    }
    }, [trabajos]);

    return (
    <>
        <ProteccionRuta rolRequerido="R002" />
        <div className='contenedor'>

            {/*---Nav---*/}
            <Encabezado />

            {/*---Desplegable---*/}
            <DesplegableProfesor />

            {/*---Article---*/}
            <div className="container-fluid" id="centroProfesor">

                {/*---navegador Profesor---*/}
                <NavProfesor />

                <div className='todoprofesor'>
                
                    <div className="row" id="navAula">
                        <div className="col-12 col-md-2 col-xl-2"><Link to={`/VerAulaProfesor/${id}`}><button id="principal">Principal</button></Link></div>
                        <div className="col-12 col-md-2 col-xl-2"><Link to={`/TrabajoProfesor/${id}`}><button id="trabajo">Trabajos</button></Link></div>
                        <div className="col-12 col-md-2 col-xl-2"><Link to={`/NotaProfesor/${id}`}><button id="nota">Notas</button></Link></div>
                        <div className="col-12 col-md-2 col-xl-2"><Link to={`/PersonasProfesor/${id}`}><button id="persona">Personas</button></Link></div>
                        <div className="col-12 col-md-4 col-xl-4"></div>
                    </div>

                    <div className="tituloTrabajo">
                        <h1>Trabajos</h1>
                        <Link to={`/CrearTrabajoProfesor/${id}`}>
                            <button className="crear" id="btnAgregarUsuario">Crear Trabajo</button>
                        </Link>
                    </div>

                    <div className="contenedor-tablaTrabajo">
                        <table className="tablaUsuarios" id="tablaUsuarios">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Fecha Entrega</th>
                                    <th>Información</th>
                                    <th>Modificar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trabajos.map((trabajo) => (
                                    <tr key={trabajo.ID}>
                                        <td>{trabajo.Titulo_Trabajo}</td>
                                        <td>{new Date(trabajo.Fecha_Trabajo).toLocaleDateString()}</td>
                                        <td>
                                            <Link to={`/VerTrabajoProfesor/${trabajo.ID}/${id}`}>
                                                <button type="submit" className="informacion" id="btninformacion">
                                                    <i className="fa-solid fa-circle-info"></i>
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/ActualizarTrabajoProfesor/${trabajo.ID}`}>
                                                <button type="button" className="crear" id="btnAgregarUsuario">
                                                    <i className="fa-solid fa-gear"></i>
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn-icon eliminar" onClick={() => eliminarTrabajo(trabajo.ID)}>
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

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default TrabajoProfesor;