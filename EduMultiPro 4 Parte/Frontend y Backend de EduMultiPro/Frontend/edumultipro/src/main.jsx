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

      </Routes>
    </BrowserRouter>
  </StrictMode>
);