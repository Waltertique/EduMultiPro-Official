import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/ReportesAgenda.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function ReportesAgenda(){

    const [totales, setTotales] = useState({});
    const [totalNoticias, setTotalNoticias] = useState(0);

    // Estados nuevos para cursos y profesores
    const [cursosConHorario, setCursosConHorario] = useState([]);
    const [cursosSinHorario, setCursosSinHorario] = useState([]);
    const [profesConHorario, setProfesConHorario] = useState([]);
    const [profesSinHorario, setProfesSinHorario] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/edumultipro/reportes/horarios-totales")
        .then(res => res.json())
        .then(data => setTotales(data));

        fetch("http://localhost:3000/api/edumultipro/reportes/noticias-totales")
        .then(res => res.json())
        .then(data => setTotalNoticias(data.total_noticias));

        // Traer cursos con y sin horario
        fetch("http://localhost:3000/api/edumultipro/reportes/cursos-horarios")
        .then(res => res.json())
        .then(data => {
            setCursosConHorario(data.conHorario);
            setCursosSinHorario(data.sinHorario);
        });

        // Traer profesores con y sin horario
        fetch("http://localhost:3000/api/edumultipro/reportes/profesores-horarios")
        .then(res => res.json())
        .then(data => {
            setProfesConHorario(data.conHorario);
            setProfesSinHorario(data.sinHorario);
        });
    }, []);

    // Inicializar DataTable para cursos cuando cambian los cursos
    useEffect(() => {
        if (cursosConHorario.length === 0 && cursosSinHorario.length === 0) return;

        if ($.fn.DataTable.isDataTable('#tablaAulas1')) {
        $('#tablaAulas1').DataTable().destroy();
        }

        $('#tablaAulas1').DataTable({
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
            paginate: { previous: "Anterior", next: "siguiente" },
            aria: {
            sortAscending: ": activar para ordenar la columna ascendente",
            sortDescending: ": activar para ordenar la columna descendente"
            }
        }
        });
    }, [cursosConHorario, cursosSinHorario]);

    // Inicializar DataTable para profesores cuando cambian los profesores
    useEffect(() => {
        if (profesConHorario.length === 0 && profesSinHorario.length === 0) return;

        if ($.fn.DataTable.isDataTable('#tablaAulas2')) {
        $('#tablaAulas2').DataTable().destroy();
        }

        $('#tablaAulas2').DataTable({
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
            paginate: { previous: "Anterior", next: "siguiente" },
            aria: {
            sortAscending: ": activar para ordenar la columna ascendente",
            sortDescending: ": activar para ordenar la columna descendente"
            }
        }
        });
    }, [profesConHorario, profesSinHorario]);

    return(
        <>
          <ProteccionRuta rolRequerido="R004" />
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

                            <div className="carda">

                                <Link to={"/Reportes"}><div className="targeta"><i className="fa-solid fa-book"></i><h1>Plataforma</h1></div></Link>
                                
                                <Link to={"/ReportesClase"}><div className="targeta"><i className="fa-solid fa-temperature-low"></i><h1>Clase</h1></div></Link>

                                <Link to={"/ReportesAgenda"}><div className="targeta"><i className="fa-solid fa-clock"></i><h1>Agenda</h1></div></Link>

                            </div>

                            <div className="tituloReportesAgenda">
                                <h1>Horarios</h1>
                            </div>

                            <table id='totalHorarioAgenda' className='totalHorarioAgenda'>
                                <thead>
                                    <tr>
                                        <th>Total Horarios</th>
                                        <th>Cursos Con Horario</th>
                                        <th>Cursos Sin Horario</th>
                                        <th>Profesor Con Horario</th>
                                        <th>Profesor Sin Horario</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                     <tr>
                                        <td>{totales.total_horarios}</td>
                                        <td>{totales.cursos_con_horario}</td>
                                        <td>{totales.cursos_sin_horario}</td>
                                        <td>{totales.profesores_con_horario}</td>
                                        <td>{totales.profesores_sin_horario}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="tituloReportesAgenda2">
                                <h1>Horarios Asignados</h1>
                            </div>

                            <div className="contenedor-tablaAgenda">
                                <table className="tablaAulas1" id="tablaAulas1">
                                    <thead>
                                        <tr>
                                            <th>Cursos Con Horario</th>
                                            <th>Cursos Sin Horario</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/** Render cursos */}
                                        {cursosConHorario.map((curso, i) => (
                                            <tr key={`con-${i}`}>
                                            <td>{curso.curso} - {curso.jornada}</td>
                                            <td></td>
                                            </tr>
                                        ))}
                                        {cursosSinHorario.map((curso, i) => (
                                            <tr key={`sin-${i}`}>
                                            <td></td>
                                            <td>{curso.curso} - {curso.jornada}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <table className="tablaAulas2" id="tablaAulas2">
                                    <thead>
                                        <tr>
                                            <th>Profesor Con Horario</th>
                                            <th>Profesor Sin Horario</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {profesConHorario.map((prof, i) => (
                                            <tr key={`conP-${i}`}>
                                            <td>{prof.nombre} {prof.apellido}</td>
                                            <td></td>
                                            </tr>
                                        ))}
                                        {profesSinHorario.map((prof, i) => (
                                            <tr key={`sinP-${i}`}>
                                            <td></td>
                                            <td>{prof.nombre} {prof.apellido}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="tituloReportesAgenda">
                                <h1>Noticias Totales: {totalNoticias}</h1>
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
export default ReportesAgenda;