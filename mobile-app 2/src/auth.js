import React, { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { setToken } from './api';
const Ctx = createContext();
export function AuthProvider({children}){
  const [user,setUser] = useState(null), [token,setTok] = useState(null);
  const login = async (t,u)=>{ setTok(t); setUser(u); setToken(t); await SecureStore.setItemAsync('jwt', t); };
  const logout = async ()=>{ setTok(null); setUser(null); setToken(null); await SecureStore.deleteItemAsync('jwt'); };
  return <Ctx.Provider value={{user,token,login,logout}}>{children}</Ctx.Provider>;
}
export const useAuth = ()=> useContext(Ctx);
