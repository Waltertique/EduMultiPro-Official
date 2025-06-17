import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Notas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function Notas(){

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
                        <div className="col-10" id="contenidoTablaAula">
                            
                            <div class="row" id="navAula">

                                <div class="col-12 col-md-2 col-xl-2"><Link to={"/VerAula"}><button id="principal">Pricipal</button></Link></div>
                                <div class="col-12 col-md-2 col-xl-2"><Link to={"/Trabajos"}><button id="trabajo">Trabajos</button></Link></div>
                                <div class="col-12 col-md-2 col-xl-2"><Link to={"/Notas"}><button id="persona">Notas</button></Link></div>
                                <div class="col-12 col-md-2 col-xl-2"><Link to={"/Personas"}><button id="persona">Personas</button></Link></div>
                                <div class="col-12 col-md-4 col-xl-4"></div>

                            </div>

                            <div class="tituloNota">
                                <h1>Notas Del Aula</h1>
                            </div>

                            <div class="contenedor-tablaNota">
                                <table class="tablaUsuarios" id="tablaUsuarios">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            {/*-- % for trabajo in trabajos % --*/}
                                                {/*-- <th>{{ trabajo.Titulo_Trabajo }}</th> --*/}
                                            {/*-- % endfor % --*/}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/*-- % for fila in tabla_notas % --*/}
                                            <tr>
                                                <td> fila.nombre </td>
                                                {/*-- % for nota in fila.notas % --*/} 
                                                    {/*-- <td>{{ nota }}</td> --*/}
                                                {/*-- % endfor % --*/}
                                            </tr>
                                        {/*-- % endfor % --*/}
                                    </tbody>
                                </table>

                                {/*-- % if not trabajos % --*/}
                                    {/*--<p>No hay trabajos registrados en esta aula.</p>--*/}
                                {/*-- % endif % --*/}
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
export default Notas;