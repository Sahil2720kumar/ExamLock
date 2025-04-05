import ExamHeader from '@/components/ExamHeader';
import '../global.css';

import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Poppins_900Black, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_900Black,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: true, header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} />, }} >
        <Stack.Screen  name="(auth)"  options={{headerShown: false}} />
        <Stack.Screen name="(students)" options={{headerShown: false}}  /> 
        <Stack.Screen name="(administrators)" options={{headerShown: false}} />
        <Stack.Screen name="(teachers)" options={{headerShown: false}} />
        <Stack.Screen name="notifications" options={{ title: 'Notifications', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
        <Stack.Screen name="[username]" options={{ title: 'Profile', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
        <Stack.Screen name="networkInfo" options={{ title: 'Network Info', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
      </Stack>   
      <StatusBar style="auto" />
    </>
  );
}
