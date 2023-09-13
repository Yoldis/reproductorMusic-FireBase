import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../config";

export const importMusic = async(file, newName, nameAutor, uid, img) =>{
    try {
        const audioRef = ref(FirebaseStorage, `Music/${uid}/${nameAutor} ${newName}`);
        await uploadBytes(audioRef, file);

        const getAudio = await getDownloadURL(audioRef);

        return {
            audio:getAudio,
            id:new Date().getTime(),
            name:newName,
            autor:nameAutor,
            idUser:uid,
            img
        }

    } catch (error) {
        return{
            ok:false,
            return:error
        }
    }
}

// export const startSetCurrentAudio = async(audio, uid) => {
//     await setDoc(doc(FirebaseDB, `currentMusic/${uid}`), audio);
// }


// export const getCurrentMusic = async() => {
//     const getCollection  = await getDocs(collection(FirebaseDB, `currentMusic`));
    
//     const getMusic = []
//     getCollection.forEach(doc => {
//         getMusic.push( doc.data());
//     })
//     return getMusic;
// }

export const saveMusicDB = async(music, uid) => {

    await setDoc(doc(FirebaseDB, `Music/${uid}/audio/${music.id}`), music);
    const getCollection  = await getDocs(collection(FirebaseDB, `Music/${uid}/audio`));

    const getMusic = []
    getCollection.forEach(doc => {
        getMusic.push( doc.data());
    })

    return getMusic;
}


export const getMusicDB = async(uid) => {
    const getCollection  = await getDocs(collection(FirebaseDB, `Music/${uid}/audio`));

    const getMusic = []
    getCollection.forEach(doc => {
        getMusic.push( doc.data());
    })

    return getMusic;
}

export const deleteMusicDB = async(uid, idAudio, music, autor, name, musicAtrr) => {
    
    await deleteDoc(doc(FirebaseDB, `Music/${uid}/audio/${idAudio}`));
    const audioRef = ref(FirebaseStorage, `Music/${uid}/${autor} ${name}`);
    const imgRef = ref(FirebaseStorage, `ImageMusic/${uid}/${autor} ${name}`);
    deleteObject(audioRef);
    deleteObject(imgRef);

    let newMusicAtrr = {}
    if(musicAtrr.id === idAudio){
        await deleteDoc(doc(FirebaseDB, `optionsMultimedia/${uid}`));
    }
    else newMusicAtrr = musicAtrr

    const newMusic = music.filter(e => {
        return e.id !== idAudio;
    })

    return {
        newMusic,
        newMusicAtrr
    };
}


export const deleteAllMusicDB = async(uid, music) => {

    const resp = music.map(async(e) => {
        await deleteDoc(doc(FirebaseDB, `Music/${uid}/audio/${e.id}`));
        await deleteDoc(doc(FirebaseDB, `optionsMultimedia/${uid}`));
        const audioRef = ref(FirebaseStorage, `Music/${uid}/${e.autor} ${e.name}`);
        const imgRef = ref(FirebaseStorage, `ImageMusic/${uid}/${e.autor} ${e.name}`);
        deleteObject(audioRef);
        deleteObject(imgRef);

        e= []
        return e 
    })
    
    const newMusic = await resp[0];

    return newMusic;
}


export const importImgAudio = async(uid, file, autor, name, idAudio, audio) => {
    try {
        const imgRef = ref(FirebaseStorage, `ImageMusic/${uid}/${autor} ${name}`);
        await uploadBytes(imgRef, file);

        const getImg = await getDownloadURL(imgRef);
        
        return{
            id:idAudio,
            autor,
            name,
            audio,
            img:getImg,
            idUser:uid
        }

    } catch (error) {
        return {ok:false, message:error.message}
    }
    
}

export const saveOptionsMultimedia = async(uid, options) => {
    if(uid === '') return;
    await setDoc(doc(FirebaseDB, `optionsMultimedia/${uid}`), options);
}


export const getOptionsMultimedia = async(uid) => {

    const docRef = doc(FirebaseDB, `optionsMultimedia/${uid}`);
    const getOptions = await getDoc(docRef);

    return getOptions.data();
}

