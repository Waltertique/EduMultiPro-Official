import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 👈 NUEVO
import './index.css';
<<<<<<< HEAD
=======
import CambioContraseña from './CambioContraseña.jsx';
>>>>>>> origin/ramajohan
import App from './App.jsx';
import Usuario from './admin/Usuario.jsx'; // 👈 NUEVO
import Curso from './admin/Curso.jsx';
import Horario from './admin/Horario.jsx';
import Aula from './admin/Aula.jsx';
import Noticia from './admin/Noticia.jsx';
import Materia from './admin/Materia.jsx';
import Grado from './admin/Grado.jsx';
import Jornada from './admin/Jornada.jsx';
import CrearUsuario from './admin/CrearUsuario.jsx';
import VerUsuario from './admin/VerUsuario.jsx';
import VerCurso from './admin/VerCurso.jsx';
import CrearCurso from './admin/CrearCurso.jsx';
import CrearHorario from './admin/CrearHorario.jsx';
import VerHorario from './admin/VerHorario.jsx';
import ActualizarHorario from './admin/ActualizarHorario.jsx';
import CrearAula from './admin/CrearAula.jsx';
import CrearNoticia from './admin/CrearNoticia.jsx';
import ActualizarNoticia from './admin/ActualizarNoticia.jsx';
import VerNoticia from './admin/VerNoticia.jsx';
import VerAula from './admin/VerAula.jsx';
import Trabajos from './admin/Trabajos.jsx';
import Notas from './admin/Notas.jsx';
import Personas from './admin/Personas.jsx';
import CrearTrabajo from './admin/CrearTrabajo.jsx';
import ActualizarTrabajo from './admin/ActualizarTrabajo.jsx';
import VerTrabajo from './admin/VerTrabajo.jsx';
import VerTrabajoEntregado from './admin/VerTrabajoEntregado.jsx';
<<<<<<< HEAD

//--Aqui los links del Coordinador--
import PrincipalCoordinador from './coordinador/Cursos.jsx';
import ActualizarHorarios from './coordinador/ActualizarHorarios.jsx';
import ActualizarNoticias from './coordinador/ActualizarNoticias.jsx';
import CrearCursos from './coordinador/CrearCursos.jsx';
import CrearHorarios from './coordinador/CrearHorarios.jsx';
import CrearNoticias from './coordinador/CrearNoticias.jsx';
import Cursos from './coordinador/Cursos.jsx';
import Grados from './coordinador/Grados.jsx';
import Horarios from './coordinador/Horarios.jsx';
import Jornadas from './coordinador/Jornadas.jsx';
import Materias from './coordinador/Materias.jsx';
import Noticias from './coordinador/Noticias.jsx';
import VerCursos from './coordinador/VerCursos.jsx';
import VerHorarios from './coordinador/VerHorarios.jsx';
import VerNoticias from './coordinador/VerNoticias.jsx';
import Perfil from './coordinador/perfil.jsx';

//--Aqui los links del Profesor--
import PrincipalProfesor from './profesor/PrincipalProfesor.jsx';

//--Aqui los links del Alumno--
import PrincipalAlumno from './alumno/PrincipalAlumno.jsx';
=======
import Reportes from './admin/Reportes.jsx';
import ReportesClase from './admin/ReportesClase.jsx';
import ReportesAgenda from './admin/ReportesAgenda.jsx';

