import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { API } from '../src/api';
import { useAuth } from '../src/auth';
import { useRouter } from 'expo-router';

export default function Register(){
  const [email,setEmail] = useState('');
  const [otp,setOtp] = useState('');
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('student');
  const [specialties,setSpecialties] = useState('respiratory');
  const [sent,setSent] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const requestOtp = async ()=>{
    try{ await API.post('/auth/request-otp', { email }); setSent(true); Alert.alert('OTP sent','Check your email'); }
    catch(e){ Alert.alert('Error', e?.response?.data?.message || 'Could not send OTP'); }
  };
  const submit = async ()=>{
    try{
      const res = await API.post('/auth/verify-otp-register', { email, code: otp, name, password, role, specialties: specialties.split(',').map(s=>s.trim()) });
      await login(res.data.token, res.data.user);
      router.replace('/feed');
    }catch(e){ Alert.alert('Error', e?.response?.data?.message || 'Registration failed'); }
  };

  return (
    <View style={s.c}>
      <Text style={s.h}>Create account</Text>
      <TextInput style={s.i} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Pressable onPress={requestOtp} style={[s.btn,{opacity: sent?0.7:1}]} disabled={sent}><Text style={{color:'#fff'}}>{sent?'OTP Sent':'Request OTP'}</Text></Pressable>
      <TextInput style={s.i} placeholder="OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad"/>
      <TextInput style={s.i} placeholder="Full name" value={name} onChangeText={setName} />
      <TextInput style={s.i} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={s.i} placeholder="Role (student|mentor|pharma)" value={role} onChangeText={setRole} />
      <TextInput style={s.i} placeholder="Specialties (comma separated)" value={specialties} onChangeText={setSpecialties} />
      <Pressable onPress={submit} style={s.btn}><Text style={{color:'#fff'}}>Register</Text></Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, padding:20, backgroundColor:'#fff', justifyContent:'center' },
  h:{ fontSize:24, fontWeight:'700', marginBottom:16 },
  i:{ borderWidth:1, borderColor:'#e2e8f0', borderRadius:8, padding:12, marginBottom:12 },
  btn:{ backgroundColor:'#0ea5a3', padding:14, borderRadius:8, alignItems:'center', marginBottom:12 }
});
