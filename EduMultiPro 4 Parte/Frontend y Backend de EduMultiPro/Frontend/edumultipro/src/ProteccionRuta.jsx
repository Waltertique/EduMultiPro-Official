import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//esto hace que cuando se cierre la sesion no se pueda devilver sin anter iniciar sesion

function ProteccionRuta({ children, rolRequerido }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!token || !usuario || usuario.rol !== rolRequerido) {
      navigate('/');
    }
  }, []);

  return children;
}

export default ProteccionRuta;