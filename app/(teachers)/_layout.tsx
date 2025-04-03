import ExamHeader from '@/components/ExamHeader';
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false ,header: (props) => <ExamHeader {...props} />,}} />;
}
  