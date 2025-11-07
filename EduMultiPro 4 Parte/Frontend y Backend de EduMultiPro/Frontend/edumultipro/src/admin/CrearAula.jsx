import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/CrearAula.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProteccionRuta from '../ProteccionRuta.jsx';

function CrearAula(){

    const [materias, setMaterias] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [profesores, setProfesores] = useState([]);

    const [aulaNombre, setAulaNombre] = useState("");
    const [materiaId, setMateriaId] = useState("");
    const [cursoId, setCursoId] = useState("");
    const [usuarioId, setUsuarioId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/edumultipro/Materias")
            .then(res => res.json())
            .then(data => setMaterias(data));

        fetch("http://localhost:3000/api/edumultipro/Cursos-jornada")
            .then(res => res.json())
            .then(data => setCursos(data));

        fetch("http://localhost:3000/api/edumultipro/Profesores")
            .then(res => res.json())
            .then(data => setProfesores(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaAula = {
            aula_nombre: aulaNombre,
            materia_id: materiaId,
            curso_id: cursoId,
            usuario_id: usuarioId
        };

        try {
            const res = await fetch("http://localhost:3000/api/edumultipro/Aulas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaAula)
            });

            const data = await res.json();
            alert(data.mensaje || "Aula creada correctamente");
            navigate("/Aula");
        } catch (error) {
            console.error("Error al crear el aula:", error);
            alert("Ocurrió un error al crear el aula");
        }
    };

    return(
        <>
            <ProteccionRuta rolRequerido="R004" />
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

                            <div className="tituloCrearAula">
                                <h1>Crear Aula</h1>
                                <Link to={"/Aula"}>
                                    <button className="crear" id="btnAgregarUsuario">Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoCrearAula">
                    
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="aula_nombre"
                                        placeholder="Nombre del Aula"
                                        maxLength="50"
                                        required
                                        value={aulaNombre}
                                        onChange={(e) => setAulaNombre(e.target.value)}
                                    />

                                    <select
                                        name="materia_id"
                                        required
                                        value={materiaId}
                                        onChange={(e) => setMateriaId(e.target.value)}
                                    >
                                        <option value="">Seleccione una Materia</option>
                                        {materias.map((materia) => (
                                            <option key={materia.ID} value={materia.ID}>
                                                {materia.Materia_Nombre}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name="curso_id"
                                        required
                                        value={cursoId}
                                        onChange={(e) => setCursoId(e.target.value)}
                                    >
                                        <option value="">Seleccione un Curso</option>
                                        {cursos.map((curso) => (
                                            <option key={curso.ID} value={curso.ID}>
                                                {curso.Curso_Con_Jornada}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name="usuario_id"
                                        required
                                        value={usuarioId}
                                        onChange={(e) => setUsuarioId(e.target.value)}
                                    >
                                        <option value="">Seleccione un Profesor</option>
                                        {profesores.map((profe) => (
                                            <option key={profe.ID} value={profe.ID}>
                                                {profe.Nombre_Completo}
                                            </option>
                                        ))}
                                    </select>

                                    <button type="submit">Guardar Aula</button>
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
export default CrearAula;