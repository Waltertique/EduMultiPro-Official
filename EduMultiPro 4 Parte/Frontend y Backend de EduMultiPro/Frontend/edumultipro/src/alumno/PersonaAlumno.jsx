import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/PersonaAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link, useParams } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function PersonaAlumno(){

    const { id } = useParams(); // id del aula
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
    const obtenerUsuarios = async () => {
        try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Aulas/${id}/integrantes`);
        const data = await res.json();
        setUsuarios(data);
        } catch (error) {
        console.error("Error al obtener los usuarios del aula:", error);
        }
    };

    obtenerUsuarios();

    // Inicializar DataTable
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
    }, 500); 
    }, [id]);

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

                    <div className="tituloPersonasAlumno">
                        <h1>Personas</h1>
                    </div>

                            <div className="contenedor-tablaPersonasAlumno">
                                <table className="tablaUsuarios" id="tablaUsuarios">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Primer Nombre</th>
                                        <th>Segundo Nombre</th>
                                        <th>Primer Apellido</th>
                                        <th>Segundo Apellido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario) => (
                                            <tr key={usuario.ID}>
                                            <td>{usuario.ID}</td>
                                            <td>{usuario.Primer_Nombre}</td>
                                            <td>{usuario.Segundo_Nombre || ''}</td>
                                            <td>{usuario.Primer_Apellido}</td>
                                            <td>{usuario.Segundo_Apellido || ''}</td>
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

export default PersonaAlumno;