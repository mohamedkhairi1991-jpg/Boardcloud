import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { API } from '../src/api';

export default function Admin(){
  const [pendingUsers,setPendingUsers] = useState([]);
  const [pendingPharma,setPendingPharma] = useState([]);
  const [pendingResearch,setPendingResearch] = useState([]);
  const load = async()=>{
    const u = await API.get('/admin/pending-users');
    const p = await API.get('/admin/pharma/pending');
    const r = await API.get('/admin/research/pending');
    setPendingUsers(u.data); setPendingPharma(p.data); setPendingResearch(r.data);
  };
  useEffect(()=>{ load(); },[]);
  const approveUser = async(id)=>{ await API.post('/admin/approve-user/'+id); load(); };
  const approvePharma = async(id)=>{ await API.post('/admin/pharma/approve/'+id); load(); };
  const approveResearch = async(id)=>{ await API.post('/admin/research/approve/'+id); load(); };
  return (
    <View style={s.c}>
      <Text style={s.h}>Admin Panel</Text>
      <Text style={s.sub}>Pending Users</Text>
      <FlatList data={pendingUsers} keyExtractor={i=>i._id} renderItem={({item})=>(
        <View style={s.card}><Text>{item.name} ({item.email})</Text><Pressable onPress={()=>approveUser(item._id)} style={s.btn}><Text style={{color:'#fff'}}>Approve</Text></Pressable></View>
      )} />
      <Text style={s.sub}>Pending Pharma</Text>
      <FlatList data={pendingPharma} keyExtractor={i=>i._id} renderItem={({item})=>(
        <View style={s.card}><Text>{item.name} ({item.contactEmail})</Text><Pressable onPress={()=>approvePharma(item._id)} style={s.btn}><Text style={{color:'#fff'}}>Approve</Text></Pressable></View>
      )} />
      <Text style={s.sub}>Pending Research</Text>
      <FlatList data={pendingResearch} keyExtractor={i=>i._id} renderItem={({item})=>(
        <View style={s.card}><Text>{item.title}</Text><Pressable onPress={()=>approveResearch(item._id)} style={s.btn}><Text style={{color:'#fff'}}>Approve</Text></Pressable></View>
      )} />
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, padding:16, backgroundColor:'#f5f9fb' },
  h:{ fontSize:22, fontWeight:'700' },
  sub:{ marginTop:12, fontWeight:'700' },
  card:{ backgroundColor:'#fff', borderRadius:10, padding:12, marginVertical:6, borderWidth:1, borderColor:'#e5e7eb', flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  btn:{ backgroundColor:'#0ea5a3', padding:10, borderRadius:8 }
});
