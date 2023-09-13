import { useContext } from "react"
import { musicContext } from "../../context/useContext"
import { LoadingAnimation } from "../../router/LoadingAnimation";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit, AiOutlineReload } from "react-icons/all";

export const Music = () => {
    const{music, musicAtrr} = useContext(musicContext);
    const{loadMusic} = musicAtrr;

  return (
    <div className="animate__animated animate__fadeIn overflow-x-hidden overflow-y-scroll h-screen ">
    <div className=" fixed w-full z-10 " style={{background: 'linear-gradient(to top, #434343, #000000) '}}>
          <h1 className=" md:text-4xl text-2xl ml-5 md:ml-10 my-5 font-bold text-white">Lista de Reproducción</h1>
      </div>  

      <div className="md:mb-28 md:mt-[90px] mt-[80px] mb-48" >
      {loadMusic === "Loading" ? (
        <LoadingAnimation />
        ) : (
          <div className="">
          {music.map((music, i) => {
            return <MusicItem  key={i + 1} music={music} index={i + 1} />;
          })}
        </div>
      )}
      </div>
    </div>
  );
}

const MusicItem = ({music, index}) => {
    const{audio, autor, name, id, img} = music;
    const{playMusic, uidMusic, onSelectClickMusic, selectMusic, showBtnDeleteMusic, onShowBtnDeleteMusic, startDeleteMusicDB, startActiveShowEditMusic, activeEditImg, musicAtrr,  onChangeImgAudioInput} = useContext(musicContext);
    const{loadImgMusic} = musicAtrr;

    return (
      <div
        onDoubleClick={() => playMusic(audio, id, name, autor , music, img)}
        onClick={() => onSelectClickMusic(id)}
        className={` ${uidMusic === id ? "bg-black/20" : "bg-transparent"} ${
          selectMusic === id ? "bg-white/40 hover:bg-white/40" : "bg-black/20"
        } flex justify-between gap-2 items-center mx-3 px-2  my-2 font-semibold hover:bg-black/20 cursor-pointer transition-all duration-200 rounded-md animate__animated animate__fadeIn `}
        onMouseOut={() => onShowBtnDeleteMusic(id)}
        onMouseOver={() => onShowBtnDeleteMusic(id)}
      >
        <div className="flex items-center justify-between w-full gap-3  ">
          <div className="w-2">
            <p className="">{index}</p>
          </div>
          
          <div className=" z-10 relative" onMouseOver={loadImgMusic !== 'Loading' ? ()=>startActiveShowEditMusic(id) : null } onMouseOut={loadImgMusic !== 'Loading' ? ()=>startActiveShowEditMusic(id) : null } >
            {
              activeEditImg === id &&
              loadImgMusic === 'Loading' ? <AiOutlineReload className="animate-spin ml-5"/>:
              <img 
              className="object-cover object-center md:w-20 w-28  h-10  "
              src={img}
              alt=""
            />
            }
            
          <input
          type="file"
          name='imgAudio'
          className="w-px h-px absolute"
          id={id}
          onChange={(e)=> onChangeImgAudioInput(e, autor, name, id, audio)}
          accept="image/*"
          disabled = {true && loadImgMusic === "loading"}
        />
              <label htmlFor={id} className={`cursor-pointer absolute  left-6 top-3 text-white ${activeEditImg === id ? 'block' : 'hidden'}`}>
                {
                  loadImgMusic === 'Loading' ? '' : <AiFillEdit className="  text-xl"/>
                }
              </label>
          </div>
          
          <div className="w-full py-2">
            <h3 className={`md:text-base text-sm w-full ${uidMusic === id ? 'text-secundary' : 'text-white/95'}`}>
              {name}
            </h3>
            <p className="md:text-sm text-xs text-black/70">{autor}</p>
          </div>
        </div>

        <div className=" w-10">
          <FaTrash
          onClick={()=> startDeleteMusicDB(id)}
            className={`text-red-400 active:text-white/50 md:text-base text-sm ${
              showBtnDeleteMusic === id ? "block" : "hidden"
            }`}
          />
        </div>
      </div>
    );
}