import ExamHeader from '@/components/ExamHeader';
import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: true,header: (props) => <ExamHeader {...props} />,}} />
      <StatusBar style="auto" />
    </>
  );
}
