import './Encabezado.css';
import evernoteImg from './assets/logo.png';

function Encabezado() {
  return (
    <>
        {/*---Nav---*/}
        <div className="container-fluid" id="navegador">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2 col-xxl-2" id="n1">
            
                    <div className="d-flex justify-content-end my-lg-2 px-lg-4">
                    <img id='img1' src={evernoteImg} alt="Ejemplo de notas" className="img-fluid" />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-9 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-start align-items-center" id="n2">
                    <h1 className="primerTitulo">EduMultiPro</h1>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 d-flex justify-content-center align-items-center" id="n3">
                    <div className="">
                    <h3>Tu Aliado En El Camino Educativo</h3>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Encabezado;