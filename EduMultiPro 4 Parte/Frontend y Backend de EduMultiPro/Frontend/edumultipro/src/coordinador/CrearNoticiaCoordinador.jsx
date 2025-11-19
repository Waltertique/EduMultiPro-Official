import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import DesplegableCoordinador from './DesplegableCoordinador.jsx';
import BarraLateralCoordinador from './BarraLateralCoordinador.jsx';
import './css/CrearNoticiaCoordinador.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function CrearNoticiaCoordinador(){

    const [formulario, setFormulario] = useState({
    titulo: "",
    encabezado: "",
    descripcion1: "",
    descripcion2: "",
    descripcion3: "",
    fecha: "",
    tipo_noticia_id: ""
  });

  const [imagenes, setImagenes] = useState({});
  const [tipos, setTipos] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setImagenes(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormulario(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in formulario) {
      formData.append(key, formulario[key]);
    }
    for (let key in imagenes) {
      formData.append(key, imagenes[key]);
    }

    try {
      const res = await fetch("http://localhost:3000/api/edumultipro/Noticias", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.mensaje);
        navigate("/NoticiaCoordinador");
      }
    } catch (error) {
      console.error("Error al enviar la noticia", error);
      alert("Error al crear noticia");
    }
  };

  useEffect(() => {
    // Obtener tipos de noticia
    fetch("http://localhost:3000/api/edumultipro/TiposNoticia")
      .then(res => res.json())
      .then(data => setTipos(data))
      .catch(err => console.error("Error al cargar tipos:", err));
  }, []);

    return(
        <>
          <ProteccionRuta rolRequerido="R003" />
            <div className='contenedor'>
                {/*---Nav---*/}
                <Encabezado />

                {/*---Desplegable---*/}
                <DesplegableCoordinador />

                {/*---Article---*/}
                <div className="container-fluid" id="centro1">

                    <div className="row" id='contenido'>

                        {/*---BarraLateral---*/}
                        <BarraLateralCoordinador />

                        {/*---Tabla---*/}
                        <div className="col-10" id="contenidoTabla">

                            <div className="tituloCrearNoticia">
                                <h1>Crear Noticia</h1>
                                <Link to={"/NoticiaCoordinador"}>
                                    <button className="crear" id="btnAgregarUsuario">Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoCrearNoticia">
                    
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="titulo" placeholder="Título de la Noticia" required onChange={handleChange} />
                                    <textarea name="encabezado" placeholder="Encabezado" required onChange={handleChange}></textarea>
                                    <textarea name="descripcion1" placeholder="Descripción 1" required onChange={handleChange}></textarea>
                                    <textarea name="descripcion2" placeholder="Descripción 2 (opcional)" onChange={handleChange}></textarea>
                                    <textarea name="descripcion3" placeholder="Descripción 3 (opcional)" onChange={handleChange}></textarea>
                                    <input type="date" name="fecha" required onChange={handleChange} />

                                    <label>Imagen 1:</label>
                                    <input type="file" name="imagen1" accept="image/*" required onChange={handleChange} />
                                    <label>Imagen 2:</label>
                                    <input type="file" name="imagen2" accept="image/*" onChange={handleChange} />
                                    <label>Imagen 3:</label>
                                    <input type="file" name="imagen3" accept="image/*" onChange={handleChange} />

                                    <select name="tipo_noticia_id" required onChange={handleChange}>
                                    <option value="">Selecciona el tipo de noticia</option>
                                    {tipos.map(tipo => (
                                        <option key={tipo.ID} value={tipo.ID}>{tipo.Tipo}</option>
                                    ))}
                                    </select>

                                    <button type="submit">Crear Noticia</button>
                                </form>
                            
                            </div>

                        </div>
                    </div>        
                </div>

                {/*---Footer---*/}
                <Footer />

            </div>
        </>
    )
}
export default CrearNoticiaCoordinador;