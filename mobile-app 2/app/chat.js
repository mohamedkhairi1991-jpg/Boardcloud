import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { API } from '../src/api';

export default function Chat(){
  const [otherId,setOtherId] = useState('');
  const [thread,setThread] = useState([]);
  const [body,setBody] = useState('');
  const load = async()=>{ if(!otherId) return; const r = await API.get('/chat/thread/'+otherId); setThread(r.data); };
  useEffect(()=>{ load(); }, [otherId]);
  const send = async()=>{ await API.post('/chat/send', { to: otherId, body }); setBody(''); load(); };
  return (
    <View style={s.c}>
      <Text style={s.h}>Messenger</Text>
      <TextInput style={s.i} placeholder="Recipient user ID" value={otherId} onChangeText={setOtherId} />
      <FlatList data={thread} keyExtractor={i=>i._id} renderItem={({item})=>(<View style={s.msg}><Text>{item.body}</Text></View>)} />
      <View style={{flexDirection:'row', gap:8}}>
        <TextInput style={[s.i,{flex:1}]} placeholder="Type..." value={body} onChangeText={setBody} />
        <Pressable onPress={send} style={s.btn}><Text style={{color:'#fff'}}>Send</Text></Pressable>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, padding:16, backgroundColor:'#f5f9fb' },
  h:{ fontSize:22, fontWeight:'700' },
  i:{ backgroundColor:'#fff', borderRadius:8, padding:10, borderWidth:1, borderColor:'#e2e8f0', marginVertical:6 },
  btn:{ backgroundColor:'#0ea5a3', padding:10, borderRadius:8, alignSelf:'flex-start' },
  msg:{ backgroundColor:'#fff', padding:10, borderRadius:8, marginVertical:4, borderWidth:1, borderColor:'#e5e7eb' }
});
