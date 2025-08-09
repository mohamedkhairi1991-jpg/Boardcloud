import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { API } from '../src/api';

export default function Research(){
  const [specialty,setSpecialty] = useState('respiratory');
  const [list,setList] = useState([]);
  const [title,setTitle] = useState('');
  const [abstract,setAbstract] = useState('');

  const load = async()=>{
    const res = await API.get('/research', { params: { specialty } });
    setList(res.data);
  };
  useEffect(()=>{ load(); }, [specialty]);

  const upload = async()=>{
    try{
      const pick = await DocumentPicker.getDocumentAsync({});
      if (pick.canceled) return;
      const file = pick.assets[0];
      const form = new FormData();
      form.append('title', title);
      form.append('specialty', specialty);
      form.append('abstract', abstract);
      form.append('file', { uri: file.uri, name: file.name || 'file.pdf', type: file.mimeType || 'application/pdf' });
      await API.post('/research/upload', form, { headers: { 'Content-Type':'multipart/form-data' }});
      setTitle(''); setAbstract('');
      Alert.alert('Uploaded','Awaiting admin approval');
    }catch(e){
      Alert.alert('Upload failed', e?.response?.data?.message || 'Error');
    }
  };

  return (
    <View style={s.c}>
      <Text style={s.h}>Research & Reports</Text>
      <TextInput style={s.i} placeholder="Filter specialty" value={specialty} onChangeText={setSpecialty} />
      <View style={s.card}>
        <Text style={{fontWeight:'600'}}>Upload Research</Text>
        <TextInput style={s.i} placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput style={s.i} placeholder="Abstract" value={abstract} onChangeText={setAbstract} />
        <Pressable onPress={upload} style={s.btn}><Text style={{color:'#fff'}}>Choose file & Upload</Text></Pressable>
      </View>
      <FlatList
        data={list}
        keyExtractor={i=>i._id}
        renderItem={({item})=>(
          <View style={s.card}>
            <Text style={{fontWeight:'700'}}>{item.title}</Text>
            <Text style={{color:'#64748b'}}>By {item.author?.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, padding:16, backgroundColor:'#f5f9fb' },
  h:{ fontSize:22, fontWeight:'700' },
  i:{ backgroundColor:'#fff', borderRadius:8, padding:10, borderWidth:1, borderColor:'#e2e8f0', marginVertical:6 },
  card:{ backgroundColor:'#fff', borderRadius:10, padding:12, marginVertical:8, borderWidth:1, borderColor:'#e5e7eb' },
  btn:{ backgroundColor:'#0ea5a3', padding:10, borderRadius:8, alignSelf:'flex-start', marginTop:6 }
});
