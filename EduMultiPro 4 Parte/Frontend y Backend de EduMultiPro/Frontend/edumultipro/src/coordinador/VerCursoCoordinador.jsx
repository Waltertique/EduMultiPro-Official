import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/VerCursoCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link, useParams } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function VerCursoCoordinador(){

    const { id } = useParams(); // ID del curso desde la URL
    const [integrantes, setIntegrantes] = useState([]);
    const [usuarioID, setUsuarioID] = useState("");

    // Inicializar DataTable
    const inicializarDataTable = () => {
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
    };

    //Añadir Usuario
    const agregarIntegrante = async (e) => {
        e.preventDefault();

        if (!usuarioID.trim()) {
            alert("Por favor escribe un ID válido.");
            return;
        }

        // Destruir DataTable antes de actualizar
        if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
            $('#tablaUsuarios').DataTable().destroy();
        }

        try {
            const res = await fetch(`http://localhost:3000/api/edumultipro/Cursos/${id}/integrantes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usuario_id: usuarioID }),
            });

            const data = await res.json();
            alert(data.mensaje);

            if (!res.ok) {
                throw new Error(data?.mensaje || "Error desconocido al agregar usuario.");
            }

            // ✅ Recargar integrantes desde backend (más seguro)
            const resActualizados = await fetch(`http://localhost:3000/api/edumultipro/Cursos/${id}/integrantes`);
            const dataActualizada = await resActualizados.json();
            setIntegrantes(dataActualizada);

            // Limpiar input
            setUsuarioID("");

            // Reinicializar DataTable
            setTimeout(() => {
                inicializarDataTable();
            }, 100);
        } catch (error) {
            console.error("Error al agregar integrante:", error);
            alert("Hubo un error al intentar agregar el usuario.");
        }
    };

    //Eliminar Integrante
    const eliminarIntegrante = async (usuarioID) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este integrante del curso?");
    if (!confirmacion) return;

    // Destruir la tabla antes de actualizar datos
    if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
        $('#tablaUsuarios').DataTable().destroy();
    }

    try {
        const res = await fetch(`http://localhost:3000/api/edumultipro/Cursos/${id}/integrantes/${usuarioID}`, {
        method: "DELETE",
        });

        const data = await res.json();
        alert(data.mensaje);

        // Actualizar la lista de integrantes en el estado
        const nuevosIntegrantes = integrantes.filter((u) => u.ID !== usuarioID);
        setIntegrantes(nuevosIntegrantes);

        // Volver a activar DataTable después de que React actualice el DOM
        setTimeout(() => {
        inicializarDataTable();
        }, 100);
    } catch (error) {
        console.error("Error al eliminar integrante:", error);
        alert("Hubo un error al intentar eliminar el integrante.");
    }
    };

    //Buscar Integrante
    useEffect(() => {
    console.log("ID recibido desde URL:", id); 
    fetch(`http://localhost:3000/api/edumultipro/Cursos/${id}/integrantes`)
        .then(res => res.json())
        .then(data => {
        console.log("Integrantes recibidos:", data); 
        setIntegrantes(data);
        })
        .catch(error => console.error("Error al cargar integrantes:", error));
    }, [id]);

    useEffect(() => {
    if (integrantes.length > 0) {
        setTimeout(() => {
        inicializarDataTable();
        }, 100);
    }
    }, [integrantes]);

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

                            <div className="tituloVerCurso">
                                <h1>Integrantes Del Curso</h1>
                                <Link to={"/PrincipalCoordinador"}>
                                    <button class="crear" id="btnAgregarUsuario"> <i class="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div className="agregar-usuario">
                                <form onSubmit={agregarIntegrante}>
                                    <label for="usuario_id">Agregar Usuario:</label>
                                    <input type="text" id="usuario_id" name="usuario_id" required placeholder="ID Usuario" value={usuarioID} onChange={(e) => setUsuarioID(e.target.value)}></input>
                                    <button type="submit">Agregar</button>
                                </form>
                            </div>

                            <div className="contenedor-tabla">
                                <table className="tablaUsuarios" id="tablaUsuarios">
                                    <thead>
                                        <tr>
                                            <th>Identificación</th>
                                            <th>P Nombre</th>
                                            <th>S Nombre</th>
                                            <th>P Apellido</th>
                                            <th>S Apellido</th>
                                            <th>Eliminar del curso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {integrantes.map((usuario) => (
                                            <tr key={usuario.ID}>
                                            <td>{usuario.ID}</td>
                                            <td>{usuario.Primer_Nombre}</td>
                                            <td>{usuario.Segundo_Nombre}</td>
                                            <td>{usuario.Primer_Apellido}</td>
                                            <td>{usuario.Segundo_Apellido}</td>
                                            <td> 
                                                <button className="btn-icon eliminar" type="button" onClick={() => eliminarIntegrante(usuario.ID)}>
                                                <i className="fa-solid fa-trash"></i>
                                                </button> 
                                            </td>
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
export default VerCursoCoordinador;