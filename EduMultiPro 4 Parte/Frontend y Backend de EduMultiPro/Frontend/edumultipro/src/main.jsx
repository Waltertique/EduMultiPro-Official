import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 👈 NUEVO
import './index.css';
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

//--Aqui los links del Coordinador--
import PrincipalCoordinador from './coordinador/PrincipalCoordinador.jsx';

//--Aqui los links del Profesor--
import PrincipalProfesor from './profesor/PrincipalProfesor.jsx';

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


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 👈 ENVOLVER CON BROWSERROUTER */}
      <Routes>
        <Route path="/" element={<App />} />
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
        <Route path="/Trabajos/:id" element={<Trabajos />} />
        <Route path="/Notas/:id" element={<Notas />} />
        <Route path="/Personas/:id" element={<Personas />} />
        <Route path="/CrearTrabajo/:id" element={<CrearTrabajo />} />
        <Route path="/ActualizarTrabajo/:id" element={<ActualizarTrabajo />} />
        <Route path="/VerTrabajo/:trabajoId/:aulaId" element={<VerTrabajo />} />
        <Route path="/VerTrabajoEntregado/:trabajoId/:aulaId" element={<VerTrabajoEntregado />} />

        {/*--Aqui los links del Coordinador--*/}
        <Route path="/PrincipalCoordinador" element={<PrincipalCoordinador />} />

        {/*--Aqui los links del Profesor--*/}
        <Route path="/PrincipalProfesor" element={<PrincipalProfesor />} />

        {/*--Aqui los links del Alumno--*/}
        <Route path="/PrincipalAlumno" element={<PrincipalAlumno />} />
        <Route path="/NoticiaAlumno" element={<NoticiaAlumno />} />
        <Route path="/VerNoticiaAlumno" element={<VerNoticiaAlumno />} />
        <Route path="/HorarioAlumno" element={<HorarioAlumno />} />
        <Route path="/ClaseAlumno" element={<ClaseAlumno />} />
        <Route path="/PerfilAlumno" element={<PerfilAlumno />} />
        <Route path="/VerAulaAlumno" element={<VerAulaAlumno />} />
        <Route path="/TrabajoAlumno" element={<TrabajoAlumno />} />
        <Route path="/PersonaAlumno" element={<PersonaAlumno />} />
        <Route path="/VerTrabajoAlumno" element={<VerTrabajoAlumno />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);