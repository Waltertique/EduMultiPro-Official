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
import Materia from './admin/materia.jsx';
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
        <Route path="/VerUsuario" element={<VerUsuario />} />
        <Route path="/VerCurso" element={<VerCurso />} />
        <Route path="/CrearCurso" element={<CrearCurso />} />
        <Route path="/CrearHorario" element={<CrearHorario />} />
        <Route path="/VerHorario" element={<VerHorario />} />
        <Route path="/ActualizarHorario" element={<ActualizarHorario />} />
        <Route path="/CrearAula" element={<CrearAula />} />
        <Route path="/CrearNoticia" element={<CrearNoticia />} />
        <Route path="/ActualizarNoticia" element={<ActualizarNoticia />} />
        <Route path="/VerNoticia" element={<VerNoticia />} />
        <Route path="/VerAula" element={<VerAula />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);