import { useState } from 'react';
import '../assets/css/recuperar_contraseña.css';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function RecuperarContrasena() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codigoMostrado, setCodigoMostrado] = useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
  const navigate = useNavigate();

  const handleEnviarCodigo = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      setEmailError('El correo no está registrado.');
      setGeneratedCode('');
      setCodigoMostrado('');
      setUsuarioEncontrado(null);
      return;
    }

    setUsuarioEncontrado(usuario);
    setEmailError('');
    const nuevoCodigo = Math.floor(100000 + Math.random() * 900000).toString(); 
    setGeneratedCode(nuevoCodigo);
    setCodigoMostrado(`Tu código es: ${nuevoCodigo}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!generatedCode) {
      setCodeError('Primero debes generar y enviar el código.');
      valid = false;
    } else if (code !== generatedCode) {
      setCodeError('El código ingresado no es correcto.');
      valid = false;
    } else {
      setCodeError('');
    }

    if (valid) {
      localStorage.setItem('usuario_actual', JSON.stringify(usuarioEncontrado));
      navigate('/configurar');  // <-- Cambio realizado aquí
    }
  };

  return (
    <>
      <header>
        <h1>💪🏋️‍♀️GYM_ULEAM</h1>
        <nav>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/registro">Registrarse</Link>
        </nav>
      </header>

      <main>
        <div className="recuperar-container">
          <h2>Recuperar Contraseña</h2>
          <form className="recuperar-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p style={{ color: 'red' }}>{emailError}</p>

            <div className="instrucciones">
              <h3>Pasos a seguir</h3>
              <ol>
                <li>Ingresa tu correo electrónico institucional para recibir un código.</li>
                <li>Ingresa el código recibido.</li>
                <li>Accede a la configuración de tu perfil.</li>
                <li>Cambia tu contraseña por una nueva.</li>
              </ol>
            </div>

            <button type="button" className="btn-secondary" onClick={handleEnviarCodigo}>Enviar código</button>
            {codigoMostrado && (
              <p style={{ marginTop: '10px', color: 'whith'  }}>{codigoMostrado}</p>
            )}

            <label htmlFor="code">Código recibido:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <p style={{ color: 'red' }}>{codeError}</p>

            <div className="form-buttons">
              <button type="submit" className="btn-primary">Continuar</button>
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
            <a href="https://www.facebook.com/?locale=es_LA" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com/" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-instagram"></i></a>
            <a href="https://x.com/?lang=es" title="Twitter" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-x-twitter"></i></a>
          </div>
        </div>

        <div className="footer-copy">
          <p>&copy; 2025 GYM_ULEAM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default RecuperarContrasena;