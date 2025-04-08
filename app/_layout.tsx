import ExamHeader from '@/components/ExamHeader';
import '../global.css';

import { router, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Poppins_900Black, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useSessionStore } from '@/store/sessionStore';
import { fetchUserByEmail } from '@/api';
import { useProfileStore } from '@/store/profileStore';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export default function Layout() {


  const { session, setSession } = useSessionStore();
  const { profile, setProfile } = useProfileStore();
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

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("layoutt session", session);
        setSession(session.access_token);

        const user = await fetchUserByEmail(session?.user?.email!);
        
        console.log("layout user", user);
        if (user) {
          setProfile(user);
          router.push(`/(${user.role.toLowerCase().concat('s')})`);
        }
      }  
    }

    if (!session || Object.keys(profile).length === 0) {
      fetchSession();
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session.access_token);
      }
    });
  }, [session, profile]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: true, header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} />, }} >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(students)" options={{ headerShown: false }} />
        <Stack.Screen name="(administrators)" options={{ headerShown: false }} />
        <Stack.Screen name="(teachers)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ title: 'Notifications', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
        <Stack.Screen name="[username]" options={{ title: 'Profile', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
        <Stack.Screen name="networkInfo" options={{ title: 'Network Info', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
