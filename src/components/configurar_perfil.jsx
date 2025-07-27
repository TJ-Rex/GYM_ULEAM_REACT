import { useState, useEffect } from 'react';
import '../assets/css/configuracion_perfil.css';

function ConfigurarUsuario() {
  const [form, setForm] = useState({
    alias: '',
    peso: '',
    altura: '',
    password: '',
    confirmPassword: ''
  });

  const usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));

  const [errores, setErrores] = useState({});

  // Cargar usuario al inicio
  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));
    if (usuarioActual) {
      setForm({
        alias: usuarioActual.alias || '',
        peso: usuarioActual.peso || '',
        altura: usuarioActual.altura || '',
        password: usuarioActual.password || '',
        confirmPassword: usuarioActual.password || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    let valido = true;

    if (!form.alias) {
      nuevosErrores.alias = 'El alias no puede estar vacío.';
      valido = false;
    }

    if (!form.peso || isNaN(form.peso) || parseFloat(form.peso) <= 0) {
      nuevosErrores.peso = 'Ingresa un peso válido.';
      valido = false;
    }

    if (!form.altura || isNaN(form.altura) || parseFloat(form.altura) <= 0) {
      nuevosErrores.altura = 'Ingresa una altura válida.';
      valido = false;
    }

    if (form.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.';
      valido = false;
    }

    if (form.password !== form.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.';
      valido = false;
    }

    setErrores(nuevosErrores);

    if (valido) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));
      const index = usuarios.findIndex(u => u.email === usuarioActual.email);

      const usuarioActualizado = {
        ...usuarioActual,
        alias: form.alias,
        peso: form.peso,
        altura: form.altura,
        password: form.password
      };

      if (index !== -1) {
        usuarios[index] = usuarioActualizado;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuario_actual', JSON.stringify(usuarioActualizado));
      }

      alert('✅ Perfil actualizado correctamente');
      window.location.href = '/home2';
    }
  };

  const handleEliminarCuenta = () => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuario_actual'));
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(u => u.email !== usuarioActual.email);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.removeItem('usuario_actual');
    alert('✅ Cuenta eliminada');
    window.location.href = '/home';
  };

  return (
    <>
      <header>
        <h1>💪🏋️‍♀️ GYM_ULEAM</h1>
        <a className='alias'>👤 {usuarioActual?.alias}</a>
        <nav>
          <a href="/entrenamientos">Planes de entrenamientos</a>
          <a href="/home">Cerrar sesión</a>
        </nav>
      </header>

      <section className="contenido">
        <h2>Configuración de Perfil</h2>

        <div className="imagen-perfil">
          <img src="../src/assets/Imagen_Gym/icono_perfil.webp" alt="Foto de perfil" id="fotoPerfil" />
          <p><label htmlFor="subirFoto" className="subir-foto-label">Subir nueva foto</label></p>
          <input type="file" id="subirFoto" name="subirFoto" accept="image/*" style={{ display: 'none' }} />
        </div>

        <form id="config-form" onSubmit={handleSubmit}>
          <label htmlFor="alias">Cambiar Alias:</label>
          <input type="text" id="alias" name="alias" placeholder="Nuevo alias" value={form.alias} onChange={handleChange} />
          <span className="error-message">{errores.alias}</span>

          <label htmlFor="peso">Peso del usuario:</label><br />
          <input type="text" id="peso" name="peso" placeholder="Nuevo peso" value={form.peso} onChange={handleChange} />
          <span className="error-message">{errores.peso}</span>

          <label htmlFor="altura">Altura del usuario:</label><br />
          <input type="text" id="altura" name="altura" placeholder="Nueva altura" value={form.altura} onChange={handleChange} />
          <span className="error-message">{errores.altura}</span>

          <label htmlFor="password">Cambiar Contraseña:</label>
          <input type="password" id="password" name="password" placeholder="Nueva contraseña" value={form.password} onChange={handleChange} />
          <span className="error-message">{errores.password}</span>

          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmar nueva contraseña" value={form.confirmPassword} onChange={handleChange} />
          <span className="error-message">{errores.confirmPassword}</span>

          <div className="botones">
            <button type="submit" className="guardar">Confirmar cambios</button>
            <button type="button" className="eliminar" onClick={handleEliminarCuenta}>Eliminar Cuenta</button>
          </div>
        </form>
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

export default ConfigurarUsuario;
