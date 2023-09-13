
import {  useContext, useEffect, useState } from 'react';
import { deleteProfilePhotoURL, loginWithEmailAndPassword, logoutSing, registerWithEmailPassword, updateProfileDisplayName, updateProfilePhotoURL } from '../../firebase/auth/providerAuth';
import { useForm } from '../../hooks/useForm'
import { useValidateForm } from '../../hooks/useValidateForm';
import {authContext} from '../useContext'

const initialState = {
  uid:'',
  nombre:'',
  email:'',
  password:'',
  status:'Cheking',
  photoURL:"",
  loadImg:''
}

const formValidate = {
  ok:true,
  okNombre:true,
  casoNombre:'',
  okEmail:true,
  casoEmail: '',
  okPassword:true,
  casoPassword: '',
  message: '',
}

export const AuthProvider = ({children}) => {

  const {
    nombre,
    email,
    password,
    photoURL,
    onChangeInput,
    onChangeInputFile,
    onResetForm,
    form,
    validate,
    setValidate,
  } = useForm(initialState, formValidate);

  const{validateForm, validateFormRegister,} = useValidateForm(formValidate);
  const [getUser, setGetUser] = useState(form);
  const{uid} = getUser;
  const [toogleProcfileDetails, setToogleProcfileDetails] = useState('hidden');
  const [opacityFocus, setOpacityFocus] = useState('');
  const [chekUpdateDisplayName , setchekUpdateDisplayName ] = useState(false);


  const chekingAuth = () => {
    setGetUser({...getUser, status:'Cheking'});
  }

  const startRegisterEmailPassowrd = async(e, nombre, email, password)=> {
      e.preventDefault();
      const resp = validateFormRegister(nombre, email, password);
      if(!resp.ok){
        return setValidate({...resp});
      }
      else{
        chekingAuth();
        const resp = await registerWithEmailPassword(nombre, email, password);
        const{uid, status, photoURL, error} = resp;
        if(!resp.ok){
          setGetUser({status: 'NoAutenticated'});
          setValidate({ok:false, message:error});
        } 
        setGetUser({status: status, nombre, email, uid, photoURL:photoURL});
      }
    }

  const startLoginWithEmailPassword = async(email, password) => {
      const resp  = validateForm(email, password);
      if(!resp.ok){
        return setValidate({...resp});
      }
      else{
        chekingAuth();
        const resp = await loginWithEmailAndPassword(email, password);
        const{displayName, uid, status, photoURL, error} = resp;
        
        if(!resp.ok){
          setGetUser({status: 'NoAutenticated'});
          setValidate({ok:false, message:error});
        };
        setGetUser({...getUser, status:status, nombre:displayName, uid, email, photoURL:photoURL});
      }
      
  }


  const startLogoutSign = async() => {
    chekingAuth();
    await logoutSing();
    setGetUser({status: 'NoAutenticated'});
    onResetForm();
  }



  useEffect(()=> {
      if(photoURL === '' || photoURL === undefined) return;
      setGetUser({...getUser, loadImg: 'loading'})
      updateProfilePhotoURL(photoURL, uid).then(e => setGetUser({...getUser, photoURL:e.photoURL, loadImg: ''}))
      .catch(e => setGetUser({...getUser, photoURL:e.photoURL}));
      setToogleProcfileDetails('hidden');
      setOpacityFocus('');
  }, [photoURL]);



  const startUpdateDisplayName = async(displayName) => {

    if(displayName.trim() === "") return setchekUpdateDisplayName(true);
      const resp  = await updateProfileDisplayName(displayName);
      const{nombre} = resp;
      setGetUser({...getUser, nombre:nombre});
      setToogleProcfileDetails('hidden');
      setOpacityFocus('');
      setchekUpdateDisplayName(false)
  }

  const startRemovePhotoUrl = async() => {
    const resp = await deleteProfilePhotoURL(uid);
    const{photoURL} = resp;
    setGetUser({...getUser, photoURL:photoURL});
    setToogleProcfileDetails('hidden');
    setOpacityFocus('');
}


const onHiddenProcfile = () => {
  setToogleProcfileDetails('hidden');
  setOpacityFocus('');
}


  return (
    <authContext.Provider
      value={{
        nombre,
        email,
        password,
        onChangeInput,
        startRegisterEmailPassowrd,
        getUser,
        setGetUser,
        chekingAuth,
        onResetForm,
        startLoginWithEmailPassword,
        startLogoutSign,
        onChangeInputFile,
        startUpdateDisplayName,
        toogleProcfileDetails,
        setToogleProcfileDetails,
        startRemovePhotoUrl,
        opacityFocus,
        setOpacityFocus,
        onHiddenProcfile,
        validate,
        setValidate,
        chekUpdateDisplayName,
        setchekUpdateDisplayName
      }}
    >
      {children}
    </authContext.Provider>
  );
}
