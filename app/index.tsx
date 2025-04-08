import { useProfileStore } from '@/store/profileStore';
import { Redirect } from 'expo-router';

export default function Index() {

  const { profile } = useProfileStore();
  console.log("stored profile", profile);
  if(profile.role === 'ADMINISTRATOR'){
    return <Redirect href="/(administrators)" />;
  }else if(profile.role === 'STUDENT'){
    return <Redirect href="/(students)" />;
  }else if(profile.role === 'TEACHER'){
    return <Redirect href="/(teachers)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

