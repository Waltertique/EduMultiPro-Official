import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/TrabajoAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link, useParams } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function TrabajoAlumno(){

    const { id } = useParams(); // ID del aula
    const [trabajos, setTrabajos] = useState([]);

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

    return (
    <>
        <ProteccionRuta rolRequerido="R001" />
        <div className='contenedor'>

            {/*---Nav---*/}
            <Encabezado />

            {/*---Desplegable---*/}
            <DesplegableAlumno />

            {/*---Article---*/}
            <div className="container-fluid" id="centroAlumno">

                {/*---navegador alumno---*/}
                <NavAlumno />

                <div className="col-10" id="contenidoTablaAulaAlumno">

                    <div className="row" id="navAulaAlumno">

                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/VerAulaAlumno/${id}`}><button id="principal">Pricipal</button></Link></div>
                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/TrabajoAlumno/${id}`}><button id="trabajo">Trabajos</button></Link></div>
                    <div className="col-12 col-md-2 col-xl-2"><Link to={`/PersonaAlumno/${id}`}><button id="persona">Personas</button></Link></div>
                    <div className="col-12 col-md-4 col-xl-4"></div>

                    </div>

                    <div className="tituloTrabajoAlumno">
                        <h1>Trabajos</h1>
                    </div>

                    <div className="contenedor-tablaTrabajoAlumno">
                        <table className="tablaUsuarios" id="tablaUsuarios">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Fecha Entrega</th>
                                    <th>Información</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trabajos.map((trabajo) => (
                                    <tr key={trabajo.ID}> 
                                        <td>{trabajo.Titulo_Trabajo}</td>
                                        <td>{new Date(trabajo.Fecha_Trabajo).toLocaleDateString()}</td>
                                        <td>
                                            <Link to={`/VerTrabajoAlumno/${trabajo.ID}/${id}`}>
                                                <button type="submit" className="informacion" id="btninformacion">
                                                    <i className="fa-solid fa-circle-info"></i>
                                                </button>
                                            </Link>
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

export default TrabajoAlumno;