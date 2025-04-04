import ExamHeader from '@/components/ExamHeader';
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{
    headerShown: true, header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} />,
  }} >
    <Stack.Screen name="index" options={{ title: 'Dashboard', header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} /> }} />
    <Stack.Screen name="exam" options={{ title: 'Exam', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
    <Stack.Screen name="reports" options={{ title: 'Reports', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
    <Stack.Screen name="students" options={{ title: 'Students', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
    <Stack.Screen name="settings" options={{ title: 'Settings', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
  </Stack>;
}
