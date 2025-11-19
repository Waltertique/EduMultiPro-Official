import { useEffect, useState } from 'react'; // datatables
import $ from 'jquery';
import 'datatables.net-dt'; // JS

import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/Reportes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function Reportes(){

    //total usuarios por rol
    const [totales, setTotales] = useState({
        totalUsuarios: 0,
        totalCoordinadores: 0,
        totalProfesores: 0,
        totalAlumnos: 0
    });

    useEffect(() => {
        fetch('http://localhost:3000/api/edumultipro/reportes/usuarios-totales')
            .then(res => res.json())
            .then(data => setTotales(data))
            .catch(err => console.error("❌ Error al cargar totales:", err));
    }, []);
    //----------------------------------------------------------------------------------

    //total cursos por rol
    const [cursosData, setCursosData] = useState([]);

    useEffect(() => {
    fetch("http://localhost:3000/api/edumultipro/reportes/cursos")
        .then(res => res.json())
        .then(data => setCursosData(data))
        .catch(err => console.error("Error:", err));
    }, []);
    //----------------------------------------------------------------------------------

    //total materias grados jornadas
    const [estructura, setEstructura] = useState({
    total_materias: 0,
    total_grados: 0,
    total_jornadas: 0
    });

    useEffect(() => {
    fetch("http://localhost:3000/api/edumultipro/reportes/estructura")
        .then(res => res.json())
        .then(data => setEstructura(data))
        .catch(err => console.error("Error:", err));
    }, []);
    //----------------------------------------------------------------------------------

    //total materias y aulas que lo usan
    const [materiasAulas, setMateriasAulas] = useState([]);

    useEffect(() => {
    fetch("http://localhost:3000/api/edumultipro/reportes/materias-aulas")
        .then(res => res.json())
        .then(data => setMateriasAulas(data))
        .catch(err => console.error("Error:", err));
    }, []);
    //----------------------------------------------------------------------------------

    //total grados y cursos que lo usan
    const [gradosCursos, setGradosCursos] = useState([]);

    useEffect(() => {
    fetch("http://localhost:3000/api/edumultipro/reportes/grados-cursos")
        .then(res => res.json())
        .then(data => setGradosCursos(data))
        .catch(err => console.error("Error:", err));
    }, []);
    //----------------------------------------------------------------------------------

    //total jornadas y cursos que lo usan
    const [jornadasCursos, setJornadasCursos] = useState([]);

    useEffect(() => {
    fetch("http://localhost:3000/api/edumultipro/reportes/jornadas-cursos")
        .then(res => res.json())
        .then(data => setJornadasCursos(data))
        .catch(err => console.error("Error:", err));
    }, []);
    //----------------------------------------------------------------------------------

    //obtener usuario por rol
    const [idBusqueda, setIdBusqueda] = useState("");
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

    const buscarUsuario = () => {
        if (!idBusqueda) return;
        fetch(`http://localhost:3000/api/edumultipro/buscar-usuario/${idBusqueda}`)
        .then(res => {
            if (!res.ok) throw new Error("Usuario no encontrado");
            return res.json();
        })
        .then(data => setUsuarioEncontrado(data))
        .catch(err => {
            console.error(err);
            setUsuarioEncontrado(null);
        });
    };

    const cerrarTabla = () => {
        setUsuarioEncontrado(null);
        setIdBusqueda("");
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

                            <div className="carda">

                                <Link to={"/Reportes"}><div className="targeta"><i className="fa-solid fa-book"></i><h1>Plataforma</h1></div></Link>
                                
                                <Link to={"/ReportesClase"}><div className="targeta"><i className="fa-solid fa-temperature-low"></i><h1>Clase</h1></div></Link>

                                <Link to={"/ReportesAgenda"}><div className="targeta"><i className="fa-solid fa-clock"></i><h1>Agenda</h1></div></Link>

                            </div>

                            <div className="tituloReportes">
                                <h1>Usuarios</h1>
                                <div>
                                    <input type="number" placeholder="Buscar Usuario" value={idBusqueda} onChange={(e) => setIdBusqueda(e.target.value)}/>
                                    <button onClick={buscarUsuario}>Buscar</button>
                                </div>
                            </div>
                            
                            {usuarioEncontrado && (
                                <table id="totalUsuarios2" className="totalUsuarios2">
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Primer Nombre</th>
                                    <th>Primer Apellido</th>
                                    <th>Curso</th>
                                    <th>Rol</th>
                                    <th>Informacion</th>
                                    <th>Cerrar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{usuarioEncontrado.ID}</td>
                                    <td>{usuarioEncontrado.Primer_Nombre}</td>
                                    <td>{usuarioEncontrado.Primer_Apellido}</td>
                                    <td>{usuarioEncontrado.Curso_Jornada || "Sin curso"}</td>
                                    <td>{usuarioEncontrado.Rol}</td>
                                    <td>
                                        <Link to={`/VerUsuario/${usuarioEncontrado.ID}`}>
                                            <button type="button" className="informacion" id="btninformacion">
                                                <i className="fa-solid fa-circle-info"></i>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                        className="btn-icon eliminar"
                                        type="button"
                                        onClick={cerrarTabla}
                                        >
                                        <i className="fa-solid fa-x"></i>
                                        </button>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            )}

                            <table id='totalUsuarios' className='totalUsuarios'>
                                <thead>
                                    <tr>
                                        <th>Total Usuarios</th>
                                        <th>Total Coordinadores</th>
                                        <th>Total Profesores</th>
                                        <th>Total Alumnos</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    <tr>
                                        <td>{totales.totalUsuarios}</td>
                                        <td>{totales.totalCoordinadores}</td>
                                        <td>{totales.totalProfesores}</td>
                                        <td>{totales.totalAlumnos}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="tituloReportes2">
                                <h1>Cursos</h1>
                            </div>

                            <table id='totalCursos' className='totalCursos'>
                                <thead>
                                    <tr>
                                    {cursosData.map((item, index) => (
                                        <th key={index}>
                                        {item.Jornada === "Total Cursos"
                                            ? "Total Cursos"
                                            : `En Jornada ${item.Jornada}`}
                                        </th>
                                    ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    {cursosData.map((item, index) => (
                                        <td key={index}>{item.Total}</td>
                                    ))}
                                    </tr>
                                </tbody>
                            </table>

                            <div className="tituloReportes2">
                                <h1>Estructura</h1>
                            </div>

                            <table id='totalEstructura' className='totalEstructura'>
                                <thead>
                                    <tr>
                                        <th>Total Materias</th>
                                        <th>Total Grados</th>
                                        <th>Total Jornadas</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    <tr>
                                        <td>{estructura.total_materias}</td>
                                        <td>{estructura.total_grados}</td>
                                        <td>{estructura.total_jornadas}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table id='totalEstructura' className='totalEstructura'>
                                <thead>
                                    <tr>
                                        <th>Materias</th>
                                        <th>Cantidad de Aulas que la usan</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {materiasAulas.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Materia_Nombre}</td>
                                        <td>{item.total_aulas}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>

                            <table id='totalEstructura' className='totalEstructura'>
                                <thead>
                                    <tr>
                                        <th>Grados</th>
                                        <th>Cantidad de Cursos que lo usan</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {gradosCursos.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Grado_Nombre}</td>
                                        <td>{item.total_cursos}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>

                            <table id='totalEstructura' className='totalEstructura'>
                                <thead>
                                    <tr>
                                        <th>Jornadas</th>
                                        <th>Cantidad de Cursos que la usan</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {jornadasCursos.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Jornada_Nombre}</td>
                                        <td>{item.total_cursos}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>

                {/*---Footer---*/}
                <Footer />

            </div>
        </>
    )
}
export default Reportes;