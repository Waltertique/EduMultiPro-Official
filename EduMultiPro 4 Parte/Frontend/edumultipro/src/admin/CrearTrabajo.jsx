import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearTrabajo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';

function CrearTrabajo(){

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
                        <div className="col-10" id="contenidoCrearTrabajo">

                            <Link to={"/Trabajos"}>
                                <button id="salirCrearTrabajo">Salir</button>
                            </Link>
                            <div className="parte1CrearTrabajo">
                                <h1>Crear Trabajo</h1>
                                <form action="{{ url_for('admin2_bp.guardarTrabajo') }}" method="POST" enctype="multipart/form-data">
                                <input type="hidden" name="aula_id" value="{{ aula_id }}" />
                                
                                <input type="text" placeholder="Titulo" name="titulo" required /><br></br>
                                
                                <textarea placeholder="Descripción" name="descripcion"></textarea><br></br>
                                
                                <label for="fecha">Fecha de entrega:</label>
                                <input type="date" name="fecha" required /><br></br>
                                
                                <label for="archivo">Archivo (opcional):</label>
                                <input id='ArchivoCrearTrabajo' type="file" name="archivo[]" multiple /><br></br>

                                <button type="submit">Crear</button>
                                </form>
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
export default CrearTrabajo;