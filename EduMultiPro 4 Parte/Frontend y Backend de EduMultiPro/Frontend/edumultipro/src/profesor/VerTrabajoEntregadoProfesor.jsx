import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt'; // JS
import imgTrabajo from '../assets/f9.png';

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/VerTrabajoEntregadoProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import ProteccionRuta from '../ProteccionRuta.jsx';


function VerTrabajoEntregadoProfesor(){ 

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

                    <div class="botonesVerTrabajo">
                        <div className='btn'>
                            <Link to={`/VerTrabajoProfesor/${trabajoId}/${aulaId}`}><button>Instrucciones</button></Link>
                            <Link><button>Ver Subidos</button></Link>
                        </div>
                        <Link to={`/TrabajoProfesor/${aulaId}`}><button id="equix"><i class="fa-solid fa-x"></i></button></Link>
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
                                </tbody>
                            </table>
                        </div>

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
                            </div>
                            <div class="notaTrabajoEntregado">
                                <div class="fechaTrabajoEntregado">
                                    <h5>Fecha de Entrega:</h5>
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

                    </div>

                </div>
            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default VerTrabajoEntregadoProfesor;