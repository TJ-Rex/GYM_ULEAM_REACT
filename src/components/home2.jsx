// src/pages/PaginaInicio2.jsx
// import React from 'react';
import '../assets/css/home2.css';
import { useEffect, useState } from 'react';

function PaginaInicio2() {

  const usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));

  const [reseñas, setReseñas] = useState([]);

    useEffect(() => {
      const datos = JSON.parse(localStorage.getItem('reseñas')) || [];
      setReseñas(datos);
    }, []);

    const handleEliminarReseña = (indice) => {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar tu reseña?');
      if (!confirmacion) return;

      const nuevasReseñas = reseñas.filter((_, i) => i !== indice);
      localStorage.setItem('reseñas', JSON.stringify(nuevasReseñas));
      setReseñas(nuevasReseñas);
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

      <main className="main-content">
        <section className="gallery">
            <div><img src="../src/assets/Imagen_Gym/imagen1.jpeg" /></div><div><img src="../src/assets/Imagen_Gym/imagen2.jpg" /></div>
            <div><img src="../src/assets/Imagen_Gym/imagen3.jpg" /></div><div><img src="../src/assets/Imagen_Gym/imagen4.avif" /></div>
        </section>

        <section className="info">
          <h2>¡Activa tu cuerpo, fortalece tu mente! Conoce el gimnasio universitario...</h2>
          <p>¿Sabías que hacer ejercicio de forma regular no solo mejora tu salud física, sino también tu rendimiento académico, tu estado de ánimo y tu calidad de vida?</p>
          <p>En la universidad, el estrés de los exámenes, los trabajos, las clases y la vida social pueden acumularse rápidamente...</p>
          <p>Ya seas principiante o tengas experiencia entrenando...</p>

          <h2>¿Qué puedes encontrar en el gimnasio universitario?</h2>
          <p><strong>Zona de musculación y pesas libres:</strong> ideal para desarrollar fuerza, ganar masa muscular o simplemente mantenerte en forma.</p>
          <p><strong>Máquinas de cardio:</strong> bicicletas, elípticas, cintas de correr y más...</p>
          <p><strong>Salones de clases grupales:</strong> yoga, pilates, zumba, HIIT, etc.</p>
          <p><strong>Entrenadores y asesorías personalizadas:</strong> si no sabes por dónde empezar, nuestros profesionales te guiarán paso a paso.</p>
          <p><strong>Espacios de relajación y estiramiento:</strong> porque descansar también es parte del entrenamiento.</p>
        </section>

        <section className="reseña-seccion">
          <h2 className="reseña-titulo">Reseñas</h2>
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

                    {r.usuario === usuarioActual?.alias && (
                      <button style={{ marginTop: '10px', backgroundColor: 'crimson', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}onClick={() => handleEliminarReseña(i)}>
                      Eliminar</button>
                    )}
                  </div>
                ))
              ) : (
                <p>Aún no hay reseñas.</p>
              )}
            </div>
          <div className="añadir-reseña">
            <button onClick={() => window.location.href = '/reseña'}>Añadir reseña</button>
          </div>
        </section>

        <section className="mapa">
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
        </section>
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
            <a href="https://www.facebook.com/?locale=es_LA" title="Facebook"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com/" title="Instagram"><i className="fa-brands fa-square-instagram"></i></a>
            <a href="https://x.com/?lang=es" title="Twitter"><i className="fa-brands fa-square-x-twitter"></i></a>
          </div>
        </div>

        <div className="footer-copy">
          <p>&copy; 2025 GYM_ULEAM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default PaginaInicio2;
