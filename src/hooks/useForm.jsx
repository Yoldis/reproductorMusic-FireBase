import { useEffect, useState } from "react"


export const useForm = (initialState = {}, formValidate = {}) => {

    const [form, setForm] = useState(initialState);
    const [validate, setValidate] = useState(formValidate);

    
    useEffect(()=> {
        setForm(initialState);
    }, [initialState]);
  
    const onChangeInput = (e) => {
        const{name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const onResetForm = () => {
        setForm(initialState);
        setValidate(formValidate)
    }

    const onChangeInputFile = (e) => {
        setForm({...form,  photoURL:e.target.files[0]});
    }


    return{
        ...form,
        form,
        setForm,
        onChangeInput,
        onResetForm,
        onChangeInputFile,
        validate, setValidate,
    }
}