//--Aqui los links del Coordinador--
import PrincipalCoordinador from './coordinador/PrincipalCoordinador.jsx';
import HorarioCoordinador from './coordinador/HorarioCoordinador.jsx';
import NoticiaCoordinador from './coordinador/NoticiaCoordinador.jsx';
import MateriaCoordinador from './coordinador/MateriaCoordinador.jsx';
import GradoCoordinador from './coordinador/GradoCoordinador.jsx';
import JornadaCoordinador from './coordinador/JornadaCoordinador.jsx';
import CrearCursoCoordinador from './coordinador/CrearCursoCoordinador.jsx';
import VerCursoCoordinador from './coordinador/VerCursoCoordinador.jsx';
import CrearHorarioCoordinador from './coordinador/CrearHorarioCoordinador.jsx';
import ActualizarHorarioCoordinador from './coordinador/ActualizarHorarioCoordinador.jsx';
import VerHorarioCoordinador from './coordinador/VerHorarioCoordinador.jsx';
import VerNoticiaCoordinador from './coordinador/VerNoticiaCoordinador.jsx';
import ActualizarNoticiaCoordinador from './coordinador/ActualizarNoticiaCoordinador.jsx';
import CrearNoticiaCoordinador from './coordinador/CrearNoticiaCoordinador.jsx';
import PerfilCoordinador from './coordinador/PerfilCoordinador.jsx';
import ReportesCoor from './coordinador/ReportesCoor.jsx';
import ReportesAgendaCoor from './coordinador/ReportesAgendaCoor.jsx';
import ReportesClaseCoor from './coordinador/ReportesClaseCoor.jsx';
import VerUsuarioCoor from './coordinador/VerUsuarioCoor.jsx';

//--Aqui los links del Profesor--
import PrincipalProfesor from './profesor/PrincipalProfesor.jsx';
import NoticiaProfesor from './profesor/NoticiaProfesor.jsx';
import VerNoticiaProfesor from './profesor/VerNoticiaProfesor.jsx';
import HorarioProfesor from './profesor/HorarioProfesor.jsx';
import ClaseProfesor from './profesor/ClaseProfesor.jsx';
import PerfilProfesor from './profesor/PerfilProfesor.jsx';
import CrearAulaProfesor from './profesor/CrearAulaProfesor.jsx';
import VerAulaProfesor from './profesor/VerAulaProfesor.jsx';
import TrabajoProfesor from './profesor/TrabajoProfesor.jsx';
import PersonasProfesor from './profesor/PersonasProfesor.jsx';
import NotaProfesor from './profesor/NotaProfesor.jsx';
import CrearTrabajoProfesor from './profesor/CrearTrabajoProfesor.jsx';
import ActualizarTrabajoProfesor from './profesor/ActualizarTrabajoProfesor.jsx';
import VerTrabajoProfesor from './profesor/VerTrabajoProfesor.jsx';
import VerTrabajoEntregadoProfesor from './profesor/VerTrabajoEntregadoProfesor.jsx';

//--Aqui los links del Alumno--
import PrincipalAlumno from './alumno/PrincipalAlumno.jsx';
import NoticiaAlumno from './alumno/NoticiaAlumno.jsx';
import VerNoticiaAlumno from './alumno/VerNoticiaAlumno.jsx';
import HorarioAlumno from './alumno/HorarioAlumno.jsx';
import ClaseAlumno from './alumno/ClaseAlumno.jsx';
import PerfilAlumno from './alumno/PerfilAlumno.jsx';
import VerAulaAlumno from './alumno/VerAulaAlumno.jsx';
import TrabajoAlumno from './alumno/TrabajoAlumno.jsx';
import PersonaAlumno from './alumno/PersonaAlumno.jsx';
import VerTrabajoAlumno from './alumno/VerTrabajoAlumno.jsx';
>>>>>>> origin/ramajohan


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 👈 ENVOLVER CON BROWSERROUTER */}
      <Routes>
        <Route path="/" element={<App />} />
<<<<<<< HEAD
=======
        <Route path="CambioContraseña" element={<CambioContraseña />} />
