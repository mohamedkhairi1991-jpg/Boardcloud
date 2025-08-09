import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API } from '../src/api';

export default function Pharma(){
  const [companies,setCompanies] = useState([]);
  useEffect(()=>{ (async()=>{ const r = await API.get('/pharma'); setCompanies(r.data); })(); },[]);
  return (
    <View style={s.c}>
      <Text style={s.h}>Medications Available (Iraq)</Text>
      <FlatList
        data={companies}
        keyExtractor={i=>i._id}
        renderItem={({item})=>(
          <View style={s.card}>
            <Text style={{fontWeight:'700'}}>{item.name}</Text>
            {item.subdivisions?.map((cat,idx)=>(
              <View key={idx} style={{marginTop:6}}>
                <Text style={{fontWeight:'600'}}>{cat.name}</Text>
                {cat.meds?.map((m,ix)=>(<Text key={ix} style={{color:'#475569'}}>• {m.name} — {m.description}</Text>))}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}
const s = StyleSheet.create({
  c:{ flex:1, padding:16, backgroundColor:'#f5f9fb' },
  h:{ fontSize:22, fontWeight:'700' },
  card:{ backgroundColor:'#fff', borderRadius:10, padding:12, marginVertical:8, borderWidth:1, borderColor:'#e5e7eb' }
});
