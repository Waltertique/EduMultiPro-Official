import Encabezado from '../Encabezado.jsx';
import Footer from '../footer.jsx';
import Desplegable from '../Desplegable.jsx';
import BarraLateral from '../BarraLateral.jsx';
import './css/ActualizarNoticia.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; // libreria de logos
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ProteccionRuta from '../ProteccionRuta.jsx';

function ActualizarNoticia(){

    const { id } = useParams();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    titulo: "",
    encabezado: "",
    descripcion1: "",
    descripcion2: "",
    descripcion3: "",
    fecha: "",
    tipo_noticia_id: ""
  });
  const [imagenesActuales, setImagenesActuales] = useState({});
  const [nuevasImagenes, setNuevasImagenes] = useState({});
  const [tipos, setTipos] = useState([]);

  // Carga datos existentes
  useEffect(() => {
    const cargar = async () => {
      const [nota, tiposData] = await Promise.all([
        fetch(`http://localhost:3000/api/edumultipro/Noticias/${id}`).then(r => r.json()),
        fetch("http://localhost:3000/api/edumultipro/TiposNoticia").then(r => r.json())
      ]);

      setFormulario({
        titulo: nota.Titulo_Noticia,
        encabezado: nota.Encabezado,
        descripcion1: nota.Descripcion1,
        descripcion2: nota.Descripcion2 || "",
        descripcion3: nota.Descripcion3 || "",
        fecha: nota.Fecha_Notica?.split('T')[0],
        tipo_noticia_id: nota.tipo_noticia_id.toString()
      });
      setImagenesActuales({
        imagen1: nota.Imagen1,
        imagen2: nota.Imagen2,
        imagen3: nota.Imagen3
      });
      setTipos(tiposData);
    };
    cargar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNuevasImagenes(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormulario(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formulario).forEach(([k,v]) => data.append(k, v));
    Object.entries(nuevasImagenes).forEach(([k,v]) => data.append(k, v));

    try {
      const res = await fetch(`http://localhost:3000/api/edumultipro/Noticias/${id}`, {
        method: "PUT",
        body: data
      });
      const resp = await res.json();
      if (!res.ok) return alert(resp.error);
      alert(resp.mensaje);
      navigate("/Noticia");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar noticia");
    }
  };

    return(
        <>
          <ProteccionRuta rolRequerido="R004" />
            <div className='contenedor'>
                {/*---Nav---*/}
                <Encabezado />

                {/*---Desplegable---*/}
                <Desplegable />

                {/*---Article---*/}
                <div className="container-fluid" id="centro1">

                    <div className="row" id='contenido'>

                        {/*---BarraLateral---*/}
                        <BarraLateral />

                        {/*---Tabla---*/}
                        <div className="col-10" id="contenidoTabla">

                            <div className="tituloModificarNoticia">
                                <h1>Modificar Noticia</h1>
                                <Link to={"/Noticia"}>
                                    <button className="crear" id="btnAgregarUsuario">Salir</button>
                                </Link>
                            </div>

                            <div className="contenidoModificarNoticia">
                    
                                <form onSubmit={handleSubmit}>
                                    <input name="titulo" value={formulario.titulo} onChange={handleChange} required />
                                    <textarea name="encabezado" value={formulario.encabezado} onChange={handleChange} required />
                                    <textarea name="descripcion1" value={formulario.descripcion1} onChange={handleChange} required />
                                    <textarea name="descripcion2" value={formulario.descripcion2} onChange={handleChange} />
                                    <textarea name="descripcion3" value={formulario.descripcion3} onChange={handleChange} />
                                    <input type="date" name="fecha" value={formulario.fecha} onChange={handleChange} required />
                                    <select name="tipo_noticia_id" value={formulario.tipo_noticia_id} onChange={handleChange} required>
                                    <option value="">-- Selecciona tipo --</option>
                                    {tipos.map(t => <option key={t.ID} value={t.ID}>{t.Tipo}</option>)}
                                    </select>
                                    {["imagen1","imagen2","imagen3"].map(key => (
                                    <div key={key}>
                                        <label>{key.toUpperCase()} Actual:</label><br/>
                                        {imagenesActuales[key] 
                                        ? <img src={`http://localhost:3000/imagenes/${imagenesActuales[key]}`} alt={key} width="150" />
                                        : <p>No hay imagen actual</p>}
                                        <input type="file" name={key} accept="image/*" onChange={handleChange} />
                                    </div>
                                    ))}
                                    <button type="submit">Guardar cambios</button>
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
export default ActualizarNoticia;