>>>>>>> origin/ramajohan
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/curso" element={<Curso />} />
        <Route path="/horario" element={<Horario />} />
        <Route path="/aula" element={<Aula />} />
        <Route path="/noticia" element={<Noticia />} />
        <Route path="/materia" element={<Materia />} />
        <Route path="/grado" element={<Grado />} />
        <Route path="/jornada" element={<Jornada />} />
        <Route path="/CrearUsuario" element={<CrearUsuario />} />
        <Route path="/VerUsuario/:id" element={<VerUsuario />} />
        <Route path="/VerCurso/:id" element={<VerCurso />} />
        <Route path="/CrearCurso" element={<CrearCurso />} />
        <Route path="/CrearHorario" element={<CrearHorario />} />
        <Route path="/VerHorario/:id" element={<VerHorario />} />
        <Route path="/ActualizarHorario/:id" element={<ActualizarHorario />} />
        <Route path="/CrearAula" element={<CrearAula />} />
        <Route path="/CrearNoticia" element={<CrearNoticia />} />
        <Route path="/ActualizarNoticia/:id" element={<ActualizarNoticia />} />
        <Route path="/VerNoticia/:id" element={<VerNoticia />} />
        <Route path="/VerAula/:id" element={<VerAula />} />
<<<<<<< HEAD
        <Route path="/Trabajos" element={<Trabajos />} />
        <Route path="/Notas" element={<Notas />} />
        <Route path="/Personas/:id" element={<Personas />} />
        <Route path="/CrearTrabajo" element={<CrearTrabajo />} />
        <Route path="/ActualizarTrabajo" element={<ActualizarTrabajo />} />
        <Route path="/VerTrabajo" element={<VerTrabajo />} />
        <Route path="/VerTrabajoEntregado" element={<VerTrabajoEntregado />} />

        {/*--Aqui los links del Coordinador--*/}
        <Route path="/PrincipalCoordinador" element={<PrincipalCoordinador />} />
        <Route path="/ActualizarHorarios/:id" element={<ActualizarHorarios />} />
        <Route path="/ActualizarNoticias/:id" element={<ActualizarNoticias />} />
        <Route path="/CrearCursos" element={<CrearCursos />} />
        <Route path="/CrearHorarios" element={<CrearHorarios />} />
        <Route path="/CrearNoticias" element={<CrearNoticias />} />
        <Route path="/Cursos" element={<Cursos />} />
        <Route path="/Grados" element={<Grados />} />
        <Route path="/Horarios" element={<Horarios />} />
        <Route path="/Jornadas" element={<Jornadas />} />
        <Route path="/Materias" element={<Materias />} />
        <Route path="/Noticias" element={<Noticias />} />
        <Route path="/VerCursos/:id" element={<VerCursos />} />
        <Route path="/VerHorarios/:id" element={<VerHorarios />} />
        <Route path="/VerNoticias/:id" element={<VerNoticias />} />
        <Route path="/Perfil" element={<Perfil />} />



        {/*--Aqui los links del Profesor--*/}
        <Route path="/PrincipalProfesor" element={<PrincipalProfesor />} />

        {/*--Aqui los links del Alumno--*/}
        <Route path="/PrincipalAlumno" element={<PrincipalAlumno />} />
