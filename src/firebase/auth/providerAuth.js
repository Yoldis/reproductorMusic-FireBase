import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { FirebaseAuth, FirebaseStorage } from "../config"

export const registerWithEmailPassword = async(nombre, email, password) => {
    try {
        
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const{uid, displayName, photoURL} = resp.user;

        await updateProfile(FirebaseAuth.currentUser, {displayName:nombre});

        return {
            ok:true,
            uid,
            nombre:displayName,
            email,
            photoURL,
            status:'Autenticated'
        }

    } catch (error) {
        return {
            ok:false,
            error:error.message
        }
    }
}

export const loginWithEmailAndPassword = async (email, password) => {

    try {
        const resp  = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const{uid, displayName, photoURL} = resp.user;

        return {
            ok:true,
            email,
            displayName,
            uid,
            photoURL,
            status:'Autenticated'
        }

    } catch (error) {

        return {
            ok:false,
            error:error.message,
        }
    }
}


export const updateProfilePhotoURL = async(photoURL, uid)=> {
    try {
        const imagesRef = ref(FirebaseStorage, `Perfil/${uid}` );
        await uploadBytes(imagesRef, photoURL);

        const url = await getDownloadURL(ref(FirebaseStorage, `Perfil/${uid}`));
        await updateProfile(FirebaseAuth.currentUser, {photoURL:url});

        return {
            ok:true,
            photoURL:url,
            status:'Autenticated'
        }

    } catch (error) {
        return {
            ok:false,
            error:error.message,
        }
    }

}

export const deleteProfilePhotoURL = async(uid) => {
    try {
        const imagesRef = ref(FirebaseStorage, `Perfil/${uid}` );
        await updateProfile(FirebaseAuth.currentUser, {photoURL:'null'});
        await deleteObject(imagesRef);
        
        const{photoURL} = FirebaseAuth.currentUser

        return {
            ok:true,
            photoURL:photoURL
        }

    } catch (error) {
        return { 
            ok:false,
            error:error.message,
        }
    }
}


export const updateProfileDisplayName = async(displayName) => {

    try {
        await updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok:true,
            nombre:displayName
        }
    } catch (error) {
        return {
            ok:false,
            error:error.message
        }
    }
}


export const logoutSing = async () => {
    await signOut(FirebaseAuth);
    // return await FirebaseAuth.signOut();
}


