import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableProfesor from './DesplegableProfesor.jsx';
import NavProfesor from './NavProfesor.jsx';
import './css/CrearTrabajoProfesor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import ProteccionRuta from '../ProteccionRuta.jsx';


function CrearTrabajoProfesor(){ 

    const { id } = useParams(); // ID del aula
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [archivos, setArchivos] = useState([]);

    const manejarEnvio = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('fecha', fecha);
        formData.append('aula_id', id);
        
        for (let i = 0; i < archivos.length; i++) {
            formData.append('archivos', archivos[i]);
        }

        try {
            const res = await fetch('http://localhost:3000/api/edumultipro/CrearTrabajo', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                alert("Trabajo creado correctamente");
                navigate(`/TrabajoProfesor/${id}`);
            } else {
                alert("Error al crear el trabajo");
            }
        } catch (err) {
            console.error("Error al enviar el trabajo:", err);
        }
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

                    <div className="col-10" id="contenidoCrearTrabajoProfesor">

                        <Link to={`/TrabajoProfesor/${id}`}>
                            <button id="salirCrearTrabajo">Salir</button>
                        </Link>
                        <div className="parte1CrearTrabajo">
                            <h1>Crear Trabajo</h1>
                            <form onSubmit={manejarEnvio}>
                                <input type="text" placeholder="Título" required value={titulo} onChange={(e) => setTitulo(e.target.value)} /><br />
                                <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea><br />
                                <label>Fecha de entrega:</label>
                                <input type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)} /><br />
                                <label>Archivo (opcional):</label>
                                <input type="file" id='ArchivoCrearTrabajo' multiple onChange={(e) => setArchivos(e.target.files)} /><br />
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
  );
}

export default CrearTrabajoProfesor;