import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import './App.css';
import Nav from './Nav.jsx';
import Footer from './footer.jsx';
import videoPresentacion from './assets/edumultipro.webm';

function App() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // Verificación de autenticación optimizada
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      
      if (!token || !usuario?.rol) return;
      
      const rutas = {
        'R004': '/usuario',
        'R003': '/PrincipalCoordinador',
        'R002': '/PrincipalProfesor',
        'R001': '/PrincipalAlumno'
      };
      
      if (rutas[usuario.rol]) {
        navigate(rutas[usuario.rol]);
      } else {
        localStorage.clear();
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Manejo optimizado del login
  const manejarLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/edumultipro/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        localStorage.setItem('token', data.token);
        
        const modal = bootstrap.Modal.getInstance(modalRef.current);
        modal?.hide();

        const rutas = {
          'R004': '/usuario',
          'R003': '/PrincipalCoordinador',
          'R002': '/PrincipalProfesor',
          'R001': '/PrincipalAlumno'
        };

        navigate(rutas[data.usuario.rol] || '/');
      } else {
        setError(data.mensaje || 'Error en las credenciales');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll suave optimizado
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  // Reset del formulario
  const limpiarFormulario = () => {
    setCorreo('');
    setContrasena('');
    setError('');
    setIsLoading(false);
  };

  // Manejo del formulario de contacto
  const manejarContacto = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    
    try {
      // Aquí iría la llamada a tu API
      console.log('Contacto:', formData);
      alert('✅ Mensaje enviado correctamente');
      e.target.reset();
    } catch {
      alert('❌ Error al enviar el mensaje');
    }
  };

  return (
    <div className="app-container">
      <Nav scrollToSection={scrollToSection} />

      {/* Hero Section con Video Optimizado */}
      <section id="inicio" className="hero-section">
        <div className="video-wrapper">
          <video 
            className="hero-video" 
            autoPlay 
            muted 
            loop 
            playsInline
            loading="lazy"
          >
            <source src={videoPresentacion} type="video/webm" />
            Tu navegador no soporta videos HTML5.
          </video>
          
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">
                Bienvenido a <span className="brand">EduMultiPro</span>
              </h1>
              <p className="hero-description">
                Potencia el aprendizaje y la gestión académica con nuestra plataforma moderna.
                Conectamos estudiantes, docentes y coordinadores en un solo ecosistema digital.
              </p>
              <div className="hero-actions">
                <button 
                  className="btn-primary-custom"
                  data-bs-toggle="modal" 
                  data-bs-target="#loginModal"
                  onClick={limpiarFormulario}
                >
                  <i className="fas fa-rocket me-2"></i>
                  Iniciar Sesión
                </button>
                <button 
                  className="btn-outline-custom"
                  onClick={() => scrollToSection('sobre')}
                >
                  Conocer más
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Login Mejorado */}
      <div 
        className="modal fade" 
        id="loginModal" 
        tabIndex="-1"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-custom">
            <div className="modal-header border-0">
              <h5 className="modal-title">Acceso a la Plataforma</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                onClick={limpiarFormulario}
              ></button>
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger alert-custom">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}
              
              <form onSubmit={manejarLogin} className="login-form">
                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control form-control-custom"
                    id="correo"
                    placeholder="correo@ejemplo.com"
                    value={correo} 
                    onChange={(e) => setCorreo(e.target.value)}
                    disabled={isLoading}
                    required 
                  />
                  <label htmlFor="correo">
                    <i className="fas fa-envelope me-2"></i>
                    Correo Electrónico
                  </label>
                </div>

                <div className="form-floating mb-4">
                  <input 
                    type="password" 
                    className="form-control form-control-custom"
                    id="contrasena"
                    placeholder="••••••••"
                    value={contrasena} 
                    onChange={(e) => setContrasena(e.target.value)}
                    disabled={isLoading}
                    required 
                  />
                  <label htmlFor="contrasena">
                    <i className="fas fa-lock me-2"></i>
                    Contraseña
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-login w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Ingresando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Ingresar
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-muted small">
                  ¿No tienes cuenta? 
                  <br/>
                  Contacta con tu institución educativa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historia Section */}
      <section id="historia" className="section-historia">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="section-title">
                <i className="fas fa-history me-3"></i>
                Nuestra Historia
              </h2>
              <div className="timeline">
                {[
                  {
                    date: 'Julio 2024',
                    title: 'El Inicio',
                    desc: 'Identificamos la problemática de colegios con recursos limitados sin plataformas digitales.'
                  },
                  {
                    date: 'Agosto 2024',
                    title: 'Desarrollo',
                    desc: 'Iniciamos el desarrollo con enfoque en simplicidad y accesibilidad.'
                  },
                  {
                    date: 'Presente',
                    title: 'Impacto',
                    desc: 'Solución completa que centraliza la gestión académica.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <span className="timeline-date">{item.date}</span>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="stats-grid">
                <div className="stat-card">
                  <i className="fas fa-calendar-alt"></i>
                  <h3>2024</h3>
                  <p>Año de fundación</p>
                </div>
                <div className="stat-card">
                  <i className="fas fa-users"></i>
                  <h3>4</h3>
                  <p>Desarrolladores</p>
                </div>
                <div className="stat-card">
                  <i className="fas fa-graduation-cap"></i>
                  <h3>SENA</h3>
                  <p>Ficha 2925960</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="section-sobre">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Sobre EduMultiPro</h2>
            <p className="section-subtitle">Una plataforma educativa pensada para todos</p>
          </div>
          
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h4>Nuestra Misión</h4>
                <p>Brindar herramientas digitales accesibles para la gestión académica integral.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h4>Nuestra Visión</h4>
                <p>Ser líderes en digitalización educativa simple y efectiva.</p>
              </div>
            </div>
          </div>

          <div className="problem-solution">
            <h3 className="mb-4">Problemática que Resolvemos</h3>
            <div className="row g-4">
              {[
                { icon: 'fa-book', title: 'Recursos Limitados', desc: 'Presupuestos ajustados' },
                { icon: 'fa-comments', title: 'Comunicación', desc: 'Fragmentada y dispersa' },
                { icon: 'fa-tools', title: 'Procesos', desc: 'Desordenados y manuales' }
              ].map((item, idx) => (
                <div key={idx} className="col-md-4">
                  <div className="problem-card">
                    <i className={`fas ${item.icon}`}></i>
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="solutions mt-5">
            <h3 className="mb-4">Nuestra Solución</h3>
            <div className="row g-3">
              {[
                'Gestión de Usuarios',
                'Cursos y Materias',
                'Horarios y Aulas',
                'Comunicación Integrada'
              ].map((item, idx) => (
                <div key={idx} className="col-md-3">
                  <div className="solution-card">
                    <i className="fas fa-check-circle"></i>
                    <h6>{item}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Desarrolladores Section */}
      <section id="desarrolladores" className="section-team">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Nuestro Equipo</h2>
            <p className="section-subtitle">Los desarrolladores detrás de EduMultiPro</p>
          </div>
          
          <div className="row g-4">
            {[
              {
                name: 'Johan Madrigal',
                role: 'Full Stack Developer',
                avatar: 'JM',
                skills: ['Node.js', 'React', 'MySQL']
              },
              {
                name: 'Oscar Cruz',
                role: 'Frontend Developer',
                avatar: 'OC',
                skills: ['React', 'CSS', 'Bootstrap']
              },
              {
                name: 'Alejandra Villazón',
                role: 'UI/UX Designer',
                avatar: 'AV',
                skills: ['Figma', 'CSS', 'JavaScript']
              },
              {
                name: 'Santiago Moralez',
                role: 'Backend Developer',
                avatar: 'SM',
                skills: ['MySQL', 'Node.js', 'Express']
              }
            ].map((dev, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div className="dev-card">
                  <div className="dev-avatar">{dev.avatar}</div>
                  <h5>{dev.name}</h5>
                  <p className="dev-role">{dev.role}</p>
                  <div className="dev-skills">
                    {dev.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="section-contact">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title text-white">Contáctanos</h2>
            <p className="section-subtitle text-white-50">Estamos aquí para ayudarte</p>
          </div>
          
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="contact-info">
                <h4 className="mb-4">Información de Contacto</h4>
                {[
                  { icon: 'fa-map-marker-alt', title: 'Dirección', info: 'Av. Cra 19, Bogotá' },
                  { icon: 'fa-phone', title: 'Teléfono', info: '+57-1-5802311' },
                  { icon: 'fa-envelope', title: 'Email', info: 'info@edumultipro.com' },
                  { icon: 'fa-university', title: 'Institución', info: 'SENA - Ficha 2925960' }
                ].map((item, idx) => (
                  <div key={idx} className="contact-item">
                    <i className={`fas ${item.icon}`}></i>
                    <div>
                      <h6>{item.title}</h6>
                      <p>{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="contact-form">
                <h4 className="mb-4">Envíanos un Mensaje</h4>
                <form onSubmit={manejarContacto}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input 
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Tu email"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input 
                        type="text"
                        className="form-control"
                        name="asunto"
                        placeholder="Asunto"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <textarea 
                        className="form-control"
                        name="mensaje"
                        rows="5"
                        placeholder="Tu mensaje"
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-send w-100">
                        <i className="fas fa-paper-plane me-2"></i>
                        Enviar Mensaje
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;