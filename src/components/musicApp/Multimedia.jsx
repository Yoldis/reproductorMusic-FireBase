import { TbRepeat, FaPauseCircle, FaPlayCircle, FaRandom, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeDown, FaVolumeMute, FaOutdent, AiOutlineReload } from "react-icons/all";
import { musicContext } from "../../context/useContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Multimedia = () => {
    const navigate = useNavigate();
    const{musicAtrr , pauseMusic, resumeMusic, currentTime, duration, progressBar, onShowBtnProgress, onHiddenBtnProgress, onGetCurrentTime, prevMusic,  nextMusic, aleatoryMusic, activeRandomMusic, setCheckMusic, checkMusic, activeRepeatMusic, repeatMusic, onShowBtnVolumen, onHiddenBtnVolumen, mutedVolumenMusic, activeMutedVolumen, onGetCurrentVolumen, progressBarVolumen, activeEditImg} = useContext(musicContext);
    const{autor, name, img, play, showBtnProgress, audio, id, showBtnVolumen, loadImgMusic} = musicAtrr;

    const onCheckMusic = () => {
        checkMusic ? (setCheckMusic(false), navigate('/music')) : ( setCheckMusic(true), navigate('music/chekMusic'));
      }

  return (
    <div className=" z-10 w-full flex flex-col md:gap-6 gap-1.5 md:grid md:grid-cols-3 bg-primary p-4 md:items-center border-t border-t-borderMusic">
        <div className="flex gap-3 md:flex-wrap ">
            <div>
                {
                    activeEditImg === id && 
                    loadImgMusic === 'Loading' ? <AiOutlineReload className="animate-spin ml-5 mt-3 text-white font-bold text-xl"/>:
                    <img src={img} className="object-cover object-center  w-28 h-14 " />
                }
                </div>
            <div className="self-center">
                <h3 className="text-white font-bold  text-sm">{name}</h3>
                <p className="text-xs text-white/50 font-bold ">{autor}</p>
            </div>
        </div>

        <div className="mb-2">
            <div className="flex gap-8 text-lg items-center justify-center mb-1 text-white">
                <button><FaRandom onClick={aleatoryMusic} className={`transition-colors duration-100 ${activeRandomMusic ?'hover:text-secundary text-secundary' : 'hover:text-white text-white/70 active:text-white/60'}`} /></button>

                <button><FaStepBackward onClick={()=>prevMusic(audio, id, name, autor, musicAtrr, img)} className=" active:text-white/60 transition-colors duration-200 hover:text-white text-white/70"/></button>

                <button>{play ? <FaPauseCircle onClick={()=>pauseMusic(musicAtrr)} className="text-4xl"/> : <FaPlayCircle onClick={()=>resumeMusic()} className="text-4xl "/>}</button>

                <button><FaStepForward onClick={()=> nextMusic(id)} className="transition-colors duration-200 hover:text-white text-white/70 active:text-white/60"/></button>
                
                <button><TbRepeat onClick={repeatMusic} className={`transition-colors duration-100 ${activeRepeatMusic ? 'hover:text-secundary text-secundary' : 'hover:text-white text-white/70 active:text-white/60'}`} /></button>
            </div>

            <div className="flex gap-2 justify-between items-center  text-white relative">
            <span className="text-xs text-white/70 font-semibold">{currentTime}</span>
            
            <section className="h-1  rounded-2xl bg-cuarty flex items-center" style={{width: '100%'}} >
            <div className={` transition-colors duration-200 bg-gray-200 ${showBtnProgress ? 'rounded-md' : 'rounded-l-md bg-secundary'} h-1`} style={{ maxWidth: `100%`, width:`${progressBar}%`}} ></div>
            <span className={`p-1.5 bg-white rounded-md m-0 cursor-pointer relative right-0 ${showBtnProgress ? 'hidden' : 'block'} `}></span>
            </section>
            
            <div className={`h-3 absolute left-[30px]`} style={{width: '85%'}} onMouseOver={onHiddenBtnProgress} onMouseOut={onShowBtnProgress} onClick={(e)=>onGetCurrentTime(e,audio, id, name, autor, musicAtrr, img)}></div>
                <span className="text-xs text-white/70 font-semibold">{duration}</span>
            </div>
        </div>

        <div className=" flex justify-center md:justify-end items-center flex-wrap gap-3 text-lg text-white ">
            <button><FaOutdent onClick={onCheckMusic} className={`transition-colors duration-100 ${checkMusic ? 'hover:text-secundary text-secundary' : 'hover:text-white text-white/70 active:text-white/60'}`}/></button>
            
            
            <button>{activeMutedVolumen === 0 ? <FaVolumeMute onMouseOver={onHiddenBtnVolumen} onMouseOut={onShowBtnVolumen} onClick={mutedVolumenMusic} className={`transition-colors duration-100 hover:text-white text-white/70 active:text-white/60`} /> : activeMutedVolumen < 0.5 ? <FaVolumeDown onMouseOver={onShowBtnVolumen} onMouseOut={onShowBtnVolumen} onClick={mutedVolumenMusic} className={`transition-colors duration-100 hover:text-white text-white/70 active:text-white/60`} /> :
            <FaVolumeUp onMouseOver={onHiddenBtnVolumen} onMouseOut={onShowBtnVolumen} onClick={mutedVolumenMusic}  className={`transition-colors duration-100 hover:text-white text-white/70 active:text-white/60`} /> }</button>

            <section className="h-1  rounded-2xl bg-cuarty flex items-center relative " style={{width: '25%'}} >
                <div className={`transition-colors duration-200 bg-gray-200 ${showBtnVolumen ? 'rounded-md' : 'rounded-l-md bg-secundary'} h-1`} style={{ maxWidth: `100%`, width:`${progressBarVolumen}%`}} ></div>
                <span className={`p-1.5 bg-white rounded-md m-0 cursor-pointer relative right-0 ${showBtnVolumen ? 'hidden' : 'block'} `}></span>

                <div className={`h-3 absolute`} onClick={onGetCurrentVolumen} style={{maxWidth:'100%', width:'100%'}} onMouseOver={onHiddenBtnVolumen} onMouseOut={onShowBtnVolumen}></div>
            </section>
        </div>
    </div>
  )
}
