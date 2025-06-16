import { useEffect } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/VerAula.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import imgAula from '../assets/usuario.png';

function VerAula(){

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

                                <div class="col-12 col-md-2 col-xl-2"><a href="{{ url_for('admin2_bp.verAula', aula_id=aula_id) }}"><button id="principal">Pricipal</button></a></div>
                                <div class="col-12 col-md-2 col-xl-2"><a href="{{ url_for('admin2_bp.Trabajos', aula_id=aula_id) }}"><button id="trabajo">Trabajos</button></a></div>
                                <div class="col-12 col-md-2 col-xl-2"><a href="{{ url_for('admin2_bp.Notas', aula_id=aula_id) }}"><button id="persona">Notas</button></a></div>
                                <div class="col-12 col-md-2 col-xl-2"><a href="{{ url_for('admin2_bp.Personas', aula_id=aula_id) }}"><button id="persona">Personas</button></a></div>
                                <div class="col-12 col-md-4 col-xl-4"></div>

                            </div>

                            <div class="row" id="banerAula">
                                <div class="row" id="tituloAula">
                                    <h2> aula 'Aula_Nombre'</h2>
                                </div>
                                <div class="row" id="codigoAula">
                                    <h4> aula 'Profesor'  </h4>
                                </div>  
                            </div>

                            <div class="row" id="novedadAula">
                                <div class="col-md-6 col-xl-6"><h2>Novedades</h2></div>
                                <div class="col-md-6 col-xl-6" id="canuncioAula"><button id="btn-crear">Crear Anuncio</button></div>
                            </div>

                            {/*-- <!--Crear anuncio-----------------------------------------> --*/}

                            <div class="crearAnuncio" id="crearAnuncio">
                                <h1>Crear Anuncio</h1>
                                <form action="{{ url_for('admin2_bp.crear_anuncio') }}" method="POST" enctype="multipart/form-data">
                                    <input type="hidden" name="aula_id" value="{{ aula_id }}" /> 

                                    <input type="text" name="titulo" placeholder="Título del anuncio" required />

                                    <textarea name="descripcion" placeholder="Descripción del anuncio" rows="4" required></textarea>

                                    <input type="file" name="archivo[]" multiple />

                                    <button type="submit" class="btn-guardar" id="btn-guardar">Publicar anuncio</button>
                                    <button type="button" class="btn-cancelarAnuncio" id="btn-cancelar">Cancelar</button>
                                </form>
                            </div>

                            {/*-- % for anuncio in anuncios % --*/}
                                <div class="anuncioAula">
                                    <div class="info">

                                        <div class="info1">
                                            <div class="foto">
                                            <img class="img-fluid" src={imgAula} alt="" id="img1"></img>
                                            <h1> anuncio.Profesor </h1>
                                            </div>
                                            <h2> anuncio.Fecha_Anuncio </h2>
                                        </div>

                                        <div class="control">
                                            <button class="b1" onclick="mostrarFormulario('modificarAnuncio-{{ anuncio.ID }}')">Modificar</button>

                                            <form action="{{ url_for('admin2_bp.eliminar_anuncio', id=anuncio['ID'], aula_id=aula_id) }}" method="POST" onsubmit="return confirmarEliminacion()">
                                            <button class="btn-icon eliminar" type="submit">Eliminar</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="descripcion">
                                        <h2> anuncio.Titulo_Anuncio </h2>
                                        <p> anuncio.Descripcion_Anuncio </p>
                                    </div>
                                    {/*-- % if anuncio.Enlace_Anuncio % --*/}
                                    {/*-- % for enlace in anuncio.Enlace_Anuncio.split(';') % --*/}
                                        <a href="{{ url_for('static', filename=enlace) }}" target="_blank">Ver archivo</a><br></br>
                                    {/*-- % endfor % --*/}
                                    {/*-- % endif % --*/}
                                    <div class="botones">
                                        <form action="{{ url_for('admin2_bp.comentar', anuncio_id=anuncio.ID) }}?aula_id={{ aula_id }}" method="POST">
                                        <input type="text" name="comentario" placeholder="Comentar" required />
                                        <button type="submit" id="principal">Enviar</button>
                                        </form>
                                    </div>

                                    {/*-- <!--Modificar anuncio-----------------------------------------> --*/}

                                    <div class="modificarAnuncio" id="modificarAnuncio-{{ anuncio.ID }}" >
                                        <h1>modificar Anuncio</h1>
                                        <form action="{{ url_for('admin2_bp.modificar_anuncio', id=anuncio.ID) }}" method="POST" enctype="multipart/form-data">
                                            <input type="hidden" name="aula_id" value="{{ aula_id }}" />
                                            <input type="hidden" name="fecha" value="{{ anuncio.Fecha_Anuncio }}" /> 
                                            
                                            <input type="text" name="titulo" value="{{ anuncio.Titulo_Anuncio }}" required />
                                            <textarea name="descripcion" required> anuncio.Descripcion_Anuncio </textarea>
                                            <input type="file" name="archivo[]" multiple />

                                            <button type="submit">Guardar cambios</button>
                                            <button type="button" class="btn-cancelarmod" onclick="ocultarFormulario('modificarAnuncio-{{ anuncio.ID }}')">Cancelar</button>
                                        </form>
                                    </div>

                                    {/*-- <!--comentarios-----------------------------------------> --*/}

                                    {/*-- % for comentario in comentarios_por_anuncio.get(anuncio.ID, []) % --*/}
                                    <div class="comentario">
                                        <div class="info1">
                                        <div class="fotoComentario">
                                            <img src={imgAula} alt=""></img>
                                            <h1> comentario.Comentador </h1>
                                        </div>
                                        <h2> comentar </h2>
                                        </div>
                                        <div class="desc">
                                        <p> comentario.comentario </p>
                                        </div>
                                        <form action="{{ url_for('admin2_bp.eliminar_comentario', id=comentario.comentario_id, aula_id=aula_id) }}" method="POST" onsubmit="return confirmarEliminacionComentario()">
                                        <button class="btn-icon eliminar" type="submit">Eliminar</button>
                                        </form>
                                    </div>
                                    {/*-- % endfor % --*/}

                                </div>
                            {/*-- % endfor % --*/}

                        </div>
                    </div>        
                </div>

                {/*---Footer---*/}
                <Footer />

            </div>
        </>
    )
}
export default VerAula;