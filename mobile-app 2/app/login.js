import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { API } from '../src/api';
import { useAuth } from '../src/auth';
import { Link, useRouter } from 'expo-router';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const submit = async ()=>{
    try{
      const res = await API.post('/auth/login', { email, password });
      await login(res.data.token, res.data.user);
      router.replace('/feed');
    }catch(e){ Alert.alert('Login failed', e?.response?.data?.message || 'Error'); }
  };

  return (
    <View style={s.c}>
      <Text style={s.h}>Login</Text>
      <TextInput style={s.i} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={s.i} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable onPress={submit} style={s.btn}><Text style={{color:'#fff'}}>Login</Text></Pressable>
      <Link href="/register" style={s.link}>Create account</Link>
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, padding:20, backgroundColor:'#fff', justifyContent:'center' },
  h:{ fontSize:24, fontWeight:'700', marginBottom:16 },
  i:{ borderWidth:1, borderColor:'#e2e8f0', borderRadius:8, padding:12, marginBottom:12 },
  btn:{ backgroundColor:'#0ea5a3', padding:14, borderRadius:8, alignItems:'center' },
  link:{ color:'#0ea5a3', marginTop:14, textAlign:'center' }
});
