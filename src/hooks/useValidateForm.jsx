

export const useValidateForm = (formValidate) => {

    const validateFormRegister = (nombre, email, password) => {
        if (email === "" && password === "" && nombre === "") {
            return {
              ok: false,
              okNombre:false,
              okEmail: false,
              okPassword: false,
              casoEmail: "El email debe tener al menos 8 caracteres",
              casoPassword: "La contraseña debe tener al menos 6 caracteres",
              casoNombre:'El nombre/apellido debe tener al menos 10 caracteres',
            };
        }
        else if(nombre.length < 10){
            
            return {
                ok: false,
                okNombre:false,
                casoNombre:'El nombre/apellido debe tener al menos 10 caracteres',
                okEmail: true,
                okPassword: true,
            }
        }

        else{
            return validateForm(email, password);
        }
    }

    const validateForm = (email, password) => {
      if (email === "" && password === "") {
        return {
          ok: false,
          okEmail: false,
          okPassword: false,
          okNombre:true,
          casoEmail: "El email debe tener al menos 8 caracteres",
          casoPassword: "La contraseña debe tener al menos 6 caracteres",
        };
      } else if (email.length < 8)
        return {
          ok: false,
          okEmail: false,
          casoEmail: "El email debe tener al menos 8 caracteres",
          okPassword: true,
          okNombre:true,
        };
      else if (password.length < 6)
        return {
          ok: false,
          okEmail: true,
          okNombre:true,
          okPassword: false,
          casoPassword: "La contraseña debe tener al menos 6 caracteres",
        };
      else if (!email.includes("@"))
        return {
          ok: false,
          okEmail: false,
          casoEmail: "El email debe contener @",
          okPassword: true,
          okNombre:true,
        };
      else if (!email.includes(".com"))
        return {
          ok: false,
          okEmail: false,
          casoEmail: "El email debe contener .com",
          okPassword: true,
          okNombre:true,
        };
      else return formValidate;
    };

    return {
        validateFormRegister,
        validateForm
    }
}
