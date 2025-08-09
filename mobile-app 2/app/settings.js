import { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
export default function Settings(){
  const [app,setApp] = useState(true);
  const [whatsapp,setWhatsapp] = useState(false);
  const [email,setEmail] = useState(true);
  return (
    <View style={s.c}>
      <Text style={s.h}>Notifications</Text>
      <View style={s.row}><Text>In-app alerts</Text><Switch value={app} onValueChange={setApp} /></View>
      <View style={s.row}><Text>WhatsApp reminders (opt-in)</Text><Switch value={whatsapp} onValueChange={setWhatsapp} /></View>
      <View style={s.row}><Text>Email updates</Text><Switch value={email} onValueChange={setEmail} /></View>
      <Text style={{color:'#64748b', marginTop:12}}>Preferences saving will be added in production.</Text>
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, padding:16, backgroundColor:'#f5f9fb' },
  h:{ fontSize:22, fontWeight:'700' },
  row:{ backgroundColor:'#fff', borderRadius:10, padding:12, marginVertical:6, borderWidth:1, borderColor:'#e5e7eb', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }
});
