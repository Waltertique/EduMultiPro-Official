import './footer.css';
import logo from './assets/logo.png';

function Footer() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo y descripción */}
        <div className="footer-brand">
          <div className="footer-logo-section">
            <img src={logo} alt="EduMultiPro" className="footer-logo" />
            <div>
              <h4 className="footer-brand-name">EduMultiPro</h4>
              <p className="footer-slogan">Tu Aliado En El Camino Educativo</p>
            </div>
          </div>
          <p className="footer-text">
            Plataforma educativa digital desarrollada por estudiantes del SENA, diseñada 
            especialmente para colegios con recursos limitados. Centralizamos la gestión 
            académica para mejorar la comunicación y organización educativa.
          </p>
          <div className="footer-stats">
            <div className="stat">
              <span className="stat-number">2024</span>
              <span className="stat-label">Fundación</span>
            </div>
            <div className="stat">
              <span className="stat-number">SENA</span>
              <span className="stat-label">Institución</span>
            </div>
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Desarrolladores</span>
            </div>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer-links">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li>
              <button onClick={() => scrollToSection('inicio')}>
                Inicio
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('historia')}>
                Historia
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('sobre')}>
                Sobre Nosotros
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('desarrolladores')}>
                Nuestro Equipo
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('contacto')}>
                Contacto
              </button>
            </li>
          </ul>
        </div>

        {/* Proyecto Info */}
        <div className="footer-project">
          <h4>Proyecto Académico</h4>
          <div className="project-info">
            <div className="project-detail">
              <span className="detail-label">Programa:</span>
              <span className="detail-value">Tecnólogo en Análisis y Desarrollo de Software</span>
            </div>
            <div className="project-detail">
              <span className="detail-label">Ficha:</span>
              <span className="detail-value">2925960</span>
            </div>
            <div className="project-detail">
              <span className="detail-label">Año:</span>
              <span className="detail-value">2024</span>
            </div>
            <div className="project-detail">
              <span className="detail-label">Director:</span>
              <span className="detail-value">Instructor Luis Fernando</span>
            </div>
          </div>
        </div>

        {/* Contacto */}
        <div className="footer-contact">
          <h4>Contáctanos</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Av. Cra 19, Bogotá, Colombia</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+57-1-5802311</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>info@edumultipro.com</span>
            </div>
          </div>
          
          {/* Redes sociales */}
          <div className="footer-social">
            <h5>Síguenos</h5>
            <div className="social-links">
              <a href="#" className="social-link facebook">
                <span>f</span>
              </a>
              <a href="#" className="social-link instagram">
                <span>📷</span>
              </a>
              <a href="#" className="social-link linkedin">
                <span>in</span>
              </a>
              <a href="#" className="social-link youtube">
                <span>▶</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} EduMultiPro. Todos los derechos reservados. 
            Proyecto académico desarrollado por estudiantes del SENA.
          </p>
          <div className="footer-legal">
            <a href="#">Políticas de Privacidad</a>
            <span className="separator">·</span>
            <a href="#">Políticas de Cookies</a>
            <span className="separator">·</span>
            <a href="#">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;