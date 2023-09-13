import { onAuthStateChanged } from "firebase/auth"
import { useContext, useEffect } from "react"
import { authContext, musicContext } from "../../context/useContext"
import { FirebaseAuth } from "../config"
import {getMusicDB, getOptionsMultimedia } from "../musicApp/providerMusic"


export const chekingUser = () => {

    const {getUser,chekingAuth, setGetUser} = useContext(authContext);
    const {setMusicAtrr, musicAtrr, setMusic, loadingMusic, stopAudio, setCurrentTime, setCurrentAudio, setDuration, setProgressBar, setActiveRandomMusic, setCheckMusic,  setActiveRepeatMusic, setactiveMutedVolumen, setProgressBarVolumen, setUidMusic, setMusicAleatory, getAleatoryMusic} = useContext(musicContext);
    // const{idUser} = musicAtrr;

   useEffect(() => {
     chekingAuth();
     onAuthStateChanged(FirebaseAuth, (user) => {
       if (!user) {
        console.log("No activo");
        setGetUser({ status: "NoAutenticated" });

       } else {
         const { uid, displayName, email, photoURL } = user;
         console.log("Activo");
         setGetUser({...getUser, nombre:displayName, uid, email, photoURL, status: "Autenticated"});
         
         loadingMusic();
         getMusicDB(user.uid).then(e => {
              setMusic(e);

              getOptionsMultimedia(uid).then(option => {
                if(option === undefined){
                  setactiveMutedVolumen(1);
                  setActiveRandomMusic(false);
                  setActiveRepeatMusic(false);
                  setCurrentTime("0:00");
                  setDuration("0:00");
                  setProgressBar(0);
                  setProgressBarVolumen(100);
                  setUidMusic(null);
                  setMusicAtrr({ loadMusic:'Completed', play:false});
                }

                else{
                  const{activeMutedVolumen, activeRandomMusic, activeRepeatMusic, currentTime, duration, progressBar, progressBarVolumen, uidMusic, ...getAtrr} =option;

                  setactiveMutedVolumen(activeMutedVolumen);
                  setActiveRandomMusic(activeRandomMusic);
                  setActiveRepeatMusic(activeRepeatMusic);
                  setCurrentTime(currentTime);
                  setDuration(duration);
                  setProgressBar(progressBar);
                  setProgressBarVolumen(progressBarVolumen);
                  setUidMusic(uidMusic);
  
                  if(activeRandomMusic){
                    const aleatory = getAleatoryMusic(e);
                    setMusicAleatory(aleatory)
                  }
  
                  setMusicAtrr({...getAtrr, loadMusic:'Completed', play:false});
                  const loadAudio = new Audio(musicAtrr.audio);
                  setCurrentAudio(loadAudio);
                }
              });
            });

       }
     });

   }, []);

    return {
      getUser
    };

}


