
// (252 / 100) * 50 = 126 obtener el width de la etiqueta y restarlo con  el offsetX
import Swal from 'sweetalert2';
import { useContext, useState } from 'react'
import { deleteAllMusicDB, deleteMusicDB, importImgAudio, importMusic, saveMusicDB, saveOptionsMultimedia } from '../../firebase/musicApp/providerMusic';
import {authContext, musicContext} from '../useContext';
import { useEffect } from 'react';


const musicState = {
  id:null,
  audio: '',
  name:'',
  autor:'',
  img:'https://firebasestorage.googleapis.com/v0/b/musicapp-c130e.appspot.com/o/imgDefault%2Fimg%20musicNotFound.png?alt=media&token=e4827a02-dd5d-4a4c-8f6d-7d496137ebc7',
  play:false,
  photoURL: '',
  loadMusic:'',
  showBtnProgress:true,
  updateCurrentTime:false,
  showBtnVolumen:false,
  loadImgMusic:''
}


export const MusicProvider = ({children}) => {
  
  const{getUser:{uid}} = useContext(authContext);
  const [music, setMusic] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(musicState.audio);
  const [uidMusic, setUidMusic] = useState(null);
  const [musicAtrr, setMusicAtrr] = useState(musicState);
  const [selectMusic, setSelectMusic] = useState(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00"); 
  const [progressBar, setProgressBar] = useState(0);
  const [activeRandomMusic, setActiveRandomMusic] = useState(false);
  const [musicAleatory, setMusicAleatory] = useState([]);
  const [checkMusic, setCheckMusic] = useState(false);
  const [activeRepeatMusic, setActiveRepeatMusic] = useState(false);
  const [activeMutedVolumen, setactiveMutedVolumen] = useState(1);
  const [progressBarVolumen, setProgressBarVolumen] = useState(100);
  const [showBtnDeleteMusic, setShowBtnDeleteMusic] = useState(false);
  const [activeEditImg, setActiveEditImg] = useState({id:0, active:false});
  

  const loadingMusic = () => {
    setMusicAtrr({...musicAtrr, loadMusic:'Loading'});
  }

  const loadingImgMusic = () => {
    setMusicAtrr({...musicAtrr, loadImgMusic:'Loading'});
  }

  const swalAlert = (callback, idAudio = 0, titleReq, titleRes) => {
    Swal.fire({
      title: titleReq,
      text: "Los cambios seran irreversibles!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      background: "#141414",
      color: "#fff",
    }).then((result) => {
      if(music.length === 0){
        return Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Musica no Disponible',
          showConfirmButton: false,
          timer: 1500,
          background: "#141414",
          color: "#fff",
        })

      };
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: titleRes,
          showConfirmButton: false,
          timer: 1500,
          background: "#141414",
          color: "#fff",
        })

        if(idAudio){
          const getAudio = music.find(audio => {
            return audio.id === idAudio
          })
  
          const{autor, name} = getAudio;
          callback(uid, idAudio, music, autor, name, musicAtrr ).then(e => {
            setMusic(e.newMusic);
            setMusicAleatory(e.newMusic);
            if(!e.newMusicAtrr.id){
              stopAudio();
              setCurrentTime("0:00")
              setDuration("0:00")
              setProgressBar(0)  
              setMusicAtrr(e.newMusicAtrr);
            }
          });
        }
        else{
          callback(uid, music).then(e =>{
            setMusic(e);
            setMusicAleatory(e);
            setMusicAtrr(e)
            setCurrentTime("0:00")
            setDuration("0:00")
            setProgressBar(0)
          });
          stopAudio();
        }
        
      }
    })
  }


  const onChangeInputAudio = async(e) => {

    const files  = e.target.files;
    for (let index = 0; index < files.length; index++){
      const file = files[index];
      let nameAudio = file.name;

      
      const verify = /[^a-z|' & \t\r\n\f]/i;
      const [autor, resto] =  nameAudio.split('- ');
      const[nameMusic] =  resto.split(verify);
      
      const nameMusicValue = music.some(m =>{
        return m.name === nameMusic;
      });

      if(nameMusicValue){
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Musica Importada",
          showConfirmButton: false,
          timer: 1500,
          background: "#141414",
          color: "#fff",
        });

        return setMusicAtrr({
          ...musicAtrr,
          loadMusic: "Completed",
          play: true,
        });
      }
      loadingMusic();
      const resp = await importMusic(file, nameMusic, autor, uid, musicState.img);

      const audio = await saveMusicDB(resp, uid);
      if(activeRandomMusic){
        const aleatory = getAleatoryMusic(audio);
        setMusicAleatory(aleatory);
      }
      setMusic(audio);
      setMusicAtrr({...musicAtrr, loadMusic:'Completed', play:true});
    }
  }
 
  
  let contador = 0
  let minuteCurrent =''
  const playMusic = (audio, id, name, autor, music, img, getNewTimeProgress = 0, activeLoop = false) =>{    
    const newAudio = new Audio(audio);
    newAudio.currentTime = getNewTimeProgress;
    newAudio.volume = activeMutedVolumen;

    activeLoop ? newAudio.loop = activeLoop : newAudio.loop = false;
    contador =  Math.floor(Number((getNewTimeProgress / 60).toFixed(2).slice(2)) * 60 /100)
    minuteCurrent = Math.floor(getNewTimeProgress / 60);
    let getSecond = 0
    let getCurrentTime = '';
    let getTimeProgress = 0;
    let minutoContador = 0;
    
    newAudio.addEventListener("timeupdate", () => {
      
      let { currentTime, duration} = newAudio;
      currentTime = Number.parseInt(newAudio.currentTime);
      let minute = parseInt(duration / 60);
      let seconds = (duration / 60).toFixed(2).slice(2);
      seconds = parseInt((Number(seconds) * 60) / 100);
      let convertDuration = "";

      if(String(seconds).length === 1){
        Number(seconds) > 59 ? ((minute += 1), seconds - 60, (convertDuration = `${minute}:0${seconds}`)) : (convertDuration = `${minute}:0${seconds}`);
      }
      else{
        Number(seconds) > 59 ? ((minute += 1), seconds - 60, (convertDuration = `${minute}:0${seconds}`)) : (convertDuration = `${minute}:${seconds}`);
      }
      

      if (getSecond > 59) {
        contador = 0;
        getCurrentTime = `${minuteCurrent}:0${contador}`;
        if(minutoContador !== 0){
          minuteCurrent += 1;
          minutoContador = 0;
        }

      } else {
        getSecond < 10 ? (getCurrentTime = `${minuteCurrent}:0${getSecond}`) : (getCurrentTime = `${minuteCurrent}:${getSecond}`);
        minutoContador+=1;
      }

      getTimeProgress = (currentTime / duration) * 100;
      setProgressBar(getTimeProgress);
      setCurrentTime(getCurrentTime);
      setDuration(convertDuration);

      
      if(contador === 0){
        setTimeout(() => {
          getSecond = Math.ceil((contador += 1 / 4 + 0.013));
        },1000)  
      }
      else getSecond = Math.ceil((contador += 1 / 4 + 0.013));
      
      currentTime === 0 ? (contador = 0, minuteCurrent = 0) : '';
      if(newAudio.ended) return nextMusic(id);
      
    });
    
    setMusicAtrr({ ...musicAtrr, id, audio, name, autor, img, play:true, showBtnProgress:true });
    setCurrentAudio(newAudio);
    setUidMusic(id);
    setSelectMusic(null);

    currentAudio ==="" ? newAudio.play() : (currentAudio.pause(), newAudio.play()); 
  }


  const onGetCurrentTime = (e, audio, id, name, autor, music, img) => {
    const{photoURL, showBtnProgress, play, updateCurrentTime, loadImgMusic, loadMusic, showBtnVolumen, ...newMusic} = music;
    const getCurrentWidth = e.nativeEvent.offsetX;
    const widthTotal = e.target.clientWidth;
    currentAudio.pause();
    let activeLoop = '';
    activeRepeatMusic ? (activeLoop = true, setActiveRepeatMusic(true)): (activeLoop = false, setActiveRepeatMusic(false));
    
    if(!musicAtrr.play)return;
    currentAudio.addEventListener('timeupdate', ()=> {
      let getNewTimeProgress = 0;  
      let{duration} = currentAudio;
      let proporcion = 0
      proporcion = (duration / widthTotal);
      getNewTimeProgress = (getCurrentWidth * proporcion);
      playMusic(audio, id, name, autor, newMusic, img, getNewTimeProgress, activeLoop);
    })
    
  }

  const prevMusic = (audio, id, name, autor, attrMusic, img) => {
    const{photoURL, showBtnProgress, play, updateCurrentTime, loadImgMusic, loadMusic, showBtnVolumen, ...newMusic} = attrMusic;
    let getNewTimeProgress = 0; 
    let activeLoop = '';
    activeRepeatMusic ? (activeLoop = true, setActiveRepeatMusic(true)): (activeLoop = false, setActiveRepeatMusic(false));

    if(currentAudio.currentTime > 5){
      currentAudio.currentTime = 0
      playMusic(audio, id, name, autor, newMusic, img, getNewTimeProgress, activeLoop);
    }
    else{
      let prevAudio = {}
       if(activeRandomMusic){
        musicAleatory.forEach((m ,i) => {
          if(m.id === id){
            i === 0 ? prevAudio = musicAleatory[musicAleatory.length - 1] : prevAudio = musicAleatory[i -1]
            let{audio, id, name, autor, img} = prevAudio
            playMusic(audio, id, name, autor, prevAudio, img, getNewTimeProgress, activeLoop);
        }
       })
      }
      else{
        music.forEach((m ,i) => {
          if(m.id === id){
            i === 0 ? prevAudio = music[music.length - 1] : prevAudio = music[i -1]
            let{audio, id, name, autor, img} = prevAudio
            playMusic(audio, id, name, autor, prevAudio, img, getNewTimeProgress, activeLoop);
        }
     })
      }
      
    }
  }

  const nextMusic = (id) => {
    let getNewTimeProgress = 0;
    let activeLoop = '';
    activeRepeatMusic ? (activeLoop = true, setActiveRepeatMusic(true)): (activeLoop = false, setActiveRepeatMusic(false));

      let nextAudio = {};
      if(activeRandomMusic){
        musicAleatory.forEach((m ,i) => {
          if(m.id === id){
            i === musicAleatory.length - 1 ? nextAudio = musicAleatory[0] : nextAudio = musicAleatory[i + 1]
            let{audio, id, autor, name, img} = nextAudio;
            playMusic(audio, id,name, autor, nextAudio, img, getNewTimeProgress, activeLoop);
          }
       })
      }
      else{
        music.forEach((m ,i) => {
          if(m.id === id){
            i === music.length - 1 ? nextAudio = music[0] : nextAudio = music[i + 1]
            let{audio, id, autor, name, img} = nextAudio;
            playMusic(audio, id,  name, autor, nextAudio, img, getNewTimeProgress, activeLoop);
          }
       })
      }
     
  }


  const pauseMusic = () => {
    if(currentAudio.currentSrc === "")return;
    currentAudio.pause();
    setMusicAtrr({...musicAtrr, play:false});
  }

  const resumeMusic = () => {
    if(currentAudio === "" || currentAudio.currentSrc === ""){
      let minutes = Number(currentTime.slice(0,-3)) * 60;
      let seconds = Number(currentTime.slice(2));
      let getNewTimeProgress = minutes + seconds;
      const{audio, id, name, autor, img} = musicAtrr;
      playMusic(audio, id, name, autor, musicAtrr, img, getNewTimeProgress, activeRepeatMusic);
      setMusicAtrr({...musicAtrr, play:true});
    }else{
      currentAudio.play();
      setMusicAtrr({...musicAtrr, play:true});
    }
  }

  const stopAudio = () => {
    if(currentAudio === "" || currentAudio.currentSrc === "") return;
    currentAudio.pause();
    setMusicAtrr({...musicAtrr, play:false});
    const stop = new Audio();
    setCurrentAudio(stop);
  }


  const getAleatoryMusic = (array) => {
    const randomMusic = array.map((m, i) => {
      const random = Math.floor(Math.random() * array.length + 1);
      const indexRandom = random * 2;
      m = {...m, idRandom:indexRandom}
      return m
    })

    const getRandonMusic = randomMusic.sort((a, b) => {
      return a.idRandom - b.idRandom
    })

    return getRandonMusic
  }

  const aleatoryMusic = () => {
    if(activeRandomMusic){
      setActiveRandomMusic(false);
    }
    else{
      const getRandonMusic = getAleatoryMusic(music)
      setMusicAleatory(getRandonMusic);
      setActiveRandomMusic(true);
    }
  }


  const repeatMusic = () => {
  
    activeRepeatMusic ? ( currentAudio.addEventListener('timeupdate', ()=> {
      let{currentTime, duration } = currentAudio;
      currentAudio.loop = false;
      
      currentTime === 0 ? (contador = 0, minuteCurrent = 0)  :''
    }), setActiveRepeatMusic(false)):
    (currentAudio.addEventListener('timeupdate', ()=> {
      currentAudio.loop = true; 
    }), setActiveRepeatMusic(true));
  }


  const mutedVolumenMusic = () => {
    if(activeMutedVolumen === 1){
      currentAudio.muted = true;
      setactiveMutedVolumen(0);
      setProgressBarVolumen(0 * 100);
    }
    else if(activeMutedVolumen > 0 && activeMutedVolumen < 1){
      currentAudio.muted = true;
      setactiveMutedVolumen(0);
      setProgressBarVolumen(0 * 100);
    }
    else if(activeMutedVolumen === 0 && currentAudio.volume === 0){
      currentAudio.volume = 1;
      setactiveMutedVolumen(1);
      setProgressBarVolumen(1 * 100);
    }
    else{
      currentAudio.muted = false;
      setactiveMutedVolumen(currentAudio.volume);
      setProgressBarVolumen(currentAudio.volume * 100);
    }
  }

  const onGetCurrentVolumen = (e) => {
    currentAudio.muted = false;
    const getCurrentWidth = e.nativeEvent.offsetX;
    const widthTotal = e.target.clientWidth;
    const volumen = Number((getCurrentWidth / widthTotal).toFixed(1));
    currentAudio.volume = volumen;
    currentAudio.volume === 0 ? setactiveMutedVolumen(volumen) : currentAudio.volume < 0.5 ? setactiveMutedVolumen(volumen) : setactiveMutedVolumen(volumen)
    setProgressBarVolumen(volumen * 100);
  }


  const onSelectClickMusic = (id) => {
      setSelectMusic(id);
  }
  
  const onShowBtnProgress = () => {
    setMusicAtrr({...musicAtrr, showBtnProgress:true});
  }

  const onHiddenBtnProgress = () => {
    setMusicAtrr({...musicAtrr, showBtnProgress:false});
  }

  const onShowBtnVolumen = () => {
    setMusicAtrr({...musicAtrr, showBtnVolumen:true});
  }
  
  const onHiddenBtnVolumen = () => {
    setMusicAtrr({...musicAtrr, showBtnVolumen:false});
  }

  const startActiveShowEditMusic = (id) => {
    setActiveEditImg(id)
  }


  const onShowBtnDeleteMusic = (id) => {
    setShowBtnDeleteMusic(id)
  }

  const startDeleteMusicDB = async(idAudio) => {
    const titleReq ='Seguro que quieres eliminar la musica?'
    const titleRes = 'Musica eliminada con exito!'
    swalAlert(deleteMusicDB, idAudio, titleReq, titleRes);
  }


  const startDeleteAllMusic = () => {
    const titleReq = 'Seguro que quieres eliminar Todas?'
    const titleRes ='Musicas eliminadas con exito!'
    const idMusic = 0
    swalAlert(deleteAllMusicDB,idMusic, titleReq, titleRes);
  }

  const onChangeImgAudioInput = async(e, autor, name, idAudio, audio) => {
    const imgAudio = e.target.files[0];
    if(e.target.files.length === 0 ) return;
    loadingImgMusic();
    const resp = await importImgAudio(uid, imgAudio, autor, name, idAudio, audio);
    const{img} =resp;

    const getData = await saveMusicDB(resp, uid);
    setMusic(getData);

    if(activeEditImg === musicAtrr.id) {
      setMusicAtrr({...musicAtrr, audio, autor, name, id:idAudio, img, loadImgMusic:'Completed'})
    }
    else setMusicAtrr({...musicAtrr, loadImgMusic:'Completed'});
  }
  

  const startSaveOptionsMusic = () => {
    const options = {progressBar, activeRandomMusic, activeRepeatMusic, currentTime, duration, activeMutedVolumen, progressBarVolumen, uidMusic, ...musicAtrr}
    saveOptionsMultimedia(uid, options);
  }

  useEffect(() => {
    startSaveOptionsMusic();
  }, [progressBar, activeRandomMusic, activeRepeatMusic, currentTime, duration, activeMutedVolumen, progressBarVolumen])

  return (
    <musicContext.Provider
      value={{
        onChangeInputAudio,
        music,
        playMusic,
        uidMusic,
        musicAtrr,
        pauseMusic,
        resumeMusic,
        onSelectClickMusic,
        selectMusic,
        currentTime,
        duration,
        progressBar,
        onShowBtnProgress,
        onHiddenBtnProgress,
        setMusic,
        setMusicAtrr,
        loadingMusic,
        onGetCurrentTime,
        prevMusic,
        nextMusic,
        aleatoryMusic,
        activeRandomMusic,
        musicAleatory,
        setCheckMusic, 
        checkMusic,
        repeatMusic,
        activeRepeatMusic,
        onShowBtnVolumen, 
        onHiddenBtnVolumen,
        mutedVolumenMusic,
        activeMutedVolumen,
        onGetCurrentVolumen,
        progressBarVolumen,
        onShowBtnDeleteMusic,
        showBtnDeleteMusic,
        startDeleteMusicDB,
        startDeleteAllMusic,
        startActiveShowEditMusic,
        activeEditImg,
        loadingImgMusic,
        onChangeImgAudioInput,
        stopAudio,
        setCurrentTime,
        setDuration,
        setProgressBar,
        setActiveRandomMusic,
        setActiveRepeatMusic,
        setactiveMutedVolumen,
        setProgressBarVolumen,
        setUidMusic,
        setMusicAleatory,
        getAleatoryMusic,
        setCurrentAudio
      }}
    >
      {children}
    </musicContext.Provider>
  );
}
