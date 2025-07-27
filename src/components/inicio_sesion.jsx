import { useState } from 'react';
import '../assets/css/inicio_sesion.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errores, setErrores] = useState({});
  const [errorLogin, setErrorLogin] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorLogin(''); // limpia error al escribir
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      nuevosErrores.email = 'Correo electrónico no válido.';
    }

    if (form.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

      const usuarioEncontrado = usuariosGuardados.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (usuarioEncontrado) {
        localStorage.setItem('usuario_actual', JSON.stringify(usuarioEncontrado));
        alert('✅ Sesión iniciada correctamente');
        window.location.href = '/home2';
      } else {
        setErrorLogin('❌ Correo o contraseña incorrectos.');
      }
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
        <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="error-message">{errores.email}</div>

            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className="error-message">{errores.password}</div>

            {errorLogin && <div className="error-message">{errorLogin}</div>}

            <button type="submit" className="btn-primary">Continuar</button>

            <a href="/recuperar" className="forgot-link">¿No recuerdas tu contraseña?</a>

            <p>O continuar con:</p>
            <div className="social-buttons">
              <button type="button" className="google" onClick={() => window.location.href='https://workspace.google.com/intl/es-419/gmail/'}>Google</button>
              <button type="button" className="microsoft" onClick={() => window.location.href='https://www.microsoft.com/es-ec/'}>Microsoft</button>
              <button type="button" className="apple" onClick={() => window.location.href='https://www.icloud.com/'}>Apple</button>
            </div>

            <p className="register-link">¿No tienes una cuenta? <a href="/registro">Registrarse</a></p>
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

export default Login;
