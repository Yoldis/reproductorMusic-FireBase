import { useContext,  useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaRedoAlt } from "react-icons/fa";
import { authContext } from "../../context/useContext";

export const Procfile = () => {

  const {getUser:{nombre, photoURL, loadImg}, getUser,  onChangeInputFile, setToogleProcfileDetails , setOpacityFocus} = useContext(authContext);
  
  const [opacity, setOpacity] = useState("");
  const [hidden, setHidden] = useState('hidden');
  

  const hoverEnterPhotoURL = () => {
    setOpacity('opacity-50');
    setHidden('flex');
  }

  const hoverLeavePhotoURL = () => {
    setOpacity('');
    setHidden('hidden');
  }

  const onShowProcfileDetails = () => {
    setToogleProcfileDetails('block');
    setOpacityFocus('opacity-50');
  }

  return (
    <div className={`mt-5 text-white animate__animated animate__fadeIn`}>
      <div className="relative flex flex-wrap mx-3 ml-7 gap-5">
        <div className="w-52 h-52 rounded-full">
          <img
            src={`${
              loadImg === "loading"
                ? "https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2FiconUserDefault.jpg?alt=media&token=2451c2d1-d8c1-424a-b7fd-ca7bfa92d60f"
                : photoURL === null || photoURL === "null"
                ? "https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2FiconUserDefault.jpg?alt=media&token=2451c2d1-d8c1-424a-b7fd-ca7bfa92d60f"
                : photoURL
            }`}
            className={` h-52 w-52  object-cover drop-shadow-2xl rounded-full  shadow-2xl ${opacity}`}
            alt=""
            onMouseOver={hoverEnterPhotoURL}
            onMouseOut={hoverLeavePhotoURL}
          />

          <label htmlFor="file" className="z-0 cursor-pointer" onClick={onShowProcfileDetails}>
            <div
              onMouseOut={hoverLeavePhotoURL}
              onMouseOver={hoverEnterPhotoURL}
              className={`absolute top-0 w-52 h-52 rounded-full z-1 object-cover ${hidden} justify-center flex-col items-center cursor-pointer`}
            >
              <input
                type="file"
                name="file"
                className="w-px h-px  "
                id="file"
                onChange={onChangeInputFile}
                accept="'image/*"
                disabled = {true && loadImg === "loading"}
              />
              <FiEdit2 className="text-6xl" />
              <p>Elegir Foto</p>
            </div>

            {loadImg === "loading" && (
              <div className=" absolute top-0 w-52 h-52 rounded-full z-1 flex justify-center flex-col items-center">
                <FaRedoAlt className="text-4xl animate-spin text-black" />
              </div>
            )}
          </label>
        </div>

        <div className="mt-6 font-bold">
          <p className="">Perfil</p>
          <h3
            onClick={onShowProcfileDetails}
            className="md:text-8xl text-3xl  cursor-pointer"
          >
            {nombre}
          </h3>
        </div>
      </div>
    </div>
  );
}
