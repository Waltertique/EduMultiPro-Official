import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos

function Usuario() {
  return (
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
                    <div className="col-10" id="contenidoTabla">

                    </div>

                </div>

            </div>

            {/*---Footer---*/}
            <Footer />

        </div>
    </>
  );
}

export default Usuario;