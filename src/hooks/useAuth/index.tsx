import { useState, useEffect, useContext, createContext, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { User } from '@/models/user';
import { postFormData } from '@/api';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from '../useSnackbar';

interface AuthContextProps{
    getUser:() => any,
    logout:()=>void
    loginHandle: (email: string, password: string) => void,
    setUser:(user:User)=>void
}

const DEFAULT_VALUE:AuthContextProps = {
    getUser:()=>{},
    logout:() => {},
    loginHandle: () => {},
    setUser:() => {},
}

const AuthContext = createContext<AuthContextProps>(DEFAULT_VALUE);

export function AuthProvider({ children }:{children:React.ReactNode}) {
  const [user, setUserState] = useState<User|null>(null);
  const router = useRouter();
  const {showSnackbarMessage} = useSnackbar()

  const loginHandle = async (email:string,password:string) => {
    try{
      const formData = new FormData();
      formData.append("username",email)
      formData.append("password",password)
      const data = await postFormData("/auth/login",formData)
      setUser(data)
      router.push("/app/dashboard")
    }catch(error){
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const status = axiosError.response.status;
          const responseData = axiosError.response.data;
          if (status === 400) {
            console.log("Error in data format:", responseData);
            showSnackbarMessage("error","Error in data format")
          } else if (status === 401) {
            console.log("Auth error - email or password:", responseData);
            showSnackbarMessage("error","Email or password are wrong")
          } else {
            console.log("Server error: ", responseData);
            showSnackbarMessage("error","Internal error. Try Again later!")
          }
        } else if (axiosError.request) {
          console.log("Network Error during the request:", axiosError.request);
          showSnackbarMessage("error","Network error. Try Again later!")
        } else {
          console.log("Generic network error:", axiosError.message);
          showSnackbarMessage("error","Problem to connect to the server")
        }
      } else {
        console.error("Error:", error);
        showSnackbarMessage("error","Something was wrong.")
      }
    }
  }
  
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }else if(router.pathname !== '/'){
      router.push('/');
    }
  },[]);

  useEffect(()=>{
    let user = getUser()
    if(!user && router.pathname !== '/'){
      router.push("/")
    }
  },[router.pathname])
  
  const setUser = (user: User)=>{
    setUserState(user)
    if(user.access_token!==undefined){
      localStorage.setItem('token',user.access_token)
    }

    let userAsString = JSON.stringify(user)
    localStorage.setItem('user',userAsString)
  }

  const getUser = () => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage){
      let updatedUser = JSON.parse(userFromStorage)
      setUserState(updatedUser)
      return updatedUser
    }else{
      return null
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUserState(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ getUser, logout, loginHandle, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
