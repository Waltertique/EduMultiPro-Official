import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableAlumno from './DesplegableAlumno.jsx';
import NavAlumno from './NavAlumno.jsx';
import './css/ClaseAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function ClaseAlumno(){

    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario) return;

        fetch(`http://localhost:3000/api/edumultipro/Aulas/usuario/${usuario.id}`)
        .then(res => res.json())
        .then(data => {
            setAulas(data);

            // Esperamos a que React actualice el DOM
            setTimeout(() => {
                // Si ya existe la tabla, destruirla
                if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
                    $('#tablaUsuarios').DataTable().destroy();
                }

                // Inicializar de nuevo con idioma español
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
            }, 100);
        })
        .catch(err => console.error("❌ Error cargando aulas:", err));
    }, []);


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
                
                <div className="tituloAulaAlumno">
                    <h1>Mis Aulas</h1>
                </div>

                <div className="contenedor-tablaAulaAlumno">
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
                            {aulas.map((aula) => (
                            <tr key={aula.ID}>
                                <td>{aula.Aula_Nombre}</td>
                                <td>{aula.Materia_Nombre}</td>
                                <td>{aula.Curso_Nombre}</td>
                                <td>{aula.Profesor}</td>
                                <td>
                                <Link to={`/VerAulaAlumno/${aula.ID}`}>
                                    <button className="informacion">
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

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default ClaseAlumno;