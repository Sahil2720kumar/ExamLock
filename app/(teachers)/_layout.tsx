import ExamHeader from '@/components/ExamHeader';
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{
    headerShown: true, header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} />,
  }} >
    <Stack.Screen name="exam" options={{ title: 'Exam', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
  </Stack>;
}
