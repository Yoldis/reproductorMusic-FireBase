
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../context/useContext';

export const Register = () => {
  document.querySelector('#titlePrimary').innerHTML ='Registrarte - Beats';

  const { nombre, email, password, onChangeInput, startRegisterEmailPassowrd, onResetForm, validate} = useContext(authContext);
  const{okNombre, okEmail, okPassword, casoNombre, casoEmail, casoPassword, message, ok} = validate;

  return (
    <div className="mx-auto max-w-sm mt-5 p-2 animate__animated animate__fadeIn">
      <form action="">
        <div className="flex flex-col">
          <p
            className={`mb-1 text-sm font-bold text-red-500 ${
              !ok ? "block" : "hidden"
            }`}
          >
            {message}
          </p>
          <label className="mb-1 text-sm font-bold text-secundary">
            Nombre/Apellido
          </label>
          <p
            className={`mb-1 text-sm font-bold text-red-500 ${
              !okNombre ? "block" : "hidden"
            }`}
          >
            {casoNombre}
          </p>
          <input
            className={`mb-3 border border-gray-300 rounded-md p-2 focus:outline-animationBG caret-animationBG text-cuarty font-semibold ${
              !okNombre ? "border border-red-500" : "border-none"
            }`}
            type="text"
            name="nombre"
            placeholder="Nombre/Apellido"
            onChange={onChangeInput}
            value={nombre}
          />

          <label className="mb-1 text-sm font-bold text-secundary">
            Dirección de correo electronico
          </label>
          <p
            className={`mb-1 text-sm font-bold text-red-500 ${
              !okEmail ? "block" : "hidden"
            }`}
          >
            {casoEmail}
          </p>
          <input
            className={`mb-3 border border-gray-300 rounded-md p-2 focus:outline-animationBG caret-animationBG text-cuarty font-semibold ${
              !okEmail ? "border border-red-500" : "border-none"
            }`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeInput}
            value={email}
          />

          <label className="mb-1 text-sm font-bold text-secundary">
            Contraseña
          </label>
          <p
            className={`mb-1 text-sm font-bold text-red-500 ${
              !okPassword ? "block" : "hidden"
            }`}
          >
            {casoPassword}
          </p>
          <input
            className={`mb-3 border border-gray-300 rounded-md p-2 focus:outline-animationBG caret-animationBG text-cuarty font-semibold ${
              !okPassword ? "border border-red-500" : "border-none"
            }`}
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={onChangeInput}
            value={password}
          />
          <button
            onClick={(e) =>
              startRegisterEmailPassowrd(e, nombre, email, password)
            }
            className="bg-secundary p-2 rounded-md font-semibold hover:opacity-70 transition-all duration-300"
          >
            Registrarte
          </button>

          <hr className="mt-8" />
          <p className="text-center mt-2 font-bold text-lg">
            ¿Ya tienes cuenta?
          </p>

          <Link
            className="text-center mt-5 border border-secundary p-2 rounded-2xl font-semibold text-white/80 text-lg hover:border-animationBG transition-all duration-300"
            to="/auth/login"
            onClick={onResetForm}
          >
            Inicia Ahora!
          </Link>
        </div>
      </form>
    </div>
  );
}
