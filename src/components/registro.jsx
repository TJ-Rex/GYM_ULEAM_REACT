import { useState } from 'react';
import '../assets/css/registro.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Registro() {
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const [form, setForm] = useState({
    email: '',
    alias: '',
    peso: '',
    altura: '',
    password: '',
    confirmPassword: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) {
      nuevosErrores.email = 'Ingrese su correo electrónico.';
    } else if (!emailRegex.test(form.email)) {
      nuevosErrores.email = 'Correo electrónico no válido.';
    }

    if (isNaN(form.peso) || form.peso <= 40) {
      nuevosErrores.peso = 'El peso debe ser un número mayor a 40.';
    }

    if (isNaN(form.altura) || form.altura <= 100) {
      nuevosErrores.altura = 'La altura debe ser un número mayor a 100.';
    }

    if (form.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (form.password !== form.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      // Guardar en localStorage
      const usuariosPrevios = JSON.parse(localStorage.getItem('usuarios')) || [];

      const nuevoUsuario = {
        email: form.email,
        alias: form.alias,
        peso: form.peso,
        altura: form.altura,
        password: form.password
      };

      usuariosPrevios.push(nuevoUsuario);

      localStorage.setItem('usuarios', JSON.stringify(usuariosPrevios));
      localStorage.setItem('usuario_actual', JSON.stringify(nuevoUsuario));

      alert('✅ ¡Registro exitoso!');
      window.location.href = '/home2';
    }
  };

  return (
    <>
      <header>
        <h1>💪🏋️‍♀️GYM_ULEAM</h1>
        <nav>
          <a href="/login">Iniciar Sesión</a>
          <a href="/registro">Registrarse</a>
        </nav>
      </header>

      <main>
        <div className="registro-container">
          <h2>Registrarse</h2>
          <form className="registro-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
            <div className="error-message">{errores.email}</div>

            <label htmlFor="alias">Alias de usuario:</label>
            <input type="text" id="alias" name="alias" value={form.alias} onChange={handleChange} required />

            <label htmlFor="peso">Peso del usuario:</label>
            <input type="text" id="peso" name="peso" value={form.peso} onChange={handleChange} required />
            <div className="error-message">{errores.peso}</div>

            <label htmlFor="altura">Altura del usuario:</label>
            <input type="text" id="altura" name="altura" value={form.altura} onChange={handleChange} required />
            <div className="error-message">{errores.altura}</div>

            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
            <div className="error-message">{errores.password}</div>

            <label htmlFor="confirm_password">Confirmar Contraseña:</label>
            <input type="password" id="confirm_password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
            <div className="error-message">{errores.confirmPassword}</div>

            <button type="submit" className="btn-primary">Continuar</button>

            <p>O registrarse con:</p>
            <div className="social-buttons">
              <button type="button" className="google">Google</button>
              <button type="button" className="microsoft">Microsoft</button>
              <button type="button" className="apple">Apple</button>
            </div>
          </form>
        </div>
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

export default Registro;
