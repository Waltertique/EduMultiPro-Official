import { useNavigate } from 'react-router-dom'; // 👈 Importar Esto importa el hook useNavigate de react-router-dom, que permite redirigir a otra ruta (por ejemplo, navegar a otro componente).
import { useState } from 'react';               // 👈 Importar Importa el hook useState de React, usado para manejar estados (por ejemplo, el contenido de los campos de texto del formulario).

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Img1 from './assets/1.png';
import Img2 from './assets/2.png';
import Img3 from './assets/3.png';
import Encabezado from './Encabezado.jsx';
import Footer from './footer.jsx';

function App() {

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3000/api/edumultipro/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Usuario autenticado:', data.usuario);
      navigate('/usuario'); // Redirige si el login es exitoso
    } else {
      const err = await response.json();
      alert(err.mensaje);
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Hubo un error en el servidor');
  }
};

  return (
    <>
      <div className='contenedor'>

        <Encabezado />

        {/*---Article---*/}
        <div className="container-fluid" id="centro">

          <div className="caja">
            <div className="cajalogin">
              <form id="form" onSubmit={manejarSubmit}>
                  <h2>Iniciar Sesión</h2>
                  <input type="email" placeholder="Correo" name="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required/>
                  <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required></input>
                  <button type="submit" className="btn-ingresar">Ingresar</button>
                  <a href="#">¿Olvidaste tu contraseña?</a>
              </form>
            </div>
          
            <div className="cajaimagen d-none d-lg-block">
              <img src={Img1} alt="Imagen 1"></img>
              <img src={Img2} alt="Imagen 2"></img>
              <img src={Img3} alt="Imagen 3"></img>
            </div>
          </div>

        </div>

        {/*---Footer---*/}
        <Footer />

      </div>
    </>
  )
}

export default App
