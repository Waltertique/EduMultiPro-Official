import { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import usuarioImg from '../assets/usuarioCoordinador.png';
import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../barraCoordinador.jsx';
import './css/Perfil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Perfil() {
    useEffect(() => {
        const table = $('#tabla-curso-dt').DataTable();

        if ($.fn.DataTable.isDataTable('#tabla-curso-dt')) {
            table.destroy();
        }

        $('#tabla-curso-dt').DataTable({
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
            <div className="contenedor-perfil">

                {/*---Nav---*/}
                <Encabezado />

                {/*---Desplegable---*/}
                <Desplegable />

                {/*---Article---*/}
                <div className="contenedor-principal" id="zona-central">
                    <div className="fila-central" id="bloque-contenido">

                        {/*---BarraLateral---*/}
                        <BarraLateral />

                        {/*---Tabla---*/}
                        <div className="bloque-perfil" id="bloque-perfil">
                            <h2>Mis Datos</h2>
                            <div className="linea"></div>   
                            <div className="containerInfoUsuario">
                                <div className="row d-flex align-items-start my-4">
                                    <div className="col-12 col-lg-3 d-flex justify-content-center mb-1 mb-lg-0 left">
                                        <div className="foto-container">
                                            <img src={usuarioImg} alt="Foto de Usuario" className="foto" />

                                        </div>
                                    </div>

                                    {/*---Información del Usuario (Campos)---*/}
                                    <div className="col-12 col-lg-9 right">
                                        <div className="row">
                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="nombre">Nombre</label>
                                                <input type="text" id="nombre" name="nombre" value="Juan Pérez" disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="apellidos">Apellidos</label>
                                                <input type="text" id="apellidos" name="apellidos" value="Gómez" disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="tipo_documento">Tipo de Documento</label>
                                                <input type="text" id="tipo_documento" name="tipo_documento" value="CC." disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="numero_documento">N.o Documento</label>
                                                <input type="text" id="numero_documento" name="numero_documento" value="12345678" disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="rol">Rol</label>
                                                <input type="text" id="rol" name="rol" value="Coordinador" disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="telefono1">Teléfono 1</label>
                                                <input type="text" id="telefono1" name="telefono1" value="3124567896" disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="telefono2">Teléfono 2</label>
                                                <input type="text" id="telefono2" name="telefono2" value="6012345671" disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="correo">Correo</label>
                                                <input type="email" id="correo" name="correo" value="juanperez@gmail.com" disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="codigo">Mi Código</label>
                                                <input type="text" id="codigo" name="codigo" value="5432" disabled />
                                            </div>

                                            <div className="campo col-12 col-md-6 col-lg-4">
                                                <label htmlFor="correo_institucional">Correo institucional</label>
                                                <input type="text" id="correo_institucional" name="correo_institucional" value="juanperez@.edu.co" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>

                {/*---Footer---*/}
                <Footer />
            </div>
        </>
    );
}

export default Perfil;
