import ExamHeader from '@/components/ExamHeader';
import '../global.css';

import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  
  return (
    <>
      <Stack screenOptions={{ headerShown: true, header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} />, }} >
        <Stack.Screen name="(teachers)" options={{headerShown: false}} />
        <Stack.Screen name="[username]" options={{ title: 'Profile', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
        <Stack.Screen name="networkInfo" options={{ title: 'Network Info', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
      </Stack>   
      <StatusBar style="auto" />
    </>
  );
}
