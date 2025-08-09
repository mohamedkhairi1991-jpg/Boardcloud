import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Home(){
  return (
    <View style={s.c}>
      <Text style={s.h}>BoardCloud</Text>
      <Text style={s.p}>Medical board communities by specialty - secure, modern, mobile-first.</Text>
      <View style={{height:16}} />
      <Link href="/login" style={s.btn}>Login</Link>
      <Link href="/register" style={s.btnOutline}>Create account</Link>
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, alignItems:'center', justifyContent:'center', padding:20, backgroundColor:'#f5f9fb' },
  h:{ fontSize:28, fontWeight:'700', color:'#0f172a' },
  p:{ textAlign:'center', marginTop:8, color:'#64748b' },
  btn:{ backgroundColor:'#0ea5a3', color:'#fff', padding:12, borderRadius:8, marginTop:12 },
  btnOutline:{ color:'#0ea5a3', padding:12, borderRadius:8, marginTop:12, borderWidth:1, borderColor:'#0ea5a3' }
});
