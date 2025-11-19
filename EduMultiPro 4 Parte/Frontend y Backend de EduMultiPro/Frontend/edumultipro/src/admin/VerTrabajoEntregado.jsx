<<<<<<< HEAD
import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

=======
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import ProteccionRuta from '../ProteccionRuta.jsx';
>>>>>>> origin/ramajohan
import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerTrabajoEntregado.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
<<<<<<< HEAD
import { Link } from 'react-router-dom';

function VerTrabajoEntregado(){

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
=======
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function VerTrabajoEntregado(){

    const { trabajoId, aulaId } = useParams();
    const [entregas, setEntregas] = useState([]);
    const [entregaSeleccionada, setEntregaSeleccionada] = useState(null);
    const [archivosEntrega, setArchivosEntrega] = useState([]);

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/edumultipro/Trabajos/${trabajoId}/Entregados`);
                const data = await res.json();
                setEntregas(data);
            } catch (error) {
                console.error("Error al cargar entregas:", error);
            }
        };

        fetchEntregas();
        }, [trabajoId]);

        const handleAsignarNota = async (e) => {
        e.preventDefault();
        const nuevaNota = e.target.nuevaNota.value;
        const id = entregaSeleccionada.trabajo_entregado_id;

        try {
            const res = await fetch(`http://localhost:3000/api/edumultipro/Trabajos/Entregado/${id}/Nota`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nota: nuevaNota })
            });

            const data = await res.json();
            alert(data.mensaje);

            // Refrescar entregas
            const res2 = await fetch(`http://localhost:3000/api/edumultipro/Trabajos/${trabajoId}/Entregados`);
            const data2 = await res2.json();
            setEntregas(data2);
            setEntregaSeleccionada(null); // cerrar el modal
        } catch (error) {
            console.error("Error al asignar nota:", error);
            alert("Error al asignar nota");
        }
    };
    

    useEffect(() => {
        if (entregas.length > 0) {
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
        }
    }, [entregas]);

    const handleMostrarEntrega = async (entrega) => {
        setEntregaSeleccionada(entrega);

        try {
            const res = await fetch(`http://localhost:3000/api/edumultipro/TrabajoEntregado/${entrega.trabajo_entregado_id}/Archivos`);
            const archivos = await res.json();
            setArchivosEntrega(archivos);
        } catch (error) {
            console.error("Error al cargar archivos:", error);
            setArchivosEntrega([]);
        }
    };

    const handleCerrarEntrega = () => {
        setEntregaSeleccionada(null);
    };

    return(
        <>
            <ProteccionRuta rolRequerido="R004" />
>>>>>>> origin/ramajohan
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
                        <div className="col-10" id="contenidoTrabajoEntregado">

                            <div class="botonesVerTrabajo">
                                <div className='btn'>
<<<<<<< HEAD
                                    <Link to={"/VerTrabajo"}><button>Instrucciones</button></Link>
                                    <Link to={"/VerTrabajoEntregado"}><button>Ver Subidos</button></Link>
                                </div>
                                <Link to={"/Trabajos"}><button id="equix"><i class="fa-solid fa-x"></i></button></Link>
=======
                                    <Link to={`/VerTrabajo/${trabajoId}/${aulaId}`}><button>Instrucciones</button></Link>
                                    <Link><button>Ver Subidos</button></Link>
                                </div>
                                <Link to={`/Trabajos/${aulaId}`}><button id="equix"><i class="fa-solid fa-x"></i></button></Link>
>>>>>>> origin/ramajohan
                            </div>

                            <div class="cont1TrabajoEntregado">

                                <div class="contenedorTrabajoEntregado">
                                    <table class="tablaUsuarios" id="tablaUsuarios">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Ver</th>
                                            </tr>
                                        </thead>
                                        <tbody>
<<<<<<< HEAD
                                            {/*-- % for alumno in alumnos_entregados % --*/}
                                            <tr>
                                                <td> alumno.nombre_completo </td>
                                                <td>
                                                    <button class="mostrarEntregado"
                                                            data-id="{{ alumno.trabajo_entregado_id }}"
                                                            data-nombre="{{ alumno.nombre_completo }}"
                                                            data-nota="{{ alumno.Nota }}"
                                                            data-fecha="{{ alumno.Fecha_Trabajo }}"
                                                            data-archivos='{{ alumno.archivos | tojson }}'>
                                                    Ver entrega
                                                    </button>
                                                </td>
                                            </tr>
                                            {/*-- % endfor % --*/}
=======
                                            {entregas.length > 0 ? (
                                                entregas.map((entrega) => (
                                                    <tr key={entrega.trabajo_entregado_id}>
                                                        <td>{entrega.nombre_completo}</td>
                                                        <td>
                                                            <button className="mostrarEntregado" onClick={() => handleMostrarEntrega(entrega)}>
                                                                Ver entrega
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center">Sin entregas</td>
                                                </tr>
                                            )}
>>>>>>> origin/ramajohan
                                        </tbody>
                                    </table>
                                </div>

<<<<<<< HEAD
                                <div class="trabajosTrabajoEntregado" id="trabajosEntregados">
                                    <div class="autorTrabajoEntregado">
                                        <h3 id="nombreAlumno">primer trabajo</h3>
                                        <div>
                                            <p>Nota:</p>
                                            <p id="notaAlumno">3.4</p>
                                        </div>
                                    </div>
                                    <div class="archivosTrabajoEntregado" id="listaArchivos">
                                        <div className='archivo1'>
                                            <a href="">PrimerTrabajo</a>
                                        </div>
=======
                                {entregaSeleccionada && (
                                <div class="trabajosTrabajoEntregado" id="trabajosEntregados">
                                    <div class="autorTrabajoEntregado">
                                        <h3 id="nombreAlumno">{entregaSeleccionada.nombre_completo}</h3>
                                        <div>
                                            <p>Nota:</p>
                                            <p id="notaAlumno">{entregaSeleccionada.Nota ? entregaSeleccionada.Nota : "sin nota"}</p>
                                        </div>
                                    </div>
                                    <div class="archivosTrabajoEntregado" id="listaArchivos">
                                        {archivosEntrega.length > 0 ? (
                                            archivosEntrega.map((archivo, index) => (
                                                <div className='archivo1' key={index}>
                                                    <a href={`http://localhost:3000/imagenes/${archivo.ruta_archivo}`} target="_blank" rel="noopener noreferrer">
                                                        {archivo.nombre_original || "Archivo entregado"}
                                                    </a>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No se han subido archivos.</p>
                                        )}
>>>>>>> origin/ramajohan
                                    </div>
                                    <div class="notaTrabajoEntregado">
                                        <div class="fechaTrabajoEntregado">
                                            <h5>Fecha de Entrega:</h5>
<<<<<<< HEAD
                                            <p id="fechaEntregaTrabajoEntregado">23/45/45</p>
                                        </div>
                                        <div class="form1TrabajoEntregado">
                                            <form action="{{ url_for('admin2_bp.asignar_nota') }}" method="post">
                                                <input type="hidden" name="trabajo_entregado_id" id="trabajoEntregadoId" value="" />
                                                <input type="number" name="nuevaNota" placeholder="Nota" step="0.01" id="inputNota" required />
                                                <button type="submit">Asignar Nota</button>
                                            </form>
                                            <button id="salirTrabajoEntregado"><i class="fa-solid fa-x"></i></button>
                                        </div>
                                    </div>
                                </div>
=======
                                            <p id="fechaEntregaTrabajoEntregado">{new Date(entregaSeleccionada.Fecha_Trabajo).toLocaleDateString()}</p>
                                        </div>
                                        <div class="form1TrabajoEntregado">
                                            <form onSubmit={handleAsignarNota}>
                                                <input type="hidden" name="trabajo_entregado_id" value={entregaSeleccionada.trabajo_entregado_id} />
                                                <input type="number" name="nuevaNota" placeholder="Nota" step="0.01" required />
                                                <button type="submit">Asignar Nota</button>
                                            </form>
                                            <button id="salirTrabajoEntregado" onClick={handleCerrarEntrega}><i className="fa-solid fa-x"></i></button>
                                        </div>
                                    </div>
                                </div>
                                )}
>>>>>>> origin/ramajohan

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
export default VerTrabajoEntregado;