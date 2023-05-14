import {  createContext,useState } from "react";

export const  AdminFirebaseContext=createContext(null); 
export const AdminAuthContext = createContext(null);

export default function AdminContext ({children}) {
  const [admin,setadmin] = useState('');

  return(
    <AuthContext.Provider value={{admin, setadmin}}>
      {children}
    </AuthContext.Provider>
  )  
}