import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/ReportesClaseCoor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function ReportesClaseCoor(){

    const [totalAulas, setTotalAulas] = useState(0);
    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/edumultipro/reportes/aulas")
        .then(res => res.json())
        .then(data => {
            setTotalAulas(data.totalAulas);
            setAulas(data.aulas);
        })
        .catch(err => console.error("Error cargando reportes:", err));
    }, []);

    useEffect(() => {
        if (aulas.length > 0) {
            // Destruir si ya existe
            if ($.fn.DataTable.isDataTable('#tablaAulas')) {
                $('#tablaAulas').DataTable().clear().destroy();
                $('#tablaAulas').empty(); // 🔹 Limpia completamente el HTML de la tabla
            }

            // Inicializar DataTable después de renderizar filas
            setTimeout(() => {
                $('#tablaAulas').DataTable({
                    destroy: true, // 🔹 Fuerza destrucción previa si existe
                    language: {
                        processing: "Procesando...",
                        search: "Buscar:",
                        lengthMenu: "Mostrar _MENU_ registros",
                        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                        infoEmpty: "Mostrando 0 a 0 de 0 registros",
                        infoFiltered: "(filtrando de _MAX_ registros totales)",
                        loadingRecords: "Cargando...",
                        zeroRecords: "No se encontraron resultados",
                        emptyTable: "No hay datos en la tabla",
                        paginate: {
                            previous: "Anterior",
                            next: "Siguiente"
                        }
                    }
                });
            }, 100);
        }
    }, [aulas]);

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

                            <div className="carda">

                                <Link to={"/ReportesCoor"}><div className="targeta"><i className="fa-solid fa-book"></i><h1>Plataforma</h1></div></Link>
                                
                                <Link to={"/ReportesClaseCoor"}><div className="targeta"><i className="fa-solid fa-temperature-low"></i><h1>Clase</h1></div></Link>

                                <Link to={"/ReportesAgendaCoor"}><div className="targeta"><i className="fa-solid fa-clock"></i><h1>Agenda</h1></div></Link>

                            </div>

                            <div className="tituloReportesClase">
                                <h1>Aulas</h1>
                                <h1>Aulas Totales: {totalAulas}</h1>
                            </div>

                            <div className="contenedor-tabla">
                                <table className="tablaAulas" id="tablaAulas">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre Aula</th>
                                            <th>Materia</th>
                                            <th>Curso</th>
                                            <th>Profesor</th>
                                            <th>Cantidad Usuarios</th>
                                            <th>Cantidad Anuncios</th>
                                            <th>Cantidad Comentarios</th>
                                            <th>Cantidad Trabajos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {aulas.map(a => (
                                        <tr key={a.aula_id}>
                                            <td>{a.aula_id}</td>
                                            <td>{a.Aula_Nombre}</td>
                                            <td>{a.Materia_Nombre}</td>
                                            <td>{a.curso_jornada}</td>
                                            <td>{a.profesor}</td>
                                            <td>{a.total_usuarios}</td>
                                            <td>{a.total_anuncios}</td>
                                            <td>{a.total_comentarios}</td>
                                            <td>{a.total_trabajos}</td>
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
export default ReportesClaseCoor;