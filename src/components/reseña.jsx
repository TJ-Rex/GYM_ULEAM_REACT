import { useState } from 'react';
import '../assets/css/reseña.css';


function Reseña() {
  const usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [error, setError] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  let errores = [];

  if (comentario.trim() === '') {
    errores.push('Por favor escribe tu reseña.');
  }
  if (calificacion === '') {
    errores.push(' Por favor asegurate de poner una calificación.');
  }

  if (errores.length > 0) {
    setError(errores.join(' '));
  } else {
    setError('');

      const nuevaReseña = {
        usuario: usuarioActual?.alias,
        comentario,
        calificacion
      };

      const reseñasPrevias = JSON.parse(localStorage.getItem('reseñas')) || [];
      reseñasPrevias.push(nuevaReseña);
      localStorage.setItem('reseñas', JSON.stringify(reseñasPrevias));


    alert('✅ ¡Reseña publicada con éxito!');
    window.location.href = '/home2';
  }
};


  return (
    <>
      <header>
        <h1>💪🏋️‍♀️GYM_ULEAM</h1>
        <nav>
          <a href="/entrenamientos">Planes de entrenamiento</a>
          <a href="/configurar">{usuarioActual?.alias}<img src="../src/assets/Imagen_Gym/icono_perfil.webp" alt="Perfil" width="25" /></a>
        </nav>
      </header>

      <main className="reseña-formulario">
        <h2>Añadir reseña</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="comentario">Reseña:</label><br />
          <textarea
            id="comentario"
            name="comentario"
            rows="5"
            cols="40"
            placeholder="Escribe tu experiencia..."
            required
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          /><br /><br />

          <label htmlFor="calificacion">Calificación:</label><br />
          <select
            id="calificacion"
            name="calificacion"
            required
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
          >
            <option value="">Selecciona estrellas</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select><br /><br />

          <button id="publicar-reseña" type="submit">Publicar</button>
          <span className="error-message">{error}</span>
        </form>
      </main>

      <footer>
        <div className="footer-contenido">
          <div className="footer-info">
            <h3>GYM_ULEAM</h3>
            <p>Gimnasio oficial de la Universidad Laica Eloy Alfaro de Manabí</p>
          </div>

          <div className="footer-contacto">
            <h4>Contacto</h4>
            <p>Correo: gimnasio@uleam.edu.ec</p>
            <p>Teléfono: +593 5 2620 888</p>
          </div>

          <div className="footer-horario">
            <h4>Horarios</h4>
            <p>Lunes a Viernes: 06:00 - 20:00</p>
            <p>Sábados: 08:00 - 14:00</p>
          </div>

          <div className="footer-ubicacion">
            <h4>Ubicación</h4>
            <p>Campus ULEAM, Manta, Ecuador</p>
          </div>

          <div className="footer-redes">
            <h4>Síguenos</h4>
            <a href="https://www.facebook.com/?locale=es_LA" title="Facebook">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/" title="Instagram">
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a href="https://x.com/?lang=es" title="Twitter">
              <i className="fa-brands fa-square-x-twitter"></i>
            </a>
          </div>
        </div>

        <div className="footer-copy">
          <p>&copy; 2025 GYM_ULEAM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Reseña;
