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
import { Link } from 'react-router-dom';

function TrabajoAlumno(){

    useEffect(() => {
        const table = $('#tablaUsuarios').DataTable();

        // Verifica si ya está inicializado
        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
            table.destroy(); // Destruye la instancia anterior
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
    }, []);

    return (
    <>
        <div className='contenedor'>

            {/*---Nav---*/}
            <Encabezado />

            {/*---Desplegable---*/}
            <DesplegableAlumno />

            {/*---Article---*/}
            <div className="container-fluid" id="centroAlumno">

                {/*---navegador alumno---*/}
                <NavAlumno />

                <div class="col-10" id="contenidoTablaAulaAlumno">

                    <div class="row" id="navAulaAlumno">

                    <div class="col-12 col-md-2 col-xl-2"><Link to={"/VerAulaAlumno"}><button id="principal">Pricipal</button></Link></div>
                    <div class="col-12 col-md-2 col-xl-2"><Link to={"/TrabajoAlumno"}><button id="trabajo">Trabajos</button></Link></div>
                    <div class="col-12 col-md-2 col-xl-2"><Link to={"/PersonaAlumno"}><button id="persona">Personas</button></Link></div>
                    <div class="col-12 col-md-4 col-xl-4"></div>

                    </div>

                    <div class="tituloTrabajoAlumno">
                        <h1>Trabajos</h1>
                    </div>

                    <div class="contenedor-tablaTrabajoAlumno">
                        <table class="tablaUsuarios" id="tablaUsuarios">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Fecha Entrega</th>
                                    <th>Información</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*% for trabajo in trabajos %*/}
                                    <tr>
                                        <td> trabajo.Titulo_Trabajo</td>
                                        <td> trabajo.Fecha_Trabajo </td>
                                        <td>
                                            <Link to={"/VerTrabajoAlumno"}>
                                                <button type="submit" class="informacion" id="btninformacion">
                                                    <i class="fa-solid fa-circle-info"></i>
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                {/*% endfor %*/}
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