import axios from 'axios';
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5000/api';
export const API = axios.create({ baseURL: apiUrl });
export function setToken(token){ if(token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`; else delete API.defaults.headers.common['Authorization']; }
