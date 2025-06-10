import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Noticia.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos

function Noticia(){

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
                        <div className="col-10" id="contenidoTabla">
                            <div className="titulo">
                                <h1>Gestion de Noticias</h1>
                                <a href="{{ url_for('admin2_bp.crear_noticia') }}">
                                <button className="crear" id="btnAgregarNoticia"> <i className="fas fa-user-plus"></i>Crear Noticia</button>
                                </a>
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
                                        {/*-- % if noticias % --*/}
                                            {/*-- % for noticia in noticias % --*/}
                                            <tr>
                                                <td>ID</td>
                                                <td>Titulo_Noticia</td>
                                                <td>Tipo</td>
                                                <td>
                                                
                                                
                                                <form action="{{ url_for('admin2_bp.verNoticia', id=noticia['ID']) }}">
                                                    <button type="submit" className="informacion" id="informacion">
                                                    <i className="fa-solid fa-circle-info"></i>
                                                    </button>
                                                </form>
                                                
                                                </td>
                                                <td>
                                                
                                                <form action="{{ url_for('admin2_bp.modificar_noticia', id=noticia['ID']) }}" method="GET">
                                                    <button type="submit" className="modificar" id="btnmodificar">
                                                    <i className="fa-solid fa-gear"></i>
                                                    </button>
                                                </form>
                                        
                                                </td>
                                                <td>
                                            
                                                <form action="{{ url_for('admin2_bp.eliminar_noticia', id=noticia['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                    <button className="btn-icon eliminar" type="submit">
                                                        <i className="fa-solid fa-trash"></i> Eliminar
                                                    </button>
                                                </form>
                                            
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Titulo_Noticia</td>
                                                <td>Tipo</td>
                                                <td>
                                                
                                                
                                                <form action="{{ url_for('admin2_bp.verNoticia', id=noticia['ID']) }}">
                                                    <button type="submit" className="informacion" id="informacion">
                                                    <i className="fa-solid fa-circle-info"></i>
                                                    </button>
                                                </form>
                                                
                                                </td>
                                                <td>
                                                
                                                <form action="{{ url_for('admin2_bp.modificar_noticia', id=noticia['ID']) }}" method="GET">
                                                    <button type="submit" className="modificar" id="btnmodificar">
                                                    <i className="fa-solid fa-gear"></i>
                                                    </button>
                                                </form>
                                        
                                                </td>
                                                <td>
                                            
                                                <form action="{{ url_for('admin2_bp.eliminar_noticia', id=noticia['ID']) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                                    <button className="btn-icon eliminar" type="submit">
                                                        <i className="fa-solid fa-trash"></i> Eliminar
                                                    </button>
                                                </form>
                                            
                                                </td>
                                            </tr>
                                            {/*-- % endfor % --*/}
                                        {/*-- % endif % --*/}
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
export default Noticia;