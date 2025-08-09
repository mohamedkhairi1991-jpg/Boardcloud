import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { API } from '../src/api';
import { useAuth } from '../src/auth';
import { Link } from 'expo-router';

export default function Feed(){
  const { logout } = useAuth();
  const [specialty,setSpecialty] = useState('respiratory');
  const [posts,setPosts] = useState([]);
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');

  const load = async()=>{
    const res = await API.get('/posts', { params: { specialty } });
    setPosts(res.data);
  };
  useEffect(()=>{ load(); }, [specialty]);

  const create = async()=>{
    await API.post('/posts', { title, body, specialty });
    setTitle(''); setBody(''); load();
  };

  return (
    <View style={s.c}>
      <View style={s.row}>
        <Text style={s.h}>Feed</Text>
        <Pressable onPress={logout}><Text style={{color:'#ef4444'}}>Logout</Text></Pressable>
      </View>
      <TextInput style={s.i} placeholder="Filter specialty" value={specialty} onChangeText={setSpecialty} />
      <View style={s.card}>
        <Text style={{fontWeight:'600'}}>Create Post</Text>
        <TextInput style={s.i} placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput style={s.i} placeholder="Body" value={body} onChangeText={setBody} />
        <Pressable onPress={create} style={s.btn}><Text style={{color:'#fff'}}>Post</Text></Pressable>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item=>item._id}
        renderItem={({item})=>(
          <View style={s.card}>
            <Text style={{fontWeight:'700'}}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text style={{color:'#64748b', marginTop:6}}>By {item.author?.name} — {item.specialty}</Text>
          </View>
        )}
      />
      <View style={s.row}>
        <Link href="/research" style={s.link}>Research</Link>
        <Link href="/pharma" style={s.link}>Pharma</Link>
        <Link href="/chat" style={s.link}>Messenger</Link>
        <Link href="/admin" style={s.link}>Admin</Link>
        <Link href="/settings" style={s.link}>Settings</Link>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, padding:16, backgroundColor:'#f5f9fb' },
  h:{ fontSize:22, fontWeight:'700' },
  row:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8 },
  i:{ backgroundColor:'#fff', borderRadius:8, padding:10, borderWidth:1, borderColor:'#e2e8f0', marginVertical:6 },
  btn:{ backgroundColor:'#0ea5a3', padding:10, borderRadius:8, alignSelf:'flex-start', marginTop:6 },
  link:{ color:'#0ea5a3', marginRight:12 },
  card:{ backgroundColor:'#fff', borderRadius:10, padding:12, marginVertical:8, borderWidth:1, borderColor:'#e5e7eb' }
});
