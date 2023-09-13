import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext, musicContext } from "../../context/useContext";


export const Login = () => {
  document.querySelector('#titlePrimary').innerHTML ='Iniciar sesion - Beats';

  const {email, password, onChangeInput, onResetForm, startLoginWithEmailPassword, validate} = useContext(authContext);
  const{okEmail, okPassword, casoEmail, casoPassword, message, ok} = validate;
  // const{setMusicAtrr, musicAtrr} = useContext(musicContext);

  const onStartLogin = (e) => {
    e.preventDefault();
    startLoginWithEmailPassword( email, password);
  }

  return (
    <div className="mx-auto max-w-sm mt-5 p-2 animate__animated animate__fadeIn">
      <form>
        
        <div className="flex flex-col">
        <p className={`mb-1 text-sm font-bold text-red-500 ${!ok ? 'block' : 'hidden'}`}>{message}</p>
          <label className="mb-1 text-sm font-bold text-secundary">
            Dirección de correo electronico
          </label>
          <p className={`mb-1 text-sm font-bold text-red-500 ${!okEmail ? 'block' : 'hidden'}`}>{casoEmail}</p>
          <input
            className={`mb-3 border border-gray-300 rounded-md p-2 focus:outline-animationBG caret-animationBG text-cuarty font-semibold ${!okEmail ? 'border border-red-500': 'border-none'}`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeInput}
            value={email}
          />

          <label className="mb-1 text-sm font-bold text-secundary">
            Contraseña
          </label>
          <p className={`mb-1 text-sm font-bold text-red-500 ${!okPassword ? 'block' : 'hidden'}`}>{casoPassword}</p>
          <input
            className={`mb-3 border border-gray-300 rounded-md p-2 focus:outline-animationBG caret-animationBG text-cuarty font-semibold ${!okPassword ? 'border border-red-500': 'border-none'}`}
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={onChangeInput}
            value={password}
          />
          <button 
          onClick={onStartLogin}
          className="bg-secundary p-2 rounded-md font-semibold hover:opacity-70 transition-all duration-300">
            Iniciar Sesion
          </button>

          <hr className="mt-8" />
          <p className="text-center mt-2 font-bold text-lg">
            ¿No tienes cuenta?
          </p>

          <Link
            className="text-center mt-5 border border-secundary p-2 rounded-2xl font-semibold text-white/80 text-lg hover:border-animationBG transition-all duration-300"
            to="/auth/register"
            onClick={onResetForm}
          >
            Registrarte Ahora!
          </Link>
        </div>
      </form>
    </div>
  );
}
