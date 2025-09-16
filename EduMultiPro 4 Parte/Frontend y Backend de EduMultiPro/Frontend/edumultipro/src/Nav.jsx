import { useEffect, useState } from "react";
import './Nav.css';
import logo from './assets/logo.png';

function Nav({ scrollToSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        {/* Logo y nombre */}
        <div className="navbar-brand" onClick={() => handleNavClick('inicio')}>
          <img src={logo} alt="EduMultiPro" className="logo" />
          <div className="brand-info">
            <span className="brand-name">EduMultiPro</span>
            <span className="brand-slogan">Tu Aliado En El Camino Educativo</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick('inicio')}>
                Inicio
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick('historia')}>
                Historia
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick('sobre')}>
                Sobre Nosotros
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick('desarrolladores')}>
                Equipo
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavClick('contacto')}>
                Contacto
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav">
            <li>
              <button className="mobile-nav-link" onClick={() => handleNavClick('inicio')}>
                Inicio
              </button>
            </li>
            <li>
              <button className="mobile-nav-link" onClick={() => handleNavClick('historia')}>
                Historia
              </button>
            </li>
            <li>
              <button className="mobile-nav-link" onClick={() => handleNavClick('sobre')}>
                Sobre Nosotros
              </button>
            </li>
            <li>
              <button className="mobile-nav-link" onClick={() => handleNavClick('desarrolladores')}>
                Equipo
              </button>
            </li>
            <li>
              <button className="mobile-nav-link" onClick={() => handleNavClick('contacto')}>
                Contacto
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Nav;