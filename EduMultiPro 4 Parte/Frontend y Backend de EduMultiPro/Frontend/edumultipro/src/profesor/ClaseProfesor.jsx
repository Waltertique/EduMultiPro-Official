import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/ClaseProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function ClaseProfesor(){

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
            <DesplegableProfesor />

            {/*---Article---*/}
            <div className="container-fluid" id="centroProfesor">

                {/*---navegador Profesor---*/}
                <NavProfesor />
                
                <div className="tituloAulaProfesor">
                    <h1>Mis Aulas</h1>
                </div>

                <div className="contenedor-tablaAulaProfesor">
                    <table className="tablaUsuarios" id="tablaUsuarios">
                        <thead>
                            <tr>
                                <th>Nombre Aula</th>
                                <th>Materia</th>
                                <th>Curso</th>
                                <th>Profesor</th>
                                <th>Ver Aula</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*% for aula in aulas %*/}
                            <tr>
                                <td> aula.Aula_Nombre </td>
                                <td> aula.Materia_Nombre </td>
                                <td> aula.Curso_Nombre </td>
                                <td> aula.Profesor </td>
                                <td>
                                    <Link>
                                    <button type="submit" className="informacion" id="btninformacion">
                                        <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                    </Link>
                                </td>
                            </tr>
                            {/*% endfor %*/}
                        </tbody>
                    </table>
                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default ClaseProfesor;