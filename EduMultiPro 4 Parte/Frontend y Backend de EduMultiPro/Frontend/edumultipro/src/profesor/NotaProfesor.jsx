import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/NotaProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import ProteccionRuta from '../ProteccionRuta.jsx';


function NotaProfesor(){ 

    const { id } = useParams();
    const [trabajos, setTrabajos] = useState([]);
    const [tablaNotas, setTablaNotas] = useState([]);

    useEffect(() => {
        const obtenerNotas = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/edumultipro/Aulas/${id}/Notas`);
                const data = await res.json();
                console.log("Datos recibidos:", data); // <--- IMPORTANTE
                setTrabajos(data.trabajos);
                setTablaNotas(data.tabla_notas);
            } catch (error) {
                console.error("Error al obtener notas:", error);
            }
        };
        obtenerNotas();
    }, [id]);

    useEffect(() => {
        // Esperar a que el DOM se actualice completamente
        const timeout = setTimeout(() => {
            if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
                $('#tablaUsuarios').DataTable().destroy();
            }
            $('#tablaUsuarios').DataTable({
                language: {
                    zeroRecords: "No se encontraron resultados",
                    emptyTable: "No hay datos en la tabla",
                    search: "Buscar:",
                    lengthMenu: "Mostrar _MENU_ registros",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    paginate: {
                        previous: "Anterior",
                        next: "Siguiente"
                    }
                }
            });
        }, 200); // 200ms suele ser suficiente

        return () => clearTimeout(timeout);
    }, [tablaNotas]);

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

                    <div className="tituloNota">
                        <h1>Notas Del Aula</h1>
                    </div>

                    <div className="contenedor-tablaNota">
                        <table className="tablaUsuarios" id="tablaUsuarios">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    {trabajos.map((trabajo, i) => (
                                        <th key={i}>{trabajo}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tablaNotas.map((fila, i) => (
                                    <tr key={i}>
                                        <td>{fila.nombre}</td>
                                        {trabajos.map((trabajo, j) => (
                                            <td key={j}>
                                                {fila.notas && fila.notas[trabajo] !== undefined
                                                    ? fila.notas[trabajo]
                                                    : "sin nota"}
                                            </td>
                                        ))}
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

export default NotaProfesor;