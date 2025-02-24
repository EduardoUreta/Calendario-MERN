import { useDispatch, useSelector } from "react-redux";
import { getEnvVariables, userToken } from "../helpers";
import Swal from "sweetalert2";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";
import Cookies from 'js-cookie';

// Manejar la interacción auth-store
export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const { VITE_API_URL } = getEnvVariables();

    const startLogin = async({ email, password }) => {
        dispatch(onChecking());
        try {
            const response = await fetch(`${VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            if(response.ok){
                const user = userToken();
                dispatch(onLogin({name: user.name, _id: user._id}))
                Swal.fire({
                    icon: "success",
                    title: "Inicio de sesión exitoso",
                });
            } else {
                dispatch(onLogout('Credenciales Inválidas'));
                setTimeout(() => {
                    dispatch(clearErrorMessage());
                }, 50);
            };
        } catch (error) {
            console.error("error:", error);
        };
    };

    const startRegister = async({ name, email, password }) => {
        dispatch(onChecking());
        try {
            const response = await fetch(`${VITE_API_URL}/auth/new`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include',
            });
    
            const data = await response.json();
    
            if (response.ok) {
                const loginResponse = await fetch(`${VITE_API_URL}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }), 
                    credentials: 'include', 
                });
    
                const loginData = await loginResponse.json();
    
                if (loginResponse.ok) {
                    const user = userToken();  
                    dispatch(onLogin({ name: user.name, _id: user._id })); 
                    Swal.fire({
                        icon: "success",
                        title: "Te has registrado y autenticado correctamente",
                    });
                } else {
                    dispatch(onLogout(loginData?.message || 'Error al iniciar sesión'));
                    setTimeout(() => {
                        dispatch(clearErrorMessage());
                    }, 50);
                }
            } else {
                dispatch(onLogout(data?.message || 'Error al registrar un usuario'));
                setTimeout(() => {
                    dispatch(clearErrorMessage());
                }, 50);
            }
        } catch (error) {
            console.error("error:", error);
        }
    };

    const checkAuthToken = async() => {
        const token = Cookies.get('Bearer');
        if (!token) return dispatch(onLogout());
        try {
            const user = userToken();  
            dispatch(onLogin({ name: user.name, _id: user._id })); 
        } catch (error) {
            dispatch(onLogout(error));
        }
    };

    const startLogout = () => {
        Cookies.remove('Bearer');
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    };

    return {
        status, 
        user, 
        errorMessage,

        startLogin,
        startRegister,
        checkAuthToken,
        startLogout

    }
};