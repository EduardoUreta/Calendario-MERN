import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css'
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm(loginFormFields);
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange} = useForm(registerFormFields);

  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const onLoginSubmit = (e) => {
    e.preventDefault();
    startLogin({email: loginEmail, password: loginPassword});
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if(registerPassword != registerPassword2) return Swal.fire('Error en el registro', 'Contraseñas no coinciden', 'error');
    startRegister({name: registerName, email: registerEmail, password: registerPassword});
  }

  useEffect(() => {
    if(errorMessage !== undefined){
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: errorMessage,
        confirmButtonText: "Cerrar",
        customClass: {
            confirmButton: "btn btn-danger",
            },
      });
    }
  }, [errorMessage])
  
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onLoginSubmit}>
            <div className="form-group mb-2">
              <input 
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2 text-center">
              <input 
                type="submit"
                className="btnSubmit"
                value="Login" 
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña" 
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña" 
                name='registerPassword2'
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2 text-center">
              <input 
                type="submit" 
                className="btnSubmit" 
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
