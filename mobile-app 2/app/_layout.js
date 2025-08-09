import { Stack } from 'expo-router';
import { AuthProvider } from '../src/auth';
export default function Root(){
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerStyle:{backgroundColor:'#0ea5a3'}, headerTintColor:'#fff' }}>
        <Stack.Screen name="index" options={{ title:'BoardCloud' }} />
        <Stack.Screen name="login" options={{ title:'Login' }} />
        <Stack.Screen name="register" options={{ title:'Register' }} />
        <Stack.Screen name="feed" options={{ title:'Feed' }} />
        <Stack.Screen name="research" options={{ title:'Research' }} />
        <Stack.Screen name="pharma" options={{ title:'Pharma' }} />
        <Stack.Screen name="chat" options={{ title:'Messenger' }} />
        <Stack.Screen name="admin" options={{ title:'Admin' }} />
        <Stack.Screen name="settings" options={{ title:'Settings' }} />
      </Stack>
    </AuthProvider>
  );
}
