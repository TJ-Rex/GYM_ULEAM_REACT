// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import '../assets/css/home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Link } from 'react-router-dom';

import imagen1 from '../assets/Imagen_Gym/imagen1.jpeg';
import imagen2 from '../assets/Imagen_Gym/imagen2.jpg';
import imagen3 from '../assets/Imagen_Gym/imagen3.jpg';
import imagen4 from '../assets/Imagen_Gym/imagen4.avif';

function Home() {
  const [reseñas, setReseñas] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('reseñas')) || [];
    setReseñas(datos);
  }, []);

  return (
    <>
      <header>
        <h1>💪🏋️‍♀️GYM_ULEAM</h1>
        <nav>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/registro">Registrarse</Link>
        </nav>
      </header>

      <div className="main-content">
        <div className="gallery">
          <div><img src={imagen1} alt="Imagen 1" /></div>
          <div><img src={imagen2} alt="Imagen 2" /></div>
          <div><img src={imagen3} alt="Imagen 3" /></div>
          <div><img src={imagen4} alt="Imagen 4" /></div>
        </div>

        <div className="info">
          <h2>¡Activa tu cuerpo, fortalece tu mente! Conoce el gimnasio universitario, tu nuevo espacio de bienestar</h2>
          <p>¿Sabías que hacer ejercicio de forma regular no solo mejora tu salud física, sino también tu rendimiento académico, tu estado de ánimo y tu calidad de vida? En la universidad, el estrés de los exámenes, los trabajos, las clases y la vida social pueden acumularse rápidamente. Por eso, el gimnasio universitario es más que un espacio con pesas y máquinas: es un lugar diseñado para que encuentres equilibrio, energía y motivación en tu día a día.</p>
          <p>Nuestro gimnasio universitario está pensado para ti, estudiante. Ya seas principiante o tengas experiencia entrenando, aquí encontrarás todo lo que necesitas para empezar o continuar tu camino hacia una vida más activa y saludable. Contamos con instalaciones modernas, entrenadores capacitados, horarios flexibles y una gran variedad de clases grupales que se adaptan a tus gustos y objetivos.</p>
          <h2>¿Qué puedes encontrar en el gimnasio universitario?</h2>
          <p><strong>Zona de musculación y pesas libres:</strong> ideal para desarrollar fuerza, ganar masa muscular o simplemente mantenerte en forma.</p>
          <p><strong>Máquinas de cardio:</strong> bicicletas, elípticas, cintas de correr y más, para mejorar tu resistencia y cuidar tu corazón.</p>
          <p><strong>Salones de clases grupales:</strong> yoga, pilates, zumba, HIIT, entrenamiento funcional, entre otras disciplinas que te harán sudar con diversión.</p>
          <p><strong>Entrenadores y asesorías personalizadas:</strong> si no sabes por dónde empezar, nuestros profesionales te guiarán paso a paso.</p>
          <p><strong>Espacios de relajación y estiramiento:</strong> porque descansar y recuperarse también es parte del entrenamiento.</p>
        </div>
      </div>

      <div className="reseña-seccion">
        <div className="reseña-titulo">Reseñas</div>
        <hr />
        <div className="reseñas">
          {reseñas.length > 0 ? (
            reseñas.map((r, i) => (
              <div className="reseña-carta" key={i}>
                <h4>{r.usuario}</h4>
                <p>{r.comentario}</p>
                <div className="estrellas">
                  {'★'.repeat(parseInt(r.calificacion)) + '☆'.repeat(5 - parseInt(r.calificacion))}
                </div>
              </div>
            ))
          ) : (
            <p>Aún no hay reseñas disponibles.</p>
          )}
        </div>

        <div className="mapa">
          <h3>Ubicación</h3>
          <iframe
            src="https://maps.google.com/maps?q=uleam%20manta&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Mapa ULEAM"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

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
            <Link to="https://www.facebook.com/?locale=es_LA" title="Facebook"><i className="fa-brands fa-facebook"></i></Link>
            <Link to="https://www.instagram.com/" title="Instagram"><i className="fa-brands fa-square-instagram"></i></Link>
            <Link to="https://x.com/?lang=es" title="Twitter"><i className="fa-brands fa-square-x-twitter"></i></Link>
          </div>
        </div>

        <div className="footer-copy">
          <p>&copy; 2025 GYM_ULEAM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