=======
        <Route path="/Trabajos/:id" element={<Trabajos />} />
        <Route path="/Notas/:id" element={<Notas />} />
        <Route path="/Personas/:id" element={<Personas />} />
        <Route path="/CrearTrabajo/:id" element={<CrearTrabajo />} />
        <Route path="/ActualizarTrabajo/:id" element={<ActualizarTrabajo />} />
        <Route path="/VerTrabajo/:trabajoId/:aulaId" element={<VerTrabajo />} />
        <Route path="/VerTrabajoEntregado/:trabajoId/:aulaId" element={<VerTrabajoEntregado />} />
        <Route path="/Reportes" element={<Reportes />} />
        <Route path="/ReportesClase" element={<ReportesClase />} />
        <Route path="/ReportesAgenda" element={<ReportesAgenda />} />

        {/*--Aqui los links del Coordinador--*/}
        <Route path="/PrincipalCoordinador" element={<PrincipalCoordinador />} />
        <Route path="/HorarioCoordinador" element={<HorarioCoordinador />} />
        <Route path="/NoticiaCoordinador" element={<NoticiaCoordinador />} />
        <Route path="/MateriaCoordinador" element={<MateriaCoordinador />} />
        <Route path="/GradoCoordinador" element={<GradoCoordinador />} />
        <Route path="/JornadaCoordinador" element={<JornadaCoordinador />} />
        <Route path="/CrearCursoCoordinador" element={<CrearCursoCoordinador />} />
        <Route path="/VerCursoCoordinador/:id" element={<VerCursoCoordinador />} />
        <Route path="/CrearHorarioCoordinador" element={<CrearHorarioCoordinador />} />
        <Route path="/ActualizarHorarioCoordinador/:id" element={<ActualizarHorarioCoordinador />} />
        <Route path="/VerHorarioCoordinador/:id" element={<VerHorarioCoordinador />} />
        <Route path="/VerNoticiaCoordinador/:id" element={<VerNoticiaCoordinador />} />
        <Route path="/ActualizarNoticiaCoordinador/:id" element={<ActualizarNoticiaCoordinador />} />
        <Route path="/CrearNoticiaCoordinador" element={<CrearNoticiaCoordinador />} />
        <Route path="/PerfilCoordinador" element={<PerfilCoordinador />} />
        <Route path="/ReportesCoor" element={<ReportesCoor />} />
        <Route path="/ReportesAgendaCoor" element={<ReportesAgendaCoor />} />
        <Route path="/ReportesClaseCoor" element={<ReportesClaseCoor />} />
        <Route path="/VerUsuarioCoor/:id" element={<VerUsuarioCoor />} />

        {/*--Aqui los links del Profesor--*/}
        <Route path="/PrincipalProfesor" element={<PrincipalProfesor />} />
        <Route path="/NoticiaProfesor" element={<NoticiaProfesor />} />
        <Route path="/VerNoticiaProfesor/:id" element={<VerNoticiaProfesor />} />
        <Route path="/HorarioProfesor" element={<HorarioProfesor />} />
        <Route path="/ClaseProfesor" element={<ClaseProfesor />} />
        <Route path="/PerfilProfesor" element={<PerfilProfesor />} />
        <Route path="/CrearAulaProfesor" element={<CrearAulaProfesor />} />
        <Route path="/VerAulaProfesor/:id" element={<VerAulaProfesor />} />
        <Route path="/TrabajoProfesor/:id" element={<TrabajoProfesor />} />
        <Route path="/PersonasProfesor/:id" element={<PersonasProfesor />} />
        <Route path="/NotaProfesor/:id" element={<NotaProfesor />} />
        <Route path="/CrearTrabajoProfesor/:id" element={<CrearTrabajoProfesor />} />
        <Route path="/ActualizarTrabajoProfesor/:id" element={<ActualizarTrabajoProfesor />} />
        <Route path="/VerTrabajoProfesor/:trabajoId/:aulaId" element={<VerTrabajoProfesor />} />
        <Route path="/VerTrabajoEntregadoProfesor/:trabajoId/:aulaId" element={<VerTrabajoEntregadoProfesor />} />

        {/*--Aqui los links del Alumno--*/}
        <Route path="/PrincipalAlumno" element={<PrincipalAlumno />} />
        <Route path="/NoticiaAlumno" element={<NoticiaAlumno />} />
        <Route path="/VerNoticiaAlumno/:id" element={<VerNoticiaAlumno />} />
        <Route path="/HorarioAlumno" element={<HorarioAlumno />} />
        <Route path="/ClaseAlumno" element={<ClaseAlumno />} />
        <Route path="/PerfilAlumno" element={<PerfilAlumno />} />
        <Route path="/VerAulaAlumno/:id" element={<VerAulaAlumno />} />
        <Route path="/TrabajoAlumno/:id" element={<TrabajoAlumno />} />
        <Route path="/PersonaAlumno/:id" element={<PersonaAlumno />} />
        <Route path="/VerTrabajoAlumno/:trabajoId/:aulaId" element={<VerTrabajoAlumno />} />
>>>>>>> origin/ramajohan

      </Routes>
    </BrowserRouter>
  </StrictMode>
);