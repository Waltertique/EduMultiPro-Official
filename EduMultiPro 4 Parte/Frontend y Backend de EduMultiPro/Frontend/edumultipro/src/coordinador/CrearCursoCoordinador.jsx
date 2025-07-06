import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/CrearCursoCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function CrearCursoCoordinador(){

    const [cursoNombre, setCursoNombre] = useState("");
  const [grados, setGrados] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [gradoId, setGradoId] = useState("");
  const [jornadaId, setJornadaId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Obtener grados
    fetch("http://localhost:3000/api/edumultipro/Grados")
      .then(res => res.json())
      .then(data => setGrados(data));

    // Obtener jornadas
    fetch("http://localhost:3000/api/edumultipro/Jornadas")
      .then(res => res.json())
      .then(data => setJornadas(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoCurso = {
      Curso_Nombre: cursoNombre,
      grado_id: gradoId,
      jornada_id: jornadaId
    };

    fetch("http://localhost:3000/api/edumultipro/Cursos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoCurso)
    })
      .then(res => res.json())
      .then(data => {
        alert("Curso creado correctamente");
        navigate("/PrincipalCoordinador"); // Redirige al listado
      })
      .catch(err => {
        console.error(err);
        alert("Error al crear el curso");
      });
  };
    
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

                            <div className="tituloCrearCurso">
                                <h1>Crear Curso</h1>
                                <Link to={"/PrincipalCoordinador"}>
                                    <button className="crear" id="btnAgregarUsuario"> <i className="fas fa-user-plus"></i>Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoCrearCurso">
                    
                                <form onSubmit={handleSubmit}>
                                    <h3>Datos Curso</h3>
                                    <div className="f1">
                                        <input type="text" name="curso_nombre" placeholder="Nombre del Curso" value={cursoNombre} onChange={(e) => setCursoNombre(e.target.value)} required></input>
                                    </div>
                                    <div className="f1">
                                        <select
                                            name="grado_id"
                                            required
                                            value={gradoId}
                                            onChange={(e) => setGradoId(e.target.value)}
                                            >
                                            <option value="" disabled>Selecciona un Grado</option>
                                            {grados.map((grado) => (
                                                <option key={grado.ID} value={grado.ID}>{grado.Grado_Nombre}</option>
                                            ))}
                                        </select>
                                        <select
                                            name="jornada_id"
                                            required
                                            value={jornadaId}
                                            onChange={(e) => setJornadaId(e.target.value)}
                                            >
                                            <option value="" disabled>Selecciona una Jornada</option>
                                            {jornadas.map((jornada) => (
                                                <option key={jornada.ID} value={jornada.ID}>{jornada.Jornada_Nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                
                                    <button type="submit">Guardar Curso</button>
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

export default CrearCursoCoordinador;