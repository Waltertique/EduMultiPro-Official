import { Link, useNavigate } from 'react-router-dom'; // 👈 Importar Esto importa el hook useNavigate de react-router-dom, que permite redirigir a otra ruta (por ejemplo, navegar a otro componente).
import { useState } from 'react';               // 👈 Importar Importa el hook useState de React, usado para manejar estados (por ejemplo, el contenido de los campos de texto del formulario).
import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './CambioContraseña.css';
import Encabezado from './Encabezado.jsx';
import Footer from './footer.jsx';

function CambioContraseña() {

    const navigate = useNavigate();

    // Estados para los campos
    const [id, setId] = useState('');
    const [correo, setCorreo] = useState('');
    const [nueva, setNueva] = useState('');
    const [confirmar, setConfirmar] = useState('');

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await fetch("http://localhost:3000/api/edumultipro/cambiar-contrasena", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            id,
            correo1: correo,
            nuevaContraseña: nueva,
            confirmarContraseña: confirmar,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(`❌ ${data.error}`);
            return;
        }

        alert("✅ Contraseña cambiada correctamente.");
        navigate("/"); // Redirigir al inicio
        } catch (error) {
        alert("⚠️ Error al conectar con el servidor.");
        console.error(error);
        }
    };

  return (
    <>
      <div className='contenedor'>

        <Encabezado />

        {/*---Article---*/}
        <div className="container-fluid" id="centro">

          <div className="cajaContraseña">
            <div className="cajaloginContraseña">
              <form id="form" onSubmit={handleSubmit}>
                  <h2>Recupera tu Contraseña</h2>

                  <label id='label1'>Numero de identidad</label>
                  <input type="number" placeholder="N.O Identidad" name="id" value={id} onChange={(e) => setId(e.target.value)} required/>

                  <label id='label1'>Correo Principal</label>
                  <input type="email" placeholder="Correo" name="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required/>

                  <label id='label1'>Nueva Contraseña</label>
                  <input type="password" placeholder="Contraseña" value={nueva} onChange={(e) => setNueva(e.target.value)} required></input>

                  <label id='label1'>Confirme la Contraseña</label>
                  <input type="password" placeholder="Contraseña" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required></input>

                  <button type="submit" className="btn-ingresar" id='BotonContraseña'>Cambiar Contraseña</button>

                  <Link to={'/'}>Salir sin aplicar cambios</Link>
              </form>
            </div>
          </div>

        </div>

        {/*---Footer---*/}
        <Footer />

      </div>
    </>
  )
}

export default CambioContraseña;