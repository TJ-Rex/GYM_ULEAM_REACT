import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/reserva_entrenamiento.css';

import calistenia from '../assets/Imagen_Gym/calistenia.jpg';
import cardio from '../assets/Imagen_Gym/cardio.jpeg';
import boxeo from '../assets/Imagen_Gym/boxeo.jpeg';
import maquina from '../assets/Imagen_Gym/maquina.avif';
import pesas from '../assets/Imagen_Gym/pesas.webp';
import pilates from '../assets/Imagen_Gym/pilates.webp';
import iconoPerfil from '../assets/Imagen_Gym/icono_perfil.webp';

function ReservaEntrenamiento() {
  const usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));

  const [reservas, setReservas] = useState(() => {
    return JSON.parse(localStorage.getItem('reservas')) || [];
  });

  const [fechas, setFechas] = useState({});
  const [errores, setErrores] = useState({});
  const [modificando, setModificando] = useState(null);

  const reservar = (plan) => {
    const fecha = fechas[plan];
    if (!fecha) {
      setErrores((prev) => ({ ...prev, [plan]: 'Por favor selecciona una fecha antes de reservar.' }));
      return;
    }

    const nuevaReserva = {
      usuario: usuarioActual.alias,
      plan,
      fecha
    };

    const nuevasReservas = [
      ...reservas.filter(r => !(r.usuario === usuarioActual.alias && r.plan === plan)),
      nuevaReserva
    ];

    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));
    setReservas(nuevasReservas);
    setErrores((prev) => ({ ...prev, [plan]: '' }));
  };

  const cancelarReserva = (plan) => {
    const nuevasReservas = reservas.filter(r => !(r.usuario === usuarioActual.alias && r.plan === plan));
    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));
    setReservas(nuevasReservas);
    setFechas((prev) => ({ ...prev, [plan]: '' }));
    setErrores((prev) => ({ ...prev, [plan]: '' }));
    setModificando(null);
  };

  const modificarReserva = (plan, nuevaFecha) => {
    if (!nuevaFecha) {
      setErrores((prev) => ({ ...prev, [plan]: 'Selecciona una nueva fecha.' }));
      return;
    }
    reservar(plan);
    setModificando(null);
  };

  const planes = [
    {
      img: calistenia,
      titulo: 'Calistenia',
      descripcion: 'Usa tu propio peso corporal para ganar fuerza, agilidad y control.',
      entrenador: 'Lic. Mariana Torres',
      horario: '9:00 a.m. - 10:00 a.m.'
    },
    {
      img: cardio,
      titulo: 'Cardio',
      descripcion: 'Clases intensas de quema calórica con elípticas, bicicletas y ejercicios dinámicos.',
      entrenador: 'Ing. David Ríos',
      horario: '12:00 p.m. - 1:00 p.m.'
    },
    {
      img: boxeo,
      titulo: 'Boxeo',
      descripcion: 'Mejora tu resistencia, reflejos y fuerza con técnicas de combate.',
      entrenador: 'Prof. Diego Ramírez',
      horario: '7:00 a.m. - 8:00 a.m.'
    },
    {
      img: maquina,
      titulo: 'Máquinas guiadas',
      descripcion: 'Circuitos en máquinas para tonificar todo el cuerpo.',
      entrenador: 'Prof. Sofía Hernández',
      horario: '2:00 p.m. - 3:00 p.m.'
    },
    {
      img: pesas,
      titulo: 'Pesas libres',
      descripcion: 'Sesiones de fuerza y volumen con barra, mancuernas y rutinas progresivas.',
      entrenador: 'Prof. Alejandro Gómez',
      horario: '4:00 p.m. - 5:00 p.m.'
    },
    {
      img: pilates,
      titulo: 'Pilates',
      descripcion: 'Mejora tu postura, flexibilidad y control corporal con ejercicios suaves.',
      entrenador: 'Prof. Valeria Mendoza',
      horario: '6:00 p.m. - 7:00 p.m.'
    }
  ];

  return (
    <>
      <header>
        <div><strong>💪🏋️‍♀️ GYM_ULEAM</strong></div>
        <nav>
          <Link to="/home2">Inicio</Link>
          <Link to="/configurar">
            {usuarioActual?.alias}
            <img src={iconoPerfil} alt="Perfil" width="25" />
          </Link>
        </nav>
      </header>

      <section className="grid">
        {planes.map((plan, index) => {
          const reserva = reservas.find(r => r.usuario === usuarioActual.alias && r.plan === plan.titulo);
          return (
            <div className="card" key={index}>
              <img src={plan.img} alt="Imagen del plan" />
              <h2>{plan.titulo}</h2>
              <p><strong>Descripción:</strong> {plan.descripcion}</p>
              <p><strong>Entrenador:</strong> {plan.entrenador}</p>
              <p><strong>Horario:</strong> {plan.horario}</p>

              <div className="acciones">
                {reserva ? (
                  <>
                    <p><strong>Fecha reservada:</strong> {reserva.fecha}</p>
                    <button onClick={() => cancelarReserva(plan.titulo)}>Cancelar</button>
                    <button onClick={() => setModificando(plan.titulo)}>Modificar</button>
                    {modificando === plan.titulo && (
                      <>
                        <input
                          type="date"
                          value={fechas[plan.titulo] || ''}
                          onChange={(e) => setFechas({ ...fechas, [plan.titulo]: e.target.value })}
                        />
                        <button onClick={() => modificarReserva(plan.titulo, fechas[plan.titulo])}>Guardar</button>
                        {errores[plan.titulo] && (
                          <span className="error-message">{errores[plan.titulo]}</span>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type="date"
                      value={fechas[plan.titulo] || ''}
                      onChange={(e) => setFechas({ ...fechas, [plan.titulo]: e.target.value })}
                    />
                    <button onClick={() => reservar(plan.titulo)}>Reservar</button>
                    {errores[plan.titulo] && (
                      <span className="error-message">{errores[plan.titulo]}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </section>

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
            <a href="https://www.facebook.com/?locale=es_LA" title="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/" title="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a href="https://x.com/?lang=es" title="Twitter" target="_blank" rel="noopener noreferrer">
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

export default ReservaEntrenamiento;