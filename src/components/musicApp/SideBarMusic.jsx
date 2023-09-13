import { useContext } from "react";
import { FaSignOutAlt, FaCloudUploadAlt, FaMusic, FaTrash } from "react-icons/fa"
import {  useNavigate } from "react-router-dom";
import { authContext, musicContext } from "../../context/useContext"

export const SideBarMusic = () => {
  const {startLogoutSign, getUser} = useContext(authContext);
  const {onChangeInputAudio, stopAudio, musicAtrr, startDeleteAllMusic} = useContext(musicContext);
  const{ nombre, photoURL, loadImg, uid} = getUser;
  const{loadMusic} = musicAtrr;
  const navigate = useNavigate();
  
  const goProcfile = () =>{
    navigate('music/procfile');
  }

  const goHomeMusic = () => {
    navigate('music')
  }

  const onLogout = () => {
      stopAudio();
      startLogoutSign();
  }
  
  // min-h-screen
  return (
    <div className="flex flex-col justify-between items-center md:items-stretch bg-tercer w-20 md:w-48 ">
      
      <div className="m-2 mt-5 flex flex-col gap-5">
        <div
          onClick={goProcfile}
          className="flex items-center rounded-2xl text-white bg-cuarty p-1  cursor-pointer transition-all duration-300 hover:opacity-80 shadow-md "
        >
            <img
              src={`${
                loadImg === "loading"
                  ? "https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2FiconUserDefault.jpg?alt=media&token=2451c2d1-d8c1-424a-b7fd-ca7bfa92d60f"
                  : photoURL === null || photoURL === "null"
                  ? "https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2FiconUserDefault.jpg?alt=media&token=2451c2d1-d8c1-424a-b7fd-ca7bfa92d60f"
                  : photoURL
              }`}
              className="object-cover object-center w-8 h-8 m-auto"
              alt="Foto Perfil"
              style={{ clipPath: "circle(50%)" }}
            />

          <h3 className={`text-center w-3/4 font-semibold md:block hidden `}>
            {nombre}
          </h3>
        </div>

          <div onClick={goHomeMusic} className="flex items-center text-white rounded-2xl bg-secundary px-1 py-2  cursor-pointer transition-all duration-300 hover:opacity-80 shadow-md ">
           
            <FaMusic className="m-auto text-xl" />
            <p className={`text-center w-3/4 font-semibold md:block hidden`}>
              Música
            </p>
          </div>

        <label htmlFor="music">
          <div className="flex items-center text-white rounded-2xl bg-secundary p-1  cursor-pointer transition-all duration-300 hover:opacity-80 shadow-md ">
            <input
              type="file"
              name="music"
              className="w-px h-px"
              id="music"
              onChange={onChangeInputAudio}
              accept="audio/*"
              multiple
              disabled ={true && loadMusic === 'Loading'}
              
            />
            <FaCloudUploadAlt className="m-auto text-2xl" />
            <p className={`text-center w-3/4 font-semibold md:block hidden`}>
              Importar música
            </p>
          </div>
        </label>


        <div onClick={startDeleteAllMusic} className="flex items-center text-white rounded-2xl bg-red-500 px-1 py-2  cursor-pointer transition-all duration-300 hover:opacity-80 shadow-md ">
           
            <FaTrash className="m-auto text-xl" />
            <p className={`text-center w-3/4 font-semibold md:block hidden`}>
              Eliminar Todas
            </p>
          </div>

      </div>

      <button
        onClick={onLogout}
        className=" ml-2 mb-4 flex items-center gap-2 hover:opacity-60 transition-opacity duration-300"
      >
        <FaSignOutAlt className="text-secundary text-lg " />
        <p className={`text-secundary font-bold md:block hidden }`}>
          Cerrar sesion
        </p>
      </button>
    </div>
  );
}
