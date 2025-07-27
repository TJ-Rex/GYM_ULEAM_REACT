import { useState } from 'react';
import '../assets/css/reserva_entrenamiento.css';

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
      img: '../src/assets/Imagen_Gym/calistenia.jpg',
      titulo: 'Calistenia',
      descripcion: 'Usa tu propio peso corporal para ganar fuerza, agilidad y control.',
      entrenador: 'Lic. Mariana Torres',
      horario: '9:00 a.m. - 10:00 a.m.'
    },
    {
      img: '../src/assets/Imagen_Gym/cardio.jpeg',
      titulo: 'Cardio',
      descripcion: 'Clases intensas de quema calórica con elípticas, bicicletas y ejercicios dinámicos.',
      entrenador: 'Ing. David Ríos',
      horario: '12:00 p.m. - 1:00 p.m.'
    },
    {
      img: '../src/assets/Imagen_Gym/boxeo.jpeg',
      titulo: 'Boxeo',
      descripcion: 'Mejora tu resistencia, reflejos y fuerza con técnicas de combate.',
      entrenador: 'Prof. Diego Ramírez',
      horario: '7:00 a.m. - 8:00 a.m.'
    },
    {
      img: '../src/assets/Imagen_Gym/maquina.avif',
      titulo: 'Máquinas guiadas',
      descripcion: 'Circuitos en máquinas para tonificar todo el cuerpo.',
      entrenador: 'Prof. Sofía Hernández',
      horario: '2:00 p.m. - 3:00 p.m.'
    },
    {
      img: '../src/assets/Imagen_Gym/pesas.webp',
      titulo: 'Pesas libres',
      descripcion: 'Sesiones de fuerza y volumen con barra, mancuernas y rutinas progresivas.',
      entrenador: 'Prof. Alejandro Gómez',
      horario: '4:00 p.m. - 5:00 p.m.'
    },
    {
      img: '../src/assets/Imagen_Gym/pilates.webp',
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
          <a href="/home2">Inicio</a>
          <a href="/configurar">{usuarioActual?.alias}<img src="../src/assets/Imagen_Gym/icono_perfil.webp" alt="Perfil" width="25" /></a>
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
    </>
  );
}

export default ReservaEntrenamiento;